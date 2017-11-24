from flask import render_template

from pathfinder import app


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')


@app.route('/test')
def test():
    return 'l'


if __name__ == '__main__':
    app.run(debug=True)
