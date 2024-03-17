FROM python:3.12

WORKDIR app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
ADD /strava-series-env/secret_config.py backendstrava/secret_config.py
ADD /strava-series-env/secret_config_settings.py backendstravaintegration/secret_config_settings.py

EXPOSE 8000
RUN python manage.py migrate
CMD ["gunicorn", "--config", "gunicorn_config.py", "backendstravaintegration.wsgi:application"]
