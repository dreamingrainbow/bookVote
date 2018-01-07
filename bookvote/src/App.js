import React, { Component } from 'react';
import './App.css';
import './index.css';
import HomeNavBar from './components/homeNavBar/homeNavBar';
import { withRouter, Switch, Route } from 'react-router-dom'; 
import SignUp from './components/users/signup';
import SignIn from './components/users/signin';
import PageDisplay from './components/homepageDisplay/homepageDisplay';
import AddBook from './components/books/AddBook';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authenticate } from './actions';
import { Categories } from './components/search/Categories';
import SearchResult from './components/search/SearchResult';
class App extends Component {
  constructor(props) {    
    super(props)
    this.state = {user:props.user};
  }
  componentDidMount(){
    this.setState({user:this.props.user});
  }
  render() {
    return (
      <div className="App">
        <HomeNavBar />
        { this.props.user.token === null ?
          <Switch>
            <Route path="/" component={PageDisplay} exact />
            <Route path="/SignUp" component={SignUp} exact />
            <Route path="/SignIn" component={SignIn} exact />
            {
              Categories.map((category) => <Route path={category.path} component={PageDisplay} key={category.path} exact/>)
            }
          </Switch>
           :
          <Switch>
            <Route path="/" component={PageDisplay} exact/>
            <Route path="/Add-A-Book" component={AddBook} exact />
            {
              Categories.map((category) => <Route path={category.path} component={PageDisplay} key={category.path} exact/>)
            }
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