import { Checkbox } from '@material-ui/core';
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import authAbstract from '../../../images/authAbstract.png';
import insta from '../../../images/insta.png';



function InfluencerSignup() {
return (

  <Container className='mt-5'>
      <Row>
        <div className='d-lg-flex d-sm-block d-lg-mt-5' style={{justifyContent:'center', alignItems:"center"}}>
          <Col xs={12} sm={12} md={12} lg={6}>
            <img style={{width: '100%', objectFit:'cover'}}src={authAbstract}/>
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
          <div className='text-left justify-content-center align-center'><h4 className='text-center'>Sign up to BrandSense using</h4><h4 className='text-center'> Influencer Login</h4>
            <form className="needs-validation" noValidate>
             
              
              <Col md="4" className="mb-1">
              <div className='justify-content-center align-items-center text-center'>
                  <button className="btn btn-primary " style={{backgroundColor:'#452c63', width:'250px'}} type="submit">
                      <img src={insta} width='20px' height='20px' style={{borderRadius: '35%'}} />Register using Instagram
                  </button>
                </div>
               
                <div style={{fontSize:'10px', textAlign:'center', justifyContent:'center', alignItems:'center'}}>
                   <label>by signing up you agree to our <b><span style={{color: 'purple'}}>terms and conditions</span></b></label>
                </div>
              </Col>
             
          </form>
        </div>
          </Col>
        </div>
      </Row>
     
  </Container>
  

)
}

export default InfluencerSignup;