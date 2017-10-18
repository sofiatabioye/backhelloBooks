import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signup } from '../../actions/auth';
import validateSignUpInput from '../utils/validateSignUp.jsx';
import { addFlashMessage } from '../../actions/flashmessages';
import FlashMessagesList from '../flash/FlashMessagesList';
import SignupForm from './signupForm.jsx';
/**
 * 
 * 
 * @class Login
 * @extends {React.Component}
 */
class SignUp extends React.Component {
    /**
     * Creates an instance of SignUp.
     * @param {any} props 
     * @memberof SignUp
     */
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            confirm_password: '',
            image: '',
            level: 'silver',
            role: 'user',
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
     * @memberof SignUp
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
    isValid() {
        const { errors, isValid } = validateSignUpInput(this.state);
        if (!isValid) {
            this.setState({ errors });
            return;
        }
        return isValid;
    }

    /**
     * 
     * @returns {User} newly created user account
     * @param {any} e 
     * @memberof SignUp
     */
    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.props.signup(this.state, this.props.history);
        }
    }

    /**
     * 
     * 
     * @returns {Form} for user signup
     * @memberof SignUp
     */
    render() {
        const error = this.props.error;
        return (
            <div>
                <SignupForm
                    error = {this.props.error}
                    errors = {this.state.errors}
                    message = {this.props.message}
                    onChange = {this.onChange.bind(this)}
                    onSubmit = {this.onSubmit.bind(this)}
                />
            </div>
        );
    }
}

SignUp.prototypes = {
    signup: PropTypes.func.isRequired
};

SignUp.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.auth.errors,
    message: state.auth.messsage,
    auth: state.auth
});

export default connect(mapStateToProps, { signup, FlashMessagesList, addFlashMessage })(SignUp);
