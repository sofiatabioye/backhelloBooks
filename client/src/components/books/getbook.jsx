import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import { borrowBook, getBookById, deleteBook, updateBook } from '../../actions/bookActions';
import {
  handleSelect,
  onChange,
  openUploadWidget
} from './commonActions.jsx';
import ShowBook from './viewbook.jsx';

const propTypes = {
  book: PropTypes.object,
  user: PropTypes.object,
  borrowBook: PropTypes.func,
  updateBook: PropTypes.func,
  deleteBook: PropTypes.func,
  openUploadWidget: PropTypes.func,
  history: PropTypes.object,
  match: PropTypes.object.isRequired,
  getBookById: PropTypes.func.isRequired
};
/**
 * 
 * 
 * @class BookCat
 * @extends {Component}
 */
class GetBook extends Component {
  /**
     * Creates an instance of BookCat.
     * @param {any} props 
     * @memberof BookCat
     */
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      category: "",
      quantity: "",
      author: "",
      ISBN: "",
      bookEdition: "",
      publisher: "",
      bookSize: "",
      image: "",
      imageName: "",
    };
    this.borrowBook = this.borrowBook.bind(this);
    this.onDeleteBook = this.onDeleteBook.bind(this);
    this.openEditBookModal = this.openEditBookModal.bind(this);
    this.saveBook = this.saveBook.bind(this);
    this.handleSelect = handleSelect.bind(this);
    this.onChange = onChange.bind(this);
    this.openUploadWidget = openUploadWidget.bind(this);
  }

  /**
     * 
     * @returns {Books} This fetches all books from the api
     * @memberof Books
     */
  componentDidMount() {
    const bookId = this.props.match.params.id;
    this.props.getBookById(bookId);
  }

  /**
     * 
     * @returns {void}
     * @param {any} nextProps 
     * @memberof Books
     */
  componentWillReceiveProps(nextProps) {
    $('select').material_select();
    if (nextProps.book) {
      this.setState({
        id: nextProps.book.id,
        title: nextProps.book.title,
        description: nextProps.book.description,
        category: nextProps.book.category,
        quantity: nextProps.book.quantity,
        author: nextProps.book.author,
        ISBN: nextProps.book.ISBN,
        bookEdition: nextProps.book.bookEdition,
        publisher: nextProps.book.publisher,
        bookSize: nextProps.book.bookSize,
        image: nextProps.book.image,
        imageName: nextProps.book.imageName,
      });
    }
  }

  /**
     * @returns {void} borrows book
     * @param {any} userId
     * @param {any} bookId
     * @memberof Books
     */
  borrowBook(userId, bookId) {
    this.props.borrowBook(userId, bookId, this.props.history);
  }

  /**
   * @returns {void} updates book
   * @param {any} event 
   * @memberof GetBook
   */
  saveBook(event) {
    event.preventDefault();
    this.props.updateBook(this.props.match.params.id, this.state);
  }

  /**
     * @returns {Book } returns book information
     * @param {any} book 
     * @memberof Books
     */
  openEditBookModal(book) {
    const modal = $('#editBook');
    $('#editBook').modal('open');
    this.setState({
      title: book.title,
      description: book.description,
      category: book.category,
      quantity: book.quantity,
      author: book.author,
      ISBN: book.ISBN,
      bookEdition: book.bookEdition,
      publisher: book.publisher,
      bookSize: book.bookSize,
      image: book.image,
      imageName: book.imageName,
    });
  }


  onDeleteBook(bookId) {
    swal({
      title: "Are you sure?",
      text: "Are you sure that you want to delete this book?",
      icon: "warning",
      dangerMode: true,
    })
      .then(willDelete => {
        if (willDelete) {
          this.props.deleteBook(bookId, this.props.history);
          swal("Deleted!", "Your imaginary file has been deleted!", "success");
        }
      });
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
        <ShowBook
          book={this.props.book}
          states={this.state}
          user={this.props.user}
          onChange = {this.onChange.bind(this)}
          borrowBook = {this.borrowBook.bind(this)}
          onDeleteBook = {this.onDeleteBook.bind(this)}
          openEditBookModal = {this.openEditBookModal.bind(this)}
          openUploadWidget = {this.openUploadWidget.bind(this)}
          saveBook = {this.saveBook.bind(this)}
        />
      </div>
    );
  }
}

GetBook.propTypes = propTypes;

GetBook.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categories: state.categories.categories.categories,
  user: state.auth,
  book: state.book.book,
});


export default connect(mapStateToProps, { borrowBook, getBookById, deleteBook, updateBook })(GetBook);

