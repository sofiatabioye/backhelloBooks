import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { swal } from 'sweetalert2';

import { getBooks, borrowBook, saveBooks, deleteBook } from '../../actions/bookActions';
import { getCategories } from '../../actions/categoryActions';
import { logout } from '../../actions/authActions';
import validateBook from '../utils/validateBook.jsx';
import BookList from './booksList.jsx';

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

        };
        this.handleSelect = this.handleSelect.bind(this);
        this.borrowBook = this.borrowBook.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onAddBook = this.onAddBook.bind(this);
        this.openAddBookModal = this.openAddBookModal.bind(this);
        this.openAddCategoryModal = this.openAddCategoryModal.bind(this);
        this.openUploadWidget = this.openUploadWidget.bind(this);
        this.showBook = this.showBook.bind(this);
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
        });
        if (nextProps.books && (nextProps.pager !== undefined)) {
            this.setState({
                books: nextProps.books,
                numOfPages: nextProps.pager.pageCount
            });
        }
    }

    openAddBookModal() {
        const modal = $('#addBook');
        $('#addBook').modal('open');
    }

    openAddCategoryModal() {
        const modal = $('#addCategory');
        $('#addCategory').modal('open');
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

    /**
     * 
     * @returns {changedInput} This saves input as it is changed
     * @param {any} e 
     * @memberof AddBook
     */
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        console.log(this.state);
    }
    /**
     * 
     * @returns {changedInput} This saves input as it is changed
     * @param {any} book 
     * @memberof AddBook
     */
    showBook(book) {
        this.setState({ book: book });
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
        this.props.getBooks(offset, this.state.numPerPage);
    }

    /**
     * 
     * 
     * @returns  {validatedInput} This checks if form input is correct
     * @memberof AddBook
     */
    isValid() {
        const { errors, isValid } = validateBook(this.state);
        if (!isValid) {
            this.setState({ errors });
            return;
        }
        return isValid;
    }
    /**
     * 
     * @returns {void}
     * @param {any} event 
     * @memberof AddBook
     */
    onAddBook(event) {
        event.preventDefault();
        console.log("hello");
        if (this.isValid()) {
            this.props.saveBooks(this.state, this.props.history);
        }
    }

    /**
     * @returns {Book } returns book information
     * @param {any} book 
     * @memberof Books
     */
    openBook(book) {
        this.setState({ books: book });
    }


    /**
     * @param {userId} user
     * @param {bookId} book
     * @param {event} event 
     * @return {userId, bookId} borrows book
     * @memberof Books
     */
    borrowBook(userId, bookId) {
        this.props.borrowBook(userId, bookId, this.props.history);
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
                    isDisabled = {this.state.isDisabled}
                    openBook = {this.openBook}
                    onAddBook= {this.onAddBook.bind(this)}
                    onChange = {this.onChange.bind(this)}
                    states= {this.state}
                    openAddBookModal = {this.openAddBookModal.bind(this)}
                    openAddCategoryModal = {this.openAddCategoryModal.bind(this)}
                    numOfPages ={this.state.numOfPages}
                    numPerPage={this.state.numPerPage}
                    activePage= {this.state.activePage}
                    saveBook = {this.onAddBook.bind(this)}
                    borrowBook = {this.borrowBook.bind(this)}
                    openUploadWidget = {this.openUploadWidget.bind(this)}
                    handleSelect={this.handleSelect.bind(this)} />
            </div>
        );
    }
}

Books.propTypes = {
    getBooks: PropTypes.func.isRequired,
    saveBooks: PropTypes.func,
};

Books.contextTypes = {
    router: PropTypes.object.isRequired
};
const mapDispatchToProps = { getBooks, getCategories, borrowBook, saveBooks, deleteBook, logout };

const mapStateToProps = state => ({
    books: state.books.books,
    pager: state.books.pagination,
    user: state.auth,
    categories: state.categories.categories.categories
});


export default connect(mapStateToProps, mapDispatchToProps)(Books);
