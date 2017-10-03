import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';

import Header from './Header/header';
import BooksFooter from './Footer/footer';
import { getBooks } from '../actions/books';


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
            currentPageNumber: 0,
            totalItems: 0,
            itemsPerPage: 0
        };
        this.handleSelect = this.handleSelect.bind(this);
    }


    /**
     * 
     * @returns {Books} This fetches all books from the api
     * @memberof Books
     */
    componentDidMount() {
        this.props.getBooks();
    }


    /**
     * 
     * @returns {CurrentPageNumber} This returns the current number of the page
     * @param {any} number 
     * @memberof Books
     */
    handleSelect(number) {
        this.setState({ currentPageNumber: number });
    }

    /**
     * 
     * 
     * @returns {Books} This displays all books for authenticated users to see
     * @memberof Books
     */
    render() {
        const pager = this.props.pager;
        const bookList = this.props.books && this.props.books && this.props.books.length ?
            this.props.books.map((book) => (
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

            )) : <h4>There are no books in the library</h4>;

        return (
            <div>
                <Header />
                <div className="container">
                    <div><h3>Our Collection</h3></div>
                    <div className="row">
                        {bookList}
                    </div>
                    <Pagination
                        bsSize="medium"
                        items={8}
                        activePage={2}
                        onSelect={this.handleSelect}/>
                </div>
                <BooksFooter />
            </div>
        );
    }
}

Books.proptypes = {
    books: PropTypes.array.isRequired,
    getBooks: PropTypes.func.isRequired
};

Books.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    books: state.books.books,
    pager: state.books.pagination
});


export default connect(mapStateToProps, { getBooks, })(Books);
