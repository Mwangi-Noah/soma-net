import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Cookies from 'js-cookie';
import api from '../../api.js';
import { useHistory } from 'react-router-dom';

const NavbarComponent = () => {
  const history = useHistory();

  async function logoutUser() {
    Cookies.remove('username');
    await api.logout();
    history.push('/login'); // Redirect to the login page after logout
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Book Club</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {/* Add more navigation links as needed */}
        </Nav>
        {Cookies.get('username') ? (
          <React.Fragment>
            <Navbar.Text>{Cookies.get('username')}</Navbar.Text>
            <Nav.Link onClick={logoutUser}>Log Out</Nav.Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Nav.Link className="mr-sm-2" href="/signup">
              Sign Up
            </Nav.Link>
            <Nav.Link href="/login">Log In</Nav.Link>
          </React.Fragment>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;