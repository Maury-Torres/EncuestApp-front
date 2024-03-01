import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'



const EncuestasV1 = () => {
  return (

    <div className="d-grid gap-2 position-absolute top-50 start-50 translate-middle ">

        <Link to='/encuestas2'> 
          <Button variant="success" size="lg" className="rounded-5">
            Ingresar
          </Button>
        </Link>
      
      
      <Link to='/encuestas2'>
        <Button variant="dark" size="lg" className="rounded-5">
            Anónimo
         </Button>
      </Link>

    </div>
  )
}

export default EncuestasV1