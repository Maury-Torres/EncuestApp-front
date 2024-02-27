import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import './pages/Home.css'
import Home from './pages/Home';
import { Encuestas } from './pages/Encuestas';
import { BrowserRouter,Routes,Route } from 'react-router-dom';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/encuestas' element = {<Encuestas/>} />
        <Route path='*' element={<h1>Error</h1>}/>
      </Routes>
      </BrowserRouter>

    </>
  </React.StrictMode>,
)

