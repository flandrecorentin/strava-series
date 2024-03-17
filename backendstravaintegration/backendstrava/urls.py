from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("version/", views.version, name="version"),
    path("token-exchange/", views.token_exchange, name="token_exchange"),
    path("profile/", views.get_profil, name="get_profil"),
    path("config/", views.get_config, name="get_config"),
    path("revoke-access/", views.revoke_access, name="revoke_access"),
    path("deconnect/", views.deconnect, name="deconnect"),
]
