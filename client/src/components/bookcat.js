import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from './Header/header';
import Footer from './Footer/footer';
import { getBooksByCat } from '../actions/books';


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
            books: []
        };
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


    /**
     * 
     * 
     * @returns {Books} By category
     * @memberof BookCat
     */
    render() {
        const { book } = this.state;
        const books = this.props.books;
        const title = this.props.match.params.title;
        const bookList = books && books.length ?
            books.map((book) => (
                <div className="col-md-3" key={book.id}>
                    <a href={`/book/${book.id}`}>
                        <div className="bookbox">
                            <img src={book.image} className="bookcover" role="presentation" />
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
                        {this.props.children}
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

BookCat.proptypes = {
    bookcat: PropTypes.array.isRequired,
};

BookCat.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    books: state.books.books.books,
});


export default connect(mapStateToProps, { getBooksByCat, })(BookCat);

