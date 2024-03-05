import React from 'react'
import { Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { container } from "./HomeV1.module.css"

const HomeV1 = () => {
  return (
    <Col>
        <div className=" col-4" id={container}>
          <h1>EncuestApp</h1>
          <p>
            Es una página web donde los usuarios pueden participar en diversas
            encuestas y cuestionarios proporcionados por otros usuarios,
            empresas o instituciones. Los usuarios pueden acceder a las
            encuestas disponibles con su cuenta o de forma anónima, responder
            preguntas según sus opiniones y experiencias, y enviar sus
            respuestas de manera fácil y segura.
          </p>
          <div>
            <Link to="/banners">
              <Button variant="info" size="lg" className="rounded-5">
                Empezar
              </Button>
            </Link>
          </div>
        </div>

        <img src="./src/assets/encuestas2.png" alt="fondo" />
    </Col>
  );
}

export default HomeV1