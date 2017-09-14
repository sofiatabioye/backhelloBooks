import React from 'react';
import { connect } from 'react-redux';

import Header from './Header/header';
import Footer from './Footer/footer';
import { login } from '../actions/auth';

import validateInput from './utils/validation';
import { addFlashMessage } from '../actions/flashmessages';
import FlashMessagesList from './flash/FlashMessagesList';

/**
 * 
 * 
 * @class Login
 * @extends {React.Component}
 */
/* eslint-disable require-jsdoc */
class Login extends React.Component {
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
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    isValid() {
        const { errors, isValid } = validateInput(this.state);
        if (!isValid) {
            this.setState({ errors });
            return;
        }
        return isValid;
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.props.login(this.state).then(
                (res) => {
                    console.log(res);
                    this.context.router.history.push('/books');
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
        const { errors, identifier, password, isLoading } = this.state;

        return (
            <div>
                <Header />

                <div className="login-box">
                    <FlashMessagesList />

                    { errors.form && <div className="alert alert-danger">{errors.form}</div> }
                    <form onSubmit= {this.onSubmit} className="login-form form-responsive">
                        <label className="signin"><h3>Sign In</h3></label>
                        <div className="form-group">
                            <label htmlFor="usr">Email/Username</label>
                            <input type="text" value={this.state.identifier} onChange={this.onChange} name="identifier"
                                placeholder="Email/Username" className="form-control" />
                            {errors.identifier && <span className="help-text">{errors.identifier}</span> }
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Password</label>
                            <input type="password" value={this.state.password} onChange={this.onChange} name="password" placeholder="Password" className="form-control" />
                            <span className="help-text">{errors.password}</span>
                        </div>

                        <button type="submit" className="btn btn-lg btn-me" disabled={isLoading}>Sign In</button><div><a href={"/forgotpassword"}>Forgot Password?</a></div>
                    </form>
                </div>
                <Footer />
            </div>
        );
    }
}

Login.protoTypes = {
    login: React.PropTypes.func.isRequired
};
Login.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(null, { login, FlashMessagesList, addFlashMessage })(Login);
