 import React from 'react';
import '../../App.css';
import '../../css/main.css';
import '../../css/bootstrap.css';
import '../../css/bootstrap-theme.css';

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
            <a className="navbar-brand" href="index.html">HelloBooks</a>
          </div>
        
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <form className="navbar-form navbar-left navbar-search">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search" />
              </div>
            </form>
            <ul className="nav navbar-nav navbar-right">
            <li><a href="#">{props.homeLink}</a></li>
              <li><a href="#">Children</a></li>
              <li><a href="#">IT</a></li>
              <li><a href="#">Education</a></li>
              <li><a href="#">Business</a></li>
              <li><a href="#">Cooking</a></li>
              <li><a href="#">Religion</a></li>
              <li><a href="#">Career</a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">More Categories<span className="caret" /></a>
                <ul className="dropdown-menu">
                  <li><a href="#">Women</a></li>
                  <li><a href="#">Love</a></li>
                  <li><a href="#">Fiction</a></li>
                  <li><a href="#">Autobiographies</a></li>
                  <li><a href="#">Adventure</a></li>
                </ul>
              </li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img className="usr-img" /><span className="caret" /></a>
                <ul className="dropdown-menu">
                  <li><a href="profile.html">My Profile</a></li>
                  <li><a href="history.html">Rent History</a></li>
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
