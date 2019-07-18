import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Table } from 'react-bootstrap';

function CommentList({ comments }) {
  const tableRows = comments.map(comment => (
    <tr key={comment.id}>
      <td>{comment.title}</td>
      <td>{comment.description}</td>
      <td>
        {moment(comment.createdAt).format('DD/MM/YYYY HH:mm')} (
        {moment(comment.createdAt).fromNow()})
      </td>
      <td>
        {comment.createdBy.firstName} {comment.createdBy.lastName}
      </td>
    </tr>
  ));

  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Created At</th>
          <th>Created By</th>
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </Table>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      createdAt: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date)
      ]).isRequired,
      createdBy: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired
      })
    })
  ).isRequired
};

export default CommentList;
