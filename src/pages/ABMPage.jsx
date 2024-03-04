import { useState } from "react";
import styles from "./ABMPage.module.css";
import { useFetch } from "../hooks/useFetch";
import { Card, Button, Row, Col } from "react-bootstrap";

export const ABMPage = () => {
  const { data, error, hasError, isLoading } = useFetch(
    "http://localhost:3000/api/encuestas"
  );

  console.log(data);
  const [userName, setUserName] = useState("Admin"); //! Placeholder

  return (
    <div className="">
      <h1 className="h1 text-center">Bienvenido, {userName}!</h1>
      <section className="header-abm">
        <div className="d-flex justify-content-evenly mt-5">
          <button className="btn btn-primary p-3">Crear nueva encuesta</button>
          <button className="btn btn-primary p-3">Crear nueva categoria</button>
        </div>
      </section>
      <hr className="mt-5 border-5" />
      <section className={styles.list_abm}>
        <Row
          className={`${styles.rowFlex} ${
            data && data.length > 1
              ? "justify-content-around"
              : "justify-content-center"
          }`}
        >
          {!isLoading &&
            data.map((encuesta) => (
              <Col xs={12} md={4} key={encuesta._id}>
                <Card className={styles.cardMargin} style={{ width: "18rem" }}>
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
            ))}
        </Row>
      </section>
    </div>
  );
};
