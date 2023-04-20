import axios from "axios"
import React,{useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import { ArrowBack, Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import { Container, Row, Col } from 'react-grid-system';
import { Home, People } from '@mui/icons-material';
import '../../../Style/BrandManagerPanel/brandManagerDashboard/campaigns.css'

const Campaigns = () => {
 const [campaigns, setCampaigns] = useState([]);


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/activecampaigns/')
      .then(response => {
        setCampaigns(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
      <Row style={{border: '0.1px solid rgb(235, 232, 232)'}}>
        <Col xs={12} sm={12} md={12} lg={12}>
          <div className='campaignsHeadersC d-lg-flex mt-2'>
            <h5 className='d-sm-text-center'>Active Campaigns</h5>
               <Button style={{backgroundColor:'#452c63', height:'25px', marginLeft:'5px'}}>
                    <div style={{marginTop:"-6px"}}>
                      <a href="/BMNewCampaign" className="mx-3" style={{display: 'block'}}>
                        <p>Create<AddIcon className='AddIcon' style={{fontSize:"15px"}}/></p>
                      </a>
                    </div>
                 </Button>
                <a href="/BMCampaigns" className="mx-3 text-dark"><p><u style={{fontSize:'13px'}}>View all</u></p></a>
          </div>
        </Col>


    <div className="mainContainerC" style={{display: 'flex', flexWrap: "nowrap"}}> 
      {campaigns.slice(0,20).map(item => {
        return (
            <div className="subContainerC" >
              <div>
                <img className="imageC" src={`http://127.0.0.1:8000/${item.image}`} />
              </div>

              <Row className='mt-2'>
                  <Col xs={12} sm={12} md={6} lg={7}>
                      <h3 className='nameC'>{item.name.slice(0, 10)}</h3>
                      <p className='influencersC'><People style={{height:"15px"}}/>{item.influencers.length}</p>                      
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={5} key={item.id}>
                      <p className="hashtagC">#{item.hashtag_campaign.hashtag}</p>
                      <p className='typeC' style={{ backgroundColor: item.campaign_type === "Single" ? "#B47EE5" : "green" }}>{item.campaign_type}</p>

                  </Col>
                </Row>
                <p className='dateC'>{item.start_date}</p>
                <p className='dateC'>{new Date(item.start_date).toLocaleDateString()}</p>
               
            </div>
        )})}
    </div>
    </Row>
  );
}

export default Campaigns;