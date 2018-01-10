import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import Masonry from 'react-masonry-component';
import CategorySelection from './CategorySelection.js';
import SubcategorySelection from './SubcategorySelection.js';
import SearchResult from './SearchResult.js';
import url from '../../config';
import { setFilter, setSearchQuery, setResponseData } from '../../actions';

const masonryOptions = { transitionDuration: 0 };

class Search extends Component {
  constructor() {
    super();
    this.state = {
      category:'ALL',
      subcategory: null,
      filter: 'SUBJECT',
      subject: 'math',
      response: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }
  componentWillMount(){
    if(this.state && this.state.response === null)
    axios.post(`${url}/API/Search`, {})
      .then((res) => {
        this.props.setResponseData(res.data);
        this.setState({response : res.data});
      })
      .catch(e => {
        console.error(e);
      })
  }

  handleChange(e) {
    const value = e.target.type === 'text' ? e.target.value : e.target.value;
    const name = e.target.name;
    let result;
    switch(name) {
      case 'subject':
        result = this.props.setSearchQuery(value);
        break;
        case 'filter':
        default:
          result = this.props.setFilter(value);
        break;
    }
    this.setState({ [name]: result.payload });
  }

  handleSubmit(e) {
      e.preventDefault();
      let o = {}
      switch(this.props.filter) {
        case 'ISBN':
          o.ISBN = this.props.search;
          break;
        case 'TITLE':
          o.TITLE = this.props.search;
          break;
        case 'AUTHOR':
          o.AUTHOR = this.props.search;
          break;
        case 'SUBJECT':
        default:
          o.QUERY = this.props.search
      }
      
      if(this.state.category !== 'All')
        o.CATEGORY = this.props.category;

      if(this.state.subcategory)
        o.SUBCATEGORY = this.props.subcategory;

      axios.post(`${url}/API/Search`, o)
      .then((res) => {
        this.props.setResponseData(res.data);
        this.setState({ response: res.data });
      })
      .catch(e => {
        console.error(e);
      })
  }

  createSearchResults(res) {
    return res.map(e => <SearchResult results={e} key={e._id} />);
  }

  // createSearchResults = res => res.map((e, i) => (
  //   <div style={{paddingLeft: '3px', paddingRight: '3px', border: '1px solid red', backgroundColor: 'white', height: 300, width: 165}}>{i}</div>
  // ))

  componentDidMount(){
    this.setState({
      category:this.props.category,
      subcategory: this.props.subcategory,
      filter: this.props.filter,
      subject: this.props.subject,
      response: this.props.response
    })
  }

  render() {
    return (
      <div className="Search">
        <header className="Search-header">
        {this.props.category}
        {this.props.subcategory ? ' >> ' : null}
        {this.props.subcategory ? this.props.subcategory : null}
        </header>
          <CategorySelection />
          <SubcategorySelection />
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
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  category:state.category,
  subcategory: state.subcategory,
  filter: state.filter,
  search: state.search,
  response: state.response
});

export const mapDispatchToProps = dispatch => bindActionCreators({ setFilter, setSearchQuery, setResponseData}, dispatch);
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Search));