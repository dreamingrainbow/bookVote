import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';

class LowerButtonStrip extends Component {
  render() {
    return (
      <div className = "LowerButtonStrip">
        <NavLink to="/" className="button" activeClassName="button--active"><p className="buttonText">Home</p></NavLink>
        <NavLink to="/SignUp" className="button" activeClassName="button--active"><p className="buttonText">SignUp</p></NavLink>
        <NavLink to="/SignIn" className="button" activeClassName="button--active"><p className="buttonText">SignIn</p></NavLink>
      </div>
    )
  }
}

export default withRouter(LowerButtonStrip);