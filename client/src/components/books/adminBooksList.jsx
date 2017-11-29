import React from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';

export const Books = (props) => {
    const pagination = (
        <Pagination
            className={props.books.length === 0 ? 'hidden' : 'shown'}
            prev
            next
            first
            last
            ellipsis
            items={props.numOfPages}
            activePage={props.activePage}
            onSelect={props.handleSelect}/>
    );
    const modalDialog = (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Delete book?</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                  Are you sure you want to delete book?
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary" onClick={() => props.handleDeleteBook()}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );

    const bookList = props.books && props.books && props.books.length ?
        props.books.map((book, index) => (
            <tr key={book.id}>
                <th scope="row">{index + 1}</th>
                <td><Link to={`/book/${book.id}`}> {book.title} </Link> </td>
                <td>{book.category}</td>
                <td>{book.author}</td>
                <td>{book.quantity}</td>
                <td><Link to={`/editbook/${book.id}`} >Edit</Link></td>
                <td><button onClick={() => props.handleDeleteBook(book.id)}><span className="fa fa-trash" /> </button></td>
            </tr>

        )) : <tr><td>There are no books in the library yet</td></tr>;

    return (
        <div>
            <Header />
            <div className="container">
                <div><h3>Our Collection</h3></div>
                <div className="row">
                    <div className="pull-right"><a href="/addbook" className="btn btn-info">Create New Book </a>
                        <a className="btn btn-success" href="/books/categories">View All Categories</a>
                    </div>

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
                        <tbody >
                            {bookList}
                        </tbody>
                    </table>
                </div>
                {pagination}
            </div>
            <Footer />
            {modalDialog}
        </div>
    );
};


export default Books;
