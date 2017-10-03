import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Header from './Header/header';
import BookFooter from './Footer/footer';
import { fetchBook, borrowBook } from '../actions/books';
import FlashMessagesList from './flash/FlashMessagesList';

/**
 * 
 * 
 * @class SingleBook
 * @extends {Component}
 */
class SingleBook extends Component {
    /**
     * Creates an instance of SingleBook.
     * @param {any} props 
     * @memberof SingleBook
     */
    constructor(props) {
        super(props);
        this.state = {
            errors: "",
            message: " ",
            isLoading: false,
            disabled: false,
        };

        this.borrowbook = this.borrowbook.bind(this);
        this.goback = this.goback.bind(this);
    }

    /**
     * 
     * @returns {Book} returns book by id
     * @memberof SingleBook
     */
    componentDidMount() {
        this.props.fetchBook(this.props.match.params.id);
    }

    /**
     * @returns {Book} borrowed by user
     * 
     * @memberof SingleBook
     */
    borrowbook() {
        const userId = this.props.auth.user.user;
        const bookId = this.props.books.books.id;
        this.props.borrowBook(userId, bookId, this.props.history);
    }

    /**
     * @returns {Page} previous page
     * 
     * @param {any} e 
     * @memberof SingleBook
     */
    goback(e) {
        e.preventDefault();
        window.history.go(-1);
    }


    /**
     * 
     * 
     * @returns {Book} information
     * @memberof SingleBook
     */
    render() {
        const error = this.props.errors;
        const success = this.props.message;
        const book = this.props.books.books;
        const BorrowButton = (
            <div className="col-ava">
                {book.quantity >= 1 &&
                <h3> Book Available
                    <button className="btn btn-info btn-lg" onClick={this.borrowbook} disabled={this.state.canBorrow} >Borrow Book</button>
                </h3>
                }
                {book.quantity < 1 && <h3>  Book not Available</h3> }
            </div>
        );
        return (
            <div>
                <Header />
                <div className="container container-me">
                    <button className="btn btn-sm btn-success" onClick={this.goback}>Go back</button>
                    { error !== null && <p className="red-text" >{error}</p> }
                    { success !== null && <p className="text-success" >{success}</p> }
                    <div><h3>{book.title} </h3></div>
                    <div className="row">
                        <div className="col-md-3">
                            <img src={book.image} className="book_image" role="presentation"/>
                        </div>
                        <div className="col-md-9 singlebook_details">
                            <div> <b>Category:</b> { book.category }</div>
                            <div> <b>Written By:</b>  {book.author}</div>
                            <div><b>Edition:</b> {book.bookEdition }</div>
                            <div><b>Published By:</b> {book.publisher}</div>
                            <div><b>ISBN:</b> {book.ISBN }</div>
                            <br/>
                            {book.description }
                        </div>
                        {BorrowButton}
                    </div>
                </div>
                <BookFooter />
            </div>
        );
    }
}

SingleBook.proptypes = {
    books: PropTypes.array.isRequired,
    fetchBook: PropTypes.func.isRequired,
    borrowBook: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
};


SingleBook.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    books: state.books,
    auth: state.auth,
    errors: state.books.errors,
    message: state.books.message,
});

export default connect(mapStateToProps, { fetchBook, borrowBook, FlashMessagesList })(SingleBook);

