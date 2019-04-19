import startCase from 'lodash.startcase';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function RequestList(props) {
  const hasRequests =
    props &&
    Object.prototype.hasOwnProperty.call(props, 'requests') &&
    props.requests.length > 0;

  if (hasRequests) {
    const tableRows = props.requests.map(request => (
      <tr key={request.id}>
        <td>
          <Link to={`/requests/${request.id}`}>{request.id}</Link>
        </td>
        <td>{request.title}</td>
        <td>{startCase(request.status.toLowerCase())}</td>
        <td>
          {moment(request.createdAt).format('DD/MM/YYYY HH:mm')} (
          {moment(request.createdAt).fromNow()})
        </td>
      </tr>
    ));

    return (
      <Table striped hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </Table>
    );
  } else {
    return <p>No request (yet)!</p>;
  }
}

RequestList.propertyTypes = {
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      createdAt: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date)
      ]).isRequired,
      id: PropTypes.string.isRequired,
      status: PropTypes.oneOf([
        'CLOSED',
        'FULFILLED',
        'IN_PROGRESS',
        'PENDING_CUSTOMER',
        'REGISTERED'
      ]).isRequired,
      title: PropTypes.string.isRequired
    })
  )
};

export default RequestList;
