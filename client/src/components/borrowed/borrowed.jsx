import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import UserRecordsDisplay from './userRecordsDisplay.jsx';
import { fetchBorrowedBooks, returnBook, fetchBorrowHistory } from '../../actions/bookActions';

const propTypes = {
  books: PropTypes.object,
  pager: PropTypes.object,
  user: PropTypes.object,
  categories: PropTypes.array,
  location: PropTypes.object,
  fetchBorrowedBooks: PropTypes.func.isRequired,
  fetchBorrowHistory: PropTypes.func.isRequired,
  returnBook: PropTypes.func.isRequired,
};

/**
 * 
 * 
 * @class Profile
 * @extends {Component}
 */
class Borrowed extends Component {
  /**
     * Creates an instance of Profile.
     * @param {any} props 
     * @memberof Profile
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
    this.handleReturnBook = this.handleReturnBook.bind(this);
  }

  /**
     * 
     * @returns {BorrowedBooks} This returns books borrowed but not yet returned
     * @memberof Profile
     */
  componentDidMount() {
    $('.collapsible').collapsible();
    if (this.props.location.pathname === "/books/borrowhistory") {
      this.props.fetchBorrowHistory(this.state.offset, this.state.numPerPage, this.props.user.user.user);
    }
    this.props.fetchBorrowedBooks(this.props.user.user.user);
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
     * @returns {Book} returns borrowed book 
     * @param {any} id 
     * @memberof Profile
     */
  handleReturnBook(id) {
    this.props.returnBook(this.props.user.user.user, id);
  }


  /**
     * 
     * 
     * @returns {Books} Borrowed but not returned
     * @memberof Profile
     */
  render() {
    const userPage = this.props.location.pathname;
    const numOfPages = this.props.pager ? this.props.pager.pageCount : null;
    return (
      <div>
        <UserRecordsDisplay
          books= {this.state.books}
          userPage ={userPage}
          categories={this.props.categories}
          user={this.props.user}
          numOfPages ={numOfPages}
          numPerPage={this.state.numPerPage}
          activePage= {this.state.activePage}
          handleSelect={this.handleSelect.bind(this)}
          handleReturnBook={this.handleReturnBook.bind(this)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  books: state.borrowedBooks,
  pager: state.borrowedBooks.pagination,
  categories: state.categories.categories.categories,
  user: state.auth
});

Borrowed.propTypes = propTypes;

export default connect(mapStateToProps, { fetchBorrowedBooks, fetchBorrowHistory, returnBook })(Borrowed);

