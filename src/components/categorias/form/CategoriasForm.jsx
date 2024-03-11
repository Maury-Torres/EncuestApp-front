import { Form, Button } from "react-bootstrap";
import { useForm } from "../../../hooks/useForm";
import { useState } from "react";
import { alertcustom } from "../../../utils/alertCustom";
import { FormCard } from "../../ui/formcard/FormCard";
import "./CategoriasForm.css";

export const CategoriasForm = () => {
  const { nombre, descripcion, imagen, handleOnChange, setFormData } = useForm({
    nombre: "",
    descripcion: "",
    imagen: "",
  });
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("http://localhost:3000/api/categorias", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, descripcion, imagen }),
      });

      const data = await response.json();

      console.log(data.errors);

      if (data?.errors) {
        setErrors(data.errors);
        throw new Error("Error en la petición");
      }

      alertcustom(
        "Categoría creada correctamente",
        "Categoría",
        "success",
        () => {
          setFormData({ nombre: "", descripcion: "", imagen: "" });
          setErrors(null);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const hasError = (path) =>
    errors && !!errors.find((err) => err.path === path);

  return (
    <FormCard>
      <h2 className="text-center">Nueva Categoria</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre"
            name="nombre"
            value={nombre}
            onChange={handleOnChange}
            isInvalid={hasError("nombre")}
            className={hasError("nombre") ? "error-input" : ""}
          />
          {hasError("nombre") && (
            <Form.Control.Feedback type="invalid">
              {errors.find((error) => error.path === "nombre").msg}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Ingrese la descripción"
            value={descripcion}
            name="descripcion"
            onChange={handleOnChange}
            isInvalid={hasError("descripcion")}
            className={hasError("descripcion") ? "error-input" : ""}
          />
          {hasError("descripcion") && (
            <Form.Control.Feedback type="invalid">
              {errors.find((error) => error.path === "descripcion").msg}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese la URL de la imagen"
            value={imagen}
            name="imagen"
            onChange={handleOnChange}
            isInvalid={hasError("imagen")}
            className={hasError("imagen") ? "error-input" : ""}
          />
          {hasError("imagen") && (
            <Form.Control.Feedback type="invalid">
              {errors.find((error) => error.path === "imagen").msg}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Crear Categoría
        </Button>
      </Form>
    </FormCard>
  );
};
