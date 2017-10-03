import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './Header/header';
import Footer from './Footer/footer';
import { getBooks, setBooks, deleteBook } from '../actions/books';
import { addFlashMessage } from '../actions/flashmessages';


/**
 * 
 * 
 * @class LibraryBooks
 * @extends {Component}
 */
class LibraryBooks extends Component {
    /**
     * Creates an instance of LibraryBooks.
     * @param {any} props 
     * @memberof LibraryBooks
     */
    constructor(props) {
        super(props);
        this.state = {};
        this.handleDeleteBook = this.handleDeleteBook.bind(this);
    }

    /**
     * 
     * @returns {Books} This fetches books from the api
     * @memberof LibraryBooks
     */
    componentDidMount() {
        this.props.getBooks()
            .then(() => this.setState(() => ({ books: this.props.books })));
    }

    /**
     * 
     * 
     * @returns {void}
     * @param {any} id 
     * @memberof LibraryBooks
     */
    handleDeleteBook(id) {
        if (window.confirm("Are you sure you want to delete this book?") == true) {
            this.props.deleteBook(id);
            window.location.reload();
        } else {
            alert("You pressed Cancel!");
        }
    }

    /**
     * 
     * 
     * @returns {books} This displays all the books in the library
     * @memberof LibraryBooks
     */
    render() {
        const bookList = this.props.books && this.props.books && this.props.books.length ?
            this.props.books.map((book, index) => (
                <tr key={book.id}>
                    <th scope="row">{index + 1}</th>
                    <td><a href={`/book/${book.id}`}> {book.title} </a> </td>
                    <td>{book.category}</td>
                    <td>{book.author}</td>
                    <td>{book.quantity}</td>
                    <td><Link to={`/editbook/${book.id}`} >Edit</Link></td>
                    <td><button><span className="fa fa-trash" onClick={() => this.handleDeleteBook(book.id)} /> </button></td>
                </tr>

            )) : <tr><td>There are no books in the library yet</td></tr>;
        return (
            <div>
                <Header />
                <div className="container">
                    <div><h3>All Books</h3></div>
                    <div className="row">

                        <div className="pull-right"><a href="/addbook" className="btn btn-info">Create New Book </a>
                            <a className="btn btn-success" href="/books/categories">View All Categories</a>
                        </div>

                        <table className="table  sortable table-bordered table-responsive">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Author</th>
                                    <th>Quantity</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody >
                                {bookList}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Footer />
            </div>

        );
    }
}

LibraryBooks.proptypes = {
    books: PropTypes.array.isRequired,
    getBooks: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired
};

LibraryBooks.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    books: state.books.books
});
export default connect(mapStateToProps, { getBooks, addFlashMessage, setBooks, deleteBook })(LibraryBooks);

