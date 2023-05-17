import axios from 'axios';
import { useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-grid-system';
import authAbstract from '../../../images/authAbstract.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://127.0.0.1:8000/bmlogin/');
      const users = response.data;

      const matchedUser = users.find((user) => user.email === email && user.password === password);

      if (matchedUser) {
        setLoginError('');
        // Redirect to AdminDashboard
        window.location.href = '/PRDashboard';
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      console.error(error);
      setLoginError('An error occurred during login');
    }
  };

  return (
    <Container className='mt-5'>
      <Row>
        <div className='d-lg-flex d-sm-block d-lg-mt-5' style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Col xs={12} sm={12} md={12} lg={6}>
            <img style={{ width: '100%', objectFit: 'cover' }} src={authAbstract} alt="Auth Abstract" />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
            <div className='text-left justify-content-center align-center'>
              <h4 className='text-center'>PR Agency's Login</h4>
              <div style={{ fontSize: '12px' }} className='text-center'>
                <label>
                  <a href="/BMSignup" style={{ textDecoration: 'none', color: 'black' }}>
                    Don't have an account? <span style={{ color: 'purple', textDecoration: 'underline' }}><b>Register now</b></span>
                  </a>
                </label>
              </div>
              <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                <Col md="4" className="mb-3">
                  <label htmlFor="validationTooltip01" style={{ textAlign: 'left' }}>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="validationTooltip01"
                    placeholder="Email"
                    name="email"
                    required
                    style={{
                      borderRadius: '0',
                      borderBottom: '1px solid black',
                      borderLeft: 'none',
                      borderTop: 'none',
                      borderRight: 'none'
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="valid-tooltip">
                    Looks good!
                  </div>
                </Col>
                <Col md="4" className="mb-1">
                  <label htmlFor="inputPassword5">Password</label>
                  <input
                    type="password"
                    id="inputPassword5"
                    className="form-control"
                    aria-describedby="passwordHelpBlock"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Col>
                <Col md="4" className="mb-1">
                  <div style={{ fontSize: '10px', textAlign: 'end', justifyContent: 'right', alignItems: 'right' }}>
                    <label>
                      <b>
                        <a href="/BMForgot">
                          <span style={{ color: 'purple', textDecoration: 'underline' }}>Forgot Password?</span>
                        </a>
                      </b>
                   


                      </label>
                  </div>
                  <div style={{ fontSize: '10px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <label>by signing in you agree to our <b><span style={{ color: 'purple' }}>terms and conditions</span></b></label>
                  </div>
                </Col>
                <div className='justify-content-center align-items-center text-center'>
                  <button className="btn btn-primary" style={{ backgroundColor: '#452c63', width: '200px' }} type="submit">Submit form</button>
                </div>
              </form>
              {loginError && <p>{loginError}</p>}
            </div>
          </Col>
        </div>
      </Row>
    </Container>
  );
};
export default Login;

// import { Checkbox } from '@material-ui/core';
// import React from 'react';
// import { Container, Row, Col } from 'react-grid-system';
// import authAbstract from '../../../images/authAbstract.png';




// function Login() {
// const onClick = (path) => {
//     window.location.href = path;
// };

// return (

//   <Container className='mt-5'>
//       <Row>
//         <div className='d-lg-flex d-sm-block d-lg-mt-5' style={{justifyContent:'center', alignItems:"center"}}>
//           <Col xs={12} sm={12} md={12} lg={6}>
//             <img style={{width: '100%', objectFit:'cover'}}src={authAbstract}/>
//           </Col>
//           <Col xs={12} sm={12} md={12} lg={6}>
//           <div className='text-left justify-content-center align-center'><h4 className='text-center'>PR Agency's Login</h4>
//           <div style={{fontSize:'12px'}} className='text-center'>
//                     <label><a href="/PRSignup" style={{textDecoration:'none', color: 'black'}}>Don't have an account? <span style={{color: 'purple', textDecoration:'underline'}}><b>Register now</b></span></a></label>
//             </div>
//             <form className="needs-validation" noValidate>
//               <Col md="4" className="mb-3">
//                 <label htmlFor="validationTooltip01" style={{textAlign:'left'}}>Email</label>
//                 {/* <input type="text" className="form-control" id="validationTooltip01" placeholder="Email" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}/> */}
//                 <input type="email" className="form-control" id="validationTooltip01" placeholder="Email" name="email" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}></input>
//                 <div className="valid-tooltip">
//                   Looks good!
//                 </div>
//               </Col>
//               <Col md="4" className="mb-1">
//                 <label for="inputPassword5">Password</label>
//                 <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock"/>
//                 {/* <small id="passwordHelpBlock" class="form-text text-muted">
//                   Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
//                 </small> */}
//               </Col>
//               <Col md="4" className="mb-1">
//                 <div style={{fontSize:'10px', textAlign:'end', justifyContent:'right', alignItems:'right'}}>
//                    {/* <label><b><span style={{color: 'purple', textDecoration:'underline'}}>Forgot Password?</span></b></label> */}
//                    <label><b><a href="/PRForgot"><span style={{color: 'purple', textDecoration:'underline'}}>Forgot Password?</span></a></b></label>
//                 </div>
//                 <div style={{fontSize:'10px', textAlign:'center', justifyContent:'center', alignItems:'center'}}>
//                    <label>by signing up you agree to our <b><span style={{color: 'purple'}}>terms and conditions</span></b></label>
//                 </div>
//               </Col>
//               <div className='justify-content-center align-items-center text-center'>
//                  <button className="btn btn-primary " style={{backgroundColor:'#452c63', width:'200px'}} type="button" onClick={() => onClick("/PRDashboard")}>Submit form
//                 </button>
//               </div>
//           </form>
//         </div>
//           </Col>
//         </div>
//       </Row>
     
//   </Container>
  

// )
// }

// export default Login;