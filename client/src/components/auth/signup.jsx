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
        // this.onSignIn = this.onSignIn.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
    }

    /**
     * 
     * @returns {void}
     * @param {any} e 
     * @memberof SignUp
     */
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
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
     * @return {void}
     * @memberof SignUp
     */
    componentDidMount() {
        gapi.signin2.render('g-signin2', {
            scope: 'https://www.googleapis.com/auth/plus.login',
            width: 200,
            height: 50,
            longtitle: true,
            theme: 'dark',
            onsuccess: this.onSuccess
        });
    }

    /**
     * 
     * @return {any} googleUser
     * @param {any} googleUser 
     * @memberof Login
     */
    onSuccess() {
        console.log("====yaay");
        let profile = googleUser.getBasicProfile();
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
            this.props.signup(this.state).then(
                (res) => {
                    this.context.router.history.push('/signin');
                },
                (err) => {
                    this.setState({
                        isLoading: false
                    });
                    if (err.data) {
                        this.props.addFlashMessage({
                            type: 'error',
                            text: err.data.errors
                        });
                    }
                }
            );
        }
    }

    /**
     * 
     * 
     * @returns {Form} for user signup
     * @memberof SignUp
     */
    render() {
        return (
            <div>
                <SignupForm
                    errors = {this.state.errors}
                    onSuccess = {this.onSuccess.bind(this)}
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

export default connect(null, { signup, FlashMessagesList, addFlashMessage })(SignUp);
