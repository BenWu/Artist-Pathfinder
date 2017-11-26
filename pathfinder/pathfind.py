def build_graph(source_id, dest_id, api, searches=100, verbose=False):
    """Do BFS starting at source to find destination, building a graph

    :param str source_id: artist id to start
    :param str dest_id: artist id to find
    :param api: spotify api (can use mock)
    :param int searches: maximum number of searches to do
    :param bool verbose: print id of each searched artist
    :return: tuple of boolean of path found and graph
    """
    if source_id == dest_id:
        return True, {source_id: []}

    # directed graph representation, key is artist id, value is list of related
    graph = {}
    # BFS queue
    queue = [source_id]
    path_found = False
    while queue and searches > 0:
        searches -= 1
        aid = queue[0]
        if verbose:
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

    return path_found, graph


def build_graph_generator(source_id, dest_id, api, searches=100):
    """Do BFS starting at source to find destination, building a graph

    :param str source_id: artist id to start
    :param str dest_id: artist id to find
    :param api: spotify api (can use mock)
    :param int searches: maximum number of searches to do
    :param bool verbose: print id of each searched artist
    :yields: progress information, types: 0 - update, 1 - results
    """
    if source_id == dest_id:
        yield {'type': 1, 'path_found': True, 'graph': {source_id: []}}

    # directed graph representation, key is artist id, value is list of related
    graph = {}
    # BFS queue
    queue = [source_id]
    path_found = False
    while queue and searches > 0:
        searches -= 1
        aid = queue[0]
        related_ids = [a['id'] for a in api.get_related_artists(aid)['artists']]
        yield {'type': 0, 'aid': aid, 'related': related_ids}
        graph[aid] = related_ids
        if dest_id in related_ids:
            path_found = True
            break
        for related_id in related_ids:
            if related_id not in queue and related_id not in graph:
                queue.append(related_id)
        queue.pop(0)

    yield {'type': 1, 'path_found': path_found, 'graph': graph}


def find_path_from_graph(source_id, dest_id, graph):
    """Backtrace through graph to find path from source to dest

    :param str source_id:
    :param str dest_id:
    :param dict graph:
    :return: list representing path, or None if no path found
    """
    path = [dest_id]
    while source_id not in path:
        found = False
        for aid, related in graph.items():
            if path[-1] in related:
                path.append(aid)
                found = True
                break
        if not found:
            return None
    return reversed(path)


def test():
    return 'test'