import React from 'react';
import { connect } from 'react-redux';

import Header from './Header/header';
import Footer from './Footer/footer';
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
/* eslint-disable require-jsdoc */
class SignUp extends React.Component {
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
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    isValid() {
        const { errors, isValid } = validateSignUpInput(this.state);
        if (!isValid) {
            this.setState({ errors });
            return;
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            console.log(this.state);
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
    render() {
        const { errors, isLoading } = this.state;
        // username, email, password, confirm_password,
        return (
            <div>
                <Header />

                <div className="login-box">
                    <FlashMessagesList />
                    { errors.form && <div className="alert alert-danger">{errors.form}</div> }
                    <form onSubmit={this.onSubmit} className="login-form form-responsive">
                        <label className="signin"><h3>Sign In</h3></label>
                        <div className="form-group">
                            <label htmlFor="usr">Username</label>
                            <input type="textbox" value={this.state.username} onChange={this.onChange} name="username"
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

                        <button type="submit" className="btn btn-lg btn-me" disabled={isLoading} >Sign In</button>
                    </form>

                </div>
                <Footer />
            </div>
        );
    }
}

SignUp.protoTypes = {
    signup: React.PropTypes.func.isRequired
};
SignUp.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(null, { signup, FlashMessagesList, addFlashMessage })(SignUp);
