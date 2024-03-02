import React, {useState, useRef} from 'react';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { alertcustom } from '../../utils/alertCustom';

const LoginUser = () => {
  const formDataRef = useRef({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const {name, value} = e.target;
    formDataRef.current = {
    ...formDataRef.current,
    [name]: value
   }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if(!formDataRef.current.email) {
      newErrors.email = 'Ingrese su email';
    }

    if(!formDataRef.current.password) {
      newErrors.password = 'Ingrese su contrseña';
    }

    setErrors(newErrors);

    if(Object.keys(newErrors).length === 0) {
      console.log(formDataRef);
      alertcustom("logueado","Felicidades","successfull")
    }
  };

  return (
    <Container>
      <h3>Login</h3>
      <Row className = 'justify-content-center '>
        <Col sm={10}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3"
            controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
              type="email"
              placeholder="Enter email"
              name='email'
              defaultValue={formDataRef.current.email}
              onChange={handleChange}
              isValid={formDataRef.current.email && !errors.email}
              isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.email}
              </Form.Control.Feedback>
              <Form.Control.Feedback type='vaild'>Hola
              </Form.Control.Feedback>
            </Form.Group>
            
            <Form.Group className="mb-3"
            controlId="formBasicpassword1">
              <Form.Label>password</Form.Label>
              <Form.Control
              type="password"
              placeholder="Password"
              name='password'
              defaultValue={formDataRef.current.password}
              onChange={handleChange}
              isValid={formDataRef.current.password && !errors.password}
              isInvalid={!!errors.password}
              />
              <Form.Control.Feedback type='invalid'>
                {errors.password}
              </Form.Control.Feedback>
              <Form.Control.Feedback type='vaild'>Hola
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="secondary" type="submit">Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
};

export default LoginUser;