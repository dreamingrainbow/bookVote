import React, { Component } from 'react';

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


class HomeHeader extends Component {
  render() {
    return (
      <div className="HomeHeader">
        <h1>Book Vote!</h1>
      </div>
    )
  }
}

class LowerButtonStrip extends Component {
  render() {
    return (
      <div className = "LowerButtonStrip">
        <div className="button"><p className="buttonText">Home</p></div>
        <div className="button"><p className="buttonText">Search</p></div>
        <div className="button"><p className="buttonText">Register</p></div>
        <div className="button"><p className="buttonText">Add</p></div>
      </div>
    )
  }
}

export default HomeNavBar;