import React from 'react';
import { Row, Col } from 'react-materialize';
import PropTypes from 'prop-types';

const propTypes = {
  email: PropTypes.element,
  onChange: PropTypes.func.isRequired,
  onForgotPassword: PropTypes.func.isRequired

};
const forgotPasswordForm = (props) => (
  <Row className="homepage">
    <Col s={1} m={2} l={2} className="sidebar-home"/>
    <Col s={10} m={8} l={8}>
      <div className="authpage">
        <div className="container">
          <h1>Welcome to HelloBooks</h1>
          <p>The best online library to quench your reading thirst</p>
          <div><h3>Forgot your Password? </h3></div>
          <form onSubmit={props.onForgotPassword} className="form-responsive">

            <div className="form-group">
              <h5>Relax, Just Give us your Email Address</h5>
              <input
                type="email"
                placeholder="Enter your email address"
                value={props.email}
                onChange={props.onChange}
                className="form-control"
                name="email"
                required/>
            </div>
            <button type="submit" className="btn btn-info btn-lg" >Send me an Email</button>

          </form>
        </div>
      </div>
    </Col>
    <Col s={1} m={2} l={2} className="sidebar-home"/>
  </Row>
);

forgotPasswordForm.propTypes = propTypes;

export default forgotPasswordForm;
