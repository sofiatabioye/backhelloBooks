import React from 'react';
import Header from './Header/header';
import Footer from './Footer/footer';
import HelloRoutes from './myroutes';
import {login} from '../actions/auth';
import {connect} from 'react-redux';
 class Login extends React.Component{
  constructor (props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.login(this.state);
  }
   render() {
     return (
     <div>
      <Header />
       
       <div className="login-box" method="GET" action="#">
          <form onSubmit= {this.onSubmit} className="login-form form-responsive">
            <label className="signin"><h3>Sign In</h3></label>
            <div className="form-group">
              <label htmlFor="usr">Email/Username</label>
              <input type="textbox" value={this.state.username} onChange={this.onChange} name="username" placeholder="Email/Username" className="form-control" />
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password</label>
              <input type="password" value={this.state.password} onChange={this.onChange} name="password" placeholder="Password" className="form-control" />
            </div>
    
            <input type="submit" value="Sign In" className="btn btn-lg btn-me" /><div><a href={"/"}>Forgot Password?</a></div>
          </form>
        </div>
       <Footer />
      </div>
     );
   }
 }


export default connect(null, { login })(Login);
