import React from 'react'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { container, link, button, btnHamburguesa, containerNav } from "./NavbarTest.module.css"
import logo from '/src/assets/logo.png'

export const NavbarTest = () => {
  return (
    <Navbar expand="lg"  id={container} fixed='top'>
      <Container>
        <Navbar.Brand className='fw-bold text-white'>EncuestApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav text-white" id={btnHamburguesa}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="gap-3" id={containerNav}>
            <Button id={button} size="sm">
              <Navbar.Text>
                <Link to='/' className='fw-bold' id={link}>Go to home</Link>
              </Navbar.Text>
            </Button >
            <Button id={button} size="sm">
              <Navbar.Text>
                <Link to='/register' className='fw-bold' id={link}>Go to Register</Link>
              </Navbar.Text>
            </Button>
            <Button id={button} size="sm">
              <Navbar.Text>
                <Link to='/register' className='fw-bold' id={link}>Admin</Link>
              </Navbar.Text>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
