import React from 'react';
import './SearchResult.css';

const SearchResult = props => {
  const book = props.results;
  let bookTitle = book.TITLE;
  let bookAuthor = book.AUTHOR;
  let bookISBN = book.ISBN;
  let bookImage ='https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Clrs3.jpeg/220px-Clrs3.jpeg';
  let upVote = book.VOTES.UP;
  let downVote = book.VOTES.DOWN;

  return (
    <div className="searchResultContainer">
      <div className="imageContainer">
        <img src={bookImage} alt=""/>
      </div>
      <div className="bookDetails">
        <div className="votes">
          <button className="upVotes">
            <span role="img" aria-label="UpVote">👍</span> <span className="hover" aria-labelledby="UpVote">{upVote}</span>
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
};

export default SearchResult;
