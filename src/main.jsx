import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { Register } from './pages/Register';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <h1>Proyecto Encuestas</h1>
      <Register/>
    </>
  </React.StrictMode>,
)
