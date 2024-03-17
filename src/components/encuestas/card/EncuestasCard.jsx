import propTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./EncuestasCard.module.css";
import { useNavigate } from "react-router-dom";

export const EncuestasCard = ({ encuesta }) => {
  const navigate = useNavigate();
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
          <Button
            variant="primary"
            className={styles.button}
            onClick={() => navigate(`/responder-encuesta/${encuesta._id}`)}
          >
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
