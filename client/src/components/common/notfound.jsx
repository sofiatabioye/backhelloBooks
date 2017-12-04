import React from 'react';
import { Navbar } from 'react-materialize';
import { Link } from 'react-router-dom';

const NotFound = (props) => (
  <div>
    <Navbar brand="HelloBooks" right>
      <li>
        <Link to="/books">Library</Link>
      </li>
    </Navbar>
    <div className="container">
      <h4>Oops, the page you're looking for doesn't exist </h4>
    </div>
  </div>
);

export default NotFound;
