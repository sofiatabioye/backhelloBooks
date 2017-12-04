import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import UserRecordsDisplay from './userRecordsDisplay.jsx';
import { fetchBorrowedBooks, returnBook } from '../../actions/bookActions';

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
    $(document).ready(() => {
      $('.collapsible').collapsible();
    });
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
    const { books } = this.state;
    const userPage = this.props.location.pathname;
    return (
      <div>
        <UserRecordsDisplay
          books= {books}
          userPage ={userPage}
          categories={this.props.categories}
          user={this.props.user}
          handleReturnBook={this.handleReturnBook.bind(this)}
        />
      </div>
    );
  }
}

Profile.propTypes = {
  books: PropTypes.object.isRequired,
  fetchBorrowedBooks: PropTypes.func.isRequired,
  returnBook: PropTypes.func.isRequired,
};


Profile.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  books: state.borrowedBooks,
  categories: state.categories.categories.categories,
  user: state.auth,
});


export default connect(mapStateToProps, { fetchBorrowedBooks, returnBook })(Profile);

