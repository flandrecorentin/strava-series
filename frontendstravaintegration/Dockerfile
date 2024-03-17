# Stage 1: Build the Angular app
FROM node:16 AS build

WORKDIR app

COPY . .
COPY /strava-series-env/global-config.service.ts src/global-config.service.ts
COPY /strava-series-env/proxy.conf.json src/proxy.conf.json

RUN npm install
RUN npm run build

# Stage 2: Serve the Angular app with Nginx
FROM httpd:latest AS deploy

COPY --from=build /app/dist/* /usr/local/apache2/htdocs/
COPY --from=build /app/dist/frontend-stravaintegration/index.html /usr/local/apache2/htdocs/frontend-stravaintegration/404.html

EXPOSE 443
