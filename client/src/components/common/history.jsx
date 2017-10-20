import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import Header from '../header/header.jsx';
import HelloFooter from '../footer/footer.jsx';
import Sidebar from '../sidebar/sidebar.jsx';
import { fetchBorrowHistory, returnBook } from '../../actions/bookActions';

/**
 * 
 * 
 * @class History
 * @extends {Component}
 */
class History extends Component {
    /**
     * Creates an instance of History.
     * @param {any} props 
     * @memberof History
     */
    constructor(props) {
        super(props);
        this.state = { books: [] };
    }

    /**
     * 
     * @returns {History} of books user has borrowed
     * @memberof History
     */
    componentDidMount() {
        this.props.fetchBorrowHistory(this.props.auth.user.user);
    }

    /**
     * 
     * 
     * @returns {BorrowHistory} Displays history of books borrowed by user
     * @memberof History
     */
    render() {
        const book = this.props.books;
        const booklist = book && book.UserBorrowHistory ?
            book.UserBorrowHistory.map((book, index) => (

                <tr key={book.id}>
                    <th scope="row">{index + 1}</th>
                    <td><Link to={`/book/${book.book_id}`}>{book.Book.title}</Link></td>
                    <td className="time">{moment(book.borrowDate).format('MM/DD/YYYY')}</td>
                    <td>{moment(book.expectedReturnDate).format('MM/DD/YYYY')}</td>
                    <td>{ isEmpty(book.dateReturned) ? "" : moment(book.dateReturned).format('MM/DD/YYYY') }</td>
                    {isEmpty(book.dateReturned) ? <td>Not Returned</td> :
                        <td> Returned</td> }
                </tr>
            )) : <h4>You have not borrowed any books</h4>;

        return (
            <div>
                <Header />
                <div className="container container-me">
                    <div className="row">
                        <div className="container">
                            <Sidebar user= {this.props.auth}/>
                            <div className="col-md-9">
                                <div className="profile-content">
                                    <h3>Borrow History</h3>
                                    <table className="table table-bordered table-responsive table-hello">
                                        <thead className="blue-grey lighten-4">
                                            <tr>
                                                <th>#</th>
                                                <th>Title</th>
                                                <th>Borrow Date</th>
                                                <th>Return Due Date</th>
                                                <th>Return Date</th>
                                                <th>Status</th>
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
                <HelloFooter />
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
    books: state.books.books,
    auth: state.auth,
});

export default connect(mapStateToProps, { fetchBorrowHistory, returnBook })(History);
