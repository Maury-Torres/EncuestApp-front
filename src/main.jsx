import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import { Register } from "./pages/Register";
import { NavbarTest } from "./components/navbar/NavbarTest";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import HomeV1 from "./components/home/HomeV1";
import Banners from "./components/banners/Banners";
import Login from "./pages/Login";
import { ABMPage } from "./pages/ABMPage";
import { EncuestasProvider } from "./context/EncuestaContext";
import { Footer } from "./components/footer/Footer";

import { Categorias } from "./components/categorias/Categorias";
import { CategoriasForm } from "./components/categorias/form/CategoriasForm";
import { CategoriasProvider } from "./context/CategoriaContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <BrowserRouter>
        <NavbarTest />
        <Routes>
          <Route path="/" element={<HomeV1 />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/banners" element={<Banners />} />
          <Route
            element={
              <EncuestasProvider>
                <Outlet />
              </EncuestasProvider>
            }
          >
            <Route path="/abm" element={<ABMPage />} />
          </Route>


          <Route
            element={
              <CategoriasProvider>
                <Outlet />
              </CategoriasProvider>
            }
          >
            <Route path="/administrar-categoria" element={<CategoriasForm />} />
            <Route
              path="/administrar-categoria/:id"
              element={<CategoriasForm />}
            />

            <Route path="/categorias" element={<Categorias />} />
          </Route>

          <Route path="*" element={<h1>Error</h1>} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  </React.StrictMode>
);
