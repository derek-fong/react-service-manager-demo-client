import gql from 'graphql-tag';
import has from 'has';
import PropTypes from 'prop-types';
import React from 'react';
import { Query } from 'react-apollo';
import { Alert, Card, Col, Row, Spinner } from 'react-bootstrap';

const RequestCounter = ({
  headerText,
  linkRef,
  linkText,
  requestStatusTypes
}) => {
  const queryRequestsCount = gql`
    query RequestsByStatusCount($status: [Status!]!) {
      requestsByStatusCount(status: $status)
    }
  `;

  return (
    <Query
      query={queryRequestsCount}
      variables={{ status: requestStatusTypes }}
      fetchPolicy="cache-and-network"
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
          if (error) {
            contentElement = (
              <Alert variant="danger">
                <Alert.Heading>Failed to Load Request Count</Alert.Heading>
                <pre>{error.toString()}</pre>
              </Alert>
            );
          } else {
            contentElement = (
              <h1>
                {data && has(data, 'requestsByStatusCount')
                  ? data.requestsByStatusCount
                  : 'N/A'}
              </h1>
            );
          }
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
      }}
    </Query>
  );
};

RequestCounter.propTypes = {
  headerText: PropTypes.string.isRequired,
  linkRef: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  requestStatusTypes: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default RequestCounter;
