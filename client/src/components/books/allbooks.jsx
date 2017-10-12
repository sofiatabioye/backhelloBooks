import React, { Component } from 'react';
import { connect } from 'react-redux';


import { getBooks } from '../../actions/books';
import BookList from './booksList.jsx';

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
            offset: 0,
            numPerPage: 3,
            activePage: 1,
            numOfPages: 0
        };
        this.handleSelect = this.handleSelect.bind(this);
    }


    /**
     * 
     * @returns {Books} This fetches all books from the api
     * @memberof Books
     */
    componentDidMount() {
        this.props.getBooks(this.state.offset, this.state.numPerPage);
    }

    /**
     * 
     * @returns {void}
     * @param {any} nextProps 
     * @memberof Books
     */
    componentWillReceiveProps(nextProps) {
        this.setState({ books: nextProps.books, numOfPages: nextProps.pager.pageCount, categories: nextProps.categories });
    }
    /**
     * 
     * @returns {void} This returns the current number of the page
     * @param {any} e 
     * @memberof Books
     */
    handleSelect(e) {
        this.setState({ activePage: e });
        const offset = this.state.numPerPage * (e - 1);
        this.props.getBooks(offset, this.state.numPerPage);
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
                <BookList books ={this.state.books}
                    numOfPages ={this.state.numOfPages}
                    numPerPage={this.state.numPerPage}
                    activePage= {this.state.activePage}
                    handleSelect={this.handleSelect.bind(this)} />
            </div>
        );
    }
}


const mapStateToProps = state => ({
    books: state.books.books,
    pager: state.books.pagination,
});


export default connect(mapStateToProps, { getBooks })(Books);
