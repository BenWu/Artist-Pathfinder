from flask import Flask, redirect, url_for

from app import spotify_api
from app.constants import CLIENT_ID

app = Flask(__name__)


@app.route('/')
@app.route('/index')
def hello_world():
    return 'Hello World!'


@app.route('/authorize')
def authorize():
    auth_response = spotify_api.authorize()
    return redirect(url_for('index'))


if __name__ == '__main__':
    app.run()
