import { useState } from "react";
import { FormCard } from "../../ui/formcard/FormCard";
import { useEncuestas } from "../../../context/EncuestaContext";
import { useAuth } from "../../../context/AuthContext";
/* import { useCategorias } from "../../../context/CategoriaContext";
 */

export const EncuestasForm = () => {
  const { createEncuesta } = useEncuestas();
  /*   const { user } = useAuth();
   */ const [formData, setFormData] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  //TODO Agregar select para seleccionar la categoria
  // TODO Modificar estilos y agregar validaciones
  // TODO Agregar para editar la encuesta
  //! Refactorizar el código

  /*   const { getCategorias, categorias } = useCategorias();
   */
  const handleOnClickNewFormData = () => {
    setFormData((prevState) => [
      ...prevState,
      {
        id: Math.random(),
        pregunta: "",
        respuestas: [],
      },
    ]);
  };

  const handleOnClickRespuestas = (id) => {
    setFormData((prevState) => {
      const newData = prevState.map((data) => {
        if (data.id == id) {
          return {
            ...data,
            respuestas: [
              ...data.respuestas,
              {
                id: Math.random(),
                respuesta: "",
              },
            ],
          };
        }
        return data;
      });
      return newData;
    });
  };

  const handleOnChangePreguntas = (e) => {
    const { value, id } = e.target;
    setFormData((prevState) => {
      const newData = prevState.map((data) => {
        if (data.id == id) {
          return {
            ...data,
            pregunta: value,
          };
        }
        return data;
      });
      return newData;
    });
  };

  const handleOnChangeRespuesta = (e) => {
    const { value, id } = e.target;
    setFormData((prevState) => {
      const newData = prevState.map((data) => {
        if (data.respuestas.some((respuesta) => respuesta.id == id)) {
          return {
            ...data,
            respuestas: data.respuestas.map((respuesta) => {
              if (respuesta.id == id) {
                return {
                  ...respuesta,
                  respuesta: value,
                };
              }
              return respuesta;
            }),
          };
        }
        return data;
      });
      return newData;
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await createEncuesta({
        nombre,
        descripcion,
        preguntas: formData,
        categoria: "65f5a31f9d1c80c679159c30",
        available: true,
      });

      console.log(response, "Response");
    } catch (error) {
      console.log();
    }
  };

  return (
    <FormCard>
      <div className="justify-content-center d-flex flex-column gap-5 align-items-center">
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            className="form-control mb-3"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descripción"
            className="form-control mb-3"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <button
            className="btn btn-lg btn-warning"
            onClick={handleOnClickNewFormData}
          >
            Agregar pregunta
          </button>
          {formData.map((data) => (
            <div key={data.id}>
              <div className="d-flex mb-3">
                <input
                  type="text"
                  placeholder="Ingresa la pregunta"
                  className="form-control"
                  id={data.id}
                  name={data.pregunta}
                  onChange={handleOnChangePreguntas}
                />
                <button
                  type="button"
                  className="btn btn-info fs-3 mx-2"
                  onClick={() => handleOnClickRespuestas(data.id)}
                >
                  +
                </button>
              </div>
              {data.respuestas.map((respuesta) => (
                <input
                  type="text"
                  key={respuesta.id}
                  className="form-control mb-3"
                  id={respuesta.id}
                  value={respuesta.respuesta}
                  onChange={handleOnChangeRespuesta}
                  placeholder="Ingresa tu respuesta"
                />
              ))}
            </div>
          ))}

          <button className="btn btn-primary" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </FormCard>
  );
};
