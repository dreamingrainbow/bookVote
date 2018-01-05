import React, { Component } from 'react';
import axios from 'axios';
import './SearchResult.css';

const SearchResult = (props) => {
  console.log(props.results)
  const book = props.results;
  let bookTitle = book.TITLE;
  let bookAuthor = book.AUTHOR;
  let bookISBN = book.ISBN;
  let bookImage = 'https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Clrs3.jpeg/220px-Clrs3.jpeg';
  let upVote = book.VOTES.UP;
  let downVote = book.VOTES.DOWN;

  return (
    <div className="searchResultContainer">
      <div className="imageContainer"><img src={bookImage} /></div>
      <div className="bookDetails">
        <div className="votes">
          <a href="#" className="upVotes">👍 <span className="hover">{upVote}</span></a>
          <a href="#" className="downVotes">👎 <span className="hover">{downVote}</span></a>
        </div>
        <span className="bookTitle">{bookTitle}</span><br />
        <span className="bookAuthor"><span style={{fontWeight: 700}}>Authors:</span> {bookAuthor}</span><br />
        {/* <span className="bookAuthor"><span style={{fontWeight: 700}}>Authors:</span> {bookAuthor.reduce((prev, curr) => [prev, ', ', curr])}</span><br /> */}
        <span className="bookISBN"><span style={{fontWeight: 700}}>ISBN:</span> {bookISBN}</span><br />
      </div>
    </div>
  );
};

export default SearchResult;
