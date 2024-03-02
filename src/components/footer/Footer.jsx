import { Container, Row, Col } from "react-bootstrap";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row>
          <Col className={`text-center py-3 ${styles.text}`}>
            Derechos reservados &copy; {new Date().getFullYear()}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
