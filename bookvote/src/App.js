import React, { Component } from 'react';
import './App.css';
import HomeNavBar from './components/homeNavBar/homeNavBar';
import HomePageDisplay from './components/homepageDisplay/homepageDisplay';


class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeNavBar />
        <HomePageDisplay />
      </div>
    );
  }
}

export default App;
