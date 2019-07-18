import gql from 'graphql-tag';
import has from 'has';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { Alert, Card, Col, ListGroup, Row, Spinner } from 'react-bootstrap';

import CommentCreation from './CommentCreation';
import CommentList from './CommentList';

const CommentsContainer = ({ referenceId }) => {
  const queryRequestComments = gql`
    query RequestComments($referenceId: String!) {
      requestComments(referenceId: $referenceId) {
        id
        title
        description
        createdAt
        createdBy {
          firstName
          lastName
        }
      }
    }
  `;

  return (
    <Query
      query={queryRequestComments}
      variables={{ referenceId }}
      fetchPolicy="cache-and-network"
    >
      {({ data, error, loading }) => {
        const commentCreation = <CommentCreation referenceId={referenceId} />;
        let contentElement;

        if (loading) {
          contentElement = (
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>{commentCreation}</ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <Spinner animation="grow" role="status" variant="primary">
                        <span className="sr-only">Loading comments...</span>
                      </Spinner>
                      <span>Loading comments...</span>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          );
        } else {
          if (error) {
            contentElement = (
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>{commentCreation}</ListGroup.Item>
                  <ListGroup.Item>
                    <Alert variant="danger">
                      <Alert.Heading>Failed to Load Requests</Alert.Heading>
                      <pre>{error.message}</pre>
                    </Alert>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            );
          } else {
            if (data && has(data, 'requestComments')) {
              const comments = data.requestComments;

              contentElement = (
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>{commentCreation}</ListGroup.Item>
                    <ListGroup.Item>
                      <Card>
                        <CommentList comments={comments} />
                      </Card>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              );
            } else {
              contentElement = (
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>{commentCreation}</ListGroup.Item>
                    <ListGroup.Item>
                      <Alert variant="info">No comments (yet)!</Alert>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              );
            }
          }
        }

        return <Fragment>{contentElement}</Fragment>;
      }}
    </Query>
  );
};

CommentsContainer.propTypes = {
  referenceId: PropTypes.string.isRequired
};

export default CommentsContainer;
