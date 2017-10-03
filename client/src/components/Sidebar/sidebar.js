import React from 'react';
import { Link } from 'react-router-dom';

export const Sidebar = (props) => (
    <div className="col-md-3">
        <div className="profile-sidebar">

            <div className="profile-userpic">
                <img src="../client/src/assets/images/tales.jpg" role="presentation" className="profile-img" />
            </div>


            <div className="profile-usertitle">
                <div className="profile-usertitle-name">
                 Abioye Sofiat
                </div>
                <div className="profile-usertitle-job">
                    <span className="fa fa-tag" /> Silver
                </div>
            </div>

            <div className="profile-usermenu">
                <ul className="nav">
                    <li className="active">
                        <Link to="/profile">
                            <i className="fa fa-book" />
                            Borrowed Books
                        </Link>
                    </li>
                    <li>
                        <Link to="/history">
                            <i className="fa fa-history" />
                          Borrow History
                        </Link>
                    </li>
                    <li>
                        <Link to="/changepassword">
                            <i className="fa fa-key" />
                            Change Password
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

export default Sidebar;
