import React, { Component } from 'react';
import SearchResult from './SearchResult.js';
import axios from 'axios';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      filter: 'SUBJECT',
      search: '',
      response: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value =
      event.target.type === 'text' ? event.target.value : event.target.value;
    const name = event.target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    if (event.which === 13) {
      axios
        .get(
          `http://localhost:3333/API/Search/${this.state.filter}/${
            this.state.search
          }`
        )
        .then(res => this.setState({ response: res.data }))
        .catch(err => console.log(err));
    }
  }

  createSearchResult(response) {
    return (
      <SearchResult
        results={response}
        key={Math.floor(Math.random() * (100 - 1))}
      />
    );
  }

  createSearchResults(response) {
    return response.map(this.createSearchResult);
  }

  render() {
    return (
      <div className="Search">
        <header className="Search-header">
          <h1 className="Search-title">Search books</h1>
        </header>
        <div className="form" style={{ marginBottom: '10px' }}>
          <input
            name="search"
            type="text"
            value={this.state.search}
            onChange={this.handleChange}
            onKeyDown={this.handleSubmit}
          />
          <select
            name="filter"
            value={this.state.filter}
            onChange={this.handleChange}
          >
            <option value="SUBJECT">Subject</option>
            <option value="TITLE">Title</option>
            <option value="AUTHOR">Author</option>
            <option value="ISBN">ISBN</option>
          </select>
        </div>
        {this.state.response
          ? this.createSearchResults(this.state.response)
          : null}
      </div>
    );
  }
}

export default Search;
