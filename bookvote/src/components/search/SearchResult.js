import React, { Component } from 'react';
import axios from 'axios';
import url from '../../config';
import './SearchResult.css';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authenticate } from '../../actions';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upVote: this.props.results.VOTES.UP,
      downVote: this.props.results.VOTES.DOWN,
      cover: 'https://onestopfiction.com/-res/img/book-placeholder.jpg'
    };
    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }

  async handleUpVote() {
    try {
      let res = await axios.post(`${url}/API/Vote`, { BOOK_ID: this.props.results.BOOK_ID, VOTE: 'UP' });
      this.setState({ upVote: res.data.VOTES.UP });
    } catch (e) {
      console.error(e);
    }
  }

  async handleDownVote() {
    try {
      let res = await axios.post(`${url}/API/Vote`, { BOOK_ID: this.props.results.BOOK_ID, VOTE: 'DOWN' });
      this.setState({ downVote: res.data.VOTES.DOWN });
    } catch (e) {
      console.error(e);
    }
  }

  async componentDidMount() {
    try {
      this.setState({ user: this.props.user });
      let res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${this.props.results.ISBN}`);
      if (res.data.totalItems === 1)
        this.setState({ cover: res.data.items[0].volumeInfo.imageLinks.thumbnail });
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const book = this.props.results;
    const bookID = book.BOOK_ID;
    const bookTitle = book.TITLE;
    const bookAuthor = book.AUTHOR;
    const bookISBN = book.ISBN;
    const upVote = this.state.upVote;
    const downVote = this.state.downVote;

    return (
      <div className="searchResultContainer" key={bookID}>
        <div className="imageContainer">
          <img src={this.state.cover} alt="" className="cover" />
        </div>
        <div className="bookDetails">
          {this.props.user.token !== null ?
            <div className="votes">
              <button onClick={this.handleUpVote} name="upVote" className="upVotes">
                <span role="img" aria-label="UpVote">👍</span> <span className="hover" aria-labelledby="UpVote">{upVote}</span>
              </button>
              <button onClick={this.handleDownVote} name="downVote" className="downVotes">
              <span role="img" aria-label="DownVote">👎</span> <span className="hover" aria-labelledby="DownVote">{downVote}</span>
              </button>
            </div>
              :
            <div className="votes">
              <button onClick={this.showSignUp} name="upVote" className="upVotes">
                <span role="img" aria-label="UpVote">👍</span> <span className="hover" aria-labelledby="UpVote">{upVote}</span>
              </button>
              <button onClick={this.showSignUp} name="downVote" className="downVotes">
              <span role="img" aria-label="DownVote">👎</span> <span className="hover" aria-labelledby="DownVote">{downVote}</span>
              </button>
            </div>
          }
          <span className="bookTitle">{bookTitle}</span>
          <br />
          <span className="bookAuthor">
            <span style={{ fontWeight: 700 }}>Authors:</span> {bookAuthor}
          </span>
          <br />
          <span className="bookISBN">
            <span style={{ fontWeight: 700 }}>ISBN:</span> {bookISBN}
          </span>
          <br />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  user: state.user,
  filter: state.filter,
  search: state.search,
  response: state.response
});

export const mapDispatchToProps = dispatch => bindActionCreators({authenticate}, dispatch);
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SearchResult));