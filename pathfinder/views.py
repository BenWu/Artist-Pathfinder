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
    emit('response', {'data': 'test'})


@socketio.on('disconnect', namespace='/graph')
def socket_disconnect():
    log.info('Client disconnected')


@socketio.on('start', namespace='/graph')
def start_graph_search(data):
    log.info('start_graph_search: {}'.format(data))
    for result in build_graph_generator(
            data['rootId'], data['endId'], api, 1000):
        log.info(result)
        if result['type'] == 0:
            emit('update', {'aid': result['aid'], 'related': result['related']},
                 broadcast=True)
        elif result['type'] == 1:
            emit('result', {'found': result['path_found'],
                            'graph': result['graph']})


@app.route('/search/<artist_name>/')
def search_artist(artist_name):
    results = api.search_artist(artist_name)
    return jsonify(results)

