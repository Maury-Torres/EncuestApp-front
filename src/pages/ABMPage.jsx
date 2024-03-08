import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { ABMCard } from "../components/abm/card/ABMCard";
import { ABMPagination } from "../components/abm/pagination/ABMPagination";
import { Row } from "react-bootstrap";
import styles from "./ABMPage.module.css";
import { Select } from "../components/ui/select/Select";
import { LoadingSpinner } from "../components/ui/spinner/LoadingSpinner";
import { SelectCategorias } from "../components/abm/categorias/SelectCategorias";

export const ABMPage = () => {
  const [page, setPage] = useState(1);
  const [orderByDate, setOrderByDate] = useState("");
  const [orderByCategory, setOrderByCategory] = useState("");

  //TODO 1. el metodo de react-router-dom para traer los queries y crear una variable para ir agregando las queries.
  //TODO 2. ordenar correctamente los estilos de la pagina.
  //TODO 3. Separar en otro componente a los selects.
  //TODO 4. Agregar las funcionalidades de los botones Crear encuesta y categoria.
  //TODO 5. Debo crear una tabla categorias y hacer un fetch en el select.
  const { data, isLoading } = useFetch(
    `http://localhost:3000/api/encuestas?page=${page}&order=${orderByDate}&categoria=${orderByCategory}`
  );

  const [userName, setUserName] = useState("Admin"); //! Placeholder

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
      <h1 className="h1 text-center">Bienvenido, {userName}!</h1>
      <div className="row align-items-center">
        <div
          className="col-lg-2 order-lg-1 position-sticky bg-primary p-5 bg-opacity-25 rounded-3 d-none d-lg-block min-vh-100"
          style={{ top: 0 }}
        >
          <div className="d-flex flex-column align-items-center">
            <p className="text-center">Ordenar por:</p>
            <Select
              name="order"
              id="order"
              value={orderByDate}
              onChange={(e) => handleOrderByDate(e.target.value)}
            >
              <option disabled value="">
                Fecha de creación
              </option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </Select>
            <p className="text-center">Filtrar por:</p>
            <SelectCategorias
              orderByCategory={orderByCategory}
              handleOrderByCategory={handleOrderByCategory}
            />
          </div>
        </div>
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
          <section className={styles.list_abm}>
            <Row className={`g-0 ${styles.flexRow}`}>
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
