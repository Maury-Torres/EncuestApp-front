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

  const deleteCategoria = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/categorias/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        setErrors({
          code: response.status,
          message: response.statusText,
        });
        return;
      }

      setCategorias(categorias.filter((categoria) => categoria._id !== id));
      setData({
        ...data,
        categorias: data.categorias.filter((categoria) => categoria._id !== id),
      });
      setIsLoading(false);
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
        deleteCategoria,
      }}
    >
      {children}
    </CategoriasContext.Provider>
  );
};

CategoriasProvider.propTypes = {
  children: propTypes.node.isRequired,
};
