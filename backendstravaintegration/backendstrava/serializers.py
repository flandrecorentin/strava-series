def s_profileStrava(profileStrava):
    return {
        'username': profileStrava.get('username'),
        'firstname': profileStrava.get('firstname'),
        'lastname': profileStrava.get('lastname'),
        'bio': profileStrava.get('bio'),
        'picture': profileStrava.get('profile'),
        'city': profileStrava.get('city'),
        'state': profileStrava.get('state'),
        'country': profileStrava.get('country'),
    }


def s_activitiesStrava(athlete_activities_strava):
    s = []
    for activity in athlete_activities_strava:
        s.append({
            'name': activity.get('name'),
            'distance': activity.get('distance'),
            'startDate': activity.get('start_date_local'),
            'sportType': activity.get('sport_type'),
            'movingTime': activity.get('moving_time'),
        })
    return s
