import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

const HealthNewsHeadline = ({ healthNewsHeadline }) => {
  const {
    author,
    title,
    description,
    url,
    urlToImage,
    publishedAt
  } = healthNewsHeadline;
  const style = {
    margin: '2em auto'
  };

  const footerText = author
    ? `${moment(publishedAt).fromNow()} by ${author}`
    : `${moment(publishedAt).fromNow()}`;

  return (
    <Card style={style}>
      <Card.Img variant="top" src={urlToImage} />
      <Card.Body>
        <Card.Title>
          <a href={url}>{title}</a>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-right text-muted">
        Published {footerText}
      </Card.Footer>
    </Card>
  );
};

HealthNewsHeadline.propertyTypes = {
  author: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  urlToImage: PropTypes.string,
  publishedAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ])
};

export default HealthNewsHeadline;
