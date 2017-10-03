import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Login from './login';
import SignUp from './signup';
import Books from './allbooks';
import LibraryBooks from './adminbooks';
import SingleBook from './singlebook';
import Profile from './profile';
import UserHistory from './history';
import Category from './categories';
import AddBook from './addbook';
import EditBook from './editbook';
import BookCat from './bookcat';
import Password from './password';

import requireAuth from '../helper/authenticate';
import requireAdmin from '../helper/adminAuth';

const helloRoutes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/books" component={requireAuth(Books)}/>
            <Route exact path="/books/categories" component={requireAuth(Category)}/>
            <Route exact path="/books/:title/:id" component={requireAuth(BookCat)}/>
            <Route exact path="/librarybooks" component={requireAdmin(LibraryBooks)}/>
            <Route exact path="/signin" component={Login}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/changepassword" component={Password}/>
            <Route exact path="/addbook" component={requireAdmin(AddBook)}/>
            <Route exact path="/editbook" component={requireAdmin(EditBook)}/>
            <Route exact path="/history" component={requireAuth(UserHistory)}/>
            <Route exact path="/profile" component={requireAuth(Profile)}/>
            <Route exact path="/editbook/:id" component={requireAdmin(EditBook)} />
            <Route exact path="/book/:id" component={requireAuth(SingleBook)} />
        </Switch>
    </BrowserRouter>
);

export default helloRoutes;
