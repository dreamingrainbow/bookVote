import React, { Component } from 'react';
import './App.css';
import './index.css';
import HomeNavBar from './components/homeNavBar/homeNavBar';
import PageDisplay from './components/homepageDisplay/homepageDisplay';


class App extends Component {
  render() {
    return (
      <div className="App">
        <HomeNavBar />
        <PageDisplay />
      </div>
    );
  }
}

export default App;
