
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React,{useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import RegisteredInfluencersList from '../../components/brandManagerDashboard/RegisteredInfluencers/RegisteredInfluencersList';
import '../../Style/NewCampaigns/newCampaigns.css';

const NewCampaign = () => {
  const [startDate, setStartDate] = useState(new Date("2014/02/08"));
  const [endDate, setEndDate] = useState(new Date("2014/02/10"));
  const [filteredResults, setFilteredResults] = useState(RegisteredInfluencersList);

  return (
    <Container style={{border:'2px solid red'}}>
      <Row style={{border:'2px solid green'}}>
        <Col xs={12} sm={12} md={4} lg={12} className='d-flex'> 
        <Col xs={12} sm={12} md={4} lg={4} style={{border:'2px solid red'}}>
           <div><label for="exampleInputEmail1">Select start date</label>
           <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}/></div>

            <div className="d-block w-100">
            <label for="exampleInputEmail1">create hashtag</label>
            <input type="text" placeholder="Create Hashtag"/>
           </div>
        </Col>

        <Col xs={12} sm={12} md={4} lg={4} style={{border:'2px solid blue'}}>
           <div><label for="exampleInputEmail1">Select end date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}/></div>

              <div className="">
                <label for="exampleInputEmail1">Set Brand Budget</label>
                <input type="text" placeholder="Rs. 5,000,000"/>
              </div>
        </Col>

        <Col xs={12} sm={12} md={4} lg={4} style={{border:'2px solid green'}}>
              <div className="">
                <label for="exampleInputEmail1">Enter Sub-Brand</label>
                <input type="text" placeholder="Enter brand"/>
              </div>
        </Col>  
      </Col>
           <div className="pickedInfluencers" style={{display: 'flex', flexWrap: "nowrap"}}> 
            {filteredResults.map(item => {
              return (
                <Col xs={12} sm={12} md={2} lg={2}>
                  <div className="subContainerNC">
                    <img className='imageNC' src={item.image}/>
                    <p className='nameNC'>{item.name}</p>
                    <p className='userNameNC'>{item.userName}</p>
                    <p className='EngagementRateNC'>Engagement Rate</p>
                    <p className='NumberNC'>{item.engagementRate}</p>
                  </div>
                </Col>
              )})}
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