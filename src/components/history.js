import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import Header from './Header/header';
import Footer from './Footer/footer';
import { fetchBorrowHistory, returnBook } from '../actions/books';
/* eslint-disable  */
class History extends Component {
    constructor(props) {
        super(props);
        this.state = {books: []};
        this.handleReturnBook = this.handleReturnBook.bind(this);
    }
    

    componentDidMount() {
         this.props.fetchBorrowHistory(this.props.auth.user.user);
    }

    handleReturnBook (id){
        this.props.returnBook(this.props.auth.user.user, id);
    }
    render() {

        const returnStatus = (<td>  <button type="submit" onClick={()=>this.handleReturnBook(book.book_id)} className="btn btn-md btn-info btn-borrow">Return Book</button> </td> );
        const booklist = this.props.books && this.props.books.length ?    
        this.props.books.map((book) =>( 
                    <tbody key={book.id}>
                        <tr>
                            <th scope="row">{book.id}</th>
                            <td><Link to={`/book/${book.book_id}`}>{book.Book.title}</Link></td>
                            <td>{book.borrowDate}</td>
                            <td>{book.expectedReturnDate}</td>
                            <td>{book.dateReturned}</td>    
                            {isEmpty(book.dateReturned) ? <td>  <button type="submit" onClick={()=>this.handleReturnBook(book.book_id)} className="btn btn-md btn-info btn-borrow">Return Book</button> </td>
                            : <td> Returned</td>      }            
                        </tr>
                       
                    </tbody>
               
         )) : <h4>You have not borrowed any books</h4>;
        return (
            <div>
                <Header />
                <div className="container container-me">
                    <div className="row">
                        <div className="container">
                            <div className="col-md-3">
                                <div className="profile-sidebar">
                                   
                                    <div className="profile-userpic">
                                        <img src="images/profile.jpg" role="presentation" className="profile-img" />
                                    </div>
                                   
                                    <div className="profile-usertitle">
                                        <div className="profile-usertitle-name">
                                        Abioye Sofiat
                                        </div>
                                        <div className="profile-usertitle-job">
                                            <span className="fa fa-tag" />
                                             Silver
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
                                                <a href="password.html">
                                                    <i className="fa fa-key" />
                                             Change Password
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                  
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
                                       {booklist}
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
History.proptypes = {
    books: PropTypes.object.isRequired,
    fetchBorrowHistory: PropTypes.func.isRequired,
    returnBook: PropTypes.func.isRequired,

};


History.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    books: state.books.books.UserBorrowHistory,
    auth: state.auth,

});

export default connect(mapStateToProps, { fetchBorrowHistory, returnBook})( History);
