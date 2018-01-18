import time

from flask import render_template, jsonify
from flask_socketio import emit

from pathfinder import app, api, socketio
from pathfinder.pathfind import build_graph_generator, find_path_from_graph

log = app.logger


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/test')
def test():
    return 'test'


@socketio.on('connect', namespace='/graph')
def socket_connect():
    log.info('Client connected')


@socketio.on('disconnect', namespace='/graph')
def socket_disconnect():
    log.info('Client disconnected')


@socketio.on('start', namespace='/graph')
def start_graph_search(data):
    log.info('start_graph_search: {}'.format(data))
    artists_to_send = []

    def emit_update(artists_to_send):
        names = {artist['id']: artist['name'] for artist in api.get_artists(
            [a['aid'] for a in artists_to_send])['artists']}
        for artist in artists_to_send:
            artist['name'] = names[artist['aid']]
            emit('update', artist)
            time.sleep(0.2)

    for result in build_graph_generator(
            data['rootId'], data['endId'], api, 100):
        log.info(result)
        if result['type'] == 0:
            artists_to_send.append(result)
            if len(artists_to_send):
                emit_update(artists_to_send)
                artists_to_send = []
        elif result['type'] == 1:
            if len(artists_to_send):
                emit_update(artists_to_send)
                artists_to_send = []
            emit('result', {
                'found': result['path_found'],
                'searches': result['searches'],
                'path': find_path_from_graph(
                    data['rootId'],
                    data['endId'],
                    result['graph']
                ) if result['path_found'] else []
            })


@app.route('/search/<artist_name>/')
def search_artist(artist_name):
    results = api.search_artist(artist_name)
    return jsonify(results)

