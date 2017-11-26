from flask import render_template, jsonify, Response
from flask_socketio import emit

from pathfinder import app, api, socketio


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/test')
def test():
    return 'test'


@socketio.on('connect', namespace='/graph')
def socket_connect():
    print('Client connected')
    emit('response', {'data': 'test'})


@socketio.on('disconnect', namespace='/graph')
def socket_disconnect():
    print('Client disconnected')


@socketio.on('test', namespace='/graph')
def socket_send():
    emit('response', {'data': 'test'})


@socketio.on('test', namespace='/graph')
def socket_receive(msg):
    print(msg)


@app.route('/search/<artist_name>/')
def search_artist(artist_name):
    results = api.search_artist(artist_name)
    return jsonify(results)

