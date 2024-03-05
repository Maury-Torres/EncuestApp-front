import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { Register } from './pages/Register';
import { NavbarTest } from './components/navbar/NavbarTest';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import HomeV1 from './components/home/HomeV1';
import Banners from './components/banners/Banners';







ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <>
      <BrowserRouter>
        <NavbarTest/>
        <Routes>
          <Route path='/' element = {<HomeV1/>} />
          <Route path='/register' element={<Register />}/>
          <Route path='/encuestas' element={<Banners/>}/>
          <Route path='*' element={<h1>Error</h1>}/>
        </Routes>
      </BrowserRouter>

    </>
  </React.StrictMode>,
)

