/* eslint-disable require-jsdoc */
import { connect } from 'react-redux';
import React, { Component } from 'react';
import Header from './Header/header';
import Footer from './Footer/footer';
import { getBook, fetchBook } from '../actions/books';
import { addFlashMessage } from '../actions/flashmessages';

class SingleBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            category: '',
            quantity: '',
            author: '',
            isbn: '',
            edition: '',
            publisher: '',
            size: '',
            image: '',
            canBorrow: false

        };
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
    render() {
        if (this.props.books.loading) {
            return (<div>Loading...</div>);
        } else {
            return (
                <div>
                    <Header />
                    <div className="container container-me">
                        <div><h3>{this.state.title} </h3></div>
                        <div className="row">
                            <div className="col-md-3">
                                <img src="images/cook.jpeg" className="book_image" />
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
                            <div className="col-ava">
                                {this.state.quantity >= 1 &&
                                <h3> Book Available
                                    <button className="btn btn-info btn-lg">Borrow Book</button>
                                </h3>
                                }
                                {this.state.quantity < 1 && <h3>  Book not Available</h3> }

                            </div>
                        </div>
                    </div>

                    <Footer />
                </div>
            );
        }
    }
}

SingleBook.proptypes = {
    books: React.PropTypes.object.isRequired,
    getBooks: React.PropTypes.func.isRequired
};


SingleBook.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    books: state.books
});

export default connect(mapStateToProps, { getBook, addFlashMessage, fetchBook })(SingleBook);
// export default SingleBook;
