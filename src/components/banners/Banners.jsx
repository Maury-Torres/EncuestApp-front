import React from 'react';
import categorias from '../../utils/categories.js';
import '../banners/Banners.css';
import { Card, Row, Container, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Banners = () => {
  return (


    <Container>
    <h1 className='text-center'>Seleccione una categoria</h1>
    <Row>
      {categorias.map(category => (
        <Col>
        <Link to='/formulario'>
            <Card key={category.id} id='cardStyle'>
              <Card.Img src={category.imagen} alt={category.name} className='category-img' />
              <Card.Body >
              <Card.Text className='text-center'>{category.categoria}</Card.Text>
              </Card.Body>
            </Card>
        </Link>
        
        </Col>


      ))}

    </Row>

  </Container>
    
  );
}

export default Banners;