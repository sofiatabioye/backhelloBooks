import React, { Component } from 'react';
import Header from './Header/header';
import Footer from './Footer/footer';

class History extends Component {

    render() {
        return (
            <div>
                <Header />
                <div className="container container-me">
                    <div className="row">
                        <div className="container">
                            <div className="col-md-3">
                                <div className="profile-sidebar">
                                    {/* SIDEBAR USERPIC */}
                                    <div className="profile-userpic">
                                        <img src="images/profile.jpg" alt className="profile-img" />
                                    </div>
                                    {/* END SIDEBAR USERPIC */}
                                    {/* SIDEBAR USER TITLE */}
                                    <div className="profile-usertitle">
                                        <div className="profile-usertitle-name">
                     Abioye Sofiat
                                        </div>
                                        <div className="profile-usertitle-job">
                                            <span className="fa fa-tag" /> Silver
                                        </div>
                                    </div>
                                    {/* END SIDEBAR USER TITLE */}
                                    {/* SIDEBAR MENU */}
                                    <div className="profile-usermenu">
                                        <ul className="nav">
                                            <li className="active">
                                                <a href="profile.html">
                                                    <i className="fa fa-book" />
                         Borrowed Books
                                                </a>
                                            </li>
                                            <li>
                                                <a href="history.html">
                                                    <i className="fa fa-history" />
                         Borrow History
                                                </a>
                                            </li>
                                            <li>
                                                <a href="password.html">
                                                    <i className="fa fa-key" />
                         Change Password
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* END MENU */}
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="profile-content">
                                    <h3>Borrowed Books</h3>
                                    <table className="table table-bordered table-responsive table-hello">
                                        <thead className="blue-grey lighten-4">
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Borrow Date</th>
                                                <th>Return Due Date</th>
                                                <th>Return Date</th>
                                                <th>Return</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">1</th>
                                                <td><a href="singlebook.html">My Nigerian Cookbook</a></td>
                                                <td>24th of July, 2017</td>
                                                <td>31th of July, 2017</td>
                                                <td />
                                                <td><input type="submit" className="btn btn-md btn-info btn-borrow" defaultValue="Return Book" /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">2</th>
                                                <td><a href="singlebook.html">The dreamers</a></td>
                                                <td>12th of July, 2017</td>
                                                <td>26th of July, 2017</td>
                                                <td />
                                                <td><input type="submit" className="btn btn-md btn-info btn-borrow" defaultValue="Return Book" /></td>
                                            </tr>
                                            <tr>
                                                <th scope="row">3</th>
                                                <td><a href="singlebook.html">The Alchemist</a></td>
                                                <td>12th of July, 2017</td>
                                                <td>26th of July, 2017</td>
                                                <td>31st of July, 2017</td>
                                                <td />
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default History;
