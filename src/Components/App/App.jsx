import React, { Component } from 'react';
import Routes from '../../Shared/Routes';
import NavBar from '../NavBar/NavBar.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Routes  />
      </div>
      
    );
  }
}

export default App;
