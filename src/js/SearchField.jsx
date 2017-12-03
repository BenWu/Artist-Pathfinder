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
    this.setState({selectedArtist: ''});
    xhr.get({uri: `/search/${name}/`}, (err, resp, body) => {
      if (err) {
        console.log(err);
      } else {
        body = JSON.parse(body);
        const items = body['artists']['items'];
        this.setState({results: items});
      }
    });
  }

  selectSearchResult(id, name) {
    this.setState({selectedArtist: id});
    this.props.onSelectArtist(id, name);
  }

  renderResults() {
    const results = this.state.results;
    if (!results) {
      return;
    }
    if (results.length === 0) {
      return <p>{'No results found'}</p>;
    }
    const cards = this.state.results.map((artist) => {
      let image = '';
      const images = artist['images'];
      const targetHeight = 100;
      if (images.length > 0) {
        let closest = images[0]['height'] - targetHeight;
        image = images[0]['url'];
        for (let i = 1; i < images.length; i++) {
          const dist = images[i]['height'] - targetHeight;
          if (dist < -20) {
            break;
          } else if (dist < closest) {
            closest = dist;
            image = images[i]['url'];
          }
        }
      }
      let selected = this.state.selectedArtist
      && this.state.selectedArtist === artist['id'] ? 'selected' : '';
      return (
        <div key={this.state.selectedArtist + artist['id']}
             className={`result col-sm-6 ${selected}`}
             onClick={this.selectSearchResult.bind(this, artist['id'], artist['name'])}>
          {image ? <img className='thumb' src={image}/>
            : <img className='thumb'/>}
            <span className='name'>{artist['name']}</span>
        </div>
      )});
    const rows = [];
    let currentRow = [];
    for (let i = 0 ; i < cards.length ; i++) {
      currentRow.push(cards[i]);
      if (i % 2 === 1) {
        rows.push(currentRow);
        currentRow = [];
      }
    }
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }
    return (
      <div className='container search-results'>
        {rows.map((row, i) =>
          <div key={i} className='row'>
            {row}
          </div>
        )}
      </div>
    );
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
        {this.renderResults()}
      </div>
    );
  }
}

export default SearchField;
