import React from 'react';
import { Pagination } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';

import { Row, Col, Modal } from 'react-materialize';
import Header from '../header/header.jsx';
import SideBar from './sidebar.jsx';
import BookForm from './bookForm.jsx';
import CategoryForm from './categoryForm.jsx';

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

    return (
        <div>
            <Header />
            <main>
                <Modal
                    id= "addBook">
                    <BookForm
                        saveBook = {props.saveBook}
                        states={props.states}
                        errors={props.errors}
                        onChange={props.onChange}
                        categories={props.categories}
                        openUploadWidget = {props.openUploadWidget}
                    />
                </Modal>
                <Modal
                    id="addCategory">
                    <CategoryForm
                        saveCategory = {props.saveCategory}
                        states={props.states}
                        onChange={props.onChange}
                    />
                </Modal>
                <SideBar
                    categories={props.categories}
                    user={props.user}
                    openAddBookModal={props.openAddBookModal}
                    openAddCategoryModal ={props.openAddCategoryModal}
                />
                <div className="books-container">
                    <Row>
                        <Col s={12} m={6} l={6}>
                            <h5>{title}</h5>
                        </Col>
                        <Col s={12} m={6} l={6}>
                            <form onSubmit= {props.searchBook}>
                                <input type="text" placeholder="search" name="searchTerm" onChange= {props.onChange}id="autocomplete-input" className="autocomplete" />
                            </form>
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
