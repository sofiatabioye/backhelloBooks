import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import ResetPasswordForm from './resetPasswordForm.jsx';
import { resetPassword } from '../../actions/authActions';

import validateInput from '../utils/validatePassword.jsx';

/**
 * 
 * 
 * @class Login
 * @extends {React.Component}
 */
class ResetPassword extends React.Component {
    /**
     * Creates an instance of Password.
     * @param {any} props 
     * @memberof Password
     */
    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            confirmPassword: '',
            errors: {},
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /**
     * 
     * @returns {void}
     * @param {any} e 
     * @memberof Password
     */
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    /**
     * 
     * 
     * @returns {validatedInput} validates form input
     * @memberof Password
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
     * @returns {Password} This submits password change form
     * @param {any} e 
     * @memberof Password
     */
    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.props.resetPassword({ password: this.state.newPassword }, this.props.match.params.token, this.props.history);
        }
    }

    /**
     * 
     * 
     * @returns {Form} for password change
     * @memberof Password
     */
    render() {
        return (
            <div>
                <ResetPasswordForm
                    errors={this.state.errors}
                    onChange = {this.onChange.bind(this)}
                    onSubmit = {this.onSubmit.bind(this)}
                    auth = {this.props.auth}
                />
            </div>
        );
    }
}

ResetPassword.prototypes = {
    changepassword: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    success: PropTypes.object.isRequired
};

ResetPassword.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { resetPassword })(ResetPassword);
