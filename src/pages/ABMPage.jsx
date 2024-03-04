import { useState } from "react";
import styles from "./ABMPage.module.css";

export const ABMPage = () => {
  const [userName, setUserName] = useState("Admin"); //! Placeholder

  return (
    <div className="">
      <h1 className="h1 text-center">Bienvenido, {userName}!</h1>
      <section className="header-abm">
        <div className="d-flex justify-content-evenly mt-5">
          <button className="btn btn-primary p-3">Crear nueva encuesta</button>
          <button className="btn btn-primary p-3">Crear nueva categoria</button>
        </div>
      </section>
      <hr className="mt-5 border-5" />
      <section className={styles.list_abm}></section>
    </div>
  );
};
