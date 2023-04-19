import { Checkbox } from '@material-ui/core';
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import authAbstract from '../../../images/authAbstract.png';



function AdminLogin() {
return (

  <Container className='mt-5'>
      <Row>
        <div className='d-lg-flex d-sm-block d-lg-mt-5' style={{justifyContent:'center', alignItems:"center"}}>
          <Col xs={12} sm={12} md={12} lg={6}>
            <img style={{width: '100%', objectFit:'cover'}}src={authAbstract}/>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
          <div className='text-left justify-content-center align-center'><h4 className='text-center'>Admin's Login</h4>
            <form className="needs-validation" noValidate>
              <Col md="4" className="mb-3">
                <label htmlFor="validationTooltip01" style={{textAlign:'left'}}>Email</label>
                {/* <input type="text" className="form-control" id="validationTooltip01" placeholder="Email" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}/> */}
                <input type="email" className="form-control" id="validationTooltip01" placeholder="Email" name="email" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}></input>
                <div className="valid-tooltip">
                  Looks good!
                </div>
              </Col>
              <Col md="4" className="mb-1">
                <label for="inputPassword5">Password</label>
                <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock"/>
                {/* <small id="passwordHelpBlock" class="form-text text-muted">
                  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </small> */}
              </Col>
              <Col md="4" className="mb-1">
                <div style={{fontSize:'10px', textAlign:'end', justifyContent:'right', alignItems:'right'}}>
                   {/* <label><b><span style={{color: 'purple', textDecoration:'underline'}}>Forgot Password?</span></b></label> */}
                   <label><b><a href="/AdminForgot"><span style={{color: 'purple', textDecoration:'underline'}}>Forgot Password?</span></a></b></label>
                </div>
                <div style={{fontSize:'10px', textAlign:'center', justifyContent:'center', alignItems:'center'}}>
                   <label>by signing up you agree to our <b><span style={{color: 'purple'}}>terms and conditions</span></b></label>
                </div>
              </Col>
              <div className='justify-content-center align-items-center text-center'><button className="btn btn-primary " style={{backgroundColor:'#452c63', width:'200px'}} type="submit">Submit form</button></div>
          </form>
        </div>
          </Col>
        </div>
      </Row>
     
  </Container>
  

)
}

export default AdminLogin;