FROM python:3.12

WORKDIR app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000
RUN python manage.py migrate
CMD ["gunicorn", "--config", "gunicorn_config.py", "backendstravaintegration.wsgi:application"]
