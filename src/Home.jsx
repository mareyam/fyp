import {React, useState} from 'react';
import { Container, Row, Col } from 'react-grid-system';
import authAbstract from './images/authAbstract.png';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
      const [selectedOption, setSelectedOption] = useState('');

      const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        if (selectedOption === 'option1') {
          window.location.href = '/BMSignup';
        } 
        if (selectedOption === 'option2') {
            window.location.href = '/PRSignup';
        }
        if (selectedOption === 'option3') {
            window.location.href = '/AdminLogin';
        }
        
      };
  
    return (
        <Container className="mt-3">
  <Row className="d-lg-mt-5">
    <div className='d-lg-flex d-sm-block' style={{justifyContent:'center', alignItems:"center"}}>
      <Col xs={12} sm={12} md={12} lg={6}>
        <img style={{width: '100%', objectFit:'cover'}}src={authAbstract} />
      </Col>
      <Col xs={12} sm={12} md={12} lg={6}>
      <div className='text-left justify-content-center align-center d-lg-mt-5'>
      <h4 className='h4home text-center'>Welcome to Brand Sense</h4>
      <h6 className='h6home text-center'>Continue as:</h6>
      <form className="needs-validation" noValidate onSubmit={handleSubmit}>
        <div className='d-flex justify-content-center align-items-center'>
          <label className='m-2'>
            <input
              type="radio"
              value="option1"
              checked={selectedOption === 'option1'}
              onChange={handleOptionChange}
            />
            Brand Manager
          </label>
          <label className='m-2'>
            <input
              type="radio"
              value="option2"
              checked={selectedOption === 'option2'}
              onChange={handleOptionChange}
            />
            PR Agency
          </label>
          <label className='m-2'>
            <input
              type="radio"
              value="option3"
              checked={selectedOption === 'option3'}
              onChange={handleOptionChange}
            />
            Admin
          </label>
        </div>
        <div className='d-flex justify-content-center align-items-center'>
            <button className="btn btn-primary " type="submit" style={{backgroundColor:'#452c63', width:'200px'}}>Continue</button>
          {/* {selectedOption === 'option1' ? (
            <Link to="/BMSignup" className="btn btn-primary" style={{backgroundColor:'#452c63', width:'200px'}}>Proceed</Link>
          ) : (
            <button className="btn btn-primary " type="submit" style={{backgroundColor:'#452c63', width:'200px'}}>Proceed</button>
          )} */}
        </div>
      </form>
    </div>
      </Col>
    </div>
  </Row>
</Container>

//  <Container className="mt-3">
//       <Row className="d-lg-mt-5">
//         <div className='d-lg-flex d-sm-block' style={{justifyContent:'center', alignItems:"center"}}>
//           <Col xs={12} sm={12} md={12} lg={6}>
//             <img style={{width: '100%', objectFit:'cover'}}src={authAbstract} />
//           </Col>
//           <Col xs={12} sm={12} md={12} lg={6}>
//           <div className='text-left justify-content-center align-center d-lg-mt-5'><h4 className='text-center'>Welcome to Brand Sense</h4>
//             <form className="needs-validation" noValidate>
//             <div className='d-flex'>
//                 <label>
//                     <input
//                     type="radio"
//                     value="option1"
//                     checked={selectedOption === 'option1'}
//                     onChange={handleOptionChange}
//                     />
//                     Option 1
//                 </label>
//                 <label>
//                     <input
//                     type="radio"
//                     value="option2"
//                     checked={selectedOption === 'option2'}
//                     onChange={handleOptionChange}
//                     />
//                     Option 2
//                 </label>
//                 <label>
//                     <input
//                     type="radio"
//                     value="option3"
//                     checked={selectedOption === 'option3'}
//                     onChange={handleOptionChange}
//                     />
//                     Option 3
//                 </label>
//             </div>
//               <div className='justify-content-center align-items-center text-center'><button className="btn btn-primary " type="submit" style={{backgroundColor:'#452c63', width:'200px'}}>Submit form</button></div>
//           </form>
//         </div>
//           </Col>
//         </div>
//       </Row>
     
//   </Container>
  )
}
export default Home;