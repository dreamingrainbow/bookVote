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
import { Categories } from './components/search/Categories';
// CSS
import './App.css';
import './index.css';
// Actions
import { authenticate, setCategory, setSubcategory } from './actions';
class App extends Component {
  componentDidMount(){
    this.pathSplit = this.props.history.location.pathname.split('/')
    if(this.pathSplit.length > 2) {
      this.pathSplit.shift();
      this.category = Categories.filter(_category => '/'+this.pathSplit[0] === _category.path).pop();
      if(this.category.name !== this.props.category){
        if(this.pathSplit.length > 1) {  
          this.subcategory = this.category.subcategories.filter(_subcategory => '/'+this.pathSplit[1] === _subcategory.path).pop();
          if(this.subcategory !== undefined && this.subcategory.name !== this.props.subcategory){
            this.category = (this.props.setCategory(this.category.name)).payload;
            this.subcategory = (this.props.setSubcategory(this.subcategory.name)).payload; 
          } else {
            this.category = (this.props.setCategory(this.category.name)).payload;
            this.subcategory = null; 
          }    
        } else {
          this.category = (this.props.setCategory(this.category.name)).payload;
        }
      } else{
        this.category = (this.props.setCategory(this.props.category)).payload;
        this.subcategory = (this.props.setSubcategory(this.props.subcategory)).payload;
      }            
    } else {
      this.category = (this.props.setCategory(this.props.category)).payload;
      this.subcategory = (this.props.setSubcategory(this.props.subcategory)).payload;
    }
    this.setState({user:this.props.user,category:this.category,subcategory:this.subcategory});
  }

  render() {
    if(this.props.category) {
      this.category = (Categories.filter(category => this.props.category === 'All' || this.props.category === category.name)).pop();
      if(this.props.subcategory) {
        this.subcategories = this.category.subcategories;
      }    
    }

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
            <Route path="/" component={PageDisplay} exact/>
            <Route path="/Add-A-Book" component={AddBook} exact />
          </Switch>
        }   
        {
          Categories.map((category) => <Route path={category.path} component={PageDisplay} key={category.path} exact/>)
        }
        {
          this.subcategories ? this.subcategories.map(
            s => <Route path={this.category.path + s.path} component={PageDisplay} key={this.category.path + s.path} exact />
          ) : null
        }     
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    user : state.user,
    category:state.category,
    subcategory: state.subcategory
  };
}
export function mapDispatchToProps(dispatch) {
  return bindActionCreators({authenticate, setCategory, setSubcategory}, dispatch);
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));