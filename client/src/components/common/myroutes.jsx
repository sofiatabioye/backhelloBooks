import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import Authenticate from '../auth/auth.jsx';
import Books from '../books/allbooks.jsx';
import Borrowed from '../borrowed/borrowed.jsx';
import BookCat from '../books/bookcat.jsx';
import Password from '../auth/password.jsx';
import NotFound from './notfound.jsx';
import requireAuth from '../../helper/authenticate';
import GetBook from '../books/getbook.jsx';


const helloRoutes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Authenticate}/>
      <Route exact path="/books" component={requireAuth(Books)}/>
      <Route exact path="/book/show/:id" component={GetBook}/>
      <Route exact path="/books/genre/:title" component={requireAuth(BookCat)}/>
      <Route exact path="/signin" component={Authenticate}/>
      <Route exact path="/signup" component={Authenticate}/>
      <Route exact path="/forgotpassword" component={Password}/>
      <Route exact path="/changepassword" component={Password}/>
      <Route exact path="/books/borrowhistory" component={requireAuth(Borrowed)}/>
      <Route exact path="/api/v1/reset/:token" component={Password}/>
      <Route exact path="/books/borrowed" component={requireAuth(Borrowed)}/>
      <Route path="/*" component={NotFound}/>
    </Switch>
  </BrowserRouter>
);

export default helloRoutes;
