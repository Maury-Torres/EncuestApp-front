import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

import { Register } from './pages/Register';
import { NavbarTest } from './components/navbar/NavbarTest';


import './pages/Home.css'
import Home from './pages/Home';
import { Encuestas } from './pages/Encuestas';
import { BrowserRouter,Routes,Route } from 'react-router-dom';





ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <>
      <BrowserRouter>
        <NavbarTest/>
        <Routes>
          <Route path='/' element = {<Home/>} />
          <Route path='/encuestas' element = {<Encuestas/>} />
          <Route path='/register' element={<Register />}/>
          <Route path='*' element={<h1>Error</h1>}/>
        </Routes>
      </BrowserRouter>

    </>
  </React.StrictMode>,
)

