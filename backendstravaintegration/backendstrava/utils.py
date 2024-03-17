from datetime import datetime


def strava_trace(type, url, code):
    now = datetime.now()
    print(f"{now.strftime('[%d/%b/%Y %H:%M:%S]')} {type} - {code} : {url}")
