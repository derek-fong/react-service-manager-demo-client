import React, { Fragment } from 'react';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';

import './HomeContainer.css';
import HomeCarousel from './HomeCarousel.js';
import RequestCounter from './RequestCounter.js';

function HomeContainer() {
  document.title = 'React Service Manager';

  return (
    <Fragment>
      <Jumbotron>
        <h1>React Service Manager</h1>
        <p>
          A simple request management application, written in{' '}
          <a
            title="React"
            href="https://reactjs.org/"
            rel="noopener noreferrer"
            target="_blank"
          >
            React
          </a>
          .
        </p>
      </Jumbotron>
      <div id="home-carousel-container">
        <HomeCarousel />
      </div>
      <Container>
        <Row>
          <Col>
            <RequestCounter
              id="open-request-counter"
              headerText="Open Requests"
              linkRef="/requests"
              linkText="View Requests"
              requestStatusTypes={[
                'REGISTERED',
                'IN_PROGRESS',
                'PENDING_CUSTOMER'
              ]}
            />
          </Col>
          <Col>
            <RequestCounter
              id="completed-request-counter"
              headerText="Completed Requests"
              linkRef="/requests/create"
              linkText="Create a New Request"
              requestStatusTypes={['FULFILLED', 'CLOSED']}
            />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default HomeContainer;
