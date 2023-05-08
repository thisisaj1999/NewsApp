import './App.css';

import React, { Component } from 'react';
import NavBar from './components/Navbar';
import News from './components/News';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      countryCode: 'in',
    };
  }

  handleCountryCode = (data) => {
    return this.setState({
      countryCode: data,
    });
  };

  render() {
    return (
      <>
        <NavBar currentCode={this.handleCountryCode} />
        <News countryCode={this.state.countryCode} />
      </>
    );
  }
}

export default App;
