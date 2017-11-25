import React from 'react';
import ReactDOM from 'react-dom';

import SearchField from './SearchField.jsx'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
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
                {this.state.startId && this.state.endId
                    ? (<button className='btn btn-success confirm'>
                           Find Path From {this.state.startName} to {this.state.endName}
                       </button>)
                    : (<button className='btn btn-success confirm disabled'>
                           Select Two Artists Above
                       </button>)}
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
