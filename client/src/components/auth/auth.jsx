import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { signup, login } from '../../actions/authActions';
import validateSignUpInput from '../utils/validateSignUp';
import Home from './authForm.jsx';

const propTypes = {
  login: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  history: PropTypes.element.isRequired
};
/**
 * 
 * 
 * @class Login
 * @extends {React.Component}
 */
class Authenticate extends React.Component {
  /**
     * Creates an instance of Login.
     * @param {any} props 
     * @memberof Login
     */
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      identifier: '',
      username: '',
      password: '',
      confirmPassword: '',
      errors: {},
      isLoading: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  /**
     * 
     * @returns {void}
     * @param {any} event
     * @memberof Login
     */
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  /**
     * 
     * 
     * @returns {validatedInput} validates form input
     * @memberof SignUp
     */
  isSignUpValid() {
    const { errors, isValid } = validateSignUpInput(this.state);
    if (!isValid) {
      this.setState({ errors });
      return;
    }
    return isValid;
  }


  /**
     * 
     * @returns {User} submits user login details
     * @param {any} event 
     * @memberof Login
     */
  onSignIn(event) {
    event.preventDefault();
    this.props.login({ email: this.state.email, password: this.state.password }, this.props.history);
  }

  /**
     * 
     * @returns {User} submits user login details
     * @param {any} event 
     * @memberof Login
     */
  onSignUp(event) {
    event.preventDefault();
    if (this.isSignUpValid()) {
      this.props.signup(this.state, this.props.history);
    }
  }
  /**
     * 
     * 
     * @returns {Form} User login form
     * @memberof Login
     */
  render() {
    const isLoggedIn = this.props.auth.isAuthenticated;
    return isLoggedIn ? <Redirect to="/books" /> : (
      <div>
        <Home
          isLoggedIn = {isLoggedIn}
          errors={this.state.errors}
          onChange={this.onChange.bind(this)}
          onSignUp ={this.onSignUp.bind(this)}
          onSignIn={this.onSignIn.bind(this)} />
      </div>
    );
  }
}

Authenticate.propTypes = propTypes;

const mapStateToProps = state => ({
  auth: state.auth
});
const mapDispatchToProps = { login, signup };

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);
