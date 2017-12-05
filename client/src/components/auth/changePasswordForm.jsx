import React from 'react';
import PropTypes from 'prop-types';

import Header from '../header/header.jsx';
import Sidebar from '../sidebar/sidebar.jsx';

const propTypes = {
  password: PropTypes.element.isRequired,
  confirmPassword: PropTypes.element.isRequired,
  newPassword: PropTypes.element.isRequired,
  errors: PropTypes.element.isRequired,
  categories: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired

};
const PasswordForm = (props) => {
  const errors = props.errors ? props.errors : '';
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
              <form onSubmit={props.onChangePassword} className="form-responsive">
                <div className="form-group">
                  <label htmlFor="pwd">Old Password</label>
                  <input
                    type="password"
                    value={props.password}
                    onChange={props.onChange}
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    required />
                </div>
                <div className="form-group">
                  <label htmlFor="pwd">New Password</label>
                  <input
                    type="password"
                    value={props.newPassword}
                    onChange={props.onChange}
                    name="newPassword"
                    placeholder="Password"
                    className="form-control" required />
                  {errors.newPassword && <div className="red-text">{errors.newPassword}</div> }
                </div>
                <div className="form-group">
                  <label htmlFor="pwd">Confirm Password</label>
                  <input
                    type="password"
                    value={props.confirmPassword}
                    onChange={props.onChange}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className="form-control" required />
                  {errors.confirmPassword && <div className="red-text">{errors.confirmPassword}</div> }
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

PasswordForm.propTypes = propTypes;

export default PasswordForm;
