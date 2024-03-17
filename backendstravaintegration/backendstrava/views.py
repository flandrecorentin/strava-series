# Corresponds to the view function send to frontend

from datetime import datetime, timezone

import requests
import os
from django.http import HttpResponse, JsonResponse
from django.core.cache import cache

from . import config
from . import dblayout as db
from . import devdata
from . import models
from . import secret_config
from . import serializers as s
from . import utils
from .object.message import Message


def index(request):
    """Check if the app backendstrava is running for the stravaintegration project"""
    message = Message(content='OK')
    response = JsonResponse(message.to_json())
    return response


def version(request):
    """Return the version of the strava-series app api"""
    print("start")
    try:
        message = Message(content='api v'+os.environ["VERSION"])
        response = JsonResponse(message.to_json(), status=200)
    except:
        message = Message(content='api unavailable')
        response = JsonResponse(message.to_json(), status=500)
    return response


def get_config(request):
    """Return the config for usage of Strava API"""
    response = JsonResponse({"client_id": config.client_id, "redirect_uri": secret_config.redirect_uri,
                             "response_type": config.response_type, "scope": config.scope, "state": config.state})
    return response


def token_exchange(request):
    """
    Parameters
    - Request from the frontend trying to connect this stravaintegration app

    Description
    - Make a token exchange call with the strava API
    - Check for the scope accepted by the athlete
    - Try
        - to update the acces token and the refresh token if the corresponding athlete already
        already in DB if it's possible...
        - If not possible try to create the access token and refresh token if new athlete in DB

    Results
    - If everything goes well, gives the current access_token to the browser in response
    """
    params = {
        'client_id': request.GET.get('client_id'),
        'client_secret': secret_config.client_secret,
        'code': request.GET.get('code'),
        'grant_type': request.GET.get('grant_type'),
        'scope': request.GET.get('scope'),
    }

    # Check scope
    if params.get('scope') != config.scope:
        print("error no good scope given")
        response = JsonResponse(
            {'content': 'Scope ' + params.get('scope') + ' not corresponding to what the app need: ' + config.scope},
            status_code=403)
        return response

    # Call api for exchange token
    response = requests.post(config.strava_oauth_url, data=params)
    utils.strava_trace("POST", config.strava_oauth_url, response.status_code)

    # Manage if response from starva is not OK
    if response.status_code != 200:
        print("error status code from strava api")
        response = JsonResponse({'content': 'Error in the response for exchange token ' + response.json()},
                                status_code=response.status_code)
        return response

    dataToken = response.json()
    athleteIdParam = dataToken.get('athlete', {}).get('id')
    accessTokenParam = dataToken.get('access_token')
    expiresAtParam = datetime.fromtimestamp(dataToken.get('expires_at'), tz=timezone.utc)
    refreshTokenParam = dataToken.get('refresh_token')

    try:  # to update the ShortLivedAccessToken and RefreshToken
        shortToken = models.ShortLivedAccessToken.objects.get(athlete_id=athleteIdParam)
        refreshToken = models.RefreshToken.objects.get(athlete_id=athleteIdParam)
        shortToken.short_lived_access_token_code = accessTokenParam
        shortToken.expires_at = expiresAtParam
        shortToken.save()
        refreshToken.refresh_token_code = refreshTokenParam
        refreshToken.save()
        print(f"- updating ShortLivedAccessToken and RefreshToken for athlete {athleteIdParam} succeed")
    except models.ShortLivedAccessToken.DoesNotExist or models.RefreshToken.DoesNotExist:  # create ShortLivedAccessToken and RefreshToken
        shortToken = models.ShortLivedAccessToken.objects.create(athlete_id=athleteIdParam,
                                                                 short_lived_access_token_code=accessTokenParam,
                                                                 expires_at=expiresAtParam)
        refreshToken = models.RefreshToken.objects.create(athlete_id=athleteIdParam,
                                                          refresh_token_code=refreshTokenParam)
        print(f"- creating ShortLivedAccessToken and RefreshToken for athlete {athleteIdParam} succeed")
    except Exception as e:
        print(f"- a very strange error appears: {e}")

    # Response with the access token in the cookie
    response = JsonResponse({'content': 'Authentication successful'})
    response.set_cookie('access_token', accessTokenParam, httponly=True, secure=True, samesite='Strict')
    return response


