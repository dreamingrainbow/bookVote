// Packages
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Switch, Route } from 'react-router-dom';

// Components
import PageDisplay from './components/homepageDisplay/homepageDisplay';
import HomeNavBar from './components/homeNavBar/homeNavBar';
import SignUp from './components/users/signup';
import SignIn from './components/users/signin';
import AddBook from './components/books/AddBook';

// Redux
import { authenticate } from './actions';

// CSS
import './App.css';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { user: this.props.user };
  }

  componentDidMount() {
    this.setState({ user: this.props.user });
  }

  render() {
    return (
      <div className="App">
        <HomeNavBar />
        {this.props.user.token === null ?
          <Switch>
            <Route exact path="/" component={PageDisplay} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/SignIn" component={SignIn} />
          </Switch>
           :
          <Switch>
            <Route exact path="/" component={PageDisplay} />
            <Route exact path="/Add-A-Book" component={AddBook} />
          </Switch>
        }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {user : state.user};
}
export function mapDispatchToProps(dispatch) {
  return bindActionCreators({authenticate}, dispatch);
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));