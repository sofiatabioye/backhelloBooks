import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getBooks, searchBook } from '../../actions/bookActions';
import {
  handleSelect,
  searchBooks,
  onChange
} from './commonActions.jsx';
import BookList from './booksList.jsx';

const propTypes = {
  user: PropTypes.object.isRequired,
  categories: PropTypes.array,
  books: PropTypes.array,
  pager: PropTypes.object.isRequired,
  getBooks: PropTypes.func.isRequired,
  saveBooks: PropTypes.func,
  searchBook: PropTypes.func
};

/**
 * 
 * 
 * @class Books
 * @extends {Component}
 */
class Books extends Component {
  /**
     * Creates an instance of Books.
     * @param {any} props 
     * @memberof Books
     */
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      book: {},
      errors: {},
      isDisabled: false,
      text: "",
      offset: 0,
      numPerPage: 8,
      activePage: 1,
      numOfPages: 0,
      searchTerm: '',
    };
    this.handleSelect = handleSelect.bind(this);
    this.searchBook = searchBooks.bind(this);
    this.onChange = onChange.bind(this);
  }

  /**
     * 
     * @returns {Books} This fetches all books from the api
     * @memberof Books
     */
  componentDidMount() {
    this.props.getBooks(this.state.offset, this.state.numPerPage);
  }

  /**
     * 
     * @returns {void}
     * @param {any} nextProps 
     * @memberof Books
     */
  componentWillReceiveProps(nextProps) {
    $('.button-collapse').sideNav({
      closeOnClick: true
    });
    $('select').material_select();
    $('.collapsible').collapsible();
    if (nextProps.books && (nextProps.pager !== undefined)) {
      this.setState({
        books: nextProps.books,
        numOfPages: nextProps.pager.pageCount
      });
    }
  }

  /**
     * @returns {Books} This displays all books for authenticated users to see
     * @memberof Books
     */
  render() {
    return (
      <div>
        <BookList books ={this.state.books}
          book ={this.state.book}
          errors={this.state.errors}
          isDisabled = {this.state.isDisabled}
          searchBook = {this.searchBook.bind(this)}
          onChange = {this.onChange.bind(this)}
          states= {this.state}
          numOfPages ={this.state.numOfPages}
          numPerPage={this.state.numPerPage}
          activePage= {this.state.activePage}
          handleSelect={this.handleSelect.bind(this)} />
      </div>
    );
  }
}

Books.contextTypes = {
  router: PropTypes.object.isRequired
};
const mapDispatchToProps = { getBooks, searchBook };

const mapStateToProps = state => ({
  books: state.books.books,
  pager: state.books.pagination,
  user: state.auth,
  categories: state.categories.categories.categories
});

Books.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Books);
