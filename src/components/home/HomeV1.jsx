import React from 'react'
import { Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { container, containerCol, secctionImg } from "./HomeV1.module.css"

const HomeV1 = () => {
  return (
    <Col id={containerCol} lg={6}>
        <section className=" col-lg-10" id={container}>
          <div>
            <h1>EncuestApp</h1>
            <p>
              Es una página web donde los usuarios pueden participar en diversas
              encuestas y cuestionarios proporcionados por otros usuarios,
              empresas o instituciones. Los usuarios pueden acceder a las
              encuestas disponibles con su cuenta o de forma anónima, responder
              preguntas según sus opiniones y experiencias, y enviar sus
              respuestas de manera fácil y segura.
            </p>
          </div>
          <div>
            <Link to="/encuestas">
              <Button variant="info" size="lg" className="rounded-5">
                Empezar
              </Button>
            </Link>
          </div>
        </section>
        <section className='col-lg-4 mt-lg-0 mt-1' id={secctionImg}>
          <img src="./src/assets/encuestas2.png" alt="fondo"/>
        </section>
    </Col>
  );
}

export default HomeV1