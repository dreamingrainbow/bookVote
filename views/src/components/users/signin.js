import React, { Component } from 'react';
import axios  from 'axios';
import { withRouter } from 'react-router-dom';
import url from '../../config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authenticate } from '../../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.handleInputusername = this.handleInputusername.bind(this);
    this.handleInputpassword = this.handleInputpassword.bind(this);
    this.signIn = this.signIn.bind(this);
  }
  componentDidMount(){
    this.setState({user:this.props.user});
  }
  handleInputusername(e) {
    this.setState({ username: e.target.value });
  }

  handleInputpassword(e) {
    this.setState({ password: e.target.value });
  }

  async signIn(e) {
    e.preventDefault();
    const login = await axios.post(`${url}/API/User/login`, { username: this.state.username, password:this.state.password })
    if (login.status === 200) {
      this.props.authenticate({ username: login.data.username, token: "Valid Login" })
      this.props.history.push('/', this.state)
    }
    else
      this.setState({ user: { username: null, token: null }, error: '400' })
  }

  render() {
    return (
      <div>
      {this.state && this.state.error ? <div className="alert alert--error"><strong>Error</strong> {this.state.error}</div> : ''}
        <form className="form-signup" onSubmit={this.signIn}>
          <h2 className="form-signup-heading">Sign In</h2>
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
            Sign in
          </button>
        </form>
        <div />
      </div>
    );
  }
}


const mapStateToProps = (state, props) => {
  return {user : state.user};
}
export function mapDispatchToProps(dispatch) {
  return bindActionCreators({authenticate}, dispatch);
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SignIn));