import React, { Component } from 'react';
import Header from './Header/header';
import { Link } from 'react-router-dom';
import Footer from './Footer/footer';
import { connect } from 'react-redux';
import { getBooks } from '../actions/books';

/* eslint-disable require-jsdoc */
class Books extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.props.getBooks();
        // .then(() => this.setState(() => ({ books: this.props.books })));
    }

    render() {
        const bookList = this.props.books && this.props.books[0] && this.props.books[0].length ?
            this.props.books[0].map((book) => (
                <div className="col-md-3" key={book.id}>
                    <a href="/singlebook">
                        <div className="bookbox">
                            <img src="../assets/images/home.png" className="bookcover" />
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
                {bookList}
                <Footer />
            </div>
        );
    }
}

Books.proptypes = {
    books: React.PropTypes.array.isRequired,
    getBooks: React.PropTypes.func.isRequired
};

Books.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    books: state.books,
});


export default connect(mapStateToProps, { getBooks, })(Books);

