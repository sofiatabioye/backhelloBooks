import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './Header/header';
import BooksFooter from './Footer/footer';
import { signup } from '../actions/auth';
import validateSignUpInput from './utils/validateSignUp';
import { addFlashMessage } from '../actions/flashmessages';
import FlashMessagesList from './flash/FlashMessagesList';

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
     * @returns {User} newly created user account
     * @param {any} e 
     * @memberof SignUp
     */
    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.props.signup(this.state).then(
                (res) => {
                    console.log(res);
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
        const { errors, isLoading } = this.state;
        return (
            <div>
                <Header />
                <div className="login-box">
                    <FlashMessagesList />
                    { errors.form && <div className="alert alert-danger">{errors.form}</div> }
                    <form onSubmit={this.onSubmit} className="login-form form-responsive">
                        <label className="signin text-center"><h3>Create Account</h3></label>
                        <div className="form-group">
                            <label htmlFor="usr">Username</label>
                            <input type="text" value={this.state.username} onChange={this.onChange} name="username"
                                placeholder="Username" className="form-control" required/>
                            {errors.username && <span className="help-text">{errors.username}</span> }
                        </div>
                        <div className="form-group">
                            <label htmlFor="usr">Email</label>
                            <input type="email" value={this.state.email} onChange={this.onChange} name="email"
                                placeholder="Email" className="form-control" required />
                            {errors.email && <span className="help-text">{errors.email}</span> }
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Password</label>
                            <input type="password" value={this.state.password} onChange={this.onChange} name="password" placeholder="Password" className="form-control" required />
                            {errors.email && <span className="help-text">{errors.password}</span> }
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Confirm Password</label>
                            <input type="password" value={this.state.confirm_password} onChange={this.onChange} name="confirm_password" placeholder="Confirm Password" className="form-control" required />
                            {errors.email && <span className="help-text">{errors.confirm_password}</span> }
                        </div>

                        <button type="submit" className="btn btn-lg btn-me" disabled={isLoading} >Sign Up</button>
                    </form>

                </div>
                <BooksFooter />
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
