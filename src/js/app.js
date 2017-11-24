import React from 'react';
import ReactDOM from 'react-dom';

import SearchField from './SearchField.jsx'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container main">
                <SearchField title="Start Artist" hint="Artist Name"/>
                <hr/>
                <SearchField title="Artist to Find" hint="Artist Name"/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
