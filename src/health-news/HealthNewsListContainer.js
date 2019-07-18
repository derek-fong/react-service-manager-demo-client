import gql from 'graphql-tag';
import has from 'has';
import React from 'react';
import { Query } from 'react-apollo';
import {
  Alert,
  Breadcrumb,
  Col,
  Container,
  Row,
  Spinner
} from 'react-bootstrap';

import HealthNewsHeadline from './HealthNewsHeadline';

const HealthNewsListContainer = () => {
  const queryHealthNewsHeadlines = gql`
    query HealthNewsHeadlines {
      healthNewsHeadlines {
        author
        title
        description
        url
        urlToImage
        publishedAt
      }
    }
  `;

  return (
    <Query query={queryHealthNewsHeadlines} fetchPolicy="cache-and-network">
      {({ data, error, loading }) => {
        let contentElement;

        document.title = 'Health News - React Service Manager';

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
          if (error) {
            contentElement = (
              <Alert variant="danger">
                <Alert.Heading>
                  Failed to Load Health News Headlines
                </Alert.Heading>
                <pre>{error.message}</pre>
              </Alert>
            );
          } else {
            if (data && has(data, 'healthNewsHeadlines')) {
              const healthNewsHeadlines = data.healthNewsHeadlines;

              if (healthNewsHeadlines && healthNewsHeadlines.length > 0) {
                contentElement = healthNewsHeadlines.map(
                  (healthNewsHeadline, i) => (
                    <HealthNewsHeadline
                      healthNewsHeadline={healthNewsHeadline}
                      key={i}
                    />
                  )
                );
              } else {
                contentElement = (
                  <Alert variant="info">No Health News (yet)!</Alert>
                );
              }
            } else {
              contentElement = (
                <Alert variant="info">
                  Health News is currently not available.
                </Alert>
              );
            }
          }
        }

        return (
          <Container>
            <Breadcrumb>
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Health News Headlines</Breadcrumb.Item>
            </Breadcrumb>
            <h1>Health News Headlines</h1>
            {contentElement}
          </Container>
        );
      }}
    </Query>
  );
};

export default HealthNewsListContainer;
