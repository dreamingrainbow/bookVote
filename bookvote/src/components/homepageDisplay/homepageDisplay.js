import React, { Component } from 'react';
import { NavLink, withRouter} from 'react-router-dom';

class PageDisplay extends Component {
  render() {
    return (
      <div className="PageDisplay">
        <div className="pageContainer">
        </div>
      </div>
    )
  }
}

export default withRouter(PageDisplay);