import { Card, Button, Col, Form } from "react-bootstrap";
import propTypes from "prop-types";
import styles from "./ABMCard.module.css";

export const ABMCard = ({ encuesta, updateEncuesta }) => {
  const handleCheckbox = async (e) => {
    await updateEncuesta({
      _id: e.target.id,
      nombre: encuesta.nombre,
      descripcion: encuesta.descripcion,
      preguntas: encuesta.preguntas,
      respuestas: encuesta.respuestas,
      categoria: encuesta.categoria,
      available: e.target.checked,
    });
  };

  return (
    <Col xs={12} md={encuesta.length < 2 ? 12 : 6}>
      <Card className={`${styles.cardMargin}`}>
        <Card.Body>
          <Card.Title>{encuesta.nombre}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {encuesta.categoria.nombre}
          </Card.Subtitle>
          <Card.Text>{encuesta.descripcion}</Card.Text>
          <Card.Text>
            Estado: {encuesta.available ? "Disponible" : "No disponible"}
          </Card.Text>

          <Button variant="primary">Ver detalles</Button>
          <Form.Check
            type="checkbox"
            checked={encuesta.available}
            id={encuesta._id}
            label={encuesta.available ? "Deshabilitar" : "Habilitar"}
            onChange={handleCheckbox}
          />
        </Card.Body>
      </Card>
    </Col>
  );
};

ABMCard.propTypes = {
  encuesta: propTypes.object.isRequired,
  updateEncuesta: propTypes.func.isRequired,
};
