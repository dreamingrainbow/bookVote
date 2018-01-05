import React, { Component } from 'react';
import HomeHeader from './HomeHeader';
import LowerButtonStrip from './LowerButtonStrip';

class HomeNavBar extends Component {
  render() {
    return (
      <div className="HomeNavBarContainer">
        <HomeHeader />
        <LowerButtonStrip />
      </div>
    )
  }
}

export default HomeNavBar;