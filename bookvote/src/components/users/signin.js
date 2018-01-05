import React, { Component } from 'react';
import { axios } from 'axios';
import { withRouter, NavLink } from 'react-router-dom';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      username: ' ',
      password: ' '
    };

    this.handleInputusername = this.handleInputusername.bind(this);
    this.handleInputpassword = this.handleInputpassword.bind(this);
    this.signIn = this.signIn.bind(this);
  }
  handleInputusername(e) {
    this.setState({ username: e.target.value });
  }
  handleInputpassword(e) {
    this.setState({ password: e.target.value });
  }
  signIn() {
    axios
      .post('/signin', {
        username: this.state.username,
        password: this.state.password
      })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <form className="form-signup">
          <h2 className="form-signup-heading">Sign In</h2>
          <label for="inputUsername">User name</label>
          <input
            type="username"
            onChange={this.handleInputusername}
            id="inputUsername"
            className="form-control"
            placeholder="Username"
            required
          />

          <label for="inputPassword">Password</label>
          <input
            type="password"
            onChange={this.handleInputpassword}
            id="inputPassword"
            className="form-control"
            placeholder="Password"
            required
          />

          <button
            className="btn btn-lg btn-primary btn-block"
            onClick={this.signIn}
            type="button"
          >
            Sign in
          </button>
        </form>
        <div />
      </div>
    );
  }
}

export default withRouter(SignIn);
