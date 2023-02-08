import React from 'react';
import '../../../Style/brandManagerDashboard/topInfluencers.css';
import TopInfluencersList from "./TopInfluencersList";
import { Container, Row, Col } from 'react-bootstrap';

const TopInfluencers = () => {
  return (
    <Container className="containerTI">
      <Row>
        <Col>
          <h6 style={{}}>Top influencers</h6>
        </Col>
      </Row>
      {TopInfluencersList.map(item => {
        return (
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} style={{display:"flex"}}>
              <div>
                <img className="imageTI mx-1" src={item.image} />
              </div>
              <div style={{ width: "70px" }}>
                <p className='nameTI'><b>{item.name}</b></p>
                <p className="usernameTI">@{item.username}</p>
              </div>
              <div style={{ width: "120px" }}>
                <p className='likesTI'>Likes <b>{item.likes}</b></p>
                <p className="sharesTI">Shares <b>{item.shares}</b></p>
              </div>
              <div style={{ width: "135px" }}>
                <p className='engagementRateTI'>Engagement Rate <b>{item.engagementRate}</b></p>
                <p className="commentsTI">Comments <b>{item.comments}</b></p>
              </div>
              <div>
                <p className='viewProfileTI'><b>View</b></p>
              </div>
              <hr />
            </Col>
          </Row>
        );
      })}
    </Container>
  );
};

export default TopInfluencers;

// import React from 'react';
// import '../../../Style/brandManagerDashboard/topInfluencers.css';
// import TopInfluencersList from "./TopInfluencersList";
// import { Grid } from '@material-ui/core';
// import {Container, Row, Col} from 'react-bootstrap';
// const TopInfluencers = () => {
//   return (
//       <div className='containerTI'>
//             <div>
//                   <h6 style={{marginLeft:"8px"}}>Top influencers</h6>
//             </div>
//       <Grid item xs={12} container spacing={2}>      
//       {TopInfluencersList.map(item => {
//         return (

//             <Container>
//                   <Row>
//                   <Col>
//               <div><img className="imageTI mx-1" src={item.image}/></div>
//               <div style={{width: "70px"}}>
//                     <p className='nameTI'><b>{item.name}</b></p>
//                     <p className="usernameTI">@{item.username}</p>
//               </div>
//               <div style={{width: "120px"}}>
//                     <p className='likesTI'>Likes <b>{item.likes}</b></p>
//                     <p className="sharesTI">Shares <b>{item.shares}</b></p>
//               </div>
//               <div style={{width: "135px"}}>
//                     <p className='engagementRateTI'>Engagement Rate <b>{item.engagementRate}</b></p>
//                     <p className="commentsTI">Comments <b>{item.comments}</b></p>
//               </div>
//               <div>
//                     <p className='viewProfileTI'><b>View</b></p>
//               </div>
//               <hr/>
//               </Col>
//               </Row>
//             </Container>
//         )})}
//     </Grid>
//     </div>
//   );
// }

// export default TopInfluencers;


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