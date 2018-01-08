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
    let error= [];
    if(this.state.username.length < 8) {
      error.push({status:'Error',message:'Seems to be an issue with your SignUp process. Please try a longer username.'});
    }

    if(this.state.password.length < 8) {
      error.push({status:'Error',message:'Seems to be an issue with your SignUp process. Please try a longer password.'});
    }
    if(error.length === 0) {
      const newUser = {
        USERNAME: this.state.username,
        PASSWORD: this.state.password
      };
      axios
        .post(`${url}/API/User`, newUser)
        .then((response) => {
          console.log(response);
          this.setState({status:'Success',message:'Account created please SignIn'});
          this.props.history.push('/SignIn');
        })
        .catch((err) => {
          error.push({status:'Error',message:'Seems to be an issue with your SignUp process. Please try again.'});
          this.setState({error:error});
        });      
    } else {
      this.setState({error:error});
    }
  }

  render() {
    return (
      <div>
        <form className="form-signup" onSubmit={this.saveUser} >
          <h2 className="form-signup-heading">Sign Up to Register</h2>
          {this.state.error ? this.state.error.map((error, i) => <div key={i}><strong>{error.status}</strong>{error.message}</div>) : null}
          {this.state.status ? <div ><strong>{this.state.status}</strong>{this.state.message}</div> : null}
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
