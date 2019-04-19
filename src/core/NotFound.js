import React from 'react';
import { Container } from 'react-bootstrap';

function NotFound() {
  document.title = 'Not Found | React Service Manager';

  return (
    <Container>
      <h1>Not Found</h1>
      <p>The requested resources was not found. </p>
    </Container>
  );
}

export default NotFound;
