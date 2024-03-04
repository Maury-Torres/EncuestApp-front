import { useState } from "react";
import styles from "./ABMPage.module.css";
import { useFetch } from "../hooks/useFetch";
import { Card, Button, Row, Col, Pagination } from "react-bootstrap";

export const ABMPage = () => {
  const [page, setPage] = useState(1);
  const { data, error, hasError, isLoading } = useFetch(
    `http://localhost:3000/api/encuestas?page=${page}`
  );

  const [userName, setUserName] = useState("Admin"); //! Placeholder

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <section className="header-abm">
        <h1 className="h1 text-center">Bienvenido, {userName}!</h1>
        <div className="d-flex justify-content-between mt-5 gap-5">
          <button className="btn btn-primary p-3">Crear nueva encuesta</button>
          <button className="btn btn-primary p-3">Crear nueva categoria</button>
        </div>
      </section>
      <hr className="border-5" />
      <section className={styles.list_abm}>
        <Row
          className={`${styles.rowFlex} ${
            data && data?.encuestas.length > 1
              ? "justify-content-around"
              : "justify-content-center"
          }`}
        >
          {!isLoading &&
            data.encuestas.map((encuesta) => (
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
      <Pagination className="mt-5 justify-content-center">
        <Pagination.Prev
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next
          onClick={() => handlePageChange(page + 1)}
          disabled={page === (data ? data.totalPages : 1)}
        />
      </Pagination>
    </div>
  );
};
