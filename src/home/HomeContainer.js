import React, { Fragment } from 'react';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';

import RequestCounter from './RequestCounter.js';

function HomeContainer() {
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
      <Container>
        <Row>
          <Col>
            <RequestCounter
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
