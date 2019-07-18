import gql from 'graphql-tag';
import has from 'has';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
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
import CommentsContainer from '../comments/CommentsContainer';

const RequestDetailContainer = ({ match }) => {
  let requestDetailContainerElement;

  if (
    match &&
    has(match, 'params') &&
    match.params &&
    has(match.params, 'id') &&
    match.params.id
  ) {
    const requestId = match.params.id;
    const queryGetRequest = gql`
      query GetRequest($id: ID!) {
        request(id: $id) {
          id
          title
          description
          status
          createdAt
          createdBy {
            firstName
            lastName
          }
          updatedAt
          updatedBy {
            firstName
            lastName
          }
        }
      }
    `;

    requestDetailContainerElement = (
      <Query
        query={queryGetRequest}
        variables={{ id: requestId }}
        fetchPolicy="network-only"
      >
        {({ data, error, loading }) => {
          let contentElement;

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
            document.title = `Request ${requestId} - React Service Manager`;
            const header = (
              <Fragment>
                <Breadcrumb>
                  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                  <Breadcrumb.Item href="/requests">Requests</Breadcrumb.Item>
                  <Breadcrumb.Item active>{requestId}</Breadcrumb.Item>
                </Breadcrumb>
                <h1>Request Detail - {requestId}</h1>
              </Fragment>
            );

            if (error) {
              contentElement = (
                <Fragment>
                  {header}
                  <Alert variant="danger">
                    <Alert.Heading>Failed to Load Request Detail</Alert.Heading>
                    <pre>{error.message}</pre>
                  </Alert>
                </Fragment>
              );
            } else {
              const request = data.request;

              contentElement = (
                <Fragment>
                  {header}
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
                      />
                    </Tab>
                    <Tab eventKey="comments" title="Comments">
                      <CommentsContainer referenceId={request.id} />
                    </Tab>
                  </Tabs>
                </Fragment>
              );
            }
          }

          return <Container>{contentElement}</Container>;
        }}
      </Query>
    );
  } else {
    requestDetailContainerElement = (
      <Container>
        <h1>Request Detail</h1>
        <Alert variant="danger">
          <Alert.Heading>Failed to retrieve Request Detail</Alert.Heading>
          <p>Request ID is invalid or undefined. </p>
        </Alert>
      </Container>
    );
  }

  return requestDetailContainerElement;
};

RequestDetailContainer.propertyTypes = {
  match: PropTypes.shape({
    param: PropTypes.shape({ id: PropTypes.string })
  }).isRequired
};

export default RequestDetailContainer;
