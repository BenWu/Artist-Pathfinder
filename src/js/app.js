import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import Graph from './Graph.jsx';
import SearchField from './SearchField.jsx';

const socket = io.connect('http://localhost:5000/graph');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {graph: []};

        socket.on('update', (data) => {
            console.log(data);
            const graph = this.state.graph.slice();
            graph.push(data);
            this.setState({graph});
        });
        socket.on('response', (msg) => {
           console.log(msg);
        });
        socket.on('result', (data) => {
            console.log(data);
            this.setState({searching: false});
        });

        this.startGraphSearch = this.startGraphSearch.bind(this);
    }

    startGraphSearch() {
        const rootId = this.state.startId;
        const endId = this.state.endId;
        if (rootId && endId && !this.state.searching) {
            this.setState({searching: true, graph: []});
            socket.emit('start', {rootId: rootId, endId: endId});
        }
    }

    renderConfirmButton() {
        if (this.state.searching) {
            return (
                <button className='btn btn-success confirm disabled' onClick={this.startGraphSearch}>
                    Search in Progress
                </button>);
        } else if (this.state.startId && this.state.endId) {
            return (
                <button className='btn btn-success confirm' onClick={this.startGraphSearch}>
                    Find Path From {this.state.startName} to {this.state.endName}
                </button>);
        } else {
            return (
                <button className='btn btn-success confirm disabled'>
                    Select Two Artists Above
                </button>);
        }
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
                <Graph graph={this.state.graph} size={2000}/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
