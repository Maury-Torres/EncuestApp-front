import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  container,
  button,
  button2,
  button3,
  btnHamburguesa,
  containerNav,
  title,
  navCollapse,
} from "./NavbarTest.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "/src/assets/logo.png";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const NavbarTest = () => {
  const navigate = useNavigate();
  const { user, isAuth } = useAuth();

  const signout = async () => {
    try {
      // Realizar una solicitud al backend para cerrar sesión
      const response = await fetch(`${BASE_URL}/api/signout`, {
        method: "POST",
        credentials: "same-origin", // Asegura que las cookies se incluyan en la solicitud
      });

      if (response.ok) {
        // Limpiar la cookie de token en el cliente
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/login");
      } else {
        throw new Error("Error al cerrar sesión");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <Navbar expand="lg" id={container} fixed="top">
      <Container>
        <Navbar.Brand className="fw-bold text-white" id={title}>
          EncuestApp
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav text-white"
          id={btnHamburguesa}
        />
        <Navbar.Collapse id="basic-navbar-nav" className={navCollapse}>
          <Nav className="gap-3" id={containerNav}>
            <Button id={button} size="sm">
              <Navbar.Text>
                <Link to="/" className="fw-bold text-decoration-none">
                  Home
                </Link>
              </Navbar.Text>
            </Button>

            {!isAuth && (
              <>
                <Button id={button2} size="sm">
                  <Navbar.Text>
                    <Link to="/login" className="fw-bold text-decoration-none">
                      Login
                    </Link>
                  </Navbar.Text>
                </Button>
                <Button id={button3} size="sm">
                  <Navbar.Text>
                    <Link
                      to="/register"
                      className="fw-bold text-decoration-none"
                    >
                      Register
                    </Link>
                  </Navbar.Text>
                </Button>
              </>
            )}
            {isAuth && (
              <>
                <Button id={button3} size="sm">
                  <Navbar.Text>
                    <Link
                      to="/categorias"
                      className="fw-bold text-decoration-none"
                    >
                      Categorias
                    </Link>
                  </Navbar.Text>
                </Button>
                <Button id={button3} size="sm">
                  <Navbar.Text>
                    <Link
                      to="/mis-encuestas"
                      className="fw-bold text-decoration-none"
                    >
                      Mis Encuestas
                    </Link>
                  </Navbar.Text>
                </Button>
              </>
            )}

            {isAuth && user.roles[0].nombre == "Administrador" && (
              <>
                <Button id={button3} size="sm">
                  <Navbar.Text>
                    <Link to="/abm" className="fw-bold text-decoration-none">
                      Administración
                    </Link>
                  </Navbar.Text>
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
