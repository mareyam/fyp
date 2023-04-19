import { Checkbox } from '@material-ui/core';
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import authAbstract from '../../../images/authAbstract.png';



function ForgotPassword() {
return (

  <Container className='mt-5'>
      <Row>
        <div className='d-lg-flex d-sm-block d-lg-mt-5' style={{justifyContent:'center', alignItems:"center"}}>
          <Col xs={12} sm={12} md={12} lg={6}>
            <img style={{width: '100%', objectFit:'cover'}}src={authAbstract}/>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
          <div className='text-left justify-content-center align-center'>
              <h4 className='text-center'>Forgot Password?</h4>
              <p className='text-center'>Enter your email now to recover your password</p>
            <form className="needs-validation" noValidate>
              <Col md="4" className="mb-3">
                
                {/* <input type="text" className="form-control" id="validationTooltip01" placeholder="Email" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}/> */}
                <input type="email" className="form-control" id="validationTooltip01" placeholder="Email" name="email" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}></input>
                
              </Col>
             
              <div className='justify-content-center align-items-center text-center'><button className="btn btn-primary " type="submit" style={{backgroundColor:'#452c63', width:'200px'}}>Send Email</button></div>
          </form>
        </div>
          </Col>
        </div>
      </Row>
     
  </Container>
  

)
}

export default ForgotPassword;