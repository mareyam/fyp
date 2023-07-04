import { Checkbox } from '@material-ui/core';
import React from 'react';
import { Container, Row, Col } from 'react-grid-system';
import authAbstract from '../../../images/authAbstract.png';
import insta from '../../../images/insta.png';
import InstagramLogin from "react-instagram-oauth";
import {LoginSocialFacebook} from 'reactjs-social-login';
import {FacebookLoginButton}  from 'react-social-login-buttons';
import { useState } from "react";

// https://api.instagram.com/oauth/authorize?client_id=1323271384927891&redirect_uri=http://localhost:3000/InfluencerLogin&scope=user_profile,user_media&&response_type=code

const REDIRECT_URI = 'https://instagram.com';

function InfluencerSignup() {
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  
  useEffect(() => {
    if (profile && profile.name) {
      console.log("name is", profile.name);
      axios.post('http://127.0.0.1:8000/api/userlist', {
        email: profile.email,
        name: profile.name,
        username:profile.id
      })
      .then((response) => {
        console.log('Data successfully posted:', response.data);
      })
      .catch((error) => {
        console.error('Error posting data:', error);
      });
    }
  }, [profile]);

    const handleFacebookLogin = (response) => {
      console.log(response);
      setProfile(response.data);
      setName(response.data.name);
      setEmail(response.data.email);
      setUsername(response.data.id);
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
          <Col xs={12} sm={12} md={12} lg={6}>

          

          <div className='mt-5 text-left justify-content-center align-center'><h4 className='text-center'>Sign up to BrandSense using</h4><h4 className='text-center'> Influencer Login</h4>
            <form className="needs-validation" noValidate>


             
              
            <Col md="4" className="mb-1 d-flex justify-content-center align-items-center flex-column">
              <div className='justify-content-center align-items-center text-center'>
                                   
                  <LoginSocialFacebook
                    appId="659011799420597"
                    onResolve={handleFacebookLogin}
                    onReject={(error) => {
                      console.log(error);
                    }}
                  >
                    <FacebookLoginButton />
                  </LoginSocialFacebook>

                  <h1>name is {name}</h1>
                  <h1>name is {email}</h1>
                  <h1>name is {username}</h1>
                                
                </div>
                <div style={{fontSize:'10px', textAlign:'center', justifyContent:'center', alignItems:'center'}}>
                   <label>Already have an account?  <a href="/InfluencerLogin"> click here</a></label>
                </div>
                <div style={{fontSize:'10px', textAlign:'center', justifyContent:'center', alignItems:'center'}}>
                   <label>by signing up you agree to our <b><span style={{color: 'purple'}}>terms and conditions</span></b></label>
                </div>
              </Col>
             
          </form>
        </div>
          </Col>
        
      </Row>
     
  </Container>
  

)
}

export default InfluencerSignup;