import React from 'react';
import { Pagination } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import { InfiniteScroll } from 'react-infinite-scroll';

import { Row, Col, Modal } from 'react-materialize';
import Header from '../header/header.jsx';
import SideBar from './sidebar.jsx';
import BookForm from './addbookForm.jsx';

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

    const books = props.books && props.books.length ?
        props.books.map((book) => (
            <Col s={6} m={4} l={3} key={book.id}>
                <ReactTooltip />
                <Link
                    data-tip={`<h5>${book.title}</h5>
                    <p>Written by: ${book.author}</p>
                    <p>Edition: ${book.bookEdition}</p>
                    <p>Size: ${book.bookSize} pages</p>
                    <p>Published by: ${book.publisher}</p>
                    *******
                    <p>${book.description}</p>
                  `}
                    data-html data-class="book-tooltip" data-place="right" data-multiline
                    to={`/book/show/${book.id}`}
                >
                    <img src={book.image} className="bookcover"/>
                </Link>
            </Col>

        )) : <h4>No books here!!!</h4>;

    const adminLinks = (
        <span>
            <div>
                <Link to="#" onClick={props.openAddBookModal}>Add new Book</Link>
            </div>
            <Link to="#" onClick={props.openAddCategoryModal}>Add new Category</Link>
        </span>
    );

    return (
        <div>
            <Header />
            <main>
                <Modal
                    id= "addBook">
                    <BookForm
                        saveBook = {props.saveBook}
                        states={props.states}
                        onChange={props.onChange}
                        categories={props.categories}
                    />
                </Modal>
                <Modal
                    id= "addCategory">
                    <BookForm
                        saveBook = {props.saveBook}
                        states={props.states}
                        onChange={props.onChange}
                        categories={props.categories}
                    />
                </Modal>
                <SideBar
                    categories={props.categories}
                    user={props.user}
                />
                <div className="books-container">
                    <Row>
                        <Col s={6} m={6} l={6}>
                            <h5>{title}</h5>
                        </Col>
                        <Col s={6} m={6} l={6}>
                            {adminLinks}
                        </Col>
                    </Row>
                    <Row>
                        {books}
                    </Row>
                    <div className="pager">
                        {pagination}
                    </div>
                </div>

            </main>
        </div>
    );
};


export default BookList;
