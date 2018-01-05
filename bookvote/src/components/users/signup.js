import React, { Component } from 'react';
import { axios } from 'axios';
import { withRouter} from 'react-router-dom';
//import SignIn from './sign-in/signin.js';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: ' ',
      password: ' '
    };

    this.handleInputusername = this.handleInputusername.bind(this);
    this.handleInputpassword = this.handleInputpassword.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }
  handleInputusername(e) {
    this.setState({ username: e.target.value });
  }
  handleInputpassword(e) {
    this.setState({ password: e.target.value });
  }
  saveUser() {
    // create user variable if saving to a database
    // const newUser = {username: this.state.username, password: this.state.password};
    //**need to see where this goes to on the serverside**
    axios
      .post('/User', {
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
          <h2 className="form-signup-heading">Sign Up to Register</h2>
          <label htmlFor="inputUsername">User name</label>
          <input
            type="username"
            onChange={this.handleInputusername}
            id="inputUsername"
            className="form-control"
            placeholder="Username"
            required
          />

          <label htmlFor="inputPassword">Password</label>
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
            onClick={this.signUp}
            type="button"
          >
            Sign up
          </button>
        </form>
        <div />
      </div>
    );
  }
}

export default withRouter(SignUp);
