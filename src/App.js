import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/main.css';
import './css/bootstrap.css';
import './css/bootstrap-theme.css';
import Login from './components/login';
import HelloRoutes from './components/myroutes.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
     <div>
        <Login />
      
    </div>
    );
  }
}

export default App;
