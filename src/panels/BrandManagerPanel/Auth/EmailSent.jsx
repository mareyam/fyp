import { Checkbox } from '@material-ui/core';
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import authAbstract from '../../../images/authAbstract.png';
import emailSent from '../../../images/emailSent.png';




function EmailSent() {
return (

  <Container className='mt-2'>
      <Row>
        <div className='d-lg-flex d-sm-block d-lg-mt-5' style={{justifyContent:'center', alignItems:"center"}}>
          <Col xs={12} sm={12} md={12} lg={6}>
            <img style={{width: '100%', objectFit:'cover'}}src={authAbstract}/>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
          <div className='text-left justify-content-center align-center'>
              <div className="d-flex justify-content-center align-items-center">
                <img className="mx-auto" style={{height: '120px', width:'120px', objectFit:'cover'}} src={emailSent} alt="Email Sent"/>
              </div>
              <h4 className='text-center' style={{color:'#452c63'}}>Reset Email Sent!</h4>
              <p className='text-center'>We have sent you a password reset link on your email <br/> Didn’t receive the email? Check your spam filter</p>
              <form className="needs-validation" noValidate>           
                <div className='justify-content-center align-items-center text-center'>
                  <button className="btn btn-primary " type="submit" style={{backgroundColor:'#452c63', width:'200px'}}>Home Page</button>
                </div>
              </form>
          </div>

          </Col>
        </div>
      </Row>
     
  </Container>
  

)
}

export default EmailSent;