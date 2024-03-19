import React from 'react'
import { Container, Nav, Navbar, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { container, button, button2, button3, btnHamburguesa, containerNav, title, navCollapse } from "./NavbarTest.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';
import logo from "../../assets/logo-no-fondo.png";
import styles from "../footer/Footer.module.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;



export const NavbarTest = () => {

  const { user, isAuth } = useAuth();
  console.log(user, isAuth);

  return (
    <Navbar expand="lg"  id={container} >
      <Container>
        <Navbar.Brand className='fw-bold text-white' id={title}> <a href="/">
              <img src={logo} alt="Logo" className={styles.logo} />
            </a></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav text-white" id={btnHamburguesa}/>
        <Navbar.Collapse id="basic-navbar-nav" className={navCollapse}>
          <Nav className="gap-3" id={containerNav}>
            <Button id={button} size="sm">
              <Navbar.Text>
                <Link to='/' className='fw-bold text-decoration-none'>Go to home</Link>
              </Navbar.Text>
            </Button >

            { !!isAuth ? ""
            : <>
                <Button id={button2} size="sm">
                  <Navbar.Text>
                    <Link to='/login' className='fw-bold text-decoration-none'>Login</Link>
                  </Navbar.Text>
                </Button>
              </>
            }
            { !!isAuth && user.roles[0].nombre == 'admin' 
            ? 
                <Button id={button3} size="sm">
                  <Navbar.Text>
                    <Link to='/admin' className='fw-bold text-decoration-none'>Admin</Link>
                  </Navbar.Text>
                </Button>
            : ''
            }

            { isAuth ?
            <Button onClick={signout} id={button3} size="sm">
              <Navbar.Text>
                <FontAwesomeIcon icon={faRightFromBracket} />
              </Navbar.Text>
            </Button>
            : ''
            } 

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}