from pathfinder import app


@app.route('/')
@app.route('/index')
def hello_world():
    return 'Hello World!'


@app.route('/test')
def test():
    return 'l'


if __name__ == '__main__':
    app.run(debug=True)
