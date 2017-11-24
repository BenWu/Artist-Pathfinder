from flask import Flask

from pathfinder.spotify_api import SpotifyApi

app = Flask(__name__)

api = SpotifyApi()
