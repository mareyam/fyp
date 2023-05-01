import axios from "axios";
import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import RegisteredInfluencersList from './RegisteredInfluencersList';
import "../../../Style/BrandManagerPanel/AllCampaigns/AllCampaigns.css"
import { ArrowBack, Search, FilterList, ArrowDropDown } from '@material-ui/icons';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import Card from 'react-bootstrap/Card';
import SellOutlinedIcon from '@mui/icons-material/SellOutlined';
import WcOutlinedIcon from '@mui/icons-material/WcOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import NumbersIcon from '@mui/icons-material/Numbers';
import InfluencerPage from './InfluencerPage';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const CompareInfluencers = () => {
  const [searchTermFirst, setSearchTermFirst] = useState("");
  const [filteredResultsFirst, setFilteredResultsFirst] = useState([]);
  const [selectedResultFirst, setSelectedResultFirst] = useState(null);
  const [influencers, setInfluencers] = useState([]);

  const [searchTermSecond, setSearchTermSecond] = useState("");
  const [filteredResultsSecond, setFilteredResultsSecond] = useState([]);
  const [selectedResultSecond, setSelectedResultSecond] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/newinfluencers/')
      .then(response => {
        setInfluencers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  const handleInputChangeFirst = (event) => {
    setSearchTermFirst(event.target.value);
    const filteredResultsFirst = influencers.filter((result) =>
      result.fullname.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredResultsFirst(filteredResultsFirst);
    console.log(filteredResultsFirst);
  };

  const handleResultClickFirst = (result) => {
    setSelectedResultFirst(result);
  };

  const handleInputChangeSecond = (event) => {
    setSearchTermSecond(event.target.value);
    const filteredResultsSecond = influencers.filter((result) =>
      result.fullname.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredResultsSecond(filteredResultsSecond);
    console.log(filteredResultsSecond);
  };

  const handleResultClickSecond = (result) => {
    setSelectedResultSecond(result);
  };

  return (
    <Container>
      <Row style={{margin: '0 auto', justifyContent:'left'}}>
      <Col xs={11} sm={11} md={10} lg={10} className='my-2'>
      <h3 className='compareInfluencersAC'>Compare Influencers</h3>
      <br/>
      </Col>
      </Row>

    <Row style={{margin: '0 auto', justifyContent:'center'}} >
      <Col  xs={11} sm={11} md={5} lg={6}>
      <div style={{border: '1px solid rgb(212, 211, 211)'}}>
        <Card style={{ height: "100%", width:"100%"}}>
        
          <input
          className="mx-2"
          type="text"
          placeholder="Search by name..."
          value={searchTermFirst}
          onChange={handleInputChangeFirst}
        />

        {searchTermFirst === "" ? (
          <div style={{ maxHeight: '100px', overflow: 'auto' }}>
            <ul>
              {influencers.map((result) => (
                <p className='hover-effect' key={result.id} onClick={() => handleResultClickFirst(result)}>
                  {result.fullname}
                </p>
              ))}
            </ul>
          </div>
        ) : (

          <div style={{ maxHeight: '100px', overflow: 'auto'}}>
          <ul>
            {filteredResultsFirst.map((result) => (
              <p className='hover-effect' key={result.id} onClick={() => handleResultClickFirst(result)}>
                {result.fullname}
              </p>
            ))}
          </ul>
        </div>
      )}

  {selectedResultFirst && (
          <div >
            <Col xs={11} sm={11} md={5} lg={12} className="mt-1" >
          <div style={{border: '1px solid rgb(212, 211, 211)'}}>
            <Card style={{ height: "100%", width:"100%"}}>
              <Card.Body className="">
                <div style={{textAlign:'center', marginTop: '-1%'}}>
                  <img style={{borderRadius: '50%', height: '70px', width: '75px'}} src={`http://127.0.0.1:8000/${selectedResultFirst.image}`} />
                  <h6 style={{fontSize:'14px'}}>{selectedResultFirst.fullname}</h6>
                  <p style={{fontSize: '11px', marginTop:'-4px'}}>@{selectedResultFirst.username}</p>
                  <p style={{marginTop: '-11px', fontSize:'12px'}}>Total Cost Rs.{selectedResultFirst.postcost+selectedResultFirst.storycost}</p>
                </div>
                <Card.Text className="" style={{ fontFamily: 'Oswald' }}>
      
                <div className="otherDetails d-block">
                  <h5 style={{fontSize:'15px'}}><b>Details:</b></h5>
                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                    <SellOutlinedIcon  />
                    <p className="m-0 ms-2">{selectedResultFirst.interests}</p>
                  </div>
                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                    <WcOutlinedIcon />
                    <p className="m-0 ms-2">{selectedResultFirst.gender}</p>
                  </div>
                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                    <PaidOutlinedIcon />
                    <p className="m-0 ms-2">Post Cost Rs.{selectedResultFirst.postcost}</p>
                  </div>
                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                    <PaidOutlinedIcon />
                    <p className="m-0 ms-2">Story Cost Rs.{selectedResultFirst.storycost}</p>
                  </div>

                  {selectedResultFirst.children_count > 0 ?
                  <div>
                    <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                    <ChildCareIcon />
                    <p className="m-0 ms-2">Parents of {selectedResultFirst.children_count} kids</p>
                   </div>
                    <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                      <NumbersIcon/>
                      <p className="m-0 ms-2">Child age {selectedResultFirst.children_age} years old</p>
                    </div>
                  </div>
                  :
                  <div>
                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                  <ChildCareIcon />
                  <p className="m-0 ms-2">Parents of {selectedResultFirst.children_count} kids</p>
                 </div>
                  <div style={{fontSize:'13px', color: 'gray'}} className="d-flex align-items-center">
                    <NumbersIcon/>
                    <p className="m-0 ms-2">NA</p>
                  </div>
                  followers??????????/
                </div>
                  } 
                </div>
                <hr/>
                {/* <div style={{marginTop: '-10px', fontSize:'13px'}}> 
                  <input type='checkbox'/><label>Post Rs.{selectedResultFirst.influencerInfluencerPostCost}</label><br/>
                  <input type='checkbox'/><label>Story Rs.{selectedResultFirst.influencerStoryCost}</label>
                </div> */}
                  <div className='text-center' style={{fontSize:'14px', marginBottom: '-5%'}}>
                    <b><p>Engagement Rate{selectedResultFirst.engagement_rate}%</p></b>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          </Col>


          </div>
        )}

        </Card>
      </div>

      </Col>
      <Col xs={11} sm={11} md={5} lg={6}>
      <div style={{border: '1px solid rgb(212, 211, 211)'}}>
        <Card style={{ height: "100%", width:"100%"}}>
        
          <input
          className="mx-2"
          type="text"
          placeholder="Search by name..."
          value={searchTermSecond}
          onChange={handleInputChangeSecond}
        />

         {searchTermFirst === "" ? (
          <div style={{ maxHeight: '100px', overflow: 'auto' }}>
            <ul>
              {influencers.map((result) => (
                <p className='hover-effect' key={result.id} onClick={() => handleResultClickSecond(result)}>
                  {result.fullname}
                </p>
              ))}
            </ul>
          </div>
        ) : (

          <div style={{ maxHeight: '100px', overflow: 'auto'}}>
          <ul>
            {filteredResultsSecond.map((result) => (
              <p className='hover-effect' key={result.id} onClick={() => handleResultClickSecond(result)}>
                {result.fullname}
              </p>
            ))}
          </ul>
        </div>
      )}

  {selectedResultSecond && (
          <div >
            <Col xs={11} sm={11} md={5} lg={12} className="mt-1">
          <div style={{border: '1px solid rgb(212, 211, 211)'}}>
            <Card style={{ height: "100%", width:"100%"}}>
              <Card.Body className="">
                <div style={{textAlign:'center', marginTop: '-1%'}}>
                  <img style={{borderRadius: '50%', height: '70px', width: '75px'}} src={`http://127.0.0.1:8000/${selectedResultSecond.image}`}/>
                  <h6 style={{fontSize:'14px'}}>{selectedResultSecond.fullname}</h6>
                  <p style={{fontSize: '11px', marginTop:'-4px'}}>@{selectedResultSecond.username}</p>
                  <p style={{marginTop: '-11px', fontSize:'12px'}}>Total Cost Rs.{selectedResultSecond.postcost+selectedResultSecond.storycost}</p>
                </div>
                <Card.Text className="" style={{ fontFamily: 'Oswald' }}>
      
               <div className="otherDetails d-block">
                  <h5 style={{fontSize:'15px'}}><b>Details:</b></h5>
                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                    <SellOutlinedIcon  />
                    <p className="m-0 ms-2">{selectedResultSecond.interests}</p>
                  </div>
                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                    <WcOutlinedIcon />
                    <p className="m-0 ms-2">{selectedResultSecond.gender}</p>
                  </div>
                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                    <PaidOutlinedIcon />
                    <p className="m-0 ms-2">Post Cost Rs.{selectedResultSecond.postcost}</p>
                  </div>
                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                    <PaidOutlinedIcon />
                    <p className="m-0 ms-2">Story Cost Rs.{selectedResultSecond.storycost}</p>
                  </div>

                  {selectedResultSecond.influencerChildrenCount > 0 ?
                  <div>
                    <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                    <ChildCareIcon />
                    <p className="m-0 ms-2">Parents of {selectedResultSecond.children_count} kids</p>
                   </div>
                    <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                      <NumbersIcon/>
                      <p className="m-0 ms-2">Child age {selectedResultSecond.children_age} years old</p>
                    </div>
                  </div>
                  :
                  <div>
                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                  <ChildCareIcon />
                  <p className="m-0 ms-2">Parents of {selectedResultSecond.children_count} kids</p>
                 </div>
                  <div style={{fontSize:'13px', color: 'gray'}} className="d-flex align-items-center">
                    <NumbersIcon/>
                    <p className="m-0 ms-2">NA</p>
                  </div>
                </div>
                  } 
                </div>
                <hr/>
               {/* <div style={{marginTop: '-10px', fontSize:'13px'}}> 
                  <input type='checkbox'/><label>Post Rs.{selectedResultSecond.influencerInfluencerPostCost}</label><br/>
                  <input type='checkbox'/><label>Story Rs.{selectedResultSecond.influencerStoryCost}</label>
                </div> */}
                  <div className='text-center' style={{fontSize:'14px', marginBottom: '-5%'}}>
                    <b><p>Engagement Rate{selectedResultSecond.engagement_rate}%</p></b>
                  </div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          </Col>


          </div>
        )}

        </Card>
      </div>

      </Col>
   </Row>
  </Container>     
  );
};

export default CompareInfluencers;



    {/* <Row style={{margin: '0 auto', justifyContent:'center', marginBottom : '1%'}}>
       <Col xs={11} sm={11} md={10} lg={10} style={{marginTop: '1%',backgroundColor:'#452c63'}}>
        <div className='budget'>
          <div className='text-light d-lg-flex d-sm-block justify-content-between'><h6>Total Budget: 500,000</h6>
          <h6>Total Budget Utilized: 300,000</h6></div>
          <div className='text-light d-lg-flex d-sm-block justify-content-between'><h6>Remaining Budget: 200,000</h6>
          <Button style={{backgroundColor:'#452c63', height:'30px'}}>
              <div style={{marginTop:"-6px"}}>
                <a href="/BMNewCampaign" class="mx-3" style={{display: 'block'}}>
                  <p>Proceed<ArrowForwardIosIcon style={{fontSize:"15px"}}/></p>
                </a>
              </div>
          </Button>
          </div>
        </div>
       </Col>
      
    </Row> */}