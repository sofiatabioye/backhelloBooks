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
        this.state = {
            books: [],
            offset: 0,
            numPerPage: 10,
            activePage: 1,
            numOfPages: 0,
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    /**
     * 
     * @returns {History} of books user has borrowed
     * @memberof History
     */
    componentDidMount() {
        this.props.fetchBorrowHistory(this.state.offset, this.state.numPerPage, this.props.user.user.user);
    }

    /**
     * 
     * @returns {void} This returns the current number of the page
     * @param {any} event
     * @memberof Books
     */
    handleSelect(event) {
        this.setState({ activePage: event });
        const offset = this.state.numPerPage * (event - 1);
        this.props.fetchBorrowHistory(offset, this.state.numPerPage, this.props.user.user.user);
    }

    /**
     * 
     * 
     * @returns {BorrowHistory} Displays history of books borrowed by user
     * @memberof History
     */
    render() {
        const numOfPages = this.props.pager ? this.props.pager.pageCount : null;
        const books = this.props.books;
        const userPage = this.props.location.pathname;
        return (
            <div>
                <UserRecordsDisplay
                    books= {books}
                    userPage={userPage}
                    categories={this.props.categories}
                    user={this.props.user}
                    numOfPages ={numOfPages}
                    numPerPage={this.state.numPerPage}
                    activePage= {this.state.activePage}
                    handleSelect={this.handleSelect.bind(this)}
                />
            </div>
        );
    }
}
History.propTypes = {
    books: PropTypes.object,
    fetchBorrowHistory: PropTypes.func.isRequired,
    returnBook: PropTypes.func.isRequired,
};

History.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    books: state.borrowedBooks,
    pager: state.borrowedBooks.pagination,
    user: state.auth,
    categories: state.categories.categories
});

export default connect(mapStateToProps, { fetchBorrowHistory, returnBook })(History);
