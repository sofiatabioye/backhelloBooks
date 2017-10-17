import React from 'react';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import FlashMessagesList from '../flash/FlashMessagesList';

const LoginForm = (props) => {
    const errors = props.errors ? props.errors.message : '';
    return (
        <div>
            <Header />
            <div className="row">
                <div className="col-sm-6 col-sm-offset-3">
                    <FlashMessagesList />

                    { errors && <div className="alert alert-danger">{errors}</div> }
                    <form onSubmit={props.onSubmit} className="login-form form-responsive">
                        <label className="signin"><h3>Sign In</h3></label>
                        <div className="form-group">
                            <label htmlFor="usr">Email/Username</label>
                            <input type="text" onChange={props.onChange} name="identifier"
                                placeholder="Email/Username" className="form-control" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Password</label>
                            <input type="password" onChange={props.onChange} name="password" placeholder="Password" className="form-control" required />
                        </div>
                        <button type="submit" className="btn btn-md btn-primary">Sign In</button>
                    </form>
                    <p><a href={"/forgotpassword"}>Forgot Password?</a></p>
                    <div className="g-signin2" data-onsuccess={() => props.onSignIn()}>Google </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginForm;
