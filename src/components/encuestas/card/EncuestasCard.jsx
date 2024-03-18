import propTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "./EncuestasCard.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { ResultadosModal } from "../resultados/modal/ResultadosModal";

export const EncuestasCard = ({ encuesta }) => {
  const { user } = useAuth();
  const [encuestasRealizadas, setEncuestasRealizadas] = useState([]);

  //! Cuando respondo a una encuesta y soy enviado otra vez a la pagina de encuestas, no se actualiza el boton de responder encuesta

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setEncuestasRealizadas(user.encuestasRealizadas);
    }
  }, [user]);

  const encuestaRespondida = encuestasRealizadas.some(
    (encuestaRealizada) => encuestaRealizada.encuesta === encuesta._id
  );

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
          <small className="text-muted">
            Autor: {encuesta?.user?.username}
          </small>
          {encuestaRespondida ? (
            <Button variant="success" onClick={handleShow}>
              Ver resultados
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={() => navigate(`/responder-encuesta/${encuesta._id}`)}
            >
              Responder encuesta
            </Button>
          )}
        </div>
      </Card.Footer>
      <ResultadosModal
        show={show}
        handleClose={handleClose}
        encuesta={encuesta}
        encuestasRealizadas={encuestasRealizadas}
        encuestaRespondida={encuestaRespondida}
      />
    </Card>
  );
};

EncuestasCard.propTypes = {
  encuesta: propTypes.object.isRequired,
};
