import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getBooks, saveBooks, searchBook } from '../../actions/bookActions';
import { saveCategory } from '../../actions/categoryActions';
import {
  openAddBookModal,
  openAddCategoryModal,
  handleSelect,
  isBookValid,
  isCategoryValid,
  onChange,
  openUploadWidget,
  searchBooks,
  onAddBook,
  onSaveCategory
} from './commonActions.jsx';
import BookList from './booksList.jsx';

const propTypes = {
  user: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  books: PropTypes.object,
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
      books: {},
      book: {},
      errors: {},
      categories: [],
      user: [],
      isDisabled: false,
      text: "",
      offset: 0,
      numPerPage: 8,
      activePage: 1,
      numOfPages: 0,
      title: '',
      description: '',
      category: '',
      quantity: '',
      author: '',
      ISBN: '',
      bookEdition: '',
      publisher: '',
      bookSize: '',
      image: '',
      imageName: '',
      public_id: null,
      imageVersion: null,
      searchTerm: '',
    };
    this.handleSelect = handleSelect.bind(this);
    this.onChange = onChange.bind(this);
    this.onAddBook = onAddBook.bind(this);
    this.saveCategory = onSaveCategory.bind(this);
    this.openUploadWidget = openUploadWidget.bind(this);
    this.searchBook = searchBooks.bind(this);
    this.isCategoryValid = isCategoryValid.bind(this);
    this.isBookValid = isBookValid.bind(this);
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
    $(document).ready(() => {
      $('.button-collapse').sideNav({
        closeOnClick: true
      });
      $('select').material_select();
      $('.collapsible').collapsible();
    });
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
          user={this.props.user}
          categories={this.props.categories}
          errors={this.state.errors}
          isDisabled = {this.state.isDisabled}
          openBook = {this.openBook}
          onAddBook= {this.onAddBook.bind(this)}
          searchBook = {this.searchBook.bind(this)}
          saveCategory = {this.saveCategory.bind(this)}
          onChange = {this.onChange.bind(this)}
          states= {this.state}
          openAddBookModal = {openAddBookModal}
          openAddCategoryModal = {openAddCategoryModal}
          numOfPages ={this.state.numOfPages}
          numPerPage={this.state.numPerPage}
          activePage= {this.state.activePage}
          saveBook = {this.onAddBook.bind(this)}
          openUploadWidget = {this.openUploadWidget.bind(this)}
          handleSelect={this.handleSelect.bind(this)} />
      </div>
    );
  }
}

Books.contextTypes = {
  router: PropTypes.object.isRequired
};
const mapDispatchToProps = { getBooks, saveCategory, saveBooks, searchBook };

const mapStateToProps = state => ({
  books: state.books.books,
  pager: state.books.pagination,
  user: state.auth,
  categories: state.categories.categories.categories
});

Books.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(Books);
