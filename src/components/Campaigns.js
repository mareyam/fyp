import React from 'react';
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import '../Style/campaigns.css';
import CampaignList from "./CampaignsList";
import { Button } from 'react-bootstrap';


const Campaigns = () => {
  return (
    <div style={{margin: '1%'}}>
    <div className="mainContainerC" style={{display: 'flex', flexWrap: "nowrap"}}>
        
      {CampaignList.map(item => {
        return (
            <div className="subContainerC" >
                <div>
                <div><img className="imageC" src={item.image}/></div>
                <div style={{display: 'flex',justifyContent:'space-between'}}>
                <p className='typeC'>{item.type}</p>
                    <p className="hashtagC">{item.hashtag}</p>
                </div>
                <h3 className='nameC'>{item.name}</h3>
                <p className='influencersC'>{item.influencers}</p>
                <p className='dateC'>{item.startDate}</p>
                </div>
            </div>
        )})}
    </div>
    </div>
  );
}

export default Campaigns;
