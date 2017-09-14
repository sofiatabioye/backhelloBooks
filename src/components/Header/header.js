import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import { getCategories, setCategory } from '../../actions/category';
import { addFlashMessage } from '../../actions/flashmessages';


/**
 * 
 * 
 * @class Header
 * @extends {React.Component}
 */
/* eslint-disable require-jsdoc, class-methods-use-this */
class Header extends React.Component {
    /**
     * 
     * 
     * @returns 
     * @memberof Header
     * @return object
     */


    /**
     * 
     * 
     * @memberof Header
     * @returns {void} 
     */

    constructor(props) {
        super(props);
        this.state = {};
    }

    // componentDidMount() {
    //     this.props.getCategories(this.state).then(
    //         (data) => {
    //             this.props.setCategory(data.data);
    //             console.log(this.props.categories);
    //         },
    //         (errors) => {
    //             this.props.addFlashMessage({
    //                 type: 'error',
    //                 text: errors.response.data
    //             });
    //         }
    //     );
    // }
    logout(e) {
        e.preventDefault();
        this.props.logout();
    }

    render() {
        const { isAuthenticated } = this.props.auth;
        const userLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/books/:{value}" value="children">Children</Link></li>
                <li><Link to="#">IT</Link></li>
                <li><Link to="#">Education</Link></li>
                <li><Link to="#">Business</Link></li>
                <li><Link to="#">Cooking</Link></li>
                <li><Link to="#">Religion</Link></li>
                <li><Link to="#">Career</Link></li>
                <li className="dropdown">
                    <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">More Categories<span className="caret" /></Link>
                    <ul className="dropdown-menu">
                        <li><Link to="#">Women</Link></li>
                        <li><Link to="#">Love</Link></li>
                        <li><Link to="#">Fiction</Link></li>
                        <li><Link to="#">Autobiographies</Link></li>
                        <li><Link to="#">Adventure</Link></li>
                    </ul>
                </li>
                <li className="dropdown">
                    <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img className="usr-img" /><span className="caret" /></Link>
                    <ul className="dropdown-menu">
                        <li><Link to="/profile">My Profile</Link></li>
                        <li><Link to="/history">Rent History</Link></li>
                        <li><a href="#" onClick={this.logout.bind(this)} >Logout</a></li>
                    </ul>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/signin">Login</Link></li>
            </ul>
        );

        return (
            <div>
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                                <span className="icon-bar" />
                            </button>
                            <Link className="navbar-brand" to="/">HelloBooks</Link>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <form className="navbar-form navbar-left navbar-search">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Search" />
                                </div>
                            </form>
                            { isAuthenticated ? userLinks : guestLinks }
                        </div>
                    </div>
                </nav>
            </div>

        );
    }
}

Header.propTypes = {
    auth: React.PropTypes.object.isRequired,
    logout: React.PropTypes.func.isRequired,
    getCategories: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}


export default connect(mapStateToProps, { logout, getCategories, setCategory, addFlashMessage })(Header);


//  export default Header;
