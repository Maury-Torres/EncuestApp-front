import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import { Register } from "./pages/Register";
import { NavbarTest } from "./components/navbar/NavbarTest";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import {
  ABMPage,
  AuthProvider,
  Categorias,
  CategoriasForm,
  CategoriasProvider,
  Encuestas,
  EncuestasProvider,
  Errors,
  Footer,
  HomeV1,
  Login,
  EncuestasForm,
  InfoEquipo,
} from "./pages/index.js";
import { ResponderEncuesta } from "./components/encuestas/responderEncuesta/ResponderEncuesta.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <BrowserRouter>
        <AuthProvider>
          <NavbarTest />
          <Routes>
            <Route path="/" element={<HomeV1 />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              element={
                <EncuestasProvider>
                  <Outlet />
                </EncuestasProvider>
              }
            >
              <Route path="/abm" element={<ABMPage />} />
              <Route path="/encuestas/categoria/:id" element={<Encuestas />} />
              <Route path="/administrar-encuesta" element={<EncuestasForm />} />
              <Route
                path="/administrar-encuesta/:id"
                element={<EncuestasForm />}
              />
              <Route
                path="/responder-encuesta/:id"
                element={<ResponderEncuesta />}
              />
            </Route>

            <Route path="*" element={<Errors />} />

            <Route
              element={
                <CategoriasProvider>
                  <Outlet />
                </CategoriasProvider>
              }
            >
              <Route
                path="/administrar-categoria"
                element={<CategoriasForm />}
              />
              <Route
                path="/administrar-categoria/:id"
                element={<CategoriasForm />}
              />
              <Route path="/categorias" element={<Categorias />} />
            </Route>
            <Route path="/infoEquipo" element={<InfoEquipo />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  </React.StrictMode>
);
