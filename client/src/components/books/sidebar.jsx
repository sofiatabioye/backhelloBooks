import React from 'react';
import { Link } from 'react-router-dom';


const SideBar = (props) => {
  const user = props.user ? props.user.user : null;
  const categories = props.categories ? props.categories : null;
  const userRole = props.user.user.role;
  const categoriesList = categories && categories.length ?
    categories.map((category) => (
      <li key={category.id}>
        <Link to={`/books/genre/${category.title}`}>{category.title}</Link>
      </li>
    )) : <h6>No Categories</h6>;

  const userActions = (
    <span>
      <li><Link to={"/profile"} >Borrowed Books</Link></li>
      <li><Link to={"/history"}>Borrow History</Link></li>
    </span>
  );
  const adminActions = (
    <span>
      <li><Link to="#" onClick={props.openAddBookModal}>Add new Book</Link></li>
      <li><Link to="#" onClick={props.openAddCategoryModal} >Add new Category</Link></li>
    </span>
  );

  return (
    <div>
      <ul id="slide-out" className="side-nav fixed">
        <li><div className="user-view">
          <img className="circle" src="http://res.cloudinary.com/ddvm5tzhm/image/upload/c_scale,h_100/v1510679454/man_cidthh.png" role="presentation"/>
        </div>
        <a href="#!name"><span className="name"><i className="fa fa-user" />{user.name}</span></a>
        <a href="#!email"><span className="email"><i className="fa fa-envelope" />{user.email}</span></a>
        <a href="#!level"> <span><i className="fa fa-tag" />{user.level}</span></a>
        </li>
        <li><div className="divider" /></li>
        <li><a className="subheader">My Account</a></li>
        { userRole === "user" ? userActions : adminActions}
        <li><Link to={"/changepassword"}>Change Password</Link></li>
        <li><div className="divider" /></li>
        <ul className="collapsible" data-collapsible="accordion">
          <li>
            <div className="collapsible-header"><span className="category"><i className="fa fa-chevron-down"/>Categories</span></div>
            <div className="collapsible-body"> {categoriesList}</div>
          </li>

        </ul>

      </ul>
    </div>
  );
};

export default SideBar;
