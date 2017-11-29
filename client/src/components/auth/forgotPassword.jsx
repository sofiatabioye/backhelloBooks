/* global gapi */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { forgotPassword } from '../../actions/authActions';
import ForgotPasswordForm from './forgotPasswordForm.jsx';
/**
 * 
 * 
 * @class Login
 * @extends {React.Component}
 */
class ForgotPassword extends React.Component {
    /**
     * Creates an instance of Login.
     * @param {any} props 
     * @memberof Login
     */
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
     * @returns {User} submits user login details
     * @param {any} event 
     * @memberof Login
     */
    onSubmit(event) {
        event.preventDefault();
        this.props.forgotPassword(this.state);
    }


    /**
     * 
     * 
     * @returns {Form} User login form
     * @memberof Login
     */
    render() {
        const errors = this.props.error ? this.props.error : "";
        return (
            <div>
                <ForgotPasswordForm
                    errors ={errors}
                    onChange={this.onChange.bind(this)}
                    onSubmit={this.onSubmit.bind(this)}
                />

            </div>
        );
    }
}
const mapStateToProps = state => ({
    errors: state.auth.errors
});

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);
