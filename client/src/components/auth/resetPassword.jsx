import React from 'react';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';


const resetPasswordForm = (props) =>
    (
        <div>
            <Header />
            <div className="container container-me">
                <div><h3>Reset Password</h3></div>
                <p className="text-success" >{success}</p>
                { error !== null && <p className="red-text" >{error}</p> }

                <form onSubmit={props.onSubmit} className="form-me form-responsive">
                    <div className="form-group">
                        <label htmlFor="pwd">New Password</label>
                        <input type="password" value={props.newPassword} onChange={props.onChange} name="newPassword" placeholder="Password" className="form-control" required />
                        {errors.newPassword && <span className="text-danger">{errors.newPassword}</span> }
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Confirm Password</label>
                        <input type="password" value={props.confirmPassword} onChange={props.onChange} name="confirmPassword" placeholder="Confirm Password" className="form-control" required />
                        {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span> }
                    </div>
                    <button type="submit" className="btn btn-info btn-lg" >Reset Password</button>

                </form>
            </div>
            <Footer />
        </div>
    )
;
export default resetPasswordForm;
