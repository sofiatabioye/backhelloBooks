import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import PasswordForm from './passwordForm.jsx';
import { changepassword } from '../../actions/authActions';

import validateInput from '../utils/validatePassword.jsx';

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
        console.log(this.props.auth.user.user);
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
                    errors={this.state.errors}
                    user = {this.props.user}
                    onChange = {this.onChange.bind(this)}
                    onSubmit = {this.onSubmit.bind(this)}
                    auth = {this.props.auth}
                    categories={this.props.categories}
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
    user: state.auth,
    categories: state.categories.categories.categories
});

export default connect(mapStateToProps, { changepassword })(Password);
