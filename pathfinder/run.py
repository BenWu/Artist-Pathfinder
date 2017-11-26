from pathfinder import app, socketio

import pathfinder.views

if __name__ == '__main__':
    socketio.run(app, debug=True)
