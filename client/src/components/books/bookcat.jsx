import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getBooksByCat, searchBook, saveBooks } from '../../actions/bookActions';
import { saveCategory } from '../../actions/categoryActions';
import {
  openAddBookModal,
  openAddCategoryModal,
  handleSelect,
  isBookValid,
  isCategoryValid,
  onChange,
  openUploadWidget,
  searchBookByCategory,
  onAddBook,
  onSaveCategory
} from './commonActions.jsx';
import BookList from './booksList.jsx';

const propTypes = {
  books: PropTypes.object,
  getBooksByCat: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

/**
 * 
 * 
 * @class BookCat
 * @extends {Component}
 */
class BookCat extends Component {
  /**
     * Creates an instance of BookCat.
     * @param {any} props 
     * @memberof BookCat
     */
  constructor(props) {
    super(props);
    this.state = {
      books: {},
      isDisabled: false,
      text: "",
      offset: 0,
      numPerPage: 8,
      activePage: 1,
      numOfPages: 0,
      searchTerm: ''
    };
    this.handleSelect = handleSelect.bind(this);
    this.onChange = onChange.bind(this);
    this.onAddBook = onAddBook.bind(this);
    this.saveCategory = onSaveCategory.bind(this);
    this.openUploadWidget = openUploadWidget.bind(this);
    this.searchBook = searchBookByCategory.bind(this);
    this.isCategoryValid = isCategoryValid.bind(this);
    this.isBookValid = isBookValid.bind(this);
  }


  /**
     * 
     * @returns {Books} Gets all books belonging to a category
     * @memberof BookCat
     */
  componentDidMount() {
    $(document).ready(() => {
      $('.collapsible').collapsible();
    });
    this.props.getBooksByCat(this.props.match.params.title);
  }

  /**
     * 
     * @returns {Books} Returns books belonging to a category
     * @param {any} nextProps 
     * @memberof BookCat
     */
  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.title !== nextProps.match.params.title) {
      nextProps.getBooksByCat(nextProps.match.params.title);
    }
  }

  /**
     * 
     * 
     * @returns {Books} By category
     * @memberof BookCat
     */
  render() {
    const title = this.props.match.params.title;
    return (
      <div>
        <BookList
          title={title}
          user={this.props.user}
          books={this.props.books}
          categories={this.props.categories}
          states= {this.state}
          isDisabled = {this.state.isDisabled}
          searchBook = {this.searchBook.bind(this)}
          numOfPages = {this.state.numOfPages}
          numPerPage={this.state.numPerPage}
          activePage= {this.state.activePage}
          onChange = {this.onChange.bind(this)}
          handleSelect={this.handleSelect.bind(this)}
          openAddBookModal = {openAddBookModal}
          openAddCategoryModal = {openAddCategoryModal}
          saveBook = {this.onAddBook.bind(this)}
          saveCategory = {this.saveCategory.bind(this)}
          openUploadWidget = {this.openUploadWidget.bind(this)}
        />
      </div>
    );
  }
}

BookCat.propTypes = propTypes;

BookCat.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  books: state.booksCategory.booksCategory,
  user: state.auth,
  categories: state.categories.categories.categories
});

const mapDispatchToProps = { getBooksByCat, searchBook, saveBooks, saveCategory };

export default connect(mapStateToProps, mapDispatchToProps)(BookCat);

