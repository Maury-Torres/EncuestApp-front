import { Form, Button } from "react-bootstrap";
import { useForm } from "../../../hooks/useForm";
import { useState } from "react";
import { alertcustom } from "../../../utils/alertCustom";

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
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingrese el nombre"
          name="nombre"
          value={nombre}
          onChange={handleOnChange}
        />
        {errors && errors.find((err) => err.path === "nombre") && (
          <Form.Text className="text-danger">
            {errors.find((error) => error.path === "nombre").msg}
          </Form.Text>
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
        />
        {errors && errors.find((err) => err.path === "descripcion") && (
          <Form.Text className="text-danger">
            {errors.find((error) => error.path === "descripcion").msg}
          </Form.Text>
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
        />
        {errors && errors.find((err) => err.path === "imagen") && (
          <Form.Text className="text-danger">
            {errors.find((error) => error.path === "imagen").msg}
          </Form.Text>
        )}
      </Form.Group>

      <Button variant="primary" type="submit">
        Enviar
      </Button>
    </Form>
  );
};
