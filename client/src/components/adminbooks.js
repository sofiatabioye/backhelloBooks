import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header/header';
import { Link } from 'react-router-dom';
import Footer from './Footer/footer';
import { connect } from 'react-redux';
import { getBooks, setBooks, deleteBook } from '../actions/books';
import { addFlashMessage } from '../actions/flashmessages';


/* eslint-disable require-jsdoc */
class LibraryBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleDeleteBook = this.handleDeleteBook.bind(this);
    }

    componentDidMount() {
        this.props.getBooks()
            .then(() => this.setState(() => ({ books: this.props.books })));
    }

    handleDeleteBook(id) {
        if (window.confirm("Are you sure you want to delete this book?") == true) {
            this.props.deleteBook(id);
        } else {
            alert("You pressed Cancel!");
        }
    }

    render() {
        const emptyMessage = (
            <h4>There are no books in the library yet</h4>
        );
        const bookList = this.props.books && this.props.books[0] && this.props.books[0].length ?
            this.props.books[0].map((book, index) => (
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
    books: state.books
});
export default connect(mapStateToProps, { getBooks, addFlashMessage, setBooks, deleteBook })(LibraryBooks);

