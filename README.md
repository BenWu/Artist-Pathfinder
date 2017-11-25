# Spotify Pathfinder
Create a graph of related artists to find the shortest path between two given artists.

### Install

Run setup script to install node and python dependencies (should use `virtualenv`):
```sh
$ ./setup.sh
```

### Run

Use gulp to compile frontend files and watch for changes:
```sh
$ gulp
```

Start server with `pathfinder/run.py`:
```sh
$ python -m pathfinder.run
```
