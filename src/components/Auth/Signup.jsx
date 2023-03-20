import { Checkbox } from '@material-ui/core';
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';


function Login() {
return (

  <Container className="d-lg-mt-5">
      <Row className="d-lg-mt-5">
        <div className='d-lg-flex d-sm-block' style={{justifyContent:'center', alignItems:"center"}}>
          <Col xs={12} sm={12} md={12} lg={6}>
            <img style={{width: '100%', objectFit:'cover'}}src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"/>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
          <div className='text-left justify-content-center align-center d-lg-mt-5'><h4 className='text-center'>Brand Manager's Signup</h4>
            <form className="needs-validation" noValidate>
              <Col md="4" className="mb-3">
                <label htmlFor="validationTooltip01" style={{textAlign:'left'}}>Email</label>
                {/* <input type="text" className="form-control" id="validationTooltip01" placeholder="Email" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}/> */}
                <input type="email" className="form-control" id="validationTooltip01" placeholder="Email" name="email" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}></input>
                <div className="valid-tooltip">
                  Looks good!
                </div>
              </Col>
              <Col md="4" className="mb-3">
                <label for="inputPassword5">Password</label>
                <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock"/>
                {/* <small id="passwordHelpBlock" class="form-text text-muted">
                  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </small> */}
              </Col>
              <Col md="4" className="mb-3">
                <label for="inputPassword5">Confirm Password</label>
                <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock"/>
                {/* <small id="passwordHelpBlock" class="form-text text-muted">
                  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                </small> */}
              </Col>

              <Col md="4" className="mb-3">
              <div class="input-group mb-3">
                <div class="custom-file">
                    <input type="file" class="custom-file-input" id="inputGroupFile02"/>
                </div>
                </div>
            </Col>
              <div className='justify-content-center align-items-center text-center'><button className="btn btn-primary " type="submit">Submit form</button></div>
          </form>
        </div>
          </Col>
        </div>
      </Row>
     
  </Container>
  

)
}

export default Login;