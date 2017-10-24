import React from 'react';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Modal } from 'react-materialize';
import Footer from '../footer/footer.jsx';
import Header from '../header/header.jsx';

const BookList = (props) => {
    const title = props.title ? props.title : "Our Collection";
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
    const userRole = props.user.user.role;
    const borrowText = "BORROW BOOK";

    const userAction = book => (<Button waves="light" className="button-borrow" onClick={() => props.borrowBook(book.id, userId)} disabled= {isDisabled} >{borrowText}</Button>);
    const adminAction = (<div className="valign-wrapper"><span><Link to="#"><i className="fa fa-edit fa-2x" /></Link>
    </span><span><Link to="#"><i className="fa fa-trash fa-2x"/></Link></span></div>);


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
                        {userRole === "admin" ? adminAction : userAction(book) }
                    </div>
                </div>

            </Col>

        )) : <h4>No books here!!!</h4>;

    return (
        <div>
            <Header />
            <main>
                <Modal
                    id="foo">
                    <div className="book-info" />
                </Modal>
                <div className="container">
                    <div><h4>{title}</h4></div>

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
