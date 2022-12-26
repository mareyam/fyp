import React from 'react';
import '../Style/topInfluencers.css';
import TopPerformingPostsList from "../components/TopPerformingPostsList";
import { Grid } from '@material-ui/core';

const TopPerformingPosts = () => {
  return ( 
    <div>
      {TopPerformingPostsList.map(item => {
        return (
          <img className='' src={item.influencerImage}/>
        )
      })} 
    </div>
  );
}





export default TopPerformingPosts;


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
// import React from 'react';
// import '../Style/TopPerformingPosts.css';
// import TopPerformingPostsList from "../components/TopPerformingPostsList";
// import { Grid } from '@material-ui/core';

// const TopPerformingPosts = () => {
//   return (
   
//       <Grid item xs={12} container spacing={2}>
//        {TopPerformingPostsList.map(item => {
//         return (
//           <Grid className="subContainerTPP" item lg={12}>
//             <div>
//                 <img src={item.influencerImage} className=''/>
//                 <p>{item.influencerName} className=''</p>
//                 <p>{item.influencerUserName} className=''</p>
//                 <p>{item.post} className=''</p>
//                 <p>{item.likes} className=''</p>
//                 <p>{item.comments} className=''</p>
                
//             </div>
//             </Grid>
//         )})}
//       </Grid>
//         );
//       }
      
   
//     // <div style={{margin: '5%'}}>
//     // <div className="mainContainerRI" style={{display: 'flex', flexWrap: "nowrap", border: "2px solid red"}}>
        
//     //   {TopPerformingPostsList.map(item => {
//     //     return (
//     //         <div className="subContainerRI" >
//     //             <div><img className="imageRI" src={item.image}/></div>
//     //             <div>
//     //                 <h3 className='nameRI'>{item.name}</h3>
//     //                 <p className='usernameRI'>{item.hashtag}</p>
//     //                 <p className='detailsRI'>{item.type}</p>
//     //             </div>
//     //         </div>
//     //     )})}
//     // </div>
//     // </div>

// export default TopPerformingPosts;


//  //   <Grid className="subContainerRI" item lg={6} xs={12}>
//         //         <div><img className="imageRI" src={item.influencerImage}/></div>
//         //         <div>
//         //             <h3 className='nameRI'>{item.influencerName}</h3>
//         //             <p className='usernameRI'>{item.influencerUserName}</p>
//         //             <p className='detailsRI'>{item.likes}</p>
//         //         </div>
//         //   </Grid>