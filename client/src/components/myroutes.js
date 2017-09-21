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

import requireAuth from '../helper/authenticate';
import requireAdmin from '../helper/adminAuth';

const helloRoutes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/books" component={requireAuth(Books)}/>
            <Route exact path="/books/categories" component={requireAuth(Category)}/>
            <Route exact path="/books/:title/:id" component={requireAuth(BookCat)}/>
            <Route exact path="/librarybooks" component={requireAuth(LibraryBooks)}/>
            <Route exact path="/signin" component={Login}/>
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path="/addbook" component={AddBook}/>
            <Route exact path="/editbook" component={EditBook}/>
            <Route exact path="/history" component={UserHistory}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/editbook/:id" component={EditBook} />
            <Route exact path="/book/:id" component={SingleBook} />
        </Switch>
    </BrowserRouter>
);

export default helloRoutes;
