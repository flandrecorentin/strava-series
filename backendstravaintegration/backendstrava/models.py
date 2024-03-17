from django.db import models


class ShortLivedAccessToken(models.Model):
    athlete_id = models.IntegerField(primary_key=True)
    short_lived_access_token_code = models.CharField(max_length=1000)
    expires_at = models.DateTimeField()


class RefreshToken(models.Model):
    athlete_id = models.IntegerField(primary_key=True)
    refresh_token_code = models.CharField(max_length=1000)


class Serie(models.Model):
    STATE = [
        ("active", "active"),
        ("close", "close"),
    ]
    TYPE = [
        ("Itinerancy", "Itinerancy and Hiking"),
        ("Velotaf", "Velotaf & Cycle Worker"),
        ("Triathlon ", "Triathlon"),
    ]
    athlete_id = models.IntegerField()
    state = models.CharField(max_length=10, choices=STATE)
    name = models.CharField(max_length=100)
    bio = models.CharField(max_length=1000)
    type = models.CharField(max_length=30, choices=STATE)
    create_time = models.DateTimeField()


class Activity(models.Model):
    strava_id_activity = models.IntegerField(primary_key=True)
    serie = models.ForeignKey(Serie, on_delete=models.CASCADE)
