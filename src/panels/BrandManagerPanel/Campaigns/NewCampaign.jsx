import axios from "axios"
import {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Row, Col } from 'react-bootstrap';
import RegisteredInfluencersList from '../Influencers/RegisteredInfluencersList';
import '../../../Style/BrandManagerPanel/NewCampaigns/newCampaigns.css';
import { ArrowBack } from '@material-ui/icons';
import { Card, Button } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';

const NewCampaign = () => {
  const [startDate, setStartDate] = useState(new Date("2014/02/08"));
  const [endDate, setEndDate] = useState(new Date("2014/02/10"));
  const [filteredResults, setFilteredResults] = useState(RegisteredInfluencersList);
  const [selected, setSelected] = useState('single');
  const [isChecked, setIsChecked] = useState(false);
  const [influencers, setInfluencers] = useState([]);
  
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/influencers/')
      .then((response) => {
        setInfluencers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleToggle = (value) => {
    setSelected(value);
  };


  const buttonStyle = {
    backgroundColor: selected === "single" ? "purple" : "white",
    color: selected === "single" ? "white" : "purple",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer"
  };

  const removeInfluencer = (indexToRemove) => {
    setInfluencers(influencers.filter((_, index) => index !== indexToRemove));
  };



  return (
    <Container className="mt-2" style={{border:"1px solid rgb(198, 198, 198)"}}>
      <Row>
       <div className="d-flex"><ArrowBack/><h5>Create new Campaign</h5></div>
        <Col xs={12} sm={12} md={12} lg={12} className='d-lg-flex d-sm-block'> 
        <Col xs={12} sm={12} md={4} lg={4} style={{ height:'auto'}}>
              <div>
                  <label for="exampleInputEmail1">Select start date</label>
                  <DatePicker className='inputNC'
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}/>
                </div>
                <div>
                  <label for="exampleInputEmail1">create hashtag</label><br/>
                  <input className='inputNC' type="text" placeholder="Create Hashtag"/>
              </div>
        </Col>

        <Col xs={12} sm={12} md={4} lg={4}>
           <div><label for="exampleInputEmail1">Select end date</label>
            <DatePicker className='inputNC'
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}/></div>

              <div className="" style={{display:"block"}}>
                <label for="exampleInputEmail1">Set Brand Budget</label><br/>
                <input className='inputNC' type="text" placeholder="Rs. 5,000,000"/>
              </div>
        </Col>

        <Col xs={12} sm={12} md={4} lg={4}>
              <div className="">
                <label for="exampleInputEmail1">Enter Sub-Brand</label><br/>
                <input className='inputNC' type="text" placeholder="Enter brand"/>
              </div>

                <div className="">
                  <p style={{marginBottom:'0px'}}>Campaign Type</p>
                    <button
                      onClick={() => handleToggle('single')}
                      style={{
                        backgroundColor: selected === 'single' ? '#452c63' : 'white',
                        color: selected === 'single' ? 'white' : 'black',
                        width: '110px',
                        borderRadius:'16px'
                      }}
                    >
                      Single
                    </button>
                    <button
                      onClick={() => handleToggle('periodic')}
                      style={{
                        backgroundColor: selected === 'periodic' ? '#452c63' : 'white',
                        color: selected === 'periodic' ? 'white' : 'black',
                        width: '110px',
                        borderRadius:'16px'
                      }}
                    >
                      Periodic
                    </button>
                    <button
                    onClick={() => handleToggle('both')}
                    style={{
                      backgroundColor: selected === 'both' ? '#452c63' : 'white',
                      color: selected === 'both' ? 'white' : 'black',
                      width: '110px',
                      borderRadius:'16px'
                    }}
                  >
                    Both
                  </button>
                  </div>
        </Col>  
      </Col>
      <div className="mt-3 mb-2 d-lg-flex d-sm-block" style={{justifyContent:'space-between'}}>
          <h5 className="pickedInfluencersNC">Picked Influencers</h5>
          <a href='/BMRegisteredInfluencers'>
          <Button style={{backgroundColor: '#452c63'}}>
                  <AddIcon style={{ fontSize: '15px' }} />
                  Add Influencer
          </Button></a>
       </div>
           <div className="pickedInfluencers" style={{display: 'flex', flexWrap: "nowrap"}}> 
            {influencers.map((item,index) => {
              return (
                <Col xs={8} sm={8} md={2} lg={2}>
                  <div className="subContainerNC" style={{overflow:'hidden'}}>
                    <img className='imageNC' src={`http://127.0.0.1:8000/${item.image}`}/>
                    <p className='nameNC'>{item.influencer_full_name.slice(0, 15)}...</p>
                    <p className='userNameNC'>@{item.influencer_username}</p>
                    <p className='EngagementRateNC'>Engagement Rate</p>
                    {/* <p className='NumberNC'>{item.engagement_rate}</p> */}
                    <button style={{backgroundColor:'red', borderRadius:'50%'}} onClick={() => removeInfluencer(index)}>-</button>
                  </div>
                </Col>
              )})}
           </div>

           <div className="d-lg-flex justify-content-between align-items-end d-sm-block ">
              <div>
                  <input className='inputNC'
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}/>
                  <label>Make Campaign Live</label>
              </div>
              <div className="d-block">
                <p>Total Cost: 500k</p>
                <Button style={{backgroundColor: '#452c63'}}>
                  Create Campaign
                </Button>
              </div>
           </div>
      </Row>
    </Container>
  )  
}


{/* <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small class="form-text text-muted">We'll never share your email with anyone else.</small>
              </div> */}




// const SelectDate = () => {
//   const [startDate, setStartDate] = useState(new Date("2014/02/08"));
//   const [endDate, setEndDate] = useState(new Date("2014/02/10"));
//   return (
//     <>
//       <DatePicker
//         selected={startDate}
//         onChange={(date) => setStartDate(date)}
//         selectsStart
//         startDate={startDate}
//         endDate={endDate}
//       />
//       <DatePicker
//         selected={endDate}
//         onChange={(date) => setEndDate(date)}
//         selectsEnd
//         startDate={startDate}
//         endDate={endDate}
//         minDate={startDate}
//       />
//     </>
//   );
// };
export default NewCampaign;