import React from 'react';
import { Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Header() {
  return (
    <Navbar bg="dark" variant="dark" sticky="top">
      <LinkContainer exact to="/">
        <Navbar.Brand>React Service Manager</Navbar.Brand>
      </LinkContainer>
    </Navbar>
  );
}

export default Header;
