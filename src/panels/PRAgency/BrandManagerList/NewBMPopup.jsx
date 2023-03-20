import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function NewBMPopup() {
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleClosePopUp = () => {
    setIsVisible(false);
  };

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
    height: '350px',
    backgroundColor: 'white',
    border: '1px solid black',
    padding: '20px',
    zIndex: '9999'
  };

  return (
    <>
      <div style={popUpStyle}>
        <form>
            <h5 style={{textAlign:'center', marginBottom:'5%'}}>Add new Brand Managers</h5>
            <Row style={{justifyContent:'center'}}>
                <Col xs={12} sm={12} md={10} lg={10}>
                <label style={{paddingRight:'10px'}}><b>Name:</b></label>
                <input placeholder='Please enter the name of the Brand Manager' type="text" style={{width: '350px'}} />
                <br/><hr/>
                <label style={{paddingRight:'10px'}}><b>Email:</b></label>
                <input placeholder='Please enter the email of the Brand Manager' type="email" style={{width: '300'}} />
                <br/><hr/>
                <label style={{paddingRight:'10px'}}><b>Brand Name:</b></label>
                <input placeholder='Please enter the Brand Name' type="text" style={{width: '300px'}} />
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
export default NewBMPopup;
