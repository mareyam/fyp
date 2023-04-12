import React from 'react';
import '../../../Style/BrandManagerPanel/brandManagerDashboard/TopPerformingPosts.css';
import TopPerformingPostsList from './TopPerformingPostsList';
import { Divider, Grid } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Container, Row, Col } from 'react-grid-system';

const TopPerformingPosts = () => {
  return (
    <div className="mt-1">
    <h5>Top Performing Posts</h5>
    <p style={{fontSize:"12px"}}>Posts with highest stats and public activity</p>
     <Container >
        <Row>
       {TopPerformingPostsList.map(item => {
        return (
              <Col className="subContainerTPP" xs={12} sm={12} md={12} lg={4}  >
            <div style={{display:"flex", alignItems:"center", height:'75px'}}>
                    <div>
                      <img src={`http://127.0.0.1:8000/${item.image}`} className='influencerImageTPP'/>
                  </div> 
                  <div>
                      <p className='influencerNameTPP'>{item.influencerName}</p>
                      <p className='influencerUserNameTPP'>{item.influencerUserName} </p>
                  </div>
                  <div style={{marginLeft:"auto"}}>
                      <p className='detailsTPP'><ArrowForwardIosIcon/></p>
                    </div> 
               </div>
                <img className='postTPP' src={item.post} />
                <Row>
                    <Col xs={12} sm={12} md={6} lg={7}>
                      <h3 className='nameTPP'>{item.name}</h3>
                      <p className='likesTPP'>
                        <FavoriteIcon style={{color: "red", fontSize: "13px"}} />
                        {item.likes}
                      </p> 
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={5}>
                      <p className="hashtagTPP">{item.hashtag}</p>
                      <p className='commentsTPP'>
                          <MessageIcon style={{fontSize: "13px"}} />
                          {item.comments}
                      </p>  
                    </Col>
                  </Row>
                  <p className='dateTPP'>{item.startDate}</p>
               </Col>
        )})}
        </Row>
      </Container>
      </div>
        );
      }
export default TopPerformingPosts;


// const TopPerformingPosts = () => {
//   return ( 
//     <div>
//       {TopPerformingPostsList.map(item => {
//         return (
//           <div>
//             <img className='' src={item.influencerImage}/>
//             <p>{item.influencerName}</p>
//           </div>
//         )
//       })} 
//     </div>
//   );
// }
// \
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