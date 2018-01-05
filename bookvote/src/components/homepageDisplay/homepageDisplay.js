import React, { Component } from 'react';

class PageDisplay extends Component {
  render() {
    return (
      <div className="PageDisplay">
        <div className="pageContainer">
          <div className="doubleImageStrip">
            <div className="imageBox"></div>
            <div className="imageBox"></div>
          </div>
          <div className="doubleImageStrip">
            <div className="imageBox"></div>
            <div className="imageBox"></div>
          </div>
        </div>
      </div>
    )
  }
}

export default PageDisplay;