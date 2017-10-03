import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { logout } from '../../actions/auth';
import { getCategories } from '../../actions/category';

import { addFlashMessage } from '../../actions/flashmessages';

/**
 * 
 * 
 * @class Header
 * @extends {React.Component}
 */

class Header extends React.Component {
    /**
     * 
     * @retruns {Categories} returns all categories
     * @memberof Header
     */
    componentWillMount() {
        this.props.getCategories().then(() => {
            this.setState({ categories: this.props.categories });
        });
    }

    /**
     * 
     * @returns {void}
     * @param {any} e 
     * @memberof Header
     */
    logout(e) {
        e.preventDefault();
        this.props.logout();
    }


    /**
     * 
     * 
     * @param {any} props 
     * @returns {Categories} List of categories
     * @memberof Header
     */
    categoriesList(props) {
        const catlength = this.props.categories.categories.length;
        if (catlength > 6) {
            return (
                <li className="dropdown">
                    <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">More Categories<span className="caret" /></Link>
                    <ul className="dropdown-menu">
                        <li><Link to="#">Tada</Link></li>
                    </ul>
                </li>
            );
        }
        return "";
    }


    /**
     * 
     * 
     * @returns {Links} Contains user profile links
     * @memberof Header
     */
    render() {
        const cat = this.props.categories.categories;
        const { isAuthenticated } = this.props.auth;
        const userType = this.props.user;
        const adminLinks = (
            <li>Manage Library Stock</li>
        );
        const userLinks = cat && cat.length ?
            cat.slice(0, 9).map((category) => (
                <li key={category.id}><NavLink to={`/books/${category.title}/${category.id}`} >{category.title}</NavLink></li>
            )) : <h6>No categories</h6>;

        const categoryLinksDropdown = cat && cat.length ?
            cat.slice(10, 50).map((category) => (
                <li key={category.id}><NavLink to={`/books/${category.title}/${category.id}`} >{category.title}</NavLink></li>
            )) : <h6>No categories</h6>;

        const profileList = (
            <li className="dropdown">
                <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    <img src="../client/src/assets/images/tales.jpg" role="presentation" className="usr-img"/>
                    <span className="caret" /></Link>
                <ul className="dropdown-menu">
                    <li><a href="/profile">My Profile</a></li>
                    <li><a href="/history">Rent History</a></li>
                    {userType == "admin" && <li><a href="/librarybooks">Manage Library Stock</a></li> }
                    <li><a href="#" onClick={this.logout.bind(this)} >Logout</a></li>
                </ul>
            </li>
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
                            <Link className="navbar-brand" to="/books">HelloBooks</Link>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <form className="navbar-form navbar-left navbar-search">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Search" />
                                </div>
                            </form>
                            <ul className="nav navbar-nav navbar-right" >
                                { isAuthenticated ? userLinks : guestLinks }
                                { isAuthenticated ?
                                    <li className="dropdown">
                                        <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">More Categories<span className="caret" /></Link>
                                        <ul className="dropdown-menu">
                                            { isAuthenticated ? categoryLinksDropdown : "" }
                                        </ul>
                                    </li> : <span />}
                                {isAuthenticated ? profileList : <span/>}
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

        );
    }
}

Header.proptypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.element.isRequired,
    logout: PropTypes.func.isRequired,
    getCategories: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.func.isRequired
};


/**
 * 
 * 
 * @param {any} state 
 * @returns {state} maps props to state
 */
function mapStateToProps(state) {
    return {
        auth: state.auth,
        user: state.auth.user.role,
        categories: state.categories.categories
    };
}


export default connect(mapStateToProps, { logout, getCategories, addFlashMessage })(Header);

