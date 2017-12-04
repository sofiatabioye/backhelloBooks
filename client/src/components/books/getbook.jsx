import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import { borrowBook, getBookById, deleteBook, updateBook } from '../../actions/bookActions';
import ShowBook from './viewbook.jsx';
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
    this.onChange = this.onChange.bind(this);
    this.openEditBookModal = this.openEditBookModal.bind(this);
    this.saveBook = this.saveBook.bind(this);
    this.openUploadWidget = this.openUploadWidget.bind(this);
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
    $(document).ready(() => {
      $('select').material_select();
      $('.collapsible').collapsible();
    });

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
     * 
     * @returns {void} 
     * @param {any} event 
     * @memberof Books
     */
  onChange(event) {
    event.preventDefault();
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  /**
     * @returns {void} borrows book
     * @param {any} userId
     * @memberof Books
     */
  borrowBook(userId, bookId) {
    this.props.borrowBook(userId, bookId, this.props.history);
  }

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

  /**
     * @returns {Image} This uploads the image to cloudinary
     * 
     * @memberof AddBook
     */
  openUploadWidget() {
    cloudinary.openUploadWidget({ cloud_name: 'ddvm5tzhm', upload_preset: 'sxzf4j4p', tags: ['books'], public_id: this.state.public_id, version: this.state.imageVersion },
      (error, result) => {
        this.setState({
          image: result[0].url,
          imageName: result[0].original_filename,
          public_id: result[0].public_id,
          imageVersion: result[0].version,
        });
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
          book={this.props.book || {}}
          user= {this.props.user}
          states={this.state}
          categories ={this.props.categories}
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

GetBook.propTypes = {
  books: PropTypes.array,
  getBookById: PropTypes.func.isRequired,
};

GetBook.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  categories: state.categories.categories.categories,
  user: state.auth,
  book: state.book.book,
});


export default connect(mapStateToProps, { borrowBook, getBookById, deleteBook, updateBook })(GetBook);

