import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Checkbox } from '@material-ui/core';
import { Container, Row, Col } from 'react-grid-system';
import authAbstract from '../images/authAbstract.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  const notify = () => toast("Wow so easy!");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const forgetPasswordData ={
      email: email,
    }
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/forget-password/',forgetPasswordData);
      const users = response.data;
      console.log("response is u"+users);
      console.log("response is ue"+users.email);
      console.log("response is e"+email);
      
      toast.success('success');
      // window.location.href = '/EmailSent';

    } catch (error) {
      console.error(error);
      setLoginError('An error occurred during login');
      toast.error('an error occured');
    }
  };
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
          <Col xs={12} sm={12} md={12} lg={6}  className='mt-5'>
          <div className='mt-5 text-left justify-content-center align-center'>
              <h4 className='text-center'>Forgot Password?</h4>
              <p className='text-center'>Enter your email now to recover your password</p>
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
              <Col md="4" className="mb-3">
                
                {/* <input type="text" className="form-control" id="validationTooltip01" placeholder="Email" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}/> */}
                <input onChange={handleEmail} type="email" className="form-control" id="validationTooltip01" placeholder="Email" name="email" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}></input>
                
              </Col>
             
              <div className='justify-content-center align-items-center text-center'><button className="btn btn-primary " type="submit" style={{backgroundColor:'#452c63', width:'200px'}}>Send Email</button></div>
          </form>
          <ToastContainer/>
          {loginError && <p>{loginError}</p>}
        </div>
          </Col>
      </Row>
  </Container>
  

)
}

export default ForgotPassword;