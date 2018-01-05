import React, { Component } from 'react';
import axios from 'axios';
import url from '../../config';
import './SearchResult.css';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upVote: this.props.results.VOTES.UP,
      downVote: this.props.results.VOTES.DOWN
    };

    this.handleUpVote = this.handleUpVote.bind(this);
    this.handleDownVote = this.handleDownVote.bind(this);
  }

  handleUpVote(event) {
    axios.post(`${url}/API/Vote`, {
      "BOOK_ID": this.props.results.BOOK_ID,
      "VOTE": "UP"
    })
      .then((res) => this.setState({ upVote: res.data.VOTES.UP }))
      .catch((err) => console.log(err));
  }

  handleDownVote(event) {
    axios.post(`${url}/API/Vote`, {
      "BOOK_ID": this.props.results.BOOK_ID,
      "VOTE": "DOWN"
    })
      .then((res) => this.setState({ downVote: res.data.VOTES.DOWN }))
      .catch((err) => console.log(err));
  }

  render() {
    const book = this.props.results;
    let bookID = book.BOOK_ID;
    let bookTitle = book.TITLE;
    let bookAuthor = book.AUTHOR;
    let bookISBN = book.ISBN;
    let bookImage ='https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Clrs3.jpeg/220px-Clrs3.jpeg';
    let upVote = this.state.upVote;
    let downVote = this.state.downVote;

    return (
      <div className="searchResultContainer" key={bookID} >
        <div className="imageContainer">
          <img src={bookImage} alt=""/>
        </div>
        <div className="bookDetails">
          <div className="votes">
            <button onClick={this.handleUpVote} name="upVote" className="upVotes">
              <span role="img" aria-label="UpVote">👍</span> <span className="hover" aria-labelledby="UpVote">{upVote}</span>
            </button>
            <button onClick={this.handleDownVote} name="downVote" className="downVotes">
            <span role="img" aria-label="DownVote">👎</span> <span className="hover" aria-labelledby="DownVote">{downVote}</span>
            </button>
          </div>
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
};

export default SearchResult;
