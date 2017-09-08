import React from 'react';
import '../../css/main.css';
import '../../css/bootstrap.css';
import '../../css/bootstrap-theme.css';
import {Link } from 'react-router-dom';

export const Header = (props) => {
  
    return (
     <div>
        <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button>
            <Link className="navbar-brand" to="/">HelloBooks</Link>
          </div>
        
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <form className="navbar-form navbar-left navbar-search">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search" />
              </div>
            </form>
            <ul className="nav navbar-nav navbar-right">
            <li><Link to="/books">Children</Link></li>
              <li><Link to="#">IT</Link></li>
              <li><Link to="#">Education</Link></li>
              <li><Link to="#">Business</Link></li>
              <li><Link to="#">Cooking</Link></li>
              <li><Link to="#">Religion</Link></li>
              <li><Link to="#">Career</Link></li>
              <li className="dropdown">
                <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">More Categories<span className="caret" /></Link>
                <ul className="dropdown-menu">
                  <li><Link to="#">Women</Link></li>
                  <li><Link to="#">Love</Link></li>
                  <li><Link to="#">Fiction</Link></li>
                  <li><Link to="#">Autobiographies</Link></li>
                  <li><Link to="#">Adventure</Link></li>
                </ul>
              </li>
              <li className="dropdown">
                <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img className="usr-img" /><span className="caret" /></Link>
                <ul className="dropdown-menu">
                  <li><Link to="/profile">My Profile</Link></li>
                  <li><Link to="/history">Rent History</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
 
);
};

export default Header;
