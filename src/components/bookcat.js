import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header/header';
import Footer from './Footer/footer';
import { connect } from 'react-redux';
import { getBooksByCat } from '../actions/books';

/* eslint-disable require-jsdoc */
class BookCat extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getBooksByCat(this.props.match.params.title);
    }

    render() {
        const books = this.props.books;
        const title = this.props.match.params.title;
        const bookList = books && books.length ?
            books.map((book) => (
                <div className="col-md-3" key={book.id}>
                    <a href={`/book/${book.id}`}>
                        <div className="bookbox">
                            <img src="../assets/images/home.png" className="bookcover" role="presentation" />
                            <div className="booktitle">{book.title}</div>
                            <div className="bookcat"><span className="glyphicon glyphicon-tag" /> {book.category}</div>
                            <div className="description">{book.description}...</div>
                        </div>
                    </a>
                </div>

            )) : <h4>There are no books in this category</h4>;

        return (
            <div>
                <Header />
                <div className="container">
                    <div><h3>{title}</h3></div>
                    <div className="row">
                        {bookList}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

BookCat.proptypes = {
    bookcat: PropTypes.array.isRequired,
    //getBooks: PropTypes.func.isRequired
};

BookCat.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    books: state.books.books.books,
});


export default connect(mapStateToProps, { getBooksByCat, })(BookCat);

