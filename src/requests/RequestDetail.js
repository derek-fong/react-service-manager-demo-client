import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';

function RequestDetail(props) {
  /**
   * Hooks for form control values.
   * @see [React Hook Docs]{@link https://reactjs.org/docs/hooks-intro.html}
   */
  const [title, setTitle] = useState(props.title || '');
  const [description, setDescription] = useState(props.description || '');
  const [status, setStatus] = useState(props.status || '');

  /**
   * @constant {boolean}
   * Determine if this component is used for creating a new request or editing an existing request.
   * Considered as a new request if `props` has no request ID passed in.
   */
  const isNewRequest = !(
    Object.prototype.hasOwnProperty.call(props, 'id') &&
    typeof props.id === 'string' &&
    props.id !== ''
  );

  /**
   * @constant {boolean}
   * Form is considered valid when `title`, `description` and `status` are defined.
   */
  const isFormValid =
    title &&
    title !== '' &&
    description &&
    description !== '' &&
    status &&
    status !== '';

  const handleSubmit = event => {
    event.preventDefault();
    props.onSubmitRequest({
      title,
      description,
      status,
      id: props.id
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Card>
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
          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={status}
              onChange={e => setStatus(e.target.value)}
              required
            >
              <option value="" disabled>
                Please select an option
              </option>
              <option value="REGISTERED">Registered</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="PENDING_CUSTOMER">Pending Customer</option>
              <option value="FULFILLED">Fulfilled</option>
              <option value="CLOSED">Closed</option>
            </Form.Control>
          </Form.Group>

          {props.createdAt && (
            <p>
              <strong>Created At: </strong>
              {moment(props.createdAt).format('DD/MM/YYYY HH:mm')} (
              {moment(props.createdAt).fromNow()})
            </p>
          )}

          {props.createdBy && (
            <p>
              <strong>Created By: </strong>
              {props.createdBy}
            </p>
          )}

          {props.updatedAt && (
            <p>
              <strong>Updated At: </strong>
              {moment(props.updatedAt).format('DD/MM/YYYY HH:mm')} (
              {moment(props.updatedAt).fromNow()})
            </p>
          )}

          {props.updatedBy && (
            <p>
              <strong>Updated By: </strong>
              {props.updatedBy}
            </p>
          )}
        </Card.Body>
        <Card.Footer>
          <Button type="submit" disabled={!isFormValid}>
            {isNewRequest ? 'Submit' : 'Update'}
          </Button>
        </Card.Footer>
      </Card>
    </Form>
  );
}

RequestDetail.propTypes = {
  createdAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  createdBy: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  onSubmitRequest: PropTypes.func.isRequired,
  status: PropTypes.string,
  title: PropTypes.string,
  updatedAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  updatedBy: PropTypes.string
};

export default RequestDetail;
