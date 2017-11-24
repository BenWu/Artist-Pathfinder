import argparse

from pathfinder.pathfind import build_graph, find_path_from_graph
from pathfinder.spotify_api import SpotifyApi


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('--root-artist', nargs='+')
    parser.add_argument('--dest-artist', nargs='+')
    parser.add_argument('--max-searches', type=int)
    return parser.parse_args()


if __name__ == '__main__':
    args = parse_args()

    api = SpotifyApi()

    root_artist = ' '.join(args.root_artist)
    dest_artist = ' '.join(args.dest_artist)

    root = api.search_artist(root_artist)
    dest = api.search_artist(dest_artist)

    if len(root['artists']['items']) == 0:
        print('Starting artist not found!')
    elif len(dest['artists']['items']) == 0:
        print('Ending artist not found!')
    else:
        root_id = root['artists']['items'][0]['id']
        dest_id = dest['artists']['items'][0]['id']

        path_found, graph = build_graph(root_id, dest_id, api, searches=args.max_searches)

        if path_found:
            path = find_path_from_graph(root_id, dest_id, graph)
            print([a['name'] for a in api.get_artists(path)['artists']])
        else:
            print('Path not found in {} searches'.format(args.max_searches))



