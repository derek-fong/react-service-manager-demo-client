import gql from 'graphql-tag';
import has from 'has';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { Mutation } from 'react-apollo';
import { Alert, Button, Card, Col, Form, Row, Spinner } from 'react-bootstrap';

const RequestDetail = props => {
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
    has(props, 'id') &&
    typeof props.id === 'string' &&
    props.id !== ''
  );

  const createRequest = gql`
    mutation CreateRequest($createRequestInput: CreateRequestInput!) {
      createRequest(createRequestInput: $createRequestInput) {
        id
        title
        description
        status
        createdAt
        createdBy {
          firstName
          lastName
        }
      }
    }
  `;

  const updateRequest = gql`
    mutation UpdateRequest($updateRequestInput: UpdateRequestInput!) {
      updateRequest(updateRequestInput: $updateRequestInput) {
        id
        title
        description
        status
        createdAt
        createdBy {
          firstName
          lastName
        }
        updatedBy {
          firstName
          lastName
        }
        updatedAt
      }
    }
  `;

  const onCompletedCallback = () => {
    if (isNewRequest) {
      props.handleRequestCreated();
    }
  };

  return (
    <Mutation
      mutation={isNewRequest ? createRequest : updateRequest}
      onCompleted={onCompletedCallback}
    >
      {(submitRequest, { data, error, loading }) => {
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

            if (isNewRequest) {
              const createRequestInput = {
                description,
                status,
                title
              };

              submitRequest({ variables: { createRequestInput } });
            } else {
              const updateRequestInput = {
                description,
                status,
                title,
                id: props.id
              };

              submitRequest({ variables: { updateRequestInput } });
            }
          };

          const requestDetailForm = (
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
                      {props.createdBy.firstName} {props.createdBy.lastName}
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
                      {props.updatedBy.firstName} {props.updatedBy.lastName}
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

          if (error) {
            contentElement = (
              <Fragment>
                <Alert variant="danger">
                  <Alert.Heading>Failed to Submit Request Detail</Alert.Heading>
                  <pre>{error.message}</pre>
                </Alert>
                {requestDetailForm}
              </Fragment>
            );
          } else {
            if (!isNewRequest && data) {
              contentElement = (
                <Fragment>
                  <Alert variant="success">Request detail updated.</Alert>
                  {requestDetailForm}
                </Fragment>
              );
            } else {
              contentElement = requestDetailForm;
            }
          }
        }

        return contentElement;
      }}
    </Mutation>
  );
};

RequestDetail.propTypes = {
  createdAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  createdBy: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  }),
  description: PropTypes.string,
  handleRequestCreated: PropTypes.func,
  id: PropTypes.string,
  status: PropTypes.string,
  title: PropTypes.string,
  updatedAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  updatedBy: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  })
};

export default RequestDetail;
