import React, { Component } from 'react';
import CategorySelection from './CategorySelection.js';
import SubcategorySelection from './SubcategorySelection.js';
import SearchResult from './SearchResult.js';
import url from '../../config';
import axios from 'axios';

import { withRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setFilter, setSearchQuery, setResponseData } from '../../actions';
import { Categories } from './Categories';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      category:'ALL',
      subcategory: null,
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
    } else if(name === 'search') {
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
          <CategorySelection />
          <SubcategorySelection />
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