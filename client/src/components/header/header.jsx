import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, NavItem, Dropdown, Button } from 'react-materialize';

// const logout = (event) => {
//     event.preventDefault();
//     this.props.logout();
// };
/**
 * 
 *
 * @class Header
 * @extends {React.Component}
 */

const Header = (props) => {
    const categories = props.categories.categories;
    const user = props.user;

    const categoriesList = categories && categories.length ?
        categories.slice(0, 8).map((category) => (
            <NavItem href={`/books/${category.title}/${category.id}`} key={category.id}>{category.title}</NavItem>
        )) : <h6>No Categories yet </h6>;

    const categoriesList2 = categories && categories.length ?
        categories.slice(8, 100).map((category) => (
            <NavItem href={`/books/${category.title}/${category.id}`} key={category.id}>{category.title}</NavItem>
        )) : <h6>No Categories yet </h6>;

    // const adminLinks = (
    //     <li>Manage Library Stock</li>
    // );
    // const userLinks = cat && cat.length ?
    //     cat.slice(0, 7).map((category) => (
    //         <li key={category.id}><Link to={`/books/${category.title}/${category.id}`} >{category.title}</Link></li>
    //     )) : <h6>No categories</h6>;

    // const categoryLinksDropdown = cat && cat.length ?
    //     cat.slice(7, 50).map((category) => (
    //         <li key={category.id}><Link to={`/books/${category.title}/${category.id}`} >{category.title}</Link></li>
    //     )) : <h6>No categories</h6>;

    // const profileList = (
    //     <li className="dropdown">
    //         <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
    //             <img src="../client/src/assets/images/tales.jpg" role="presentation" className="usr-img"/>
    //             <span className="caret" /></Link>
    //         <ul className="dropdown-menu">
    //             <li><Link to="/profile">My Profile</Link></li>
    //             <li><Link to="/history">Rent History</Link></li>
    //             {userType == "admin" && <li><a href="/librarybooks">Manage Library Stock</a></li> }
    //             <li><Link to="#" onClick={this.logout.bind(this)} >Logout</Link></li>
    //         </ul>
    //     </li>
    // );

    // const guestLinks = (
    //     <ul className="nav navbar-nav navbar-right">
    //         <li><Link to="/signin">Sign In</Link></li>
    //         <li><Link to="/signup">Sign Up</Link></li>
    //         <li><Link to="/books">Library</Link></li>
    //     </ul>
    // );

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

            </Navbar>
        </div>

    );
};

Header.proptypes = {
    auth: PropTypes.object.isRequired,
    user: PropTypes.element.isRequired,
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.func.isRequired
};


export default Header;

