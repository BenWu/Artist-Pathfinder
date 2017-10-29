import base64
from urllib.parse import urlunparse

import requests

from app.constants import CLIENT_ID, CLIENT_SECRET


def get_url(endpoint):
    base_url = 'accounts.spotify.com'
    return urlunparse(('https', base_url, endpoint, '', '', ''))


def authorize():
    url = get_url('api/token')
    data = {'grant_type': 'client_credentials'}
    authorization = base64.b64encode(
        '{}:{}'.format(CLIENT_ID, CLIENT_SECRET).encode()).decode()
    headers = {'Authorization': 'Basic {}'.format(authorization)}
    response = requests.post(url, data=data, headers=headers)
    return response
