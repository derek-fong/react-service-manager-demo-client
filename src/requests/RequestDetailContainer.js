import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import {
  Alert,
  Breadcrumb,
  Col,
  Container,
  Row,
  Spinner,
  Tabs,
  Tab
} from 'react-bootstrap';

import RequestDetail from './RequestDetail';
import fakeApi from '../fake-api/FakeApi';
import CommentsContainer from '../comments/CommentsContainer';

function RequestDetailContainer({ match }) {
  // Show error alert if route parameter does not contain a request ID.
  if (
    !(
      match &&
      Object.prototype.hasOwnProperty.call(match, 'params') &&
      match.params &&
      Object.prototype.hasOwnProperty.call(match.params, 'id') &&
      match.params.id
    )
  ) {
    return (
      <Container>
        <h1>Request Detail</h1>
        <Alert variant="danger">
          <Alert.Heading>Failed to retrieve Request Detail</Alert.Heading>
          <p>Request ID is invalid or undefined. </p>
        </Alert>
      </Container>
    );
  }

  const requestId = match.params.id;
  document.title = `${requestId} | Service Manager`;

  const [request, setRequest] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setError(undefined);
      setIsLoading(true);

      try {
        setRequest(await fakeApi.getRequestAsync(requestId));
      } catch (e) {
        setError(e);
        setRequest(undefined);
      }

      setIsLoading(false);
    })();
  }, []);

  let contentElement;

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
      <Fragment>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/requests">Requests</Breadcrumb.Item>
          <Breadcrumb.Item active>{requestId}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>Request Detail - {requestId}</h1>
        <Alert variant="danger">
          <Alert.Heading>Failed to Load Request Detail</Alert.Heading>
          <pre>{error.toString()}</pre>
        </Alert>
      </Fragment>
    );
  } else if (request) {
    const handleSubmitRequest = async req => {
      setError(undefined);
      setIsLoading(true);

      try {
        setRequest(await fakeApi.updateRequestAsync(req));
      } catch (e) {
        setError(e);
        setRequest(false);
      }

      setIsLoading(false);
    };

    contentElement = (
      <Fragment>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="/requests">Requests</Breadcrumb.Item>
          <Breadcrumb.Item active>{requestId}</Breadcrumb.Item>
        </Breadcrumb>
        <h1>Request Detail - {request.id}</h1>
        <Tabs defaultActiveKey="detail">
          <Tab eventKey="detail" title="Detail">
            <RequestDetail
              id={request.id}
              title={request.title}
              description={request.description}
              status={request.status}
              createdAt={request.createdAt}
              createdBy={request.createdBy}
              updatedAt={request.updatedAt}
              updatedBy={request.updatedBy}
              onSubmitRequest={handleSubmitRequest}
            />
          </Tab>
          <Tab eventKey="comments" title="Comments">
            <CommentsContainer referenceId={request.id} />
          </Tab>
        </Tabs>
      </Fragment>
    );
  }

  return <Container>{contentElement}</Container>;
}

RequestDetailContainer.propertyTypes = {
  match: PropTypes.shape({
    param: PropTypes.shape({ id: PropTypes.string })
  }).isRequired
};

export default RequestDetailContainer;
