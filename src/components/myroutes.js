import React, { Component } from 'react';
import Login from './login';
import Books from './allbooks';
import SingleBook from './singlebook';
import Profile from './profile';
import EditBook from './allbooks';
import UserHistory from './history';
import AdminBooks from './admin';
import AddBook from './addbook';
import Header from './Header/header';
import {Switch, Router, Route , BrowserRouter} from 'react-router-dom';

const HelloRoutes = () => (
  <BrowserRouter> 
  <Switch>
<Route path="/books"  component={Books}/>
<Route path="/login" component={Login}/>
<Route path="/admin" component={AdminBooks}/>
<Route path="/addbook" component={AddBook}/>
<Route path="/editbook" component={EditBook}/>
<Route path="/history" component={UserHistory}/>
<Route path="/profile" component={Profile}/>
<Route path="/singlebook" component={SingleBook}/>

</Switch>
</BrowserRouter>
  );


export default HelloRoutes;
