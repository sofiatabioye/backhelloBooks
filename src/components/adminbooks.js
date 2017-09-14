import React, { Component } from 'react';
import Header from './Header/header';
import { Link } from 'react-router-dom';
import Footer from './Footer/footer';
import { connect } from 'react-redux';
import { getBooks, setBooks } from '../actions/books';
import { addFlashMessage } from '../actions/flashmessages';


/* eslint-disable require-jsdoc */
class LibraryBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onSubmit = this.onDelete.bind(this);
    }

    componentDidMount() {
        this.props.getBooks()
            .then(() => this.setState(() => ({ books: this.props.books })));
    }
    onDelete(e) {
        if (window.confirm("Are you sure you want to delete this book?") == true) {
            alert("You pressed OK!");
        } else {
            alert("You pressed Cancel!");
        }
    }

    render() {
        const emptyMessage = (
            <div><h4>There are no books in the library yet</h4></div>
        );
        return (
            <div>
                <Header />
                <div className="container">
                    <div><h3>All Books</h3></div>
                    <div className="row">
                        <div className="pull-right"><a href="/addbook" className="btn btn-info">Create New Book </a></div>

                        <table className="table  sortable table-bordered table-responsive">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Author</th>
                                    <th>Quantity</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            { this.props.books && this.props.books[0] && this.props.books[0].length ?
                                this.props.books[0].map((book, id) => (
                                    <tbody key={book.id}>

                                        <tr>
                                            <th scope="row">{ book.id}</th>
                                            <td><Link to={`/book/${book.id}`}> {book.title} </Link> </td>
                                            <td>{book.category}</td>
                                            <td>{book.author}</td>
                                            <td>{book.quantity}</td>
                                            <td><Link to={`/editbook/${book.id}`} >Edit</Link></td>
                                            <td><button onClick={this.onSubmit}><span className="fa fa-trash" /> </button></td>
                                        </tr>

                                    </tbody>
                                )) : emptyMessage
                            }
                        </table>


                    </div>
                </div>
                <Footer />
            </div>

        );
    }
}

LibraryBooks.proptypes = {
    books: React.PropTypes.array.isRequired,
    getBooks: React.PropTypes.func.isRequired
};

LibraryBooks.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    books: state.books
});
export default connect(mapStateToProps, { getBooks, addFlashMessage, setBooks })(LibraryBooks);

