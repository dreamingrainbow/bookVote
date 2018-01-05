import React, { Component } from 'react';
import SearchResult from './SearchResult.js';
import url from '../../config';
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

    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    if (event.which === 13) {
      axios.get(`${url}/API/Search/${this.state.filter}/${this.state.search}`)
        .then(res => this.setState({ response: res.data }))
        .catch(err => console.log(err));
    }
  }

  createSearchResult(response) {
    return (
      <SearchResult
        results={response}
        key={response._id}
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
          <h1 className="Search-title" style={{display: 'inline'}}>Search books</h1>
          <div className="form" style={{ marginBottom: '10px',display: 'inline' }}>
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
        </header>
          {this.state.response
            ? this.state.response.hasOwnProperty('RESPONSE')
            ? null
            : this.createSearchResults(this.state.response)
            : null}
      </div>
    );
  }
}

export default Search;
