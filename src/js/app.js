import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';

import Graph from './Graph.jsx';
import SearchField from './SearchField.jsx';

const socket = io.connect('http://localhost:5000/graph');

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        socket.on('update', (data) => {
            console.log(data);
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
        if (rootId && endId) {
            this.setState({searching: true});
            socket.emit('start', {rootId: rootId, endId: endId});
        }
    }

    render() {
        let button;
        if (this.state.searching) {
            button = (
                <button className='btn btn-success confirm disabled' onClick={this.startGraphSearch}>
                    Search in Progress
                </button>);
        } else if (this.state.startId && this.state.endId) {
            button = (
                <button className='btn btn-success confirm' onClick={this.startGraphSearch}>
                    Find Path From {this.state.startName} to {this.state.endName}
                </button>);
        } else {
            button = (
                <button className='btn btn-success confirm disabled'>
                    Select Two Artists Above
                </button>);
        }

        return (
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
                {button}
                <div>
                    <hr/>
                    <Graph/>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
