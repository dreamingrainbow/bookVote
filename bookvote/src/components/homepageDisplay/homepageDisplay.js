import React, { Component } from 'react';

class PageDisplay extends Component {
  render() {
    return (
      <div className="PageDisplay">
        <div className="pageContainer">
          <div className="doubleImageStrip">
            <div className="imageBox" id="books"></div>
            <div className="imageBox" id="bookSearch"></div>
          </div>
          <div className="doubleImageStrip">
            <div className="imageBox" id="heapsOfBooks"></div>
            <div className="imageBox" id="mentalHealth"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default PageDisplay;