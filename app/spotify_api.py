import base64
from datetime import datetime
from urllib.parse import urlunparse

import requests
from flask import g

from app.constants import CLIENT_ID, CLIENT_SECRET

BASE_URL_ACCOUNTS = 'accounts.spotify.com'
BASE_URL_API = 'api.spotify.com'


def get_url(endpoint, base_url=BASE_URL_API):
    return urlunparse(('https', base_url, endpoint, '', '', ''))


def authorize():
    """Get auth token from API and save token and expiry to globals

    :return: True if successfuul, false otherwise
    """
    url = get_url('api/token', BASE_URL_ACCOUNTS)
    data = {'grant_type': 'client_credentials'}
    authorization = base64.b64encode(
        '{}:{}'.format(CLIENT_ID, CLIENT_SECRET).encode()).decode()
    headers = {'Authorization': 'Basic {}'.format(authorization)}
    response = requests.post(url, data=data, headers=headers)
    if response.status_code == 200:
        response = response.json()
        g.authorization = '{} {}'.format(
            response['token_type'],
            response['access_token']
        )
        g.expiry = datetime.utcnow().timestamp() + response['expires_in']
        return True
    return False
