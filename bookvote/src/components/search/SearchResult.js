import React, { Component } from 'react';
import axios from 'axios';
import './SearchResult.css';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upVote: null,
      downVote: null,
      response: null
    };

    this.handleVote = this.handleVote.bind(this);
  }

  handleVote(event) {
    axios.post('http://localhost:3333/API/Vote', {
      "BOOK_ID": "bookID",
      "VOTE": "UP"
    })
      .then((res) => console.log(res.data.VOTES.UP)
      ).catch((err) => console.log(err));
  }

  render() {
    const book = this.props.results;
    let bookID = book.BOOK_ID;
    let bookTitle = book.TITLE;
    let bookAuthor = book.AUTHOR;
    let bookISBN = book.ISBN;
    let bookImage ='https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Clrs3.jpeg/220px-Clrs3.jpeg';
    let upVote = book.VOTES.UP;
    let downVote = book.VOTES.DOWN;

    console.log(this.state.response);
    return (
      <div className="searchResultContainer">
        <div className="imageContainer">
          <img src={bookImage} alt=""/>
        </div>
        <div className="bookDetails">
          <div className="votes">
            <button className="upVotes">
              <a href="#" onClick={this.handleVote}><span role="img" aria-label="UpVote">👍</span> <span className="hover" aria-labelledby="UpVote">{upVote}</span></a>
            </button>
            <button className="downVotes">
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
