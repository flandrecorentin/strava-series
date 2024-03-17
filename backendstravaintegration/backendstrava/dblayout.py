from . import models


def existShortLivedAccessToken(athlete_id, short_lived_access_token_code=None, expires_at=None):
    """
    Parameters
    - athlete_id is the pk. If None, the pk is not taken in consideration
    - optionals optons for the exist check

    Description:
    - Check if the short lived acces token exist with the pk athlete_id if not None
    - Else, check if exist with the token access and maybe the expires time if given 
    """
    object = None
    try:
        if athlete_id == None:
            if expires_at == None:
                object = models.ShortLivedAccessToken.objects.get(
                    short_lived_access_token_code=short_lived_access_token_code)
            else:
                object = models.ShortLivedAccessToken.objects.get(
                    short_lived_access_token_code=short_lived_access_token_code, expires_at=expires_at)
        else:
            if short_lived_access_token_code == None:
                object = models.ShortLivedAccessToken.objects.get(pk=athlete_id,
                                                                  short_lived_access_token_code=short_lived_access_token_code)
            else:
                object = models.ShortLivedAccessToken.objects.get(pk=athlete_id)
    except models.ShortLivedAccessToken.DoesNotExist:
        object = None
    return False if object == None else True
