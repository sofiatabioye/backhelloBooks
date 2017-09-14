import React, { Component } from 'react';
import { Switch, Router, Route, BrowserRouter } from 'react-router-dom';
import Login from './login';
import SignUp from './signup';
import Books from './allbooks';
import LibraryBooks from './adminbooks';
import SingleBook from './singlebook';
import Profile from './profile';
import UserHistory from './history';

import AddBook from './addbook';
import EditBook from './editbook';
import Header from './Header/header';


import requireAuth from '../helper/authenticate';
import requireAdmin from '../helper/adminAuth';

const helloRoutes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/books" component={requireAuth(Books)}/>
            <Route path="/librarybooks" component={requireAuth(LibraryBooks)}/>
            <Route path="/signin" component={Login}/>
            <Route path="/signup" component={SignUp}/>
            <Route path="/addbook" component={AddBook}/>
            <Route exact path="/editbook" component={EditBook}/>
            <Route path="/history" component={UserHistory}/>
            <Route path="/profile" component={Profile}/>
            <Route exact path= "/editbook/:id" component={EditBook} />
            <Route exact path= "/book/:id" component={SingleBook} />
        </Switch>
    </BrowserRouter>
);

export default helloRoutes;
