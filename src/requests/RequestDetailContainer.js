import PropTypes from 'prop-types';
import React from 'react';
import { Container } from 'react-bootstrap';

function RequestDetailContainer({ match }) {
  return (
    <Container>
      <h1>Request Detail - {match.params.id}</h1>
    </Container>
  );
}

RequestDetailContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ id: PropTypes.string })
  }).isRequired
};

export default RequestDetailContainer;
