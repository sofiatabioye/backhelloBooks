import React from 'react';
import { Navbar, NavItem } from 'react-materialize';
import { Link } from 'react-router-dom';

import Footer from '../footer/footer.jsx';


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
        <Footer />
    </div>
);

export default NotFound;
