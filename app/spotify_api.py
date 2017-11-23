import base64
from threading import Lock
from datetime import datetime
from urllib.parse import urlunparse

import requests

from app.keys import CLIENT_ID, CLIENT_SECRET


# TODO: handle rate limits
class SpotifyApi(object):

    BASE_URL_ACCOUNTS = 'accounts.spotify.com'
    BASE_URL_API = 'api.spotify.com'

    def __init__(self):
        self.lock = Lock()
        self.access_token = None
        self.expiry = None

    @staticmethod
    def get_url(endpoint, base_url=BASE_URL_API):
        return urlunparse(('https', base_url, endpoint, '', '', ''))

    @staticmethod
    def build_auth_header(access_token):
        return {'Authorization': access_token}

    def authorize(self):
        """Get auth token from API and save token and expiry to globals

        Access token and expiry values are locked during the execution of
        this method.

        :return: Access token, or none if errored
        """
        self.lock.acquire()
        authorized = (self.expiry is not None and
                      datetime.utcnow().timestamp() < self.expiry)

        try:
            if authorized:
                return self.access_token
            url = self.get_url('api/token', self.BASE_URL_ACCOUNTS)
            data = {'grant_type': 'client_credentials'}
            authorization = base64.b64encode(
                '{}:{}'.format(CLIENT_ID, CLIENT_SECRET).encode()).decode()
            headers = {'Authorization': 'Basic {}'.format(authorization)}
            response = requests.post(url, data=data, headers=headers)
            if response.status_code == 200:
                response = response.json()
                self.access_token = '{} {}'.format(
                    response['token_type'],
                    response['access_token']
                )
                self.expiry = datetime.utcnow().timestamp() + response['expires_in']
                return self.access_token
            return None
        finally:
            self.lock.release()

    def get(self, url, params=None):
        access_token = self.authorize()
        headers = self.build_auth_header(access_token)
        response = requests.get(url, params=params, headers=headers)
        return response

    def search_artist(self, artist_name):
        url = self.get_url('v1/search')
        params = {'q': artist_name, 'type': 'artist'}
        response = self.get(url, params)
        return response.json()

    def get_artists(self, artist_ids):
        url = self.get_url('v1/artists?ids={}'.format(','.join(artist_ids)))
        response = self.get(url)
        return response.json()

    def get_related_artists(self, artist_id):
        url = self.get_url('v1/artists/{}/related-artists'.format(artist_id))
        response = self.get(url)
        return response.json()
