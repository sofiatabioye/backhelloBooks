import React from 'react';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

const SignupForm = (props) => {
    const errors = props.errors ? props.errors : '';
    const error = props.error ? props.error : null;
    const message = props.message ? props.message : null;
    return (
        <div>
            <Header />
            <div className="col-sm-6 col-sm-offset-3">
                <FlashMessagesList />
                {error}
                {message}
                { errors.form && <div className="alert alert-danger">{errors.form}</div> }
                <form onSubmit={props.onSubmit} className="login-form form-responsive">
                    <label className="signin text-center"><h3>Create Account</h3></label>
                    <div className="form-group">
                        <input type="text" value={props.username} onChange={props.onChange} name="username"
                            placeholder="Username" className="form-control" required/>
                        {errors.username && <span className="help-text">{errors.username}</span> }
                    </div>
                    <div className="form-group">
                        <input type="email" value={props.email} onChange={props.onChange} name="email"
                            placeholder="Email" className="form-control" required />
                        {errors.email && <span className="help-text">{errors.email}</span> }
                    </div>
                    <div className="form-group">
                        <input type="password" value={props.password} onChange={props.onChange} name="password" placeholder="Password" className="form-control" required />
                        {errors.email && <span className="help-text">{errors.password}</span> }
                    </div>
                    <div className="form-group">
                        <input type="password" value={props.confirm_password} onChange={props.onChange} name="confirm_password" placeholder="Confirm Password" className="form-control" required />
                        {errors.email && <span className="help-text">{errors.confirm_password}</span> }
                    </div>

                    <button type="submit" className="btn btn-md btn-primary" >Sign Up</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default SignupForm;
