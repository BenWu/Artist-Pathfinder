from flask import Flask, redirect, url_for

from app import spotify_api

app = Flask(__name__)


@app.route('/')
@app.route('/index')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
