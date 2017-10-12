import React from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Header from '../header/header.jsx';
import BookFooter from '../footer/footer.jsx';
import Sidebar from '../sidebar/sidebar.jsx';
import { changepassword } from '../../actions/auth';

import validateInput from '../utils/validatePassword.jsx';
import { addFlashMessage } from '../../actions/flashmessages';
import FlashMessagesList from '../flash/FlashMessagesList';

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
            errors: {},
            isLoading: false
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
        const { errors, isValid } = validateInput(this.state);
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
    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.props.changepassword(this.state, this.props.auth.user.user);
        }
    }

    /**
     * 
     * 
     * @returns {Form} for password change
     * @memberof Password
     */
    render() {
        const { errors, isLoading } = this.state;
        const error = this.props.error ? this.props.error.message : "";
        const success = this.props.success ? this.props.success : "";
        return (
            <div>
                <Header />
                <div className="container container-me">
                    <div className="row">
                        <div className="container">
                            <Sidebar user= {this.props.auth}/>
                            <div className="col-md-9">
                                <div className="profile-content">
                                    <h3>Change Password</h3>

                                    <p className="text-success" >{success}</p>
                                    { error !== null && <p className="red-text" >{error}</p> }

                                    { errors.form && <div className="alert alert-danger">{errors.form}</div> }
                                    <form onSubmit={this.onSubmit} className="login-form form-responsive">

                                        <div className="form-group">
                                            <label htmlFor="pwd">Old Password</label>
                                            <input type="password" value={this.state.password} onChange={this.onChange} name="password" placeholder="Password" className="form-control" required />
                                            {errors.password && <span className="text-danger">{errors.password}</span> }
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pwd">New Password</label>
                                            <input type="password" value={this.state.newPassword} onChange={this.onChange} name="newPassword" placeholder="Password" className="form-control" required />
                                            {errors.newPassword && <span className="text-danger">{errors.newPassword}</span> }
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="pwd">Confirm Password</label>
                                            <input type="password" value={this.state.confirmPassword} onChange={this.onChange} name="confirmPassword" placeholder="Confirm Password" className="form-control" required />
                                            {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span> }
                                        </div>
                                        <button type="submit" className="btn btn-lg btn-info" disabled={isLoading} >Change Password</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BookFooter />
            </div>
        );
    }
}

Password.prototypes = {
    changepassword: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
    success: PropTypes.object.isRequired
};

Password.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.auth.errors,
    success: state.auth.success
});

export default connect(mapStateToProps, { changepassword, FlashMessagesList, addFlashMessage })(Password);
