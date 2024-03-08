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
  );
};

ABMFiltros.propTypes = {
  orderByDate: propTypes.string.isRequired,
  handleOrderByDate: propTypes.func.isRequired,
  orderByCategory: propTypes.string.isRequired,
  handleOrderByCategory: propTypes.func.isRequired,
};
