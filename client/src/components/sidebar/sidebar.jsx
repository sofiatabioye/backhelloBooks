import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Modal } from 'react-materialize';

import { saveBooks } from '../../actions/bookActions';
import { saveCategory } from '../../actions/categoryActions';
import SideBar from './showSidebar.jsx';
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
  match: PropTypes.object
};

/**
 * 
 * 
 * @class BookCat
 * @extends {Component}
 */
class SideBarMain extends Component {
  /**
     * Creates an instance of BookCat.
     * @param {any} props 
     * @memberof BookCat
     */
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      categories: [],
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
     * 
     * @returns {Books} By category
     * @memberof BookCat
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
        <SideBar
          categories={this.props.categories}
          user={this.props.user}
          openAddBookModal={openAddBookModal}
          openAddCategoryModal={openAddCategoryModal}
        />
      </div>
    );
  }
}

SideBarMain.propTypes = propTypes;

SideBarMain.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth,
  categories: state.categories.categories.categories
});

const mapDispatchToProps = { saveBooks, saveCategory };

export default connect(mapStateToProps, mapDispatchToProps)(SideBarMain);

