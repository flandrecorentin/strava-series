#!/bin/bash

# backend
sudo cp -r /strava-series-env/secret_config.py ./backendstravaintegration/backendstrava/
sudo cp -r /strava-series-env/secret_config_settings.py ./backendstravaintegration/backendstravaintegration/

sudo cp -r /strava-series-env/devdata.py ./backendstravaintegration/backendstrava/

# frontend
sudo cp -r /strava-series-env/global-config.service.ts ./frontendstravaintegration/src/
sudo cp -r /strava-series-env/proxy.conf.json ./frontendstravaintegration/src/
