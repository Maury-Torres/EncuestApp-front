import propTypes from "prop-types";
import { Button, Modal } from "react-bootstrap";

export const ResultadosModal = ({
  show,
  handleClose,
  encuesta,
  encuestasRealizadas,
}) => {
  const encuestaRealizada = encuestasRealizadas.find(
    (encuestaRealizada) => encuestaRealizada.encuesta === encuesta._id
  );

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="text-black">{encuesta.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {encuestaRealizada?.preguntasRespuestas.map(
          (preguntaRespuesta, index) => (
            <div key={index}>
              <h5 className="text-black">{preguntaRespuesta.pregunta}</h5>
              {preguntaRespuesta.respuestas.map((respuesta, index) => (
                <p key={index} className="text-black">
                  {respuesta}
                </p>
              ))}
            </div>
          )
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ResultadosModal.propTypes = {
  show: propTypes.bool.isRequired,
  handleClose: propTypes.func.isRequired,
  encuesta: propTypes.object.isRequired,
  encuestasRealizadas: propTypes.array.isRequired,
  encuestaRespondida: propTypes.bool.isRequired,
};
