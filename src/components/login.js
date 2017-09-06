import React from 'react';
import Books from './allbooks';

 const Login = React.createClass({
   render: function() {
     return (
     <div>
       <nav className="navbar navbar-inverse navbar-me">
         <div className="container-fluid">
           <div className="navbar-header">
             <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
               <span className="sr-only">Toggle navigation</span>
               <span className="icon-bar" />
               <span className="icon-bar" />
               <span className="icon-bar" />
             </button>
             <a className="navbar-brand" href="#">HelloBooks</a>
           </div>
           <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
             <div className="navbar-me">
               <ul className="nav navbar-nav navbar-right">
                 <li><a href="#">DONT HAVE AN ACCOUNT? Sign Up</a></li>
               </ul>
             </div>
           </div>
         </div>
       </nav>

       <div className="login-box" method="GET" action="#">
          <form className="login-form form-responsive">
            <label className="signin"><h3>Sign In</h3></label>
            <div className="form-group">
              <label htmlFor="usr">Email/Username</label>
              <input type="textbox" name="email" placeholder="Email/Username" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password</label>
              <input type="password" name="password" placeholder="Password" className="form-control" />
            </div>


            <a href="/allbooks" className="btn btn-lg btn-me">Sign In </a><div><a href="#">Forgot Password?</a></div>
          </form>
        </div>
        <nav className="navbar navbar-inverse navbar-fixed-bottom">
          <div className="container">
            © HelloBooks. All Rights Reserved. Privacy Policy • Terms of Use
          </div>
        </nav>
      </div>
     );
   }
 });

export default Login;
