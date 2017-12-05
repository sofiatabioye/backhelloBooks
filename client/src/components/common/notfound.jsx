import React from 'react';
import { Row, Col } from 'react-materialize';

import Header from '../header/header.jsx';
import SideBar from '../sidebar/sidebar.jsx';

const NotFound = (props) => (
  <div>
    <Header/>
    <SideBar/>
    <div className="books-container">
      <Row>
        <Col s={12} m={12} l={12} >
          <h4>Oops, the page you're looking for doesn't exist </h4>
        </Col>
      </Row>
    </div>
  </div>
);

export default NotFound;
