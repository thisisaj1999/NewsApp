import './App.css';

import React, { Component } from 'react';
import NavBar from './components/Navbar';
import News from './components/News';

export class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <News />
      </>
    );
  }
}

export default App;
