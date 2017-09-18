/* eslint-disable require-jsdoc */
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notifications, { notify } from 'react-notify-toast';
import React, { Component } from 'react';
import Header from './Header/header';
import Footer from './Footer/footer';
import { fetchBook, borrowBook } from '../actions/books';


class SingleBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            canBorrow: false,
        };
        this.borrowbook = this.borrowbook.bind(this);
    }

    componentDidMount() {
        this.props.fetchBook(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.books.books.title,
            description: nextProps.books.books.description,
            category: nextProps.books.books.category,
            isbn: nextProps.books.books.ISBN,
            size: nextProps.books.books.bookSize,
            quantity: nextProps.books.books.quantity,
            author: nextProps.books.books.author,
            edition: nextProps.books.books.bookEdition,
            publisher: nextProps.books.books.publisher,
            image: "none for now"
        });
    }

    borrowbook() {
        // notify.show('Toasty!');
        const userId = this.props.auth.user.user;
        const bookId = this.props.books.books.id;
        this.props.borrowBook(userId, bookId).then(
            (res) => {
                //this.setState({ canBorrow: true });
                // notify.toast('success');
            },
            (errors) => {
                // notify.toast("error");
                console.log(this.props.books.errors);
            }
        );
    }

    render() {
        const { isLoading, canBorrow } = this.state;

        const BorrowButton = (
            <div className="col-ava">
                {this.state.quantity >= 1 &&
                <h3> Book Available
                    <button className="btn btn-info btn-lg" onClick={this.borrowbook}>Borrow Book</button>
                </h3>
                }
                {this.state.quantity < 1 && <h3>  Book not Available</h3> }

            </div>
        );
        return (
            <div>
                <Header />

                <div className="container container-me">
                    <Notifications />
                    <div><h3>{this.state.title} </h3></div>
                    <div className="row">
                        <div className="col-md-3">
                            <img src="images/cook.jpeg" className="book_image" role="presentation"/>
                        </div>
                        <div className="col-md-9 singlebook_details">
                            <div> <b>Category:</b> { this.state.category }</div>
                            <div> <b>Written By:</b>  {this.state.author}</div>
                            <div><b>Edition:</b> {this.state.edition }</div>
                            <div><b>Published By:</b> {this.state.publisher}</div>
                            <div><b>ISBN:</b> {this.state.isbn }</div>
                            <br/>
                            {this.state.description }
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
    books: PropTypes.object.isRequired,
    getBooks: PropTypes.func.isRequired,
    borrowBook: PropTypes.func.isRequired,

};


SingleBook.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    books: state.books,
    auth: state.auth,
    message: state.flashMessages,
    errors: state.books.errors,
});

export default connect(mapStateToProps, { fetchBook, borrowBook })(SingleBook);

