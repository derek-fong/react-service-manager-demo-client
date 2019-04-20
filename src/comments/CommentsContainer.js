import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';
import { Alert, Card, Col, ListGroup, Row, Spinner } from 'react-bootstrap';

import CommentCreation from './CommentCreation';
import CommentList from './CommentList';
import fakeApi from '../fake-api/FakeApi';

function CommentsContainer({ referenceId }) {
  const [comments, setComments] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddingComment, setIsAddingComment] = useState(false);
  const addCommentAsync = async comment => {
    setIsAddingComment(true);
    try {
      await fakeApi.addCommentAsync({ ...comment, referenceId });
    } catch (e) {
      setError(e);
    }
    setIsAddingComment(false);
  };
  let contentComponent;

  /**
   * Only runs when `isAddingComment` updates.
   * @see [React Hook: Tip: Optimizing Performance by Skipping Effects]{@link https://reactjs.org/docs/hooks-effect.html#tip-optimizing-performance-by-skipping-effects}
   */
  useEffect(() => {
    (async () => {
      setError(undefined);
      setIsLoading(true);

      try {
        setComments(await fakeApi.getCommentsAsync(referenceId));
      } catch (e) {
        setError(e);
        setComments(undefined);
      }

      setIsLoading(false);
    })();
  }, [isAddingComment]);

  if (isLoading) {
    contentComponent = (
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <CommentCreation onSubmitComment={addCommentAsync} />
          </ListGroup.Item>
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
  } else if (comments) {
    contentComponent = (
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <CommentCreation onSubmitComment={addCommentAsync} />
          </ListGroup.Item>
          <ListGroup.Item>
            <Card>
              <CommentList comments={comments} />
            </Card>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    );
  } else if (error) {
    contentComponent = (
      <Alert variant="danger">
        <Alert.Heading>Failed to Load Requests</Alert.Heading>
        <pre>{error.toString()}</pre>
      </Alert>
    );
  }

  return <Fragment>{contentComponent}</Fragment>;
}

CommentsContainer.propTypes = {
  referenceId: PropTypes.string.isRequired
};

export default CommentsContainer;
