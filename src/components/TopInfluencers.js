import React from 'react';
import '../Style/topInfluencers.css';
import TopInfluencersList from "../components/TopInfluencersList";
import { Grid } from '@material-ui/core';


const TopInfluencers = () => {
  return (
  <Grid item xs={12} container spacing={2}>      
      {TopInfluencersList.map(item => {
        return (
            <Grid className="subContainerTI" item lg={12}>
              <div><img className="imageTI" src={item.image}/></div>
              <div style={{width: "120px"}}>
                    <p className='nameTI'><b>{item.name}</b></p>
                    <p className="usernameTI">@{item.username}</p>
              </div>
              <div style={{width: "120px"}}>
                    <p className='likesTI'>Likes <b>{item.likes}</b></p>
                    <p className="sharesTI">Shares <b>{item.shares}</b></p>
              </div>
              <div style={{width: "200px"}}>
                    <p className='engagementRateTI'>Engagement Rate <b>{item.engagementRate}</b></p>
                    <p className="commentsTI">Comments <b>{item.comments}</b></p>
              </div>
              <div>
                    <p className='viewProfileTI'><b>View Profile</b></p>
              </div>
              <hr/>
            </Grid>
        )})}
    </Grid>
  );
}

export default TopInfluencers;


// <div style={{margin: '5%'}}>
// <div className="mainContainerTI" style={{display: 'flex', flexWrap: "nowrap"}}>
    
//   {TopInfluencersList.map(item => {
//     return (
//         <div className="subContainerTI" >
//           <div><img className="imageTI" src={item.image}/></div>
//           <div style={{width: "120px"}}>
//                 <p className='nameTI'><b>{item.name}</b></p>
//                 <p className="usernameTI">@{item.username}</p>
//           </div>
//           <div style={{width: "120px"}}>
//                 <p className='likesTI'>Likes <b>{item.likes}</b></p>
//                 <p className="sharesTI">Shares <b>{item.shares}</b></p>
//           </div>
//           <div style={{width: "200px"}}>
//                 <p className='engagementRateTI'>Engagement Rate <b>{item.engagementRate}</b></p>
//                 <p className="commentsTI">Comments <b>{item.comments}</b></p>
//           </div>
//           <div>
//                 <p className='viewProfileTI'><b>View Profile</b></p>
//           </div>
//           <hr/>
//         </div>
//     )})}
// </div>
// </div>