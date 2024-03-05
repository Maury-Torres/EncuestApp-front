import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { ABMCard } from "../components/abm/card/ABMCard";
import { ABMPagination } from "../components/abm/pagination/ABMPagination";
import { Row } from "react-bootstrap";
import styles from "./ABMPage.module.css";

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
        <Row className={`g-0 ${styles.flexRow}`}>
          {!isLoading &&
            data.encuestas.map((encuesta) => (
              <ABMCard key={encuesta._id} encuesta={encuesta} />
            ))}
        </Row>
      </section>
      <ABMPagination
        page={page}
        handlePageChange={handlePageChange}
        data={data}
      />
    </div>
  );
};
