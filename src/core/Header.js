import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <LinkContainer exact to="/">
        <Navbar.Brand>React Service Manager</Navbar.Brand>
      </LinkContainer>
      <Nav className="mr-auto">
        <LinkContainer to="/requests">
          <Nav.Link>Request List</Nav.Link>
        </LinkContainer>
      </Nav>
    </Navbar>
  );
}

export default Header;
