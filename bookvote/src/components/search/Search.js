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
    if(name === 'filter') {
      result = this.props.setFilter(value);
    } else {
      result = this.props.setSearchQuery(value);
    }
    this.setState({ [name]: result.payload });
  }

  handleSubmit(event) {  
    event.preventDefault();
      axios.get(`${url}/API/Search/${this.props.filter}/${this.props.search}`)        
        .then(res => {
          this.props.setResponseData(res.data);
          this.setState({ response: res.data })
        })
        .catch(err => console.log(err));
    
  }

  createSearchResult(res) {
    return <SearchResult results={res} key={res._id} />;
  }

  createSearchResults(res) {
    return res.map(this.createSearchResult);
  }

  componentDidMount(){
    this.setState({
      filter : this.props.filter,
      search : this.props.search,
      response : this.props.response
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

const mapStateToProps = (state, props) => {
  return {
    filter : state.filter,
    search : state.search,
    response : state.response
  };
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators({setFilter, setSearchQuery, setResponseData}, dispatch);
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Search));