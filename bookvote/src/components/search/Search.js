import React, { Component } from 'react';
import SearchResult from './SearchResult.js';
import axios from 'axios';

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
        {/* <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} /> */}
        <SearchResult />
      </div>
    );
  }
}

export default Search;
