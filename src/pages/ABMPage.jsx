import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { ABMFiltros } from "../components/abm/filtros/ABMFiltros";
import { Row } from "react-bootstrap";
import { ABMCard } from "../components/abm/card/ABMCard";
import { ABMPagination } from "../components/abm/pagination/ABMPagination";
import { LoadingSpinner } from "../components/ui/spinner/LoadingSpinner";

export const ABMPage = () => {
  const [page, setPage] = useState(1);
  const [orderByDate, setOrderByDate] = useState("");
  const [orderByCategory, setOrderByCategory] = useState("");

  //TODO 1. el metodo de react-router-dom para traer los queries y crear una variable para ir agregando las queries.
  //TODO 4. Agregar las funcionalidades de los botones Crear encuesta y categoria.
  const { data, isLoading } = useFetch(
    `http://localhost:3000/api/encuestas?page=${page}&order=${orderByDate}&categoria=${orderByCategory}`
  );

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleOrderByDate = (date) => {
    setOrderByDate(date);
  };

  const handleOrderByCategory = (category) => {
    setOrderByCategory(category);
  };

  return (
    <div className="container-fluid">
      <div className="row align-items-center">
        <ABMFiltros
          orderByDate={orderByDate}
          handleOrderByDate={handleOrderByDate}
          orderByCategory={orderByCategory}
          handleOrderByCategory={handleOrderByCategory}
        />
        <div className="col-12 col-lg-10 order-lg-2 min-vh-100">
          <section className="header-abm">
            <div className="d-flex justify-content-evenly mt-5 gap-5">
              <button className="btn btn-primary p-3">
                Crear nueva encuesta
              </button>
              <button className="btn btn-primary p-3">
                Crear nueva categoria
              </button>
            </div>
          </section>
          <hr className="border-5" />
          <section>
            <Row className={`g-0`}>
              {!isLoading ? (
                data.encuestas.map((encuesta) => (
                  <ABMCard key={encuesta._id} encuesta={encuesta} />
                ))
              ) : (
                <LoadingSpinner />
              )}
            </Row>
          </section>
        </div>
      </div>
      <ABMPagination
        page={page}
        handlePageChange={handlePageChange}
        data={data}
      />
    </div>
  );
};
