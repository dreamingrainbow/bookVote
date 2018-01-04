import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      search: ''
    }
  }

  updateSearch(event) {
    this.setState({search: event.target.value})
  }

  render() {
    return (
      <div className="Search">
        <header className="Search-header">
          <h1 className="Search-title">Search books</h1>
        </header>
        <p>Subject</p>
        <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} />

        <p>Title</p>
        <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} />

        <p>ISBN</p>
        <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} />

        <p>Author</p>
        <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} />
      </div>
    );
  }
}

export default Search;
