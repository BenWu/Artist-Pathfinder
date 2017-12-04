# Spotify Pathfinder
Create a graph of related artists to find the shortest path between two given artists.

![Screenshot](/images/Screenshot_1.png)

### Install

Run setup script to install node and python dependencies (should use `virtualenv`):
```sh
$ ./setup.sh
```

### Run

Use gulp to compile frontend files and watch for changes:
```sh
$ npm run start
```

Start server with `pathfinder/run.py`:
```sh
$ python -m pathfinder.run
```
