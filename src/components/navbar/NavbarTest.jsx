import React from 'react'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { container, link, button, btnHamburguesa } from "./NavbarTest.module.css"
import  logo  from '../assets/logo.png'

export const NavbarTest = () => {
  return (
    <Navbar expand="lg"  id={container} fixed='top'>
      <Container>
        <img src={logo} alt="logo" width="30" height="30" className="d-inline-block align-top"/>
        <Navbar.Brand className='fw-bold text-white'>EncuestApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav text-white" id={btnHamburguesa}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto gap-3">
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
