import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { LoginUser } from '../components/login/LoginUser'

const Login = () => {
  return (
    <Container>
        <Row>
            <LoginUser/>
        </Row>
    </Container>
  )
}

export default Login