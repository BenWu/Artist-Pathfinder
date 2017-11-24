import React from 'react';
import xhr from 'xhr';

class SearchField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onKeyUp = this.onKeyUp.bind(this);
        this.searchArtist = this.searchArtist.bind(this);
    }

    onKeyUp(e) {
        if (e.key === 'Enter') {
            this.searchArtist();
        }
    }

    searchArtist() {
        const name = this.state.name;
        if (!name) {
            return;
        }
        console.log('Searching for ' + name);
        xhr.get({uri: `/search/${name}`}, (err, resp, body) => {
            if (err) {
                console.log(err);
            } else {
                body = JSON.parse(body);
                const items = body['artists']['items'];

                this.setState({results: items});
            }
        });
    }

    render() {
        return (
            <div className="search-container">
                <label>{this.props.title}</label>
                <input className='form-control' placeholder={this.props.hint}
                       onChange={(e) => {
                           this.setState({name: e.target.value})
                       }}
                       onKeyUp={this.onKeyUp}/>
                <button type="submit" className="btn btn-primary"
                        onClick={this.searchArtist}>Search</button>
                <div className="search-results">
                    {(this.state.results ? (
                        this.state.results.length === 0 ? (
                            "No results found"
                        ) : (
                            this.state.results.map((artist) =>
                                <p key={artist['id']}>{artist['name']}</p>
                            )
                        )
                    ) : (
                        ""
                    ))}
                </div>
            </div>
        );
    }
}

export default SearchField;
