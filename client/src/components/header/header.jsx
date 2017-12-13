import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Modal } from 'react-materialize';

import DisplayHeader from './displayHeader.jsx';
import { saveBooks } from '../../actions/bookActions';
import { getCategories, saveCategory } from '../../actions/categoryActions';
import { logout } from '../../actions/authActions';
import BookForm from '../books/bookForm.jsx';
import CategoryForm from '../books/categoryForm.jsx';
import {
  openAddBookModal,
  openAddCategoryModal,
  isBookValid,
  isCategoryValid,
  onChange,
  openUploadWidget,
  onAddBook,
  onSaveCategory
} from '../books/commonActions.jsx';

const propTypes = {
  categories: PropTypes.array,
  user: PropTypes.object.isRequired,
  history: PropTypes.object,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  getCategories: PropTypes.func.isRequired
};

/**
 * 
 *
 * @class Header
 * @extends {React.Component}
 */
class Header extends Component {
  /**
     * Creates an instance of Books.
     * @param {any} props 
     * @memberof Books
     */
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      categories: {},
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
      newCategory: ''
    };
    this.onChange = onChange.bind(this);
    this.onAddBook = onAddBook.bind(this);
    this.saveCategory = onSaveCategory.bind(this);
    this.openUploadWidget = openUploadWidget.bind(this);
    this.isCategoryValid = isCategoryValid.bind(this);
    this.isBookValid = isBookValid.bind(this);
  }

  /**
     * 
     * @returns {Books} This fetches all books from the api
     * @memberof Books
     */
  componentDidMount() {
    this.props.getCategories();
  }

  /**
     * @return {User} not logged in
     * @param {event} event
     * @memberof Books
     */
  logout(event) {
    event.preventDefault();
    this.props.logout(this.props.history);
  }

  /**
     * @returns {Categories} This displays all categories
     * @memberof Header
     */
  render() {
    return (
      <div>
        <Modal
          id= "addBook">
          <BookForm
            saveBook = {this.onAddBook.bind(this)}
            openUploadWidget = {this.openUploadWidget.bind(this)}
            states={this.state}
            errors={this.state.errors}
            onChange = {this.onChange.bind(this)}
            categories={this.props.categories}
          />
        </Modal>
        <Modal
          id="addCategory">
          <CategoryForm
            saveCategory = {this.saveCategory.bind(this)}
            states={this.state}
            errors={this.state.errors}
            onChange = {this.onChange.bind(this)}
            categories={this.props.categories}
          />
        </Modal>
        <DisplayHeader
          categories={this.props.categories}
          user={this.props.user}
          openAddBookModal={openAddBookModal}
          openAddCategoryModal={openAddCategoryModal}
          logout={this.props.logout}
        />
      </div>

    );
  }
}

const mapDispatchToProps = { getCategories, saveBooks, saveCategory, logout };
Header.propTypes = propTypes;

const mapStateToProps = state => ({
  categories: state.categories.categories.categories,
  user: state.auth
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
