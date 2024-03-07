import React from "react";
import { Container, Col } from "react-bootstrap";
import EncuestasV1 from "../components/EncuestasV1";

export const Encuestas = () => {
  return (
    <Container>
      <Col>
        <EncuestasV1 />
      </Col>
    </Container>
  );
};

export default Encuestas;
