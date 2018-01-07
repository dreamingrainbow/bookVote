import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Masonry from 'react-masonry-component';

import SearchResult from './SearchResult.js';
import url from '../../config';
import { setFilter, setSearchQuery, setResponseData } from '../../actions';

const masonryOptions = { transitionDuration: 0 };

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

  handleChange(e) {
    const value = e.target.type === 'text' ? e.target.value : e.target.value;
    const name = e.target.name;
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

  // createSearchResults = res => res.map((e, i) => (
  //   <div style={{paddingLeft: '3px', paddingRight: '3px', border: '1px solid red', backgroundColor: 'white', height: 300, width: 165}}>{i}</div>
  // ))

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
<<<<<<< HEAD
        <Masonry
          className={'grid'}
          elementType={'div'}
          options={masonryOptions}
          disableImagesLoaded={false}
          updateOnEachImageLoad={false}
        >
          {this.state.response
            ? this.state.response.hasOwnProperty('RESPONSE')
            ? null
            : this.createSearchResults(this.state.response)
            : null}
        </Masonry>
=======
        {this.state.response
          ? this.state.response.hasOwnProperty('RESPONSE')
          ? null
          : this.createSearchResults(this.state.response)
          : null}
>>>>>>> a3300580fd1edb075c4fc56297b8dccbb0e18814
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