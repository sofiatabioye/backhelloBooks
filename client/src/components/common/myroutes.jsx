import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Login from '../auth/login.jsx';
import ForgotPassword from '../auth/forgotPassword.jsx';
import SignUp from '../auth/signup.jsx';
import Books from '../books/allbooks.jsx';
import LibraryBooks from '../books/adminbooks.jsx';
import Profile from './profile.jsx';
import UserHistory from './history.jsx';
import Category from '../categories/categories.jsx';
import AddBook from '../books/addbook.jsx';
import EditBook from '../books/editbook.jsx';
import BookCat from '../books/bookcat.jsx';
import Password from '../auth/password.jsx';
import NotFound from './notfound.jsx';
import Home from '../header/header2.jsx';
import requireAuth from '../../helper/authenticate';
import requireAdmin from '../../helper/adminAuth';

const helloRoutes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/books" component={Books}/>
            <Route exact path="/books/categories" component={requireAuth(Category)}/>
            <Route exact path="/books/:title" component={requireAuth(BookCat)}/>
            <Route exact path="/librarybooks" component={requireAdmin(LibraryBooks)}/>
            <Route exact path="/signin" component={Login}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/forgotpassword" component={ForgotPassword}/>
            <Route exact path="/changepassword" component={Password}/>
            <Route exact path="/addbook" component={requireAdmin(AddBook)}/>
            <Route exact path="/editbook" component={requireAdmin(EditBook)}/>
            <Route exact path="/history" component={requireAuth(UserHistory)}/>
            <Route exact path="/profile" component={requireAuth(Profile)}/>
            <Route exact path="/editbook/:id" component={requireAdmin(EditBook)} />
            <Route path="/*" component={NotFound}/>
        </Switch>
    </BrowserRouter>
);

export default helloRoutes;
