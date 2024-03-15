import propTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import styles from "./CategoriasCard.module.css";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";

export const CategoriasCard = ({ categoria, handleOnBorrarCategoria }) => {
  const navigate = useNavigate();
  return (
    <Card className={`bg-dark text position-relative ${styles.card}`}>
      <div className={styles.imageWrapper}>
        <Card.Img
          src={categoria.imagen}
          alt={`Imagen de la categoria ${categoria.nombre}`}
          className={`${styles.cardImage}`}
        />
        <div className={styles.filter} />
      </div>
      <div
        className={`${styles.textOverlay} d-flex justify-content-center align-items-center`}
      >
        <Card.Title className="text-white text-center mt-3 fs-3 fs-sm-2 fs-md-1">
          {categoria.nombre}
        </Card.Title>
        {/*  <Card.Text className="text-white fs-6 fs-sm-5 fs-md-4">
                        {el.descripcion}
                      </Card.Text> */}
      </div>
      <Card.Footer className={`${styles.adminFooter}`}>
        <div className="d-flex w-100 justify-content-evenly">
          <Button
            variant="success"
            onClick={() => navigate(`/administrar-categoria/${categoria._id}`)}
          >
            Editar <FaPencilAlt />
          </Button>
          <Button
            variant="danger"
            onClick={() => handleOnBorrarCategoria(categoria._id)}
          >
            Eliminar <FaTrashAlt />
          </Button>
        </div>
      </Card.Footer>
    </Card>
  );
};

CategoriasCard.propTypes = {
  categoria: propTypes.object.isRequired,
  handleOnBorrarCategoria: propTypes.func.isRequired,
};
