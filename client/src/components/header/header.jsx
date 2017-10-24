import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navbar, NavItem, Dropdown } from 'react-materialize';
import { Link } from 'react-router-dom';

import { getCategories } from '../../actions/categoryActions';
import { logout } from '../../actions/authActions';

/**
 * 
 *
 * @class Header
 * @extends {React.Component}
 */
class Header extends Component {
    /**
     * Creates an instance of Books.
     * @param {any} props 
     * @memberof Books
     */
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }

    /**
     * 
     * @returns {Books} This fetches all books from the api
     * @memberof Books
     */
    componentDidMount() {
        this.props.getCategories();
    }

    /**
     * @return {User} not logged in
     * @param {event} event
     * @memberof Books
     */
    logout(event) {
        event.preventDefault();
        this.props.logout();
    }

    /**
     * @returns {Categories} This displays all categories
     * @memberof Header
     */
    render() {
        const categories = this.props.categories.categories;
        const userType = this.props.user.user.role;
        const userName = this.props.user.user.name;
        const isLoggedIn = this.props.user.isAuthenticated;
        const userEmail = this.props.user.user.email;
        const userLevel = this.props.user.user.level;

        const categoriesList = categories && categories.length ?
            categories.slice(0, 8).map((category) => (
                <li key={category.id}>
                    <Link to={`/books/${category.title}`}>{category.title}</Link>
                </li>
            )) : <h6>No Categories yet </h6>;

        const categoriesList2 = categories && categories.length ?
            categories.slice(8, 100).map((category) => (
                <li key={category.id}>
                    <Link to={`/books/${category.title}`} key={category.id}>{category.title}</Link>
                </li>
            )) : <h6>No Categories yet </h6>;


        const profileList = (
            <Dropdown trigger={
                <li>
                    <a><i className="fa fa-user"/> {userName}
                        <i className="material-icons right">arrow_drop_down</i>
                    </a>
                </li>
            }>
                <li className="dropdown">
                    <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                        <img src="http://res.cloudinary.com/ddvm5tzhm/image/upload/c_scale,w_150/v1508745614/avatar-1295430_640_qybi3d.png" role="presentation" className="usr-img"/>
                        <span className="caret" /></Link>
                    <ul className="dropdown-menu">
                        <li><Link to={"/profile"}>My Profile</Link></li>
                        <li><Link to={"/history"}>Rent History</Link></li>
                        {userType === "admin" && <li><Link to="/librarybooks">Manage Library Stock</Link></li> }
                        <li><Link to="#" onClick={this.props.logout} >Logout</Link></li>
                    </ul>
                </li>
            </Dropdown>
        );

        const guestLinks = (
            <span>
                <li><Link to={"/signin"}>Sign In </Link></li>
                <li><Link to={"/signup"}>Sign Up </Link></li>
            </span>
        );

        return (
            <div>
                <Navbar brand="HelloBooks" right className="navbar-home">
                    {categoriesList}
                    <Dropdown trigger={
                        <li>
                            <a>More Categories
                                <i className="material-icons right">arrow_drop_down</i>
                            </a>
                        </li>
                    }>
                        {categoriesList2 }
                    </Dropdown>
                    <ul id="dropdown1" className="dropdown-content" />
                    {isLoggedIn ? profileList : guestLinks }
                </Navbar>
            </div>

        );
    }
}

const mapDispatchToProps = { getCategories, logout };
Header.propTypes = {
    auth: PropTypes.object,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    getCategories: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    categories: state.categories.categories,
    user: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
