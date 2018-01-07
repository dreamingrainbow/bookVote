import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authenticate } from '../../actions';

class LowerButtonStrip extends Component {
  constructor(){
    super()
    this.signOut = this.signOut.bind(this);
  }
  componentDidMount(){
    this.setState({user:this.props.user});
  }
  signOut(e){
    e.preventDefault();
    this.props.authenticate({username:null,token:null});
    this.setState({user:{username:null,token:null}});
    this.props.history.push('/');
  }
  render() {
    return (
      this.props.user.token === null ? 
      <div className = "LowerButtonStrip">
        <NavLink to="/" className="button" activeClassName="button--active"><p className="buttonText">Home</p></NavLink>
        <NavLink to="/SignUp" className="button" activeClassName="button--active"><p className="buttonText">SignUp</p></NavLink>
        <NavLink to="/SignIn" className="button" activeClassName="button--active"><p className="buttonText">SignIn</p></NavLink>
      </div>
      :
      <div className = "LowerButtonStrip">
        <NavLink to="/" className="button" activeClassName="button--active"><p className="buttonText">Home</p></NavLink>
        <NavLink to="/Add-A-Book" className="button" activeClassName="button--active"><p className="buttonText">Add Book</p></NavLink>
        <NavLink to="/SignOut" className="button" activeClassName="button--active" onClick={this.signOut}><p className="buttonText">SignOut</p></NavLink>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {user : state.user};
}
export function mapDispatchToProps(dispatch) {
  return bindActionCreators({authenticate}, dispatch);
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(LowerButtonStrip));