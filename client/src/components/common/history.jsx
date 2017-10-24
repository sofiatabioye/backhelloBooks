import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserRecordsDisplay from './userRecordsDisplay.jsx';
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
        this.props.fetchBorrowHistory(this.props.user.user.user);
    }

    /**
     * 
     * 
     * @returns {BorrowHistory} Displays history of books borrowed by user
     * @memberof History
     */
    render() {
        const books = this.props.books;
        const userPage = this.props.location.pathname;
        return (
            <div>
                <UserRecordsDisplay
                    books= {books}
                    userPage={userPage}
                    categories={this.props.categories}
                    user={this.props.user}
                />
            </div>
        );
    }
}
History.propTypes = {
    books: PropTypes.object.isRequired,
    fetchBorrowHistory: PropTypes.func.isRequired,
    returnBook: PropTypes.func.isRequired,
};

History.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    books: state.borrowedBooks,
    user: state.auth,
    categories: state.categories.categories
});

export default connect(mapStateToProps, { fetchBorrowHistory, returnBook })(History);
