import React from 'react'
import { Col, Container, Row, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom';

export const NavbarTest = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="#home">EncuestaAp</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Navbar.Text>
                    <Link to='/'>Go to home</Link>
                  </Navbar.Text>
                  <Navbar.Text>
                    <Link to='/register'>Go to Register</Link>
                  </Navbar.Text>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
}
