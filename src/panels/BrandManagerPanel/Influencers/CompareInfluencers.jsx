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
    axios.get('http://127.0.0.1:8000/influencers/')
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
      result.influencer_full_name.toLowerCase().includes(event.target.value.toLowerCase())
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
      result.influencer_full_name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredResultsSecond(filteredResultsSecond);
    console.log(filteredResultsSecond);
  };

  const handleResultClickSecond = (result) => {
    setSelectedResultSecond(result);
  };

  return (
    <Container>
      <Row style={{margin: '0 auto', justifyContent:'center'}}>
      <Col xs={11} sm={11} md={10} lg={10} className='my-2'>
      <h5 className='compareInfluencersAC'>Compare Influencers</h5>
      <br/>
      </Col>
      </Row>

    <Row style={{margin: '0 auto', justifyContent:'center'}}>
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
                <li key={result.id} onClick={() => handleResultClickFirst(result)}>
                  {result.influencer_full_name}
                </li>
              ))}
            </ul>
          </div>
        ) : (

          <div style={{ maxHeight: '100px', overflow: 'auto'}}>
          <ul>
            {filteredResultsFirst.map((result) => (
              <li key={result.id} onClick={() => handleResultClickFirst(result)}>
                {result.influencer_full_name}
              </li>
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
                  <img style={{borderRadius: '50%', height: '70px', width: '75px'}} src="https://media.gettyimages.com/id/958513664/photo/mahira-khan-attends-the-screening-of-blackkklansman-during-the-71st-annual-cannes-film.jpg?s=612x612&w=gi&k=20&c=hy5zGUyPkyl5gxBh2KqryWf4UIhiv0Lt9bv3z0MiWLA="/>
                  <h6 style={{fontSize:'14px'}}>{selectedResultFirst.influencer_full_name}</h6>
                  <p style={{fontSize: '11px', marginTop:'-4px'}}>@{selectedResultFirst.influencer_username}</p>
                  <p style={{marginTop: '-11px', fontSize:'12px'}}>{selectedResultFirst.budget}</p>
                </div>
                <Card.Text className="" style={{ fontFamily: 'Oswald' }}>
      
                <div className="otherDetails d-block">
                  <h5 style={{fontSize:'15px'}}><b>Details:</b></h5>
                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                    <SellOutlinedIcon  />
                    <p className="m-0 ms-2">Fashion</p>
                  </div>
                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                    <WcOutlinedIcon />
                    <p className="m-0 ms-2">Female</p>
                  </div>
                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                    <PaidOutlinedIcon />
                    <p className="m-0 ms-2">Rs.100k</p>
                  </div>
                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                    <ChildCareIcon />
                    <p className="m-0 ms-2">Parent of x kids</p>
                  </div>
                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                    <NumbersIcon/>
                    <p className="m-0 ms-2">Age group</p>
                  </div>
                </div>
                <hr/>
                <div style={{marginTop: '-10px', fontSize:'13px'}}> 
                  <input type='checkbox'/><label>Post 25,000</label><br/>
                  <input type='checkbox'/><label>Story 25,000</label>
                </div>
                  <div className='text-center' style={{fontSize:'14px', marginBottom: '-5%'}}>
                    <b><p>Engagememt rate 78%</p>
                    <p style={{marginTop:'-15px'}}>Amount 90k</p></b>
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

        {searchTermSecond === "" ? (
          <div style={{ maxHeight: '100px', overflow: 'auto'}}>
            <ul>
              {influencers.map((result) => (
                <li key={result.id} onClick={() => handleResultClickSecond(result)}>
                  {result.influencer_full_name}
                </li>
              ))}
            </ul>
          </div>
        ) : (

          <div style={{ maxHeight: '100px', overflow: 'auto'}}>
          <ul>
            {filteredResultsSecond.map((result) => (
              <li key={result.id} onClick={() => handleResultClickSecond(result)}>
                {result.influencer_full_name}
              </li>
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
                  <img style={{borderRadius: '50%', height: '70px', width: '75px'}} src="https://media.gettyimages.com/id/958513664/photo/mahira-khan-attends-the-screening-of-blackkklansman-during-the-71st-annual-cannes-film.jpg?s=612x612&w=gi&k=20&c=hy5zGUyPkyl5gxBh2KqryWf4UIhiv0Lt9bv3z0MiWLA="/>
                  <h6 style={{fontSize:'14px'}}>{selectedResultSecond.influencer_full_name}</h6>
                  <p style={{fontSize: '11px', marginTop:'-4px'}}>@{selectedResultSecond.influencer_username}</p>
                  <p style={{marginTop: '-11px', fontSize:'12px'}}>{selectedResultSecond.budget}</p>
                </div>
                <Card.Text className="" style={{ fontFamily: 'Oswald' }}>
      
                <div className="otherDetails d-block">
                  <h5 style={{fontSize:'15px'}}><b>Details:</b></h5>
                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                    <SellOutlinedIcon  />
                    <p className="m-0 ms-2">Fashion</p>
                  </div>
                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                    <WcOutlinedIcon />
                    <p className="m-0 ms-2">Female</p>
                  </div>
                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                    <PaidOutlinedIcon />
                    <p className="m-0 ms-2">Rs.100k</p>
                  </div>
                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                    <ChildCareIcon />
                    <p className="m-0 ms-2">Parent of x kids</p>
                  </div>
                  <div style={{fontSize:'13px'}} className="d-flex align-items-center">
                    <NumbersIcon/>
                    <p className="m-0 ms-2">Age group</p>
                  </div>
                </div>
                <hr/>
                <div style={{marginTop: '-10px', fontSize:'13px'}}> 
                  <input type='checkbox'/><label>Post 25,000</label><br/>
                  <input type='checkbox'/><label>Story 25,000</label>
                </div>
                  <div className='text-center' style={{fontSize:'14px', marginBottom: '-5%'}}>
                    <b><p>Engagememt rate 78%</p>
                    <p style={{marginTop:'-15px'}}>Amount 90k</p></b>
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