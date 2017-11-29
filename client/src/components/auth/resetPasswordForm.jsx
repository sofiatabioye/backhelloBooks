import React from 'react';
import { Row, Col } from 'react-materialize';

const resetPasswordForm = (props) => {
    const errors = props.errors;
    return (
        <Row className="homepage">
            <Col s={1} m={2} l={2} className="sidebar-home"/>
            <Col s={10} m={8} l={8}>
                <div className="authpage">
                    <div className="container">
                        <h1>Welcome to HelloBooks</h1>
                        <p>The best online library to quench your reading thirst</p>
                        <div><h3>Reset Password</h3></div>

                        <form onSubmit={props.onSubmit} className="form-responsive">
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
                            <button type="submit" className="btn btn-info btn-lg" >Reset Password</button>

                        </form>
                    </div>
                </div>
            </Col>
            <Col s={1} m={2} l={2} className="sidebar-home"/>
        </Row>
    );
}
;
export default resetPasswordForm;
