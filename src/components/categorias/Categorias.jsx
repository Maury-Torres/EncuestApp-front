import { useFetch } from "../../hooks/useFetch";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import styles from "./Categorias.module.css";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import { LoadingSpinner } from "../ui/spinner/LoadingSpinner";
import { CategoriaPagination } from "./pagination/CategoriaPagination";
import { useState } from "react";

export const Categorias = () => {
  //! refactorizar codigo(crear provider?)

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data, isLoading, setState } = useFetch(
    `http://localhost:3000/api/categorias?${searchParams.toString()}`
  );

  console.log(data);

  const [page, setPage] = useState(1);

  const handleOnBorrarCategoria = async (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/api/categorias/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(() => {
            setState((prevState) => ({
              ...prevState,
              data: {
                ...prevState.data,
                categorias: prevState.data.categorias.filter(
                  (categoria) => categoria._id !== id
                ),
              },
            }));
            Swal.fire(
              "Eliminado!",
              "La categoría ha sido eliminada.",
              "success"
            );
          })
          .catch((error) => {
            console.error(error);
            Swal.fire(
              "Error!",
              "Hubo un error al eliminar la categoría.",
              "error"
            );
          });
      }
    });
  };
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    searchParams.set("page", pageNumber);
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <>
      <Container>
        <h1 className="text-center">Seleccione una categoria</h1>
        <Row xs={1} sm={2} md={3} lg={3}>
          {isLoading ? (
            <div className="d-flex justify-content-center w-100 mt-5">
              <LoadingSpinner />
            </div>
          ) : data.categorias.length < 1 ? (
            <p className="text-center w-100 mt-5">
              No hay categorias para mostrar.
            </p>
          ) : (
            data.categorias.map((el) => (
              <Col key={el._id}>
                <Card
                  className={`bg-dark text position-relative ${styles.card}`}
                >
                  <div className={styles.imageWrapper}>
                    <Card.Img
                      src={el.imagen}
                      alt={`Imagen de la categoria ${el.nombre}`}
                      className={`${styles.cardImage}`}
                    />
                    <div className={styles.filter} />
                  </div>
                  <div
                    className={`${styles.textOverlay} d-flex justify-content-center align-items-center`}
                  >
                    <Card.Title className="text-white text-center mt-3 fs-3 fs-sm-2 fs-md-1">
                      {el.nombre}
                    </Card.Title>
                    {/*  <Card.Text className="text-white fs-6 fs-sm-5 fs-md-4">
                        {el.descripcion}
                      </Card.Text> */}
                  </div>
                  <Card.Footer className={`${styles.adminFooter}`}>
                    <div className="d-flex w-100 justify-content-evenly">
                      <Button
                        variant="success"
                        onClick={() =>
                          navigate(`/administrar-categoria/${el._id}`)
                        }
                      >
                        Editar <FaPencilAlt />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleOnBorrarCategoria(el._id)}
                      >
                        Eliminar <FaTrashAlt />
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          )}
        </Row>
        <CategoriaPagination
          page={page}
          handlePageChange={handlePageChange}
          data={data}
        />
      </Container>
    </>
  );
};
