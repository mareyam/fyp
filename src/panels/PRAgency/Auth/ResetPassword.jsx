import { Checkbox } from '@material-ui/core';
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import authAbstract from '../../../images/authAbstract.png';



function ResetPassword() {
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
          <Col xs={12} sm={12} md={12} lg={6} className='mt-5'>
          <div className='mt-5 text-left justify-content-center align-center'>
              <h4 className='text-center'>Reset your Password</h4>
            <form className="needs-validation" noValidate>
              <Col md="4" className="mb-3">
                <input type="email" className="form-control" id="validationTooltip01" placeholder="New Password" name="email" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}></input>     
              </Col>
              <Col md="4" className="mb-3">
                <input type="email" className="form-control" id="validationTooltip01" placeholder="Confirm New Password" name="email" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}></input>     
              </Col>
              <div className='justify-content-center align-items-center text-center'><button className="btn btn-primary " type="submit" style={{backgroundColor:'#452c63', width:'220px'}}>Reset Password</button></div>
           </form>
        </div>
          </Col>
      </Row>
  </Container>
  

)
}

export default ResetPassword;