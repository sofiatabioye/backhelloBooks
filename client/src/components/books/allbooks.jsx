import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getBooks, borrowBook } from '../../actions/bookActions';
import { getCategories } from '../../actions/categoryActions';
import BookList from './booksList.jsx';
import Header from '../header/header.jsx';


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
            categories: [],
            isDisabled: false,
            offset: 0,
            numPerPage: 8,
            activePage: 1,
            numOfPages: 0
        };
        this.handleSelect = this.handleSelect.bind(this);
        this.borrowBook = this.borrowBook.bind(this);
    }


    /**
     * 
     * @returns {Books} This fetches all books from the api
     * @memberof Books
     */
    componentDidMount() {
        this.props.getBooks(this.state.offset, this.state.numPerPage);
        this.props.getCategories();
    }

    /**
     * 
     * @returns {void}
     * @param {any} nextProps 
     * @memberof Books
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.books) {
            this.setState({ books: nextProps.books,
                numOfPages: nextProps.pager.pageCount
            });
        }
        if (nextProps.categories) {
            this.setState({
                categories: nextProps.categories.categories });
        }
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
        // const userId = this.props.auth.user.user;
        // const bookId = this.state.book.id;
        this.props.borrowBook(userId, bookId);
    }
    /**
     * 
     * 
     * @returns {Books} This displays all books for authenticated users to see
     * @memberof Books
     */
    render() {
        return (
            <div>
                <Header categories= {this.props.categories} user= {this.props.user}/>
                <BookList books ={this.state.books}
                    user = {this.props.user}
                    isDisabled = {this.state.isDisabled}
                    categories = {this.props.categories}
                    bookModal = {this.bookModal}
                    numOfPages ={this.state.numOfPages}
                    numPerPage={this.state.numPerPage}
                    activePage= {this.state.activePage}
                    borrowBook = {this.borrowBook.bind(this)}
                    handleSelect={this.handleSelect.bind(this)} />
            </div>
        );
    }
}

Books.proptypes = {
    getBooks: PropTypes.object.isRequired,
};
Books.contextTypes = {
    router: PropTypes.object.isRequired
};
const mapDispatchToProps = { getBooks, getCategories, borrowBook };
const mapStateToProps = state => ({
    books: state.books.books,
    pager: state.books.pagination,
    categories: state.categories.categories,
    user: state.auth
});


export default connect(mapStateToProps, mapDispatchToProps)(Books);
