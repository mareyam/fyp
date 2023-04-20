import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Error404 = () => {
return (
    <Container className='mt-5'>
        <Row>
            <Col xs={12} sm={12} md={12} lg={12} className='text-center'>
                <h1 style={{fontSize:'100px'}}>404</h1>
                <h2 style={{fontSize:'75px'}}>NOT FOUND</h2>
                <h6 style={{fontSize:'40px'}}>The requested page could not found in the server</h6>
            </Col>
        </Row>
    </Container>
)
}
export default Error404;