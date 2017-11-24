from flask import render_template, jsonify

from pathfinder import app, api


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/test')
def test():
    return 'l'


@app.route('/search/<artist_name>/')
def search_artist(artist_name):
    results = api.search_artist(artist_name)
    return jsonify(results)

