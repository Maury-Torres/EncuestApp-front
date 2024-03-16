import { CiFacebook, CiInstagram, CiTwitter } from "react-icons/ci";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row xs={1} sm={2} md={2} lg={2} className="align-items-center">
          <Col className={`text-center py-4 text-white`}>
            <ul>
              <li>
                <a href="https://www.facebook.com/">
                  <CiFacebook size={32} />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/">
                  <CiInstagram size={32} />
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com/">
                  <CiTwitter size={32} />
                </a>
              </li>
            </ul>
          </Col>
          <Col className={`text-center py-5 text-white`}>
            Derechos reservados &copy; {new Date().getFullYear()}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
