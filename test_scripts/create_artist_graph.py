import argparse

from app.spotify_api import SpotifyApi


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('--root-artist', nargs='+')
    parser.add_argument('--dest-artist', nargs='+')
    parser.add_argument('--max-searches', type=int)
    return parser.parse_args()


if __name__ == '__main__':
    args = parse_args()

    api = SpotifyApi()

    searches = args.max_searches
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

        # directed graph representation, key is artist id, value is list of related
        graph = {}
        # BFS queue
        queue = [root_id]
        path_found = False
        while queue and searches > 0:
            searches -= 1
            aid = queue[0]
            print(aid)
            related_ids = [a['id'] for a in api.get_related_artists(aid)['artists']]
            graph[aid] = related_ids
            if dest_id in related_ids:
                path_found = True
                break
            for related_id in related_ids:
                if related_id not in queue and related_id not in graph:
                    queue.append(related_id)
            queue.pop(0)

        if path_found:
            # Backtrack through graph
            path = [dest_id]
            while root_id not in path:
                for k, v in graph.items():
                    if path[-1] in v:
                        path.append(k)
                        break
            print([a['name'] for a in api.get_artists(reversed(path))['artists']])
        else:
            print('Path not found in {} searches'.format(args.max_searches))



