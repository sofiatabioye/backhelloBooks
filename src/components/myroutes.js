import React, { Component } from 'react';

import Login from './login';
import Books from './allbooks';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const HelloRoutes = () => (
          <div>
            <Switch>
              <Route path='/' exact component={Login} />
              <Route path='/allbooks' component={Books} />

            </Switch>
          </div>

    );


export default HelloRoutes;
