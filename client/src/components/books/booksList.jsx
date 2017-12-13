import React from 'react';
import { Pagination } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Row, Col } from 'react-materialize';
import Header from '../header/header.jsx';
import SideBarMain from '../sidebar/sidebar.jsx';

const propTypes = {
  title: PropTypes.string,
  books: PropTypes.array,
  numOfPages: PropTypes.number,
  activePage: PropTypes.number,
  handleSelect: PropTypes.func,
  errors: PropTypes.object,
  states: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  searchBook: PropTypes.func.isRequired,
};
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
      <Row>
        <Col s={12} m={12} l={3} className="sidebar">
          <SideBarMain />
        </Col>
        <Col s={12} m={12} l={9}>
          <main>
            <Row className="books-container">
              <Col s={12} m={4} l={6}>
                <h5>{title}</h5>
              </Col>
              <Col s={12} m={8} l={6}>
                <form onSubmit= {props.searchBook}>
                  <input
                    type="text"
                    placeholder="search"
                    name="searchTerm"
                    onChange= {props.onChange
                    }id="autocomplete-input"
                    className="autocomplete" />
                </form>
              </Col>

            </Row>
            <Row>
              {books}
            </Row>
            <div className="pager">
              {pagination}
            </div>
          </main>
        </Col>
      </Row>
    </div>
  );
};

BookList.propTypes = propTypes;

export default BookList;
