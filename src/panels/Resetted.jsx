import { Checkbox } from '@material-ui/core';
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import authAbstract from '../../../images/authAbstract.png';
import resetted from '../../../images/resetted.png';

function Resetted() {
return (

      <Container fluid className="h-100">
      <Row className="h-100"> 
      <Col
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  className="d-flex align-items-center justify-content-center p-0 vh-100"
              >
          <img style={{width: '100%',height:'100%', objectFit:'cover'}}src={authAbstract}/>
        </Col>
          <Col className='mt-5' xs={12} sm={12} md={12} lg={6}>
          <div className='mt-5 text-left justify-content-center align-center'>
              <div className="d-flex justify-content-center align-items-center">
                <img className="mx-auto" style={{height: '80px', width:'85px', objectFit:'cover'}} src={resetted} alt="Email Sent"/>
              </div>
              <h4 className='text-center' style={{color:'#452c63'}}><b>Congradulation!</b></h4>
              <p className='text-center'>You have successfully reset your password</p>
              <form className="needs-validation" noValidate>           
                <div className='justify-content-center align-items-center text-center'>
                  <button className="btn btn-primary " type="submit" style={{backgroundColor:'#452c63', width:'200px'}}>Return to Login</button>
                </div>
              </form>
          </div>
          </Col>
      </Row>
  </Container>
)
}

export default Resetted;