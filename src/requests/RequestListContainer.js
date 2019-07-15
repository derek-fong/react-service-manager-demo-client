import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import {
  Alert,
  Breadcrumb,
  Col,
  Container,
  Row,
  Spinner
} from 'react-bootstrap';

import RequestList from './RequestList';

const queryGetRequests = gql`
  query GetRequests {
    allRequests {
      id
      title
      status
      createdAt
    }
  }
`;

const RequestListContainer = () => (
  <Query query={queryGetRequests}>
    {({ data, error, loading }) => {
      let contentElement;

      document.title = 'Requests - React Service Manager';

      if (loading) {
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
      } else {
        if (error) {
          contentElement = (
            <Alert variant="danger">
              <Alert.Heading>Failed to Load Requests</Alert.Heading>
              <pre>{error.message}</pre>
            </Alert>
          );
        } else {
          const requests = data.allRequests;

          if (requests && requests.length > 0) {
            contentElement = <RequestList requests={requests} />;
          } else {
            contentElement = <p>No requests (yet)! </p>;
          }
        }
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
    }}
  </Query>
);

export default RequestListContainer;
