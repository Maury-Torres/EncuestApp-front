import { createContext, useState, useContext } from "react";
import propTypes from "prop-types";
import { alertcustom } from "../utils/alertCustom";

const EncuestasContext = createContext();

export const useEncuestas = () => {
  const context = useContext(EncuestasContext);
  if (!context) {
    throw new Error(
      "useEncuestas debe estar dentro del proveedor EncuestasProvider"
    );
  }
  return context;
};

export const EncuestasProvider = ({ children }) => {
  const [encuestas, setEncuestas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState(null);

  const getEncuestas = async (params) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/encuestas${params ? `?${params}` : ""}`
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
      setEncuestas(data.encuestas);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEncuesta = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/encuestas/${id}`);

      if (!response.ok) {
        setErrors({
          code: response.status,
          message: response.statusText,
        });

        setIsLoading(false);
        return;
      }

      const encuestaData = await response.json();
      setIsLoading(false);
      return encuestaData;
    } catch (error) {
      console.log(error);
    }
  };

  const getEncuestasByCategoria = async (categoria, params) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/encuestas/categoria/${categoria}${
          params ? `?${params}` : ""
        }`
      );

      if (!response.ok) {
        setErrors({
          code: response.status,
          message: response.statusText,
        });
        setIsLoading(false);
        return;
      }

      const encuestasData = await response.json();
      setIsLoading(false);
      setEncuestas(encuestasData.encuestas);
      setData(encuestasData);

      return encuestasData;
    } catch (error) {
      console.log(error);
    }
  };

  const createEncuesta = async (encuesta) => {
    try {
      const response = await fetch("http://localhost:3000/api/encuestas", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Credentials": true,
        },
        body: JSON.stringify(encuesta),
      });

      const encuestaData = await response.json();

      if (encuestaData.errors) {
        setErrors(encuestaData.errors);
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      setEncuestas((prevState) => [encuestaData, ...prevState]);
      return encuestaData;
    } catch (error) {
      console.log(error);
    }
  };

  const updateEncuesta = async (id, encuesta) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/encuestas/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(encuesta),
        }
      );

      const encuestaData = await response.json();

      if (encuestaData.errors) {
        setErrors(encuestaData.errors);
        setIsLoading(false);
        return;
      }

      const index = encuestas.findIndex((e) => e._id === encuestaData._id);
      const newEncuestas = [...encuestas];
      newEncuestas[index] = encuestaData;
      setIsLoading(false);
      setEncuestas(newEncuestas);

      return encuestaData;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteEncuesta = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/encuestas/${id}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Credentials": true,
          },
          method: "DELETE",
        }
      );

      if (!response.ok) {
        setErrors({
          code: response.status,
          message: response.statusText,
        });
        setIsLoading(false);
        return;
      }

      setEncuestas(encuestas.filter((encuesta) => encuesta._id !== id));
      setData({
        ...data,
        encuestas: data.encuestas.filter((encuesta) => encuesta._id !== id),
      });
      setIsLoading(false);
      alertcustom("Encuesta eliminada correctamente", "Encuesta", "success");
      await getEncuestas();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EncuestasContext.Provider
      value={{
        encuestas,
        isLoading,
        setIsLoading,
        data,
        errors,
        setErrors,
        getEncuestas,
        getEncuesta,
        getEncuestasByCategoria,
        createEncuesta,
        updateEncuesta,
        deleteEncuesta,
      }}
    >
      {children}
    </EncuestasContext.Provider>
  );
};

EncuestasProvider.propTypes = {
  children: propTypes.node.isRequired,
};
