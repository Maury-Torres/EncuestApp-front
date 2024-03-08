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

  console.log(data);

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
    <div className="d-flex flex-column align-items-center">
      <section className="header-abm">
        <h1 className="h1 text-center">Bienvenido, {userName}!</h1>
        <div className="d-flex justify-content-between mt-5 gap-5">
          <button className="btn btn-primary p-3">Crear nueva encuesta</button>
          <button className="btn btn-primary p-3">Crear nueva categoria</button>
        </div>
      </section>
      <hr className="border-5" />
      <section>
        <article className="">
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
          <p className="text-center mt-4">Filtrar por:</p>

          {/*     <Select
            name="category"
            id="category"
            value={orderByCategory}
            onChange={(e) => handleOrderByCategory(e.target.value)}
          >
            <option disabled value="">
              Categorias
            </option>
            <option value="Default">Por defecto</option>
            <option value="Deportes">Deportes</option>
            <option value="Animales">Animales</option>
          </Select> */}

          <SelectCategorias
            orderByCategory={orderByCategory}
            handleOrderByCategory={handleOrderByCategory}
          />
        </article>
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
      <ABMPagination
        page={page}
        handlePageChange={handlePageChange}
        data={data}
      />
    </div>
  );
};
