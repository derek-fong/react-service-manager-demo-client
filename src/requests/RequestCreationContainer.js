import PropsTypes from 'prop-types';
import React, { useState } from 'react';
import { Alert, Breadcrumb, Container } from 'react-bootstrap';

import RequestDetail from './RequestDetail';
import fakeApi from '../fake-api/FakeApi';

function RequestCreationContainer({ history }) {
  document.title = 'Create New Request | React Service Manager';

  const [error, setError] = useState(undefined);
  const handleSubmitRequest = async request => {
    setError(undefined);

    try {
      await fakeApi.registerRequestAsync(request);

      history.push('/requests');
    } catch (e) {
      setError(e);
    }
  };

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/requests">Requests</Breadcrumb.Item>
        <Breadcrumb.Item active>New</Breadcrumb.Item>
      </Breadcrumb>
      {error && (
        <Alert variant="danger">
          <Alert.Heading>Failed to Create New Request</Alert.Heading>
          <pre>{error.toString()}</pre>
        </Alert>
      )}
      <h1>Create New Request</h1>
      <RequestDetail onSubmitRequest={handleSubmitRequest} />
    </Container>
  );
}

RequestCreationContainer.propTypes = {
  history: PropsTypes.shape({ push: PropsTypes.func }).isRequired
};

export default RequestCreationContainer;
