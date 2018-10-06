# Artist Pathfinder
Create a graph of related artists to find the shortest path between two given artists.

![Screenshot](images/Screenshot_1.png)

### Setup

Dependencies: node, npm, pip, python 3

Installation:
```sh
npm install
pip install -r requirements.txt
python setup.py develop
```

Copy `pathfinder/keys.template.py` to `pathfinder/keys.py` and insert Spotify API keys.

### Run

Build js:
```sh
make build
```

Build js and watch for changes:
```sh
make watch
```

Start server (running on port 5000):
```sh
make start
```
