import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Alert, Card, Col, Row, Spinner } from 'react-bootstrap';

import fakeApi from '../fake-api/FakeApi.js';

function RequestCounter({ headerText, linkRef, linkText, requestStatusTypes }) {
  const [count, setCount] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  let contentElement;

  useEffect(() => {
    (async () => {
      setError(undefined);
      setIsLoading(true);

      try {
        setCount(await fakeApi.getRequestCountAsync(requestStatusTypes));
      } catch (e) {
        setError(e);
        setCount(undefined);
      }

      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    contentElement = (
      <Row>
        <Col>
          <Spinner animation="grow" role="status" variant="primary">
            <span className="sr-only">Loading...</span>
          </Spinner>
          <span>Loading...</span>
        </Col>
      </Row>
    );
  } else if (error) {
    contentElement = (
      <Alert variant="danger">
        <Alert.Heading>Failed to Load Request Count</Alert.Heading>
        <pre>{error.toString()}</pre>
      </Alert>
    );
  } else {
    contentElement = <h1>{count}</h1>;
  }

  return (
    <Card className="text-center">
      <Card.Header>{headerText}</Card.Header>
      <Card.Body>{contentElement}</Card.Body>
      <Card.Footer>
        <Card.Link href={linkRef}>{linkText}</Card.Link>
      </Card.Footer>
    </Card>
  );
}

RequestCounter.propTypes = {
  headerText: PropTypes.string.isRequired,
  linkRef: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  requestStatusTypes: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default RequestCounter;
