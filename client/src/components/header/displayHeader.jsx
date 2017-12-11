import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Navbar, Dropdown, Row, Col } from 'react-materialize';

const propTypes = {
  user: PropTypes.object,
  categories: PropTypes.array,
  openAddBookModal: PropTypes.func,
  openAddCategoryModal: PropTypes.func,
};

const displayHeader = (props) => {
  const categories = props.categories;
  const userType = props.user.user.role || null;
  const userName = props.user.user.name;

  const categoriesList = categories && categories.length ?
    categories.map((category) => (
      <Col s={12} m={3} l={3} key={category.id}>
        <li className="genreList__genre">
          <Link to={`/books/genre/${category.title}`}>{category.title}</Link>
        </li>
      </Col>
    )) : <h6>No Categories yet </h6>;

  const userActions = (
    <span>
      <li><Link to={"/books/borrowed"} >Borrowed Books</Link></li>
      <li><Link to={"/books/borrowhistory"}>Borrow History</Link></li>
    </span>
  );
  const adminActions = (
    <span>
      <li><Link to="#" onClick={props.openAddBookModal}>Add new Book</Link></li>
      <li><Link to="#" onClick={props.openAddCategoryModal} >Add new Category</Link></li>
    </span>
  );
  const profileList = (
    <Dropdown trigger={
      <li>
        <a><i className="fa fa-user"/> {userName}
          <i className="fa fa-chevron-down"/>
        </a>
      </li>
    }>
      <li className="dropdown">
        <Link
          to="#"
          className="dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false">
          <img src="http://res.cloudinary.com/ddvm5tzhm/image/upload/c_scale,h_100/v1510679454/man_cidthh.png" role="presentation" className="usr-img"/>
          <span className="caret" />
        </Link>
        <ul className="dropdown-menu">
          { userType === "user" ? userActions : adminActions}

          <li><Link to="#" onClick={props.logout} >Logout</Link></li>
        </ul>
      </li>
    </Dropdown>
  );
  return (
    <div>
      <Navbar brand="HelloBooks" right className="navbar-home">
        <li><Link to={"/books"}>Home</Link></li>
        <Dropdown trigger={
          <li>
            <a>Browse Categories
              <i className="material-icons right">arrow_drop_down</i>
            </a>
          </li>
        }>
          <Row id="dropdown_0">
            {categoriesList }
          </Row>
        </Dropdown>
        <ul id="dropdown1" className="dropdown-content genreList" style={{ height: `${100}px !important ` }} />
        {profileList }
      </Navbar>
    </div>
  );
};

displayHeader.propTypes = propTypes;

export default displayHeader;
