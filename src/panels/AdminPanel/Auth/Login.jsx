import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Checkbox } from '@material-ui/core'
import { Container, Row, Col } from 'react-grid-system';
import authAbstract from '../../../images/authAbstract.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const notify = () => toast("Wow so easy!");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://127.0.0.1:8000/api/login/');
      const users = response.data;

      const matchedUser = users.find((user) => user.email === email && user.password === password);
      

      if (matchedUser) {
        setLoginError('');
        // Redirect to AdminDashboard
        toast.success('Login success');
        window.location.href = '/AdminDashboard';
      } 
      else {
        setLoginError('Invalid email or password');
        toast.failed('invalid email or password!');
      }
    } catch (error) {
      console.error(error);
      setLoginError('An error occurred during login');
      toast.error('Login failed');
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
          <Col xs={12} sm={12} md={12} lg={6} className='mt-5'>
          <div className='mt-5 text-left justify-content-center align-center'><h4 className='text-center'>Admin's Login</h4>
          <form className="needs-validation" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="validationTooltip01" style={{ textAlign: 'left' }}>
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="validationTooltip01"
            placeholder="Email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            style={{
              borderRadius: '0',
              borderBottom: '1px solid black',
              borderLeft: 'none',
              borderTop: 'none',
              borderRight: 'none',
            }}
          />
          <div className="valid-tooltip">Looks good!</div>
        </div>
        <div className="mb-1">
          <label htmlFor="inputPassword5">Password</label>
          <input
            type="password"
            id="inputPassword5"
            className="form-control"
            aria-describedby="passwordHelpBlock"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-1" style={{ fontSize: '10px', textAlign: 'end', justifyContent: 'right', alignItems: 'right' }}>
          <label>
            <b>
              <a href="/AdminForgot" style={{ color: 'purple', textDecoration: 'underline' }}>
                Forgot Password?
              </a>
            </b>
          </label>
        </div>
        <div className="mb-1" style={{ fontSize: '10px', textAlign: 'center', justifyContent: 'center', alignItems: 'center' }}>
          <label>
            by signing up you agree to our <b style={{ color: 'purple' }}>terms and conditions</b>
          </label>
        </div>
        <div className="justify-content-center align-items-center text-center">
          <button className="btn btn-primary" style={{ backgroundColor: '#452c63', width: '200px' }} type="submit">
            Submit form
          </button>
        </div>
      </form>
      <ToastContainer/>
      {loginError && <p>{loginError}</p>}
      </div>
          </Col>
     
    </Row>
    </Container>
  );
}

export default LoginForm;

// function AdminLogin() {
//  const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginError, setLoginError] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     console.log("here 1");

//     try {
//       const response = await axios.get('http://127.0.0.1:8000/bmlogin/');
//       const users = response.data;

//       const matchedUser = users.find((user) => user.email === email && user.password === password);
//       console.log("here 2");
//       if (matchedUser) {
//         setLoginError('');
//         console.log("validddddddddd");
//         // Redirect to AdminDashboard
//         window.location.href = '/AdminDashboard';
//       } else {
//         setLoginError('Invalid email or password');
//         console.log("invalid");
//       }
//     } catch (error) {
//       console.error(error);
//       setLoginError('An error occurred during login');
//       console.log("invalid from catch");

//     }
//     console.log("here 3");
//   };

// return (

//   <Container className='mt-5'>
//       <Row>
//         <div className='d-lg-flex d-sm-block d-lg-mt-5' style={{justifyContent:'center', alignItems:"center"}}>
//           <Col xs={12} sm={12} md={12} lg={6}>
//             <img style={{width: '100%', objectFit:'cover'}}src={authAbstract}/>
//           </Col>
//           <Col xs={12} sm={12} md={12} lg={6}>
//           <div className='text-left justify-content-center align-center'><h4 className='text-center'>Admin's Loginnn</h4>
//             <form className="needs-validation"  onSubmit={handleSubmit}>
//               <Col md="4" className="mb-3">
//                 <label htmlFor="validationTooltip01" style={{textAlign:'left'}}>Email</label>
//                 {/* <input type="text" className="form-control" id="validationTooltip01" placeholder="Email" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}/> */}
//                 <input type="email" className="form-control" id="validationTooltip01" placeholder="Email" name="email" required onChange={(e) => setEmail(e.target.value)} style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}></input>
//                 <div className="valid-tooltip">
//                   Looks good!
//                 </div>
//               </Col>
//               <Col md="4" className="mb-1">
//                 <label for="inputPassword5">Password</label>
//                 <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"  onChange={(e) => setPassword(e.target.value)}/>
//               </Col>
//               <Col md="4" className="mb-1">
//                 <div style={{fontSize:'10px', textAlign:'end', justifyContent:'right', alignItems:'right'}}>
//                    <label><b><a href="/AdminForgot"><span style={{color: 'purple', textDecoration:'underline'}}>Forgot Password?</span></a></b></label>
//                 </div>
//                 <div style={{fontSize:'10px', textAlign:'center', justifyContent:'center', alignItems:'center'}}>
//                    <label>by signing up you agree to our <b><span style={{color: 'purple'}}>terms and conditions</span></b></label>
//                 </div>
//               </Col>
//               <div className='justify-content-center align-items-center text-center'>
//                 <button className="btn btn-primary " style={{backgroundColor:'#452c63', width:'200px'}} type="button">Submit form
//                 </button>
//               </div>
//           </form>
//           {loginError && <p>{loginError}</p>}
//         </div>
//           </Col>
//         </div>
//       </Row>
     
//   </Container>
  

// )
// }

// export default AdminLogin;