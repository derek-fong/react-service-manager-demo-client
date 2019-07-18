import PropsTypes from 'prop-types';
import React from 'react';
import { Breadcrumb, Container } from 'react-bootstrap';

import RequestDetail from './RequestDetail';

function RequestCreationContainer({ history }) {
  document.title = 'Create New Request - React Service Manager';

  const handleRequestCreated = () => {
    history.push('/requests');
  };

  return (
    <Container>
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/requests">Requests</Breadcrumb.Item>
        <Breadcrumb.Item active>New</Breadcrumb.Item>
      </Breadcrumb>
      <h1>Create New Request</h1>
      <RequestDetail handleRequestCreated={handleRequestCreated} />
    </Container>
  );
}

RequestCreationContainer.propTypes = {
  history: PropsTypes.shape({ push: PropsTypes.func }).isRequired
};

export default RequestCreationContainer;
