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
     
    }
    

    componentDidMount() {
         this.props.fetchBorrowHistory(this.props.auth.user.user);
    }
   

   
    render() {
        const {books}=this.state;
        const book = this.props.books;
        const bookstat= book ? book : '';
        const returnStatus = (<td>  <button type="submit" onClick={()=>this.handleReturnBook(book.book_id)} className="btn btn-md btn-info btn-borrow">Return Book</button> </td> );
        const booklist = book && book.length ?    
        book.map((book, index) =>( 

                        <tr key={book.id}>
                            <th scope="row">{index+1}</th>
                            <td><Link to={`/book/${book.book_id}`}>{book.Book.title}</Link></td>
                            <td>{book.borrowDate}</td>
                            <td>{book.expectedReturnDate}</td>
                            <td>{book.dateReturned}</td>    
                            {isEmpty(book.dateReturned) ? <td>Not Returned</td>
                            : <td> Returned</td>      }            
                        </tr>
                   
               
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
                                        <img src="localhost:8080/src/assets/images/tales.jpg" role="presentation" className="profile-img" />
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
                                        <tbody >
                                       {booklist}
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
