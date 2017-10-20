import React from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Modal } from 'react-materialize';
import Footer from '../footer/footer.jsx';


const BookList = (props) => {
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
    const isDisabled = props.isDisabled;
    const userId = props.user.user.user;
    const borrowText = "BORROW BOOK";

    const borrowButton = (
        <Button waves="light" className="button-borrow" disabled= {isDisabled} >{borrowText}</Button>
    );
    const books = props.books && props.books.length ?
        props.books.map((book) => (
            <Col s={6} m={4} l={3} key={book.id}>
                <div className="bookbox">
                    <Link to="#" onClick={() => props.bookModal(book)}>
                        <img src={book.image} className="bookcover" role="presentation" />
                    </Link>
                    <div className="booktitle">{book.title}</div>
                    <div className="author">By: {book.author} </div>
                    <div className="bookcat"><i className="fa fa-tag"/>  {book.category}</div>

                    <div className="description">
                        <Button waves="light" className="button-borrow" onClick={() => props.borrowBook(book.id, userId)} disabled= {isDisabled} >{borrowText}</Button>
                    </div>
                </div>

            </Col>

        )) : <h4>There are no books in the library</h4>;

    return (
        <div>
            <main>
                <Modal
                    id="foo">
                    <div className="book-info" />
                </Modal>
                <div className="container">
                    <div><h4>Our Collection</h4></div>

                    <Row>
                        {books}
                    </Row>
                    {pagination}
                </div>
            </main>
            <Footer />
        </div>
    );
};


export default BookList;
