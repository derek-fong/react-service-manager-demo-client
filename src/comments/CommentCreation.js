import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Mutation } from 'react-apollo';
import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';

const CommentCreation = ({ referenceId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const mutationCreateComment = gql`
    mutation CreateComment($createCommentInput: CreateCommentInput!) {
      createComment(createCommentInput: $createCommentInput) {
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

  /**
   * Update Apollo cache on comments creation complete.
   * @see https://www.apollographql.com/docs/react/essentials/mutations/#updating-the-cache
   */
  const updateCache = (cache, { data: { createComment } }) => {
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

    const { requestComments } = cache.readQuery({
      query: queryRequestComments,
      variables: { referenceId }
    });

    cache.writeQuery({
      query: queryRequestComments,
      variables: { referenceId },
      data: { requestComments: [createComment].concat(requestComments) }
    });
  };

  return (
    <Mutation mutation={mutationCreateComment} update={updateCache}>
      {(createComment, { error, loading }) => {
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
          const submitComment = event => {
            event.preventDefault();
            const createCommentInput = { description, referenceId, title };
            createComment({ variables: { createCommentInput } });
            setTitle('');
            setDescription('');
          };
          const isFormValid =
            title && title !== '' && description && description !== '';

          const commentForm = (
            <Form onSubmit={submitComment}>
              <Card>
                <Card.Header>Add Comment</Card.Header>
                <Card.Body>
                  <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      required
                    />
                  </Form.Group>
                </Card.Body>
                <Card.Footer>
                  <Button type="submit" disabled={!isFormValid}>
                    Add
                  </Button>
                </Card.Footer>
              </Card>
            </Form>
          );

          if (error) {
            contentElement = (
              <Fragment>
                <Alert variant="danger">
                  <Alert.Heading>Failed to Create Comment</Alert.Heading>
                  <pre>{error.message}</pre>
                </Alert>
                {commentForm}
              </Fragment>
            );
          } else {
            contentElement = commentForm;
          }
        }

        return contentElement;
      }}
    </Mutation>
  );
};

CommentCreation.prototypes = {
  referenceId: PropTypes.string.isRequired
};

export default CommentCreation;
