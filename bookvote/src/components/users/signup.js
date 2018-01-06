import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import url from '../../config';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user : props.user
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
  saveUser(e) {
    e.preventDefault();
    // create user variable to save to database
    const newUser = {
      USERNAME: this.state.username,
      PASSWORD: this.state.password
    };
    axios
      .post(`${url}/API/User`, newUser)
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
        <form className="form-signup" onSubmit={this.saveUser} >
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
            type="submit"
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
