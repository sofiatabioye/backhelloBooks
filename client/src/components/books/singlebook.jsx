import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Header from '../header/header.jsx';
import BookFooter from '../footer/footer.jsx';
import { fetchBook, borrowBook } from '../../actions/books';
import FlashMessagesList from '../flash/FlashMessagesList';

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
            book: [],
            message: "",
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
     * 
     * @returns {nextProps} update state
     * @param {any} nextProps 
     * @memberof SingleBook
     */
    componentWillReceiveProps(nextProps) {
        this.setState({ book: nextProps.books.books });
    }

    /**
     * @returns {Book} borrowed by user
     * 
     * @memberof SingleBook
     */
    borrowbook() {
        const userId = this.props.auth.user.user;
        const bookId = this.state.book.id;
        this.props.borrowBook(userId, bookId, this.props.history);
    }

    /**
     * @returns {void} previous page
     * 
     * @param {any} event
     * @memberof SingleBook
     */
    goback(event) {
        event.preventDefault();
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
        const book = this.state.book;
        const BorrowButton = (
            <div className="col-ava">
                {book.quantity >= 1 &&
                <h3> <span> Book Available </span>
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
                        <div className="col-md-3 col-sm-3 col-lg-3">
                            <img src={book.image} className="book_image" role="presentation"/>
                        </div>
                        <div className="col-md-9 col-sm-9 col-lg-3 singlebook_details">
                            <div> <b>Category:</b> { book.category }</div>
                            <div> <b>Written By:</b>  {book.author}</div>
                            <div><b>Edition:</b> {book.bookEdition }</div>
                            <div><b>Published By:</b> {book.publisher}</div>
                            <div><b>ISBN:</b> {book.ISBN }</div>
                            <br/>
                            {book.description }
                        </div>
                        <p>  {BorrowButton}  </p>
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

