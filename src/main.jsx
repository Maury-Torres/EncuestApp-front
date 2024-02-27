import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { Register } from './pages/Register';
import { NavbarTest } from './components/navbar/NavbarTest';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NavbarTest/>
        <Routes>
          <Route path='/register' element={<Register />}/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
