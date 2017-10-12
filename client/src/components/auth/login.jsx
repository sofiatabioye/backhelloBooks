/* global gapi */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { login } from '../../actions/auth';
import validateInput from '../utils/validation.jsx';
import FlashMessagesList from '../flash/FlashMessagesList';
import LoginForm from './loginForm.jsx';
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
        this.onSubmit = this.onSubmit.bind(this);
        this.onSignIn = this.onSignIn.bind(this);
    }

    /**
     * 
     * @returns {any} google user information
     * @memberof Login
     */
    componentDidMount() {
        gapi.signin2.render('g-signin2', {
            scope: 'https://www.googleapis.com/auth/plus.login',
            width: 300,
            height: 150,
            longtitle: true,
            theme: 'dark',
            onsuccess: this.onSignIn
        });
    }

    /**
     * 
     * @return {any} googleUser
     * @param {any} googleUser 
     * @memberof Login
     */
    onSignIn(googleUser) {
        console.log("====yaay", googleUser);
        let profile = googleUser.getBasicProfile();
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
     * @returns {User} submits user login details
     * @param {any} event 
     * @memberof Login
     */
    onSubmit(event) {
        event.preventDefault();
        if (this.isValid()) {
            this.props.login(this.state, this.props.history);
        }
    }


    /**
     * 
     * 
     * @returns {Form} User login form
     * @memberof Login
     */
    render() {
        return (
            <div>
                <LoginForm
                    errors={this.props.errors}
                    onChange={this.onChange.bind(this)}
                    onSignIn= {this.onSignIn.bind(this)}
                    onSubmit={this.onSubmit.bind(this)} />

            </div>
        );
    }
}
const mapStateToProps = state => ({
    errors: state.auth.errors,
    auth: state.auth
});

export default connect(mapStateToProps, { login, FlashMessagesList })(Login);
