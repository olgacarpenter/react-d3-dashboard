import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './views/dashboard';
import data from './data/all_states_dummy_data.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React-D3 Dashboard</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Dashboard usState="GA" selectedCounty="13135" data={data} onCountyClick={() => alert("you clicked a county")} />
      </div>
    );
  }
}

export default App;
