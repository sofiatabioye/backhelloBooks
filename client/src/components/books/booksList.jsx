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

    const bookList = props.books && props.books.length ?
        props.books.map((book) => (
            <div className="col-md-3" key={book.id}>
                <Link to={`/book/${book.id}`}>
                    <div className="bookbox">
                        <img src={book.image} className="bookcover" role="presentation" />
                        <div className="booktitle">{book.title}</div>
                        <div className="bookcat"><span className="glyphicon glyphicon-tag" /> {book.category}</div>
                        <div className="description">{book.description}...</div>

                    </div>
                </Link>
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
                {pagination}
            </div>
            <Footer />
        </div>
    );
};


export default Books;
