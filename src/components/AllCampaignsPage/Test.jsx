import axios from "axios";
import React, {useState, useEffect} from 'react';
// import AllStoriesList from "./AllStoriesList";
import { Button } from 'react-bootstrap';
import { ArrowBack, Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import '../../Style/BrandManagerPanel/PostsAndStories/AllPosts.css'
import { Container, Row, Col } from 'react-grid-system';
import LaunchIcon from '@mui/icons-material/Launch';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CampaignIcon from '@mui/icons-material/Campaign';

      const Test = () => {
        const [campaign, setCampaign] = useState([]);
        const [selected, setSelected] = useState('');

        const handleToggle = (value) => {
          setSelected(value);
        };
      
        useEffect(() => {
            axios.get('http://127.0.0.1:8000/campaigns/')
              .then(response => {
                setCampaign(response.data);
              })
              .catch(error => {
                console.error(error);
              });
          }, []);


        const filteredCampaigns = campaign.filter(item => {
            if (selected === 'Post') {
              return item.content_type === 'Post';
            } else if (selected === 'Story') {
              return item.content_type === 'Story';
            } else {
              return true; // show all campaigns
            }
          });

      
  return (
    <Container className="mt-2" style={{border:"1px solid rgb(198, 198, 198)"}}>
      <div className='d-lg-flex d-sm-block'>
        <Col xs={12} sm={12} md={2} lg={2} className="mt-4" > 
            <div className='d-lg-block d-xs-flex'>
               {/* <a href="/BMCampaignDetails" style={{outline: 'none'}} ></a> */}
              <img className="influencerImage"src='https://media.istockphoto.com/id/487787108/photo/can-of-coca-cola-on-ice.jpg?s=612x612&w=0&k=20&c=xDSO_nl0qeDMBZJBJk09jj5_UeQkyQ70QdXuDMByCaY='></img>
                <div style={{textAlign:"center"}}><h6>Coke</h6>
                  <p style={{fontSize:"12px"}}><b>Active Influencers: number</b></p>
                  <p style={{fontSize:"12px"}}><b>Started on: date</b> </p>
                  <p style={{fontSize:"12px"}}><b>Ends on: date</b></p>
                  <p style={{fontSize:"12px"}}><b>Days Left: date</b></p>
                  <p style={{fontSize:"12px"}}><b>Cycle: Periodic</b></p>
                  <p style={{fontSize:"12px"}}><b>Type: date</b></p>
                  <p style={{fontSize:"12px"}}><b>Total Likes: number</b></p>
                  <button type="button" className="btn btn-dark d-flex align-items-center justify-content-center" data-mdb-ripple-color="dark" style={{ marginTop:"-10px", fontSize: "12px", height: "35px", width: '100%' }}>
                            <a href="/BMDashboard"><p style={{ fontSize: '12px', margin: '0px', paddingRight:"10px" }}>Inactive Campaign</p></a>
                            <CampaignIcon style={{ fontSize: "12px", height: "25px" }} />
                  </button>
                  <button type="button" className="btn btn-dark d-flex align-items-center justify-content-center" data-mdb-ripple-color="dark" style={{ marginTop:"-10px", fontSize: "12px", height: "35px", width: '100%' }}>
                            <a href="/BMPDF"><p style={{ fontSize: '12px', margin: '0px',paddingRight:"10px" }}>PDF Report</p></a>
                            <PictureAsPdfIcon style={{ fontSize: "12px", height: "25px" }} />
                  </button>
                  <button type="button" className="btn btn-dark d-flex align-items-center justify-content-center" data-mdb-ripple-color="dark" style={{ marginTop:"-10px", fontSize: "12px", height: "35px", width: '100%' }}>
                            <a href="/BMStats"><p style={{ fontSize: '12px', margin: '0px',paddingRight:"10px" }}>View Stats</p></a>
                            <QueryStatsIcon style={{ fontSize: "12px", height: "25px" }} />
                  </button>
                </div>
            </div>
        </Col>
        <Col xs={12} sm={12} md={6} lg={8}>
              <div className="header1 d-lg-flex mt-4 d-xs-block ">
                <h6>All Posts from coke</h6>
                <div className="d-xs-block ">
    <button
      onClick={() => handleToggle('Post')}
      style={{
        backgroundColor: selected === 'Post' ? '#452c63' : 'white',
        color: selected === 'Post' ? 'white' : 'black',
        width: '110px',
        borderRadius:'16px'
      }}>
      Post
    </button>
    <button
      onClick={() => handleToggle('Story')}
      style={{
        backgroundColor: selected === 'Story' ? '#452c63' : 'white',
        color: selected === 'Story' ? 'white' : 'black',
        width: '110px',
        borderRadius:'16px'
      }}
    >
      Story
    </button>
    <button
      onClick={() => handleToggle('Both')}
      style={{
        backgroundColor: selected === 'Both' ? '#452c63' : 'white',
        color: selected === 'Both' ? 'white' : 'black',
        width: '110px',
        borderRadius:'16px'
      }}
    >
      Both
    </button>

    {filteredCampaigns.map(item => (
      <Col xs={12} sm={12} md={12} lg={12} key={item.id}>
        <p className="">{item.content_type}: {item.hashtag_campaign}</p>
      </Col>
    ))}
                </div>
              </div>
        </Col>
      </div>
      
    </Container>  
       
  );
}

export default Test;