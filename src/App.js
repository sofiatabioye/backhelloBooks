import React, { Component } from 'react';
import './App.css';
import './css/main.css';
import './css/bootstrap.css';
import './css/bootstrap-theme.css';
import Login from './components/login';
import Books from './components/allbooks';
import SingleBook from './components/singlebook';
import Profile from './components/profile';
import EditBook from './components/allbooks';
import UserHistory from './components/history';
import AdminBooks from './components/admin';
import AddBook from './components/addbook';
import NotFound from './components/notfound';
import Header from './components/Header/header';

import {Switch, Router, Route , BrowserRouter} from 'react-router-dom';

class App extends Component {
 
  render() {
   
    return (
     <div>
       
        <BrowserRouter> 
          <Switch>
    <Route exact path="/" component={Login}/>
    <Route path="/books"  component={Books}/>
    <Route path="/login" component={Login}/>
    <Route path="/admin" component={AdminBooks}/>
    <Route path="/addbook" component={AddBook}/>
    <Route path="/editbook" component={EditBook}/>
    <Route path="/history" component={UserHistory}/>
    <Route path="/profile" component={Profile}/>
    <Route path="/singlebook" component={SingleBook}/>
    {/* <Route path="*" component={NotFound}/> */}
    </Switch>
  </BrowserRouter>
       
    </div>
    ); 
  }

   }

export default App;
