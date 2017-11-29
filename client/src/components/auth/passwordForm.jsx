import React from 'react';

import Header from '../header/header.jsx';
import Sidebar from '../books/sidebar.jsx';

const PasswordForm = (props) => {
    const errors = props.errors ? props.errors : '';
    const error = props.error ? props.error : '';
    const success = props.success ? props.success : '';
    return (
        <div>
            <Header />
            <Sidebar
                categories={props.categories}
                user={props.user}

            />

            <div className="books-container">
                <div className="row">
                    <div className="col s6 offset-s2">
                        <div className="profile-content">
                            <h3>Change Password</h3>

                            <p className="text-success" >{success}</p>
                            { error !== null && <p className="red-text" >{error}</p> }
                            { success !== null && <p className="red-text" >{success}</p> }
                            <form onSubmit={props.onSubmit} className="form-responsive">

                                <div className="form-group">
                                    <label htmlFor="pwd">Old Password</label>
                                    <input type="password" value={props.password} onChange={props.onChange} name="password" placeholder="Password" className="form-control" required />
                                    {errors.password && <span className="red-text">{errors.password}</span> }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pwd">New Password</label>
                                    <input type="password" value={props.newPassword} onChange={props.onChange} name="newPassword" placeholder="Password" className="form-control" required />
                                    {errors.newPassword && <span className="red-text">{errors.newPassword}</span> }
                                </div>
                                <div className="form-group">
                                    <label htmlFor="pwd">Confirm Password</label>
                                    <input type="password" value={props.confirmPassword} onChange={props.onChange} name="confirmPassword" placeholder="Confirm Password" className="form-control" required />
                                    {errors.confirmPassword && <span className="red-text">{errors.confirmPassword}</span> }
                                </div>
                                <button type="submit" className="btn btn-lg btn-info">Change Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PasswordForm;
