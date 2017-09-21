import React from 'react';
import { Link, NavLink } from 'react-router-dom';
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
        //this.state = { categories: [] };
        
    }

    logout(e) {
        e.preventDefault();
        this.props.logout();
    }
    componentWillMount () {
        this.props.getCategories().then(() => {
            this.setState({ categories: this.props.categories });
        });
    }

    categoriesList(props) {
        const catlength = this.props.categories.categories.length;
        console.log(catlength);
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


    render() {
        console.log(this.state);
        const { isAuthenticated } = this.props.auth;
        const profileList = (
            <li className="dropdown">
                <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img className="usr-img" src="#" role="presentation"/><span className="caret" /></Link>
                <ul className="dropdown-menu">
                    <li><Link to="/profile">My Profile</Link></li>
                    <li><Link to="/history">Rent History</Link></li>
                    <li><a href="#" onClick={this.logout.bind(this)} >Logout</a></li>
                </ul>
            </li>
        );

        const cat = this.props.categories.categories;

        const userLinks = cat && cat.length ?
            cat.map((category) => (
                <li ><NavLink to={`/books/${category.title}/${category.id}`}  key={category.id} >{category.title}</NavLink></li>
            )) : <h6>No categories</h6>;


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
                            <ul className="nav navbar-nav navbar-right" >
                                { isAuthenticated ? userLinks : guestLinks }
                                {profileList}
                            </ul>
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
        auth: state.auth,
        categories: state.categories.categories
    };
}


export default connect(mapStateToProps, { logout, getCategories, addFlashMessage })(Header);


//  export default Header;
