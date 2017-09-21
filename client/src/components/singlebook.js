/* eslint-disable require-jsdoc */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notifications, { notify } from 'react-notify-toast';
import React, { Component } from 'react';
import Header from './Header/header';
import Footer from './Footer/footer';
import { fetchBook, borrowBook } from '../actions/books';
import FlashMessagesList from './flash/FlashMessagesList';

class SingleBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: "",
            message: " ",
            isLoading: false,
            canBorrow: false,
        };
        this.borrowbook = this.borrowbook.bind(this);
        this.show = notify.createShowQueue();
    }

    componentDidMount() {
        this.props.fetchBook(this.props.match.params.id);
    }

    borrowbook() {
        const userId = this.props.auth.user.user;
        const bookId = this.props.books.books.id;
        this.props.borrowBook(userId, bookId, this.props.history).then(() => {
         notify.toast("sucesss")
        },
        (err) => {notify.toast("failure")});
        
    }
   

    render() {
        const error = this.props.books.errors;
        const success = this.props.books.message;
        const errorMessage = error ? error : "";
        const book = this.props.books.books;   
        const bookstat= book ? book : '';
        const { isLoading, canBorrow, errors } = this.state;
        const BorrowButton = (
            <div className="col-ava">
                {book.quantity >= 1 &&
                <h3> Book Available
                    <button className="btn btn-info btn-lg" onClick={this.borrowbook}>Borrow Book</button>
                </h3>
                }
                {book.quantity < 1 && <h3>  Book not Available</h3> }
            </div>
        );
        return (
            <div>
                <Header />
                 
                <div className="container container-me">
                    <Notifications />
                    <FlashMessagesList /> 
                    
                    <div><h3>{book.title} </h3></div>
                    
                    <div className="row">
                        <div className="col-md-3">
                            <img src="images/cook.jpeg" className="book_image" role="presentation"/>
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

                <Footer />
            </div>
        );
        // }
    }
}

SingleBook.proptypes = {
    books: PropTypes.array.isRequired,
    fetchBook: PropTypes.func.isRequired,
    borrowBook: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
};


SingleBook.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    books: state.books,
    auth: state.auth,
    errors: state.books.errors

});

export default connect(mapStateToProps, { fetchBook, borrowBook, FlashMessagesList, Notifications})(SingleBook);

