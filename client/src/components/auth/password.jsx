import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ChangePasswordForm from './changePasswordForm.jsx';
import ForgotPasswordForm from './forgotPasswordForm.jsx';
import ResetPasswordForm from './resetPasswordForm.jsx';
import { changePassword, forgotPassword, resetPassword } from '../../actions/authActions';
import validatePassword from '../utils/validatePassword';


const propTypes = {
  changePassword: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  history: PropTypes.object,
  match: PropTypes.object.isRequired
};
/**
 * 
 * 
 * @class Login
 * @extends {React.Component}
 */
class Password extends React.Component {
  /**
     * Creates an instance of Password.
     * @param {any} props 
     * @memberof Password
     */
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      newPassword: '',
      confirmPassword: '',
      email: '',
      isLoading: false,
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onForgotPassword = this.onForgotPassword.bind(this);
    this.onResetPassword = this.onResetPassword.bind(this);
  }

  /**
     * 
     * @returns {void} This fetches all books from the api
     * @memberof Password
     */
  componentDidMount() {
    $('.collapsible').collapsible();
  }

  /**
     * 
     * @returns {void}
     * @param {any} e 
     * @memberof Password
     */
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  /**
     * 
     * 
     * @returns {validatedInput} validates form input
     * @memberof Password
     */
  isValid() {
    const { errors, isValid } = validatePassword(this.state);
    if (!isValid) {
      this.setState({ errors });
      return;
    }
    return isValid;
  }

  /**
     * 
     * @returns {Password} This submits password change form
     * @param {any} e 
     * @memberof Password
     */
  onChangePassword(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.changePassword(this.state, this.props.auth.user.user);
    }
  }

  /**
     * 
     * @returns {User} submits user login details
     * @param {any} event 
     * @memberof Login
     */
  onForgotPassword(event) {
    event.preventDefault();
    this.props.forgotPassword(this.state);
  }

  /**
     * 
     * @returns {Password} This submits password change form
     * @param {any} e 
     * @memberof Password
     */
  onResetPassword(e) {
    e.preventDefault();
    if (this.isValid()) {
      this.props.resetPassword({ password: this.state.newPassword }, this.props.match.params.token, this.props.history);
    }
  }

  /**
     * 
     * 
     * @returns {Form} for password change
     * @memberof Password
     */
  render() {
    const forgotpassword = "/forgotpassword";
    const changepassword = "/changepassword";
    const resetpassword = "/api/v1/reset/:token";

    return (
      <div>
        { this.props.match.path === changepassword &&
          <ChangePasswordForm
            errors={this.state.errors}
            onChange = {this.onChange.bind(this)}
            onChangePassword = {this.onChangePassword.bind(this)}
          /> }
        {this.props.match.path === forgotpassword &&
            <ForgotPasswordForm
              errors ={this.state.errors}
              onChange={this.onChange.bind(this)}
              onForgotPassword={this.onForgotPassword.bind(this)}
            /> }
        {this.props.match.path === resetpassword &&
              <ResetPasswordForm
                errors={this.state.errors}
                onChange = {this.onChange.bind(this)}
                onResetPassword = {this.onResetPassword.bind(this)}
              />
        }
        }
      </div>

    );
  }
}

Password.prototypes = {
  changePassword: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired
};

Password.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapDispatchToProps = { changePassword, resetPassword, forgotPassword };

const mapStateToProps = state => ({});

Password.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Password);