# TODO : modify to respect the acces_token
def refresh_token(athleteIdParam):
    try:
        refreshToken = models.RefreshToken.objects.get(athlete_id=athleteIdParam)  # get athleteId
    except models.RefreshToken.DoesNotExist:
        print("error no refresh token")
        res1 = HttpResponse("error no refresh token")
        res1.status_code = 500
        return res1

    params = {
        'client_id': config.client_id,
        'client_secret': secret_config.client_secret,
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken.refresh_token_code,
    }

    response = requests.post(config.strava_oauth_url, data=params)

    data = response.json()

    access_token = data.get('access_token')
    expires_at = datetime.fromtimestamp(data.get('expires_at'), tz=timezone.utc)
    refresh_token = data.get('refresh_token')

    # Update shortLivedAccesToken and refreshToken
    try:
        # Update short and refresh token
        shortToken = models.ShortLivedAccessToken.objects.get(athlete_id=athleteIdParam)
        refreshToken = models.RefreshToken.objects.get(athlete_id=athleteIdParam)
        shortToken.short_lived_access_token_code = access_token
        shortToken.expires_at = expires_at
        shortToken.save()
        refreshToken.refresh_token_code = refresh_token
        refreshToken.save()
    except models.RefreshToken.DoesNotExist or models.ShortLivedAccessToken.DoesNotExist:
        print("error refreshing token")
        res1 = HttpResponse("error refreshing token")
        res1.status_code = 500
        return res1

    # return token
    return HttpResponse("BackendStrava refresh_token succeed")


def get_profil(request):
    # TODO: check if autorization
    access_token_from_request = request.COOKIES.get('access_token')
    if not db.existShortLivedAccessToken(None, short_lived_access_token_code=access_token_from_request):
        return JsonResponse({'content': 'Ressource forbidden, probably not connect'}, status=401)

    # Athlete strava for profileStrava
    # TODO : NOT GOOD probably better to take the cookie
    # headers = {"Authorization": request.headers.get('Authorization')} # TODO: see for resfresh token maybe ?
    headers = {"Authorization": access_token_from_request}  # TODO: see for resfresh token maybe ?

    # *****
    # response_strava = requests.get(config.strava_api_url_athlete, headers=headers)
    # utils.strava_trace("GET", config.strava_api_url_athlete, response_strava.status_code)
    # athlete_strava = response_strava.json()
    athlete_strava = devdata.athlete_strava

    # Recents activities
    params = {
        # 'before': int,
        # 'after': int,
        'page': 1,
        'per_page': 4
    }
    # ******
    # response_strava = requests.get(config.strava_api_url_athlete_activities, headers=headers, params=params)
    # utils.strava_trace("GET", config.strava_api_url_athlete_activities, response_strava.status_code)
    # athlete_activities_strava = response_strava.json()
    # print(athlete_activities_strava)
    athlete_activities_strava = devdata.athlete_activities_strava

    # Series

    profil = {
        'profileStrava': s.s_profileStrava(athlete_strava),
        'activitiesStrava': s.s_activitiesStrava(athlete_activities_strava)
    }

    res = JsonResponse(profil, status=200)
    return res


def deconnect(request):
    name_cookie = 'access_token'

    # If no authenticated
    if request.COOKIES.get(name_cookie) == None:
        return JsonResponse({'content': 'No token access in the request (no connected)'}, status=404)

    res = JsonResponse({'content': 'Deconnection succesfull'}, status=200)
    res.delete_cookie(name_cookie)
    return res


def revoke_access(request):
    try:
        accessToken = request.headers.get('Authorization')
        shortToken = models.ShortLivedAccessToken.get(short_lived_access_token_code=accessToken)
        athleteId = shortToken.athlete_id
        refreshToken = models.RefreshToken.get(athleteId=athleteId)
        shortToken.delete()
        refreshToken.delete()
        response = requests.post(config.strava_oauth_deauthorize, data={'access_token': accessToken})
        print(response.status_code)
    except models.RefreshToken.DoesNotExist or models.ShortLivedAccessToken.DoesNotExist:
        message = {'content': 'Error during revokation of autentication'}
        res = JsonResponse(message, status=500)
    message = {'content': 'Access revoked and tokens of authentication deleted'}
    res = JsonResponse(message, status=200)
    return res
