# Stage 1: Build the Angular app
FROM node:16 AS build

WORKDIR app

COPY . .

RUN npm install
RUN npm run build

# Stage 2: Serve the Angular app with Nginx
FROM httpd:latest AS deploy

COPY --from=build /app/dist/* /usr/local/apache2/htdocs/
COPY --from=build /app/dist/frontend-stravaintegration/index.html /usr/local/apache2/htdocs/frontend-stravaintegration/404.html

EXPOSE 443
