import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './views/dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React-D3 Dashboard</h1>
        </header>
        <main>
          <Dashboard />
        </main>
        <footer className="text-center">
          <p>Data source: U.S. Census Bureau</p>
        </footer>
      </div>
    );
  }
}

export default App;
