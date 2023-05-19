import axios from 'axios';
import { useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-grid-system';
import authAbstract from '../../../images/authAbstract.png';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get('http://127.0.0.1:8000/prlogin/');
      const users = response.data;

      const matchedUser = users.find((user) => user.email === email);

      if (matchedUser) {
        if (matchedUser.password === "null") {
          if (password === confirmPassword) {
            // Update the password in the database
            await axios.post('http://127.0.0.1:8000/prregistration/', {
              email: email,
              password: password,
              confirm_password: confirmPassword
            });
            setLoginError('Password updated successfully');
          } else {
            setLoginError('Password and confirm password do not match');
          }
        } else if (matchedUser.password !== password) {
          setLoginError('Incorrect password');
        } else {
          setLoginError('Password match');
          window.location.href = '/PRDashboard';
        }
      } else {
        setLoginError('User not found');
      }
    } catch (error) {
      console.error(error);
      setLoginError('An error occurred during login');
    }
  };

  
return (

  <Container className="mt-5">
      <Row className="d-lg-mt-5">
        <div className='d-lg-flex d-sm-block' style={{justifyContent:'center', alignItems:"center"}}>
          <Col xs={12} sm={12} md={12} lg={6}>
            <img style={{width: '100%', objectFit:'cover'}}src={authAbstract} />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
          <div className='text-left justify-content-center align-center d-lg-mt-5'><h4 className='text-center'>PR Agency's Signup</h4>
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
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
                <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"/>
              </Col>
              <Col md="4" className="mb-3">
                <label for="inputPassword5">Confirm Password</label>
                <input type="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock"/>
              </Col>


              <Col md="4" className="mb-3">
                <>
                    <label for="inputPassword5">Upload Profile Picture</label>
                    <div className="input-group mb-3">
                      <div className="custom-file">
                          <input type="file" className="custom-file-input" id="inputGroupFile02"/>
                      </div>
                    </div>
                </>
            </Col>
            <Col md="4" className="mb-3 text-align-center">
            <label for="login">Already have an account?
                 <a href="/PRLogin" >
                    <span style={{color: '#452c63', textDecoration:'none' }}><b>Login</b>
                    </span>
                 </a>
                </label>
            </Col>
              <div className='justify-content-center align-items-center text-center'><button className="btn btn-primary " type="submit" style={{backgroundColor:'#452c63', width:'200px'}}>Submit form</button></div>
          </form>
          {loginError && <p>{loginError}</p>}
        </div>
          </Col>
        </div>
      </Row>
     
  </Container>
  

)
}

export default Login;
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const [confirmpassword, setConfirmPassword] = useState('');
// const [loginError, setLoginError] = useState('');

// const handleSubmit = async (event) => {
//   event.preventDefault();

//   try {
//     const response = await axios.get('http://127.0.0.1:8000/prlogin/');
//     const users = response.data;

//     const matchedUser = users.find((user) => user.email === email);

//     if (matchedUser) {
//       if (matchedUser.password === null) {
//         setLoginError('Password is not set. Please register to the account.');
//       } else if (matchedUser.password !== password) {
//         setLoginError('Incorrect password');
//       } else if (matchedUser.password === password){
//         setLoginError('pass match');
//          window.location.href = '/PRDashboard';
//       }
//     } else {
//       setLoginError('User not found');
//     }
//   } catch (error) {
//     console.error(error);
//     setLoginError('An error occurred during login');
//   }
// };

