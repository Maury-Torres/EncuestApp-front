import { useFetch } from "../../hooks/useFetch";

export const Categorias = () => {
  const { data } = useFetch("http://localhost:3000/api/categorias");
  //TODO 1: Mostrar un spinner mientras se carga la data
  //TODO 2: Mostrar un mensaje de error si la petición falla
  //TODO 3: Mostrar un mensaje si no hay categorías
  //TODO 4: Mostrar las categorias como Cards, con un botón para editar y otro para eliminar solamente si el usuario tiene el rol de admin o moderador
  return (
    <div>
      {data?.map((el) => (
        <div key={el._id}>
          <h1>{el.nombre}</h1>
          <p>{el.descripcion}</p>
          <img src={el.imagen} alt={el.nombre} />
        </div>
      ))}
    </div>
  );
};
