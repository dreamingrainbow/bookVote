import React, { Component } from 'react';
import SearchResult from './SearchResult.js';
import url from '../../config';
import axios from 'axios';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFilter, setSearchQuery, setResponseData } from '../../actions';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      filter: 'SUBJECT',
      search: 'math',
      response: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const value = event.target.type === 'text' ? event.target.value : event.target.value;
    const name = event.target.name;
    let result;
    switch(name) {
      case 'filter':
        result = this.props.setFilter(value);
        break;
      case 'search':
        result = this.props.setSearchQuery(value);
        break;
    }
    this.setState({ [name]: result.payload });
  }

  async handleSubmit(e) {
    try {
      e.preventDefault();
      let res = await axios.get(`${url}/API/Search/${this.props.filter}/${this.props.search}`)
      this.props.setResponseData(res.data);
      this.setState({ response: res.data })
    } catch(e) {
      console.error(e);
    }
  }

  createSearchResults(res) {
    return res.map(e => <SearchResult results={e} key={e._id} />);
  }

  componentDidMount(){
    this.setState({
      filter: this.props.filter,
      search: this.props.search,
      response: this.props.response
    })
  }

  render() {
    return (
      <div className="Search">
        <header className="Search-header">
          <h1 className="Search-title" style={{display: 'inline'}}>Search books</h1>
          <div className="form" style={{ marginBottom: '10px',display: 'inline' }}>
            <form onSubmit={this.handleSubmit}>
              <input
                name="search"
                type="text"
                value={this.state.search}
                onChange={this.handleChange}
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
              <button type="submit">Search</button>
            </form>
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

const mapStateToProps = (state, props) => ({
  filter: state.filter,
  search: state.search,
  response: state.response
});

export const mapDispatchToProps = dispatch => bindActionCreators({setFilter, setSearchQuery, setResponseData}, dispatch);
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Search));