import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getBooksByCat, borrowBook } from '../../actions/bookActions';
import { logout } from '../../actions/authActions';

import BookList from './booksList.jsx';
import Books from './allbooks.jsx';
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
            books: [],
            isDisabled: false,
            text: "",
            offset: 0,
            numPerPage: 8,
            activePage: 1,
            numOfPages: 0
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.borrowBook = this.borrowBook.bind(this);
        console.log('m in bookcat');
    }


    /**
     * 
     * @returns {Books} Gets all books belonging to a category
     * @memberof BookCat
     */
    componentDidMount() {
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

    handleSelect(event) {
        this.setState({ activePage: event });
        const offset = this.state.numPerPage * (event - 1);
        this.props.getBooks(offset, this.state.numPerPage);
    }

    /**
     * @returns {Book } returns book information
     * @param {any} book 
     * @memberof Books
     */
    bookModal(book) {
        const modal = $('#foo');
        modal.find('h4').text(book.title);
        modal.find('.book-info').text(book.description);
        $('#foo').modal('open');
    }

    /**
     * 
     * @returns {userId, bookId} borrows book
     * @memberof Books
     */
    borrowBook(userId, bookId) {
        this.props.borrowBook(userId, bookId, this.props.history);
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
                    isDisabled = {this.state.isDisabled}
                    bookModal = {this.bookModal}
                    numOfPages = {this.state.numOfPages}
                    numPerPage={this.state.numPerPage}
                    activePage= {this.state.activePage}
                    borrowBook = {this.borrowBook.bind(this)}
                    handleSelect={this.handleSelect.bind(this)}
                />
            </div>
        );
    }
}

BookCat.propTypes = {
    books: PropTypes.array.isRequired,
};

BookCat.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    books: state.booksCategory.booksCategory,
    user: state.auth
});


export default connect(mapStateToProps, { getBooksByCat, borrowBook, logout })(BookCat);

