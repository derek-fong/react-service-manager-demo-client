import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

function CommentCreation({ onSubmitComment }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const isFormValid =
    title && title !== '' && description && description !== '';
  const handleSubmit = event => {
    event.preventDefault();
    onSubmitComment({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <Form onSubmit={handleSubmit}>
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
}

CommentCreation.prototypes = {
  onSubmitComment: PropTypes.func.isRequired
};

export default CommentCreation;
