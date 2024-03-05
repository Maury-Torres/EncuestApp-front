import { Card, Button, Col } from "react-bootstrap";
import propTypes from "prop-types";
import styles from "./ABMCard.module.css";

export const ABMCard = ({ encuesta }) => {
  return (
    <Col xs={12} md={4}>
      <Card className={`${styles.cardMargin}`}>
        <Card.Body>
          <Card.Title>{encuesta.nombre}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {encuesta.categoria}
          </Card.Subtitle>
          <Card.Text>{encuesta.descripcion}</Card.Text>
          <Button variant="primary">Ver detalles</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

ABMCard.propTypes = {
  encuesta: propTypes.object.isRequired,
};
