import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-materialize';
import PropTypes from 'prop-types';

import Header from '../header/header.jsx';
import SideBar from '../sidebar/sidebar.jsx';

const propTypes = {
  books: PropTypes.object,
  numOfPages: PropTypes.number,
  activePage: PropTypes.number,
  handleSelect: PropTypes.func,
  handleReturnBook: PropTypes.func,
  userPage: PropTypes.string,

};
const UserRecordsDisplay = (props) => {
  const books = props.books.borrowedBooks;
  const title = props.userPage === '/books/borrowhistory' ? 'Borrow History' : 'Borrowed Books';
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

  const historyCol = (book) => (<td>
    {
      isEmpty(book.dateReturned) ? "" : moment(book.dateReturned).format('MM/DD/YYYY') }
  </td>
  );
  const returned = (book) => (
    <td>{ isEmpty(book.dateReturned) ? "Not Returned" : "Returned" }</td>
  );
  const profileCol = (book) => (
    <td>
      <button
        type="submit"
        onClick={() => props.handleReturnBook(book.book_id)}
        className="btn btn-md btn-info btn-borrow">
        Return Book
      </button>
    </td>
  );
  const booklist = (
    <table className="bordered">
      <thead className="blue-grey lighten-4">
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Borrow Date</th>
          <th>Return Due Date</th>
          { props.userPage === '/books/borrowhistory' ? <th>Return Date</th> : <th>Return</th>}
          { props.userPage === '/books/borrowhistory' ? <th>Status</th> : null}
        </tr>
      </thead>
      { books && books.UserBorrowHistory ?
        books.UserBorrowHistory.map((book, index) => (
          <tbody key={book.id}>
            <tr>
              <th scope="row">{index + 1 }</th>
              <td><Link to={`/book/show/${book.book_id}`}>{book.Book.title}</Link></td>
              <td>{moment(book.borrowDate).format('MM/DD/YYYY')}</td>
              <td>{moment(book.expectedReturnDate).fromNow()}</td>
              { props.userPage === '/books/borrowhistory' ? historyCol(book) : profileCol(book)}
              { props.userPage === '/books/borrowhistory' ? returned(book) : null }
            </tr>
          </tbody>
        )) : <tbody><tr><td>You have not borrowed any books</td></tr></tbody>}
    </table>);


  return (
    <div>
      <Header/>
      <Row>
        <Col s={12} m={12} l={3} className="sidebar">
          <SideBar />
        </Col>
        <Col s={12} m={12} l={9}>
          <div className="books-container">
            <Row>
              <Col s={12} m={12} l={12} >
                <div className="profile-content">
                  <h5>{title}</h5>
                  {booklist}
                </div>
              </Col>
            </Row>
            { props.userPage === '/books/borrowhistory' ? pagination : null }
          </div>
        </Col>
      </Row>
    </div>
  );
};

UserRecordsDisplay.propTypes = propTypes;

export default UserRecordsDisplay;
