import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from 'react-bootstrap';

const Test = () => {
    const [campaigns, setCampaigns] = useState([]);

    console.log(campaigns);
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/campaigns/')
            .then((response) => {
                setCampaigns(response.data.campaigns);
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Campaigns</h1>
          
{campaigns.map(item => {
    return (
      <Row>
      <Col xs={8} sm={8} md={2} lg={2} className="subContainerAC mx-1">
        <div>
        <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}><img className="imageAC" src={item.image}/></div>
        <div style={{display: 'flex',justifyContent:'space-between'}}>
        
        <p className='typeAC'>{item.name}</p>
        <p className='typeAC'>{item.campaign_type}</p>
        <p className="hashtagAC">{item.hashtag}</p>
        </div>
        <h3 className='nameAC'>{item.name}</h3>
        <p className='influencersAC'>{item.influencers}</p>
        <p className='dateAC'>{item.updated}</p>

        </div>
      </Col>
      </Row>
    )})}
        </div>
    );
}
export default Test;