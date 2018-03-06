import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Dashboard from './views/dashboard';
import StateSelect from './components/states-select';
import data from './data/pop_data.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentState: 'GA'
    }
    this.handleStateChange = this.handleStateChange.bind(this);
  }

  handleStateChange(event) {
    event.preventDefault();
    this.setState({currentState: event.target.value});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React-D3 Dashboard</h1>
          <StateSelect currentState={this.state.currentState} onChange={this.handleStateChange} />
        </header>
        <Dashboard usState={this.state.currentState} selectedCounty="13135" data={data} />
        <footer className="text-center">
          <p>Data source: U.S. Census Bureau</p>
        </footer>
      </div>
    );
  }
}

export default App;
