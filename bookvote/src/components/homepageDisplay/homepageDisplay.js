import React, { Component } from 'react';
import { NavLink, withRouter} from 'react-router-dom';
import Search from '../search/Search';

class PageDisplay extends Component {
  render() {
    return (
      <div className="PageDisplay">
        <div className="pageContainer">
          <Search />
        </div>
      </div>
    )
  }
}

export default withRouter(PageDisplay);