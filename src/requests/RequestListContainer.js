import React, { useEffect, useState } from 'react';
import {
  Alert,
  Breadcrumb,
  Col,
  Container,
  Row,
  Spinner
} from 'react-bootstrap';

import RequestList from './RequestList';
import fakeApi from '../fake-api/FakeApi';

function useRequests() {
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState(undefined);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    (async () => {
      setError(undefined);
      setIsLoading(true);

      try {
        setRequests(await fakeApi.getAllRequestsAsync());
      } catch (e) {
        setError(e);
        setRequests(undefined);
      }

      setIsLoading(false);
    })();
  }, []);

  return { error, isLoading, requests };
}

function RequestListContainer() {
  const { error, isLoading, requests } = useRequests();
  let contentElement;

  document.title = 'Requests | React Service Manager';

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
  } else if (requests) {
    if (requests.length > 0) {
      contentElement = <RequestList requests={requests} />;
    } else {
      contentElement = <p>No requests (yet)! </p>;
    }
  } else if (error) {
    contentElement = (
      <Alert variant="danger">
        <Alert.Heading>Failed to Load Requests</Alert.Heading>
        <pre>{error.toString()}</pre>
      </Alert>
    );
  }

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Requests</Breadcrumb.Item>
      </Breadcrumb>
      <h1>Request List</h1>
      {contentElement}
    </Container>
  );
}

export default RequestListContainer;
