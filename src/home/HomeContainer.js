import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import RequestCounter from './RequestCounter.js';

function HomeContainer() {
  return (
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
  );
}

export default HomeContainer;
