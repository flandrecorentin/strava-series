#!/bin/bash

# pull last release on master
sudo git checkout master
sudo git pull

# Use correct config (not secret theoretically)
sudo cp -r /secretstravaintegration/global-config.service.ts ./frontendstravaintegration/src/
sudo cp -r /secretstravaintegration/proxy.conf.json ./frontendstravaintegration/src/

# build frontend into dist/
cd ./frontendstravaintegration
sudo npm install
sudo ng build

# copy dist/ into directory of strava-series 
sudo cp -r ./dist/frontend-stravaintegration/* /var/www/strava-series/

# restart apache
sudo systemctl restart apache2