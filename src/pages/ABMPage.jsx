import { useEffect, useState } from "react";
import { ABMFiltros } from "../components/abm/filtros/ABMFiltros";
import { Row } from "react-bootstrap";
import { ABMCard } from "../components/abm/card/ABMCard";
import { ABMPagination } from "../components/abm/pagination/ABMPagination";
import { LoadingSpinner } from "../components/ui/spinner/LoadingSpinner";
import { useEncuestas } from "../context/EncuestaContext";

export const ABMPage = () => {
  const {
    encuestas,
    getEncuestas,
    isLoading,
    data,
    errors,
    createEncuesta,
    updateEncuesta,
  } = useEncuestas();
  const [page, setPage] = useState(1);
  const [orderByDate, setOrderByDate] = useState("");
  const [orderByCategory, setOrderByCategory] = useState("");

  /* const buildUrl = () => {
    const params = new URLSearchParams();
    if (page) params.append("page", page);
    if (orderByDate) params.append("order", orderByDate);
    if (orderByCategory) params.append("categoria", orderByCategory);

    return `http://localhost:3000/api/encuestas?${params.toString()}`;
  }; */

  /*   const { data } = useFetch(buildUrl());
   */
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleOrderByDate = (date) => {
    setOrderByDate(date);
  };

  const handleOrderByCategory = (category) => {
    setOrderByCategory(category);
  };

  useEffect(() => {
    getEncuestas();
  }, [encuestas]);

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
                encuestas.length > 0 ? (
                  encuestas.map((encuesta, index) => (
                    <ABMCard
                      key={index + encuesta._id}
                      encuesta={encuesta}
                      updateEncuesta={updateEncuesta}
                    />
                  ))
                ) : (
                  <div className="text-center">
                    No hay encuestas para mostrar.
                  </div>
                )
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
