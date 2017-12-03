import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import Graph from './Graph.jsx';
import SearchField from './SearchField.jsx';

const socket = io.connect('http://localhost:5000/graph');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: [],
      endId: "4u5smJBskI6Adzv08PuiUP",
      endName: "Kiiara",
      startId: "06HL4z0CvFAxyc27GXpf02",
      startName: "Taylor Swift",
    };

    this.startGraphSearch = this.startGraphSearch.bind(this);

    socket.on('update', (data) => {
      const graph = this.state.graph.slice();
      graph.push(data);
      this.setState({graph});
    });
    socket.on('result', (data) => {
      this.setState({
        searching: false,
        pathFound: data.found,
        path: data.path,
        searches: data.searches,
      });
    });
  }

  startGraphSearch() {
    const rootId = this.state.startId;
    const endId = this.state.endId;
    if (rootId && endId && !this.state.searching) {
      this.setState({searching: true, graph: [], pathFound: false, path: []});
      socket.emit('start', {rootId: rootId, endId: endId});
    }
  }

  renderConfirmButton() {
    if (this.state.searching) {
      return (
        <button className='btn btn-success confirm disabled' onClick={this.startGraphSearch}>
            Search in Progress
        </button>);
    }
    if (this.state.startId && this.state.endId) {
      return (
        <button className='btn btn-success confirm' onClick={this.startGraphSearch}>
            Find Path From {this.state.startName} to {this.state.endName}
        </button>);
    }
    return (
      <button className='btn btn-success confirm disabled'>
          Select Two Artists Above
      </button>);
  }

  renderResults() {
    if (this.state.searching || this.state.pathFound === undefined) {
      return;
    }
    if (!this.state.pathFound) {
      return (
        <h3>
          A path was not found from {this.state.startName} and {this.state.endName} in {this.state.searches} searches
        </h3>
      );
    }
    return (
      <div>
        <h3>Path found in {this.state.searches} searches</h3>
        {this.state.path.map(aid => (
          <p key={aid}>
            {this.state.graph.filter(n => n.aid === aid)[0].name}
          </p>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className="container main">
          <h2>Spotify Pathfinder</h2>
          <hr/>
          <SearchField title="Start Artist" hint="Artist Name"
                       onSelectArtist={(id, name) => {
                         this.setState({startId: id, startName: name})
                       }}/>
          <hr/>
          <SearchField title="Artist to Find" hint="Artist Name"
                       onSelectArtist={(id, name) => {
                         this.setState({endId: id, endName: name})
                       }}/>
          <hr/>
          {this.renderConfirmButton()}
          <hr/>
        </div>
        <div className='results'>
          {this.renderResults()}
        </div>
        {this.state.graph.length ? <Graph graph={this.state.graph}
                                          size={window.innerWidth}
                                          path={this.state.path}/> : ''}
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));
