#!/bin/bash

# pull last release on master
sudo git checkout master
sudo git pull

# Use the secret config for backend
sudo cp -r /secretstravaintegration/secret_config.py ./backendstravaintegration/backendstrava/
sudo cp -r /secretstravaintegration/secret_config_settings.py ./backendstravaintegration/backendstravaintegration/

# Deactivate backend
# Todo: backend of DB
cd ./backendstravaintegration
sudo pkill -f gunicorn

# Reload environnement
sudo supervisorctl update
sudo supervisorctl reread
sudo supervisorctl reload

# start app with gunicorn
sudo gunicorn --bind 0.0.0.0:8000 backendstravaintegration.wsgi:application --daemon