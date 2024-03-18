import React from 'react'
import { Container, Row } from 'react-bootstrap'
import Errors from '../components/error/errors'

const Error = () => {
  return (
    <Container>
        <Row>
            <Errors />
        </Row>
    </Container>
  )
}

export default Error