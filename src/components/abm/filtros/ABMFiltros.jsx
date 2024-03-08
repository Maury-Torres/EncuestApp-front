import propTypes from "prop-types";
import { Select } from "../../ui/select/Select";
import { SelectCategorias } from "../categorias/SelectCategorias";

export const ABMFiltros = ({
  orderByDate,
  handleOrderByDate,
  orderByCategory,
  handleOrderByCategory,
}) => {
  return (
    <div
      className="col-lg-2 order-lg-1 position-sticky bg-primary p-5 bg-opacity-25 rounded-3 d-none d-lg-block min-vh-100"
      style={{ top: 0 }}
    >
      <div className="d-flex flex-column align-items-center">
        <h2 className="mt-2 text-secondary">Filtros</h2>
        <input
          type="search"
          name="abmBuscador"
          id="abmBuscador"
          placeholder="Buscar..."
          className="form-control mt-3 mb-3 text-center bg-white bg-opacity-75 border-secondary text-black"
        />
        <p className="text-center mt-3">Ordenar por:</p>
        <Select
          name="order"
          id="order"
          value={orderByDate}
          className="mb-3 bg-white bg-opacity-75 border-secondary text-black mt"
          onChange={(e) => handleOrderByDate(e.target.value)}
        >
          <option disabled value="">
            Fecha de creación
          </option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </Select>
        <p className="text-center mt-3">Filtrar por:</p>
        <SelectCategorias
          orderByCategory={orderByCategory}
          handleOrderByCategory={handleOrderByCategory}
        />
      </div>
    </div>
  );
};

ABMFiltros.propTypes = {
  orderByDate: propTypes.string.isRequired,
  handleOrderByDate: propTypes.func.isRequired,
  orderByCategory: propTypes.string.isRequired,
  handleOrderByCategory: propTypes.func.isRequired,
};
