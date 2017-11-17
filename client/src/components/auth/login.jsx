/* global gapi */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signup, login } from '../../actions/authActions';
import validateInput from '../utils/validation.jsx';
import validateSignUpInput from '../utils/validateSignUp';
import Home from '../header/header2.jsx';
/**
 * 
 * 
 * @class Login
 * @extends {React.Component}
 */
class Login extends React.Component {
    /**
     * Creates an instance of Login.
     * @param {any} props 
     * @memberof Login
     */
    constructor(props) {
        super(props);
        this.state = {
            identifier: '',
            password: '',
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
     * @returns {validatedInput} Validates form input
     * @memberof Login
     */
    isValid() {
        const { errors, isValid } = validateInput(this.state);
        if (!isValid) {
            this.setState({ errors });
            return;
        }
        return isValid;
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
        if (this.isValid()) {
            this.props.login(this.state, this.props.history);
        }
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
        return (
            <div>

                <Home
                    isLoggedIn = {isLoggedIn}
                    errors={this.props.errors}
                    onChange={this.onChange.bind(this)}
                    onSignUp ={this.onSignUp.bind(this)}
                    onSignIn={this.onSignIn.bind(this)} />
            </div>
        );
    }
}
const mapStateToProps = state => ({
    errors: state.auth.errors,
    auth: state.auth
});

export default connect(mapStateToProps, { login, signup })(Login);
