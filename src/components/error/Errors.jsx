import React from 'react'
import { Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';




const Errors = () => {
  return (
    <Col>
        <Card className="bg-dark text-white">
            <Card.Img src="https://www.maketecheasier.com/assets/uploads/2017/09/404-Error-Page-Cover.jpg" alt="Card image" />
            <Card.ImgOverlay>
            <Card.Title>Upss!!</Card.Title>
            <Card.Text>
                La página que estas solicitando no está en el servidor.
            </Card.Text>
            <Card.Text>
                Prueba mejor suerte con estos Links:
            </Card.Text>
            <Card.Text>
                <Link to='/' className='fw-bold text-black'> <FontAwesomeIcon icon={faHandPointRight} /> Go to home</Link>
            </Card.Text>
            <Card.Text>
                <Link to='/login' className='fw-bold text-black'><FontAwesomeIcon icon={faHandPointRight} /> Login</Link>
            </Card.Text>
            </Card.ImgOverlay>
        </Card>
    </Col>
  );
}

export default Errors