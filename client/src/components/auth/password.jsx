import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import PasswordForm from './passwordForm.jsx';
import { changepassword } from '../../actions/authActions';

import validateInput from '../utils/validatePassword.jsx';
import { addFlashMessage } from '../../actions/flashmessages';
import FlashMessagesList from '../flash/FlashMessagesList';

/**
 * 
 * 
 * @class Login
 * @extends {React.Component}
 */
class Password extends React.Component {
    /**
     * Creates an instance of Password.
     * @param {any} props 
     * @memberof Password
     */
    constructor(props) {
        super(props);
        this.state = {
            password: '',
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
            this.props.changepassword(this.state, this.props.auth.user.user);
        }
    }

    /**
     * 
     * 
     * @returns {Form} for password change
     * @memberof Password
     */
    render() {
        const error = this.props.error ? this.props.error.message : "";
        const success = this.props.success ? this.props.success : "";
        return (
            <div>
                <PasswordForm
                    success = {success}
                    error = {error}
                    errors = {this.state.errors}
                    onChange = {this.onChange.bind(this)}
                    onSubmit = {this.onSubmit.bind(this)}
                    auth = {this.props.auth}
                />
            </div>
        );
    }
}

Password.prototypes = {
    changepassword: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    success: PropTypes.object.isRequired
};

Password.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.auth.errors,
    success: state.auth.success
});

export default connect(mapStateToProps, { changepassword, FlashMessagesList, addFlashMessage })(Password);
