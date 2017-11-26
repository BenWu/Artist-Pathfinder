from flask import Flask
from flask_socketio import SocketIO

from pathfinder.spotify_api import SpotifyApi

app = Flask(__name__)
socketio = SocketIO(app, async_mode='threading')
api = SpotifyApi()
