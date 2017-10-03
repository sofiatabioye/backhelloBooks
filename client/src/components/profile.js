import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from './Header/header';
import Footer from './Footer/footer';
import Sidebar from './Sidebar/sidebar';
import { fetchBorrowedBooks, returnBook } from '../actions/books';

/**
 * 
 * 
 * @class Profile
 * @extends {Component}
 */
class Profile extends Component {
    /**
     * Creates an instance of Profile.
     * @param {any} props 
     * @memberof Profile
     */
    constructor(props) {
        super(props);
        this.state = { books: [] };
        this.handleReturnBook = this.handleReturnBook.bind(this);
    }

    /**
     * 
     * @returns {BorrowedBooks} This returns books borrowed but not yet returned
     * @memberof Profile
     */
    componentDidMount() {
        this.props.fetchBorrowedBooks(this.props.auth.user.user);
    }

    /**
     * 
     * @returns {Books} Borrowed but not returned
     * @param {any} nextProps 
     * @memberof Profile
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.books !== this.props.books) {
            this.setState({ books: nextProps.books });
        }
    }

    /**
     * 
     * @returns {Book} returns borrowed book 
     * @param {any} id 
     * @memberof Profile
     */
    handleReturnBook(id) {
        this.props.returnBook(this.props.auth.user.user, id);
    }


    /**
     * 
     * 
     * @returns {Books} Borrowed but not returned
     * @memberof Profile
     */
    render() {
        const { books } = this.state;
        const booklist = books && books.length ?
            books.map((book, index) => (
                <tbody key={book.id}>
                    <tr>
                        <th scope="row">{index + 1 }</th>
                        <td><Link to={`/book/${book.book_id}`}>{book.Book.title}</Link></td>
                        <td>{moment(book.borrowDate).format('MM/DD/YYYY')}</td>
                        <td>{moment(book.expectedReturnDate).fromNow()}</td>
                        <td><button type="submit" onClick={() => this.handleReturnBook(book.book_id)} className="btn btn-md btn-info btn-borrow">Return Book</button></td>
                    </tr>
                </tbody>
            )) : <h4>You have not borrowed any books</h4>;
        return (
            <div>
                <Header />
                <div className="container container-me">
                    <div className="row">
                        <div className="container">
                            <Sidebar />
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

Profile.proptypes = {
    books: PropTypes.object.isRequired,
    fetchBorrowedBooks: PropTypes.func.isRequired,
    returnBook: PropTypes.func.isRequired,
};


Profile.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    books: state.books.books.UserBorrowHistory,
    auth: state.auth,
});

export default connect(mapStateToProps, { fetchBorrowedBooks, returnBook })(Profile);

