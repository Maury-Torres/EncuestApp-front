import propTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./EncuestasCard.module.css";

export const EncuestasCard = ({ encuesta }) => {
  return (
    <Card className={`${styles.cardMargin} ${styles.cardBackground}`}>
      <Card.Body>
        <Card.Title className="text-center">
          <strong>{encuesta.nombre}</strong>
        </Card.Title>
        <Card.Text>{encuesta.descripcion}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <div className="d-flex w-100 justify-content-between align-items-center">
          <small className="text-muted">Autor: {encuesta.user.username}</small>
          <Button variant="primary" className={styles.button}>
            Realizar encuesta
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

EncuestasCard.propTypes = {
  encuesta: propTypes.object.isRequired,
};
