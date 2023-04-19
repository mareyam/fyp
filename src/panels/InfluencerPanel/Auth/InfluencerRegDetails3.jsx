import React,{useState} from 'react';
import { Container, Row, Col } from 'react-grid-system';
import authAbstract from '../../../images/authAbstract.png';
import DatePicker from 'react-datepicker';
import 'react-input-range/lib/css/index.css';
import InputRange from 'react-input-range';

function InfluencerRegDetails() {
return (

  <Container className="mt-5">
      <Row className="d-lg-mt-5">
        <div className='d-lg-flex d-sm-block' style={{justifyContent:'center', alignItems:"center"}}>
          <Col xs={12} sm={12} md={12} lg={6}>
            <img style={{width: '100%', objectFit:'cover'}}src={authAbstract} />
          </Col>
          <Col xs={12} sm={12} md={12} lg={6}>
          <div className='text-left justify-content-center align-center d-lg-mt-5'><h4 className='text-center'>Welcome to Brand Sense, Ali Zafar</h4>
           <h6 className='text-center'>to get started, tell us about yourself.</h6>

            <form className="needs-validation" noValidate>
              <Col md="4" className="mb-3">
                 <Filters/>
              </Col> 
           
              <div className='justify-content-center align-items-center text-center'>
              <a href="/InfluencerRegDetails2" style={{textDecoration:"none"}}>
              <button type="button" className="btn btn-primary" style={{backgroundColor:'#452c63', width:'200px'}}>Back</button></a></div>

              <div className='justify-content-center align-items-center text-center'>
              <a href="/InfluencerDashboard" style={{textDecoration:"none"}}>
              <button type="submit" className="btn btn-primary" style={{backgroundColor:'#452c63', width:'200px'}}>Submit</button></a></div>

          </form>
        </div>
          </Col>
        </div>
      </Row>
     
  </Container>
  

)
}

export default InfluencerRegDetails;







function Filters() {
    const [gender, setGender] = useState('');
    const [isParent, setIsParent] = useState(false);
    const [childrenCount, setChildrenCount] = useState({ min: 0, max: 10 });
    const [childAge, setChildAge] = useState({ min: 0, max: 25 });
    const [dateOfBirth, setDateOfBirth] = useState(new Date("2014/02/08"));

    const [storyCost, setStoryCost] = useState('');
    const [postCost, setPostCost] = useState('');

    
    const handlePostCost = (postCost) => {
      setPostCost(postCost);
    }

    const handleStoryCost = (storyCost) => {
      setStoryCost(storyCost);
    }
    
 
    return (
      <div>      
          <div className='mb-3'>
            <b><label >Story Cost</label></b>
            <StoryCost onStoryCost={handleStoryCost}/>
            </div>

            <div className='mb-3'>
            <b><label >Post Cost</label></b>
            <PostCost onPostCost={handlePostCost}/>  
            </div>            
      </div>
    
    );
  
  }
  
  
  function StoryCost(props) {
    const [storyCost, setStoryCost] = useState('');
  
    function handleStoryCost(e) {
      const newStoryCost = e.target.value;
      setStoryCost(newStoryCost);
      props.onStoryCost(newStoryCost);
    }
  
  
    return (
      <div className='d-flex'>
       <input type="text" onChange={handleStoryCost} className="form-control" id="validationTooltip01" placeholder="Rs: 25,000" name="text" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}></input>
      </div>
    );
  }


  function PostCost(props) {
    const [postCost, setPostCost] = useState('');
  
    function handlePostCost(e) {
      const newPostCost = e.target.value;
      setPostCost(newPostCost);
      props.onPostCost(newPostCost);
    }
  
  
    return (
      <div className='d-flex'>
       <input type="text" onChange={handlePostCost} className="form-control" id="validationTooltip01" placeholder="Rs: 25,000" name="text" required style={{  borderRadius:'0', borderBottom: '1px solid black',  borderLeft: 'none', borderTop: 'none', borderRight: 'none'}}></input>
      </div>
    );
  }
