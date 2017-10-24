import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import AllBooks from './adminBooksList.jsx';
import { getBooks, setBooks, deleteBook } from '../../actions/bookActions';

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
        this.state = {
            books: [],
            offset: 0,
            numPerPage: 10,
            activePage: 1,
            numOfPages: 0
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.handleDeleteBook = this.handleDeleteBook.bind(this);
    }

    /**
     * 
     * @returns {Books} This fetches books from the api
     * @memberof LibraryBooks
     */
    componentDidMount() {
        this.props.getBooks(this.state.offset, this.state.numPerPage);
    }

    /**
     * 
     * @returns {nextProps} books
     * @param {any} nextProps 
     * @memberof LibraryBooks
     */
    componentWillReceiveProps(nextProps) {
        this.setState({ books: nextProps.books, numOfPages: nextProps.pager.pageCount });
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
     * @returns {void}
     * @param {any} id 
     * @memberof LibraryBooks
     */
    handleDeleteBook(id) {
        if (window.confirm("Are you sure you want to delete this book?") == true) {
            this.props.deleteBook(id);
            // window.location.reload();
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
        console.log(this.props.books);
        return (

            <div>
                <AllBooks
                    books = {this.state.books}
                    numOfPages ={this.state.numOfPages}
                    numPerPage={this.state.numPerPage}
                    activePage= {this.state.activePage}
                    handleSelect = {this.handleSelect.bind(this)}
                    handleDeleteBook={this.handleDeleteBook.bind(this)}
                />

            </div>

        );
    }
}

LibraryBooks.propTypes = {
    books: PropTypes.array.isRequired,
    getBooks: PropTypes.object.isRequired,
    deleteBook: PropTypes.object.isRequired
};


const mapStateToProps = state => ({
    books: state.books.books,
    pager: state.books.pagination,
});
export default connect(mapStateToProps, { getBooks, setBooks, deleteBook })(LibraryBooks);

