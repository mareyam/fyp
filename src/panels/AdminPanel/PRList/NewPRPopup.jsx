import axios from "axios";
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function NewPRPopup() {
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleClosePopUp = () => {
    setIsVisible(false);
  };

  const handleSubmit = (event) => {
   event.preventDefault();
    const data = {
      name : name,
      email : email
    };

   console.log("data is "+data);
   axios.post('http://127.0.0.1:8000/api/register/', data)
    .then(response => console.log("got it"+response))
    .catch(error => console.log("error"));

    console.log('name:', name);
    console.log('email:', email);

    // Reset the input fields
    setName('');
    setEmail('');
}   
  useEffect(() => {
    if (isVisible) {
      const centerX = window.innerWidth / 2 - 350;
      const centerY = window.innerHeight / 2 - 150;
      setPosition({ x: centerX, y: centerY });
    }
  }, [isVisible]);

  const popUpStyle = {
    display: isVisible ? 'block' : 'none',
    position: 'absolute',
    top: position.y,
    left: position.x,
    width: '700px',
    height: '300px',
    backgroundColor: 'white',
    border: '1px solid black',
    padding: '20px',
    zIndex: '9999'
  };

  return (
    <>
      <div style={popUpStyle}>
        <form onSubmit={handleSubmit}>
            <h5 style={{textAlign:'center', marginBottom:'5%'}}>Add new PR</h5>
            <Row style={{justifyContent:'center'}}>
                <Col xs={12} sm={12} md={10} lg={10}>
                <label style={{paddingRight:'10px'}}><b>Name:</b></label>
                <input placeholder='Please enter the name of the PR Agency' type="text" onChange={(e) => setName(e.target.value)} style={{width: '300px'}} />
                <br/><hr/>
                <label style={{paddingRight:'10px'}}><b>Email:</b></label>
                <input placeholder='Please enter the email of the PR Agency' type="email" onChange={(e) => setEmail(e.target.value)} style={{width: '300px'}} />
                <br/><hr/>
                    <div style={{display:'flex', justifyContent: 'flex-end'}}>
                    <Button style={{color: 'black', backgroundColor:'gray'}}onClick={handleClosePopUp}>Cancel</Button>
                    <Button style={{color: 'white', backgroundColor:'#452c63'}} type="submit">Send Invitation</Button>
                    </div>
                </Col>
          </Row>
        </form>
        
      </div>
    </>
  );
}
export default NewPRPopup;
