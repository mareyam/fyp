import React from 'react';
import '../Style/registeredInfluencers.css';
import RegisteredInfluencersList from "../components/RegisteredInfluencersList";
import { Grid } from '@material-ui/core';

const RegisteredInfluencers = () => {
  return (
    <div className='container'>
      <Grid item xs={12} container spacing={2} className="mainContainerRI">
       {RegisteredInfluencersList.map(item => {
        return (
          <Grid className="subContainerRI" item lg={6} xs={12}>
                <div><img className="imageRI" src={item.image}/></div>
                <div>
                    <h3 className='nameRI'>{item.name}</h3>
                    <p className='usernameRI'>{item.hashtag}</p>
                    <p className='detailsRI'>{item.type}</p>
                </div>
          </Grid>
        )})}
      </Grid>
    </div>
    // <div style={{margin: '5%'}}>
    // <div className="mainContainerRI" style={{display: 'flex', flexWrap: "nowrap", border: "2px solid red"}}>
        
    //   {RegisteredInfluencersList.map(item => {
    //     return (
    //         <div className="subContainerRI" >
    //             <div><img className="imageRI" src={item.image}/></div>
    //             <div>
    //                 <h3 className='nameRI'>{item.name}</h3>
    //                 <p className='usernameRI'>{item.hashtag}</p>
    //                 <p className='detailsRI'>{item.type}</p>
    //             </div>
    //         </div>
    //     )})}
    // </div>
    // </div>
  );
}

export default RegisteredInfluencers;
