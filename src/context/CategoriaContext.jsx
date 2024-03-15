import { createContext, useState, useContext } from "react";
import propTypes from "prop-types";

const CategoriasContext = createContext();

export const useCategorias = () => {
  const context = useContext(CategoriasContext);
  if (!context) {
    throw new Error(
      "useCategorias debe estar dentro del proveedor EncuestasProvider"
    );
  }
  return context;
};

export const CategoriasProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(null);

  const getCategorias = async (params) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/categorias${params ? `?${params}` : ""}`
      );

      if (!response.ok) {
        setErrors({
          code: response.status,
          message: response.statusText,
        });
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      setIsLoading(false);
      setCategorias(data.categorias);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CategoriasContext.Provider
      value={{
        categorias,
        isLoading,
        data,
        errors,
        getCategorias,
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
};

CategoriasProvider.propTypes = {
  children: propTypes.node.isRequired,
};
