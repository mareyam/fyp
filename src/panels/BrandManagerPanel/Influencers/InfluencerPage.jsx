import axios from "axios";
import React, {useState, useEffect} from 'react';
import '../../../Style/BrandManagerPanel/AllRegisteredInfluencers/influencerpage.css';
import { Container, Row, Col } from 'react-grid-system';
// import AllPostsOfInfluencers from '../PostsStories/AllPostsList';
// import AllStoriesList from '../PostsStories/AllStoriesList';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CampaignIcon from '@mui/icons-material/Campaign';
import { PieChart, Pie, Legend, Cell, Tooltip } from 'recharts';



const InfluencerPage = () => {
//   const [posts, setPosts] = useState(AllPostsOfInfluencers);
//   const [stories, setStories] = useState(AllStoriesList);


  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/campaigns/')
      .then(response => {
        setCampaigns(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);



  return (
    <Container className="mt-4" style={{border:"1px solid rgb(198, 198, 198)"}}>
      <Row className='d-lg-flex d-sm-block d-xs-block'>

        <Col xs={12} sm={12} md={12} lg={2} >
         <div className='d-lg-block d-xs-flex'>
             {/* <a href="/BMCampaignDetails" style={{outline: 'none'}} ></a> */}
            <img className="influencerImage"src='https://media.istockphoto.com/id/487787108/photo/can-of-coca-cola-on-ice.jpg?s=612x612&w=0&k=20&c=xDSO_nl0qeDMBZJBJk09jj5_UeQkyQ70QdXuDMByCaY='></img>
              <div style={{textAlign:"center"}}><h6>Coke</h6>
                <p style={{fontSize:"12px"}}><b>Active Influencers: number</b></p>
                <p style={{fontSize:"12px"}}><b>Started on: date</b> </p>
                <p style={{fontSize:"12px"}}><b>Ends on: date</b></p>
                <p style={{fontSize:"12px"}}><b>Days Left: date</b></p>
                <p style={{fontSize:"12px"}}><b>Cycle: periodic</b></p>
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
        <Col xs={12} sm={12} md={12} lg={10}>
        <Row>     
      <Col xs={12} sm={12} md={12} lg={12} >
        <div>
          <h6>Coke Campaign Statistics</h6>
        </div>
        <div className='d-block'>
          <p>Coke: The classic cola that's been enjoyed for over a century." - Coke is a well-known and beloved soda that has been around since 1886, and has become a staple in many households and restaurants around the world</p>
          <p> #coke #company</p>
        </div>
        <div className='align-items-center justify-content-center'>
          <h6>POST INSIGHTS</h6>
          <div className='d-flex'>
            {/* <BarChart/>
            <PieChartComponent/> */}
          </div>
        </div>
       <div className="mainContainerIP" style={{display: 'flex', flexWrap: "nowrap"}}>            
          {campaigns.map(item => {
            return (
              <Col className="subContainerIP" xs={12} sm={12} md={12} lg={3}>
                <div className='d-flex' style={{display:"flex", alignItems:"center", height:'75px'}}>
                        <div>
                          <img src={`http://127.0.0.1:8000/${item.image}`} className='influencerImageIP'/>
                      </div> 
                      <div>
                          <p className='influencerNameIP'>{item.name}</p>
                          <p className='influencerUserNameIP'>{item.username} </p>
                      </div>
                      <div style={{marginLeft:"auto"}}>
                          <p className='detailsIP'><ArrowForwardIosIcon/></p>
                        </div> 
                </div>
                <img className='postIP' src={item.post} />
               
                  <div className='d-flex'>
                      <Col xs={6} sm={12} md={6} lg={6}>
                      <div className=""><p className='likesIP'>
                        <FavoriteIcon style={{color: "red", fontSize: "13px"}} />
                        {item.likes}
                      </p> </div>
                    </Col>
                    <Col xs={6} sm={12} md={6} lg={6}>
                     
                      <p className='commentsIP'>
                          <MessageIcon style={{fontSize: "13px"}} />
                          {item.comments}
                      </p>  
                    </Col>
                    </div>
                
                  <p className='dateIP'>{item.date}</p>
             </Col>
            )})}
       </div>
       </Col>
       <Col xs={12} sm={12} md={12} lg={12} >
       <div className="mainContainerIP" style={{display: 'flex', flexWrap: "nowrap"}}> 
          {campaigns.map(item => {
            return (
              <Col className="subContainerIP" xs={12} sm={12} md={12} lg={3}>
                <div className='d-flex' style={{display:"flex", alignItems:"center", height:'75px'}}>
                        <div>
                          <img src={item.influencerImage} className='influencerImageIP'/>
                      </div> 
                      <div>
                          <p className='influencerNameIP'>{item.name}</p>
                          <p className='influencerUserNameIP'>{item.username} </p>
                      </div>
                      <div style={{marginLeft:"auto"}}>
                          <p className='detailsIP'><ArrowForwardIosIcon/></p>
                        </div> 
                </div>
                <img className='postIP' src={item.post} />
               
                  <div className='d-flex'>
                      <Col xs={6} sm={12} md={6} lg={6}>
                      <div className=""><p className='likesIP'>
                        <FavoriteIcon style={{color: "red", fontSize: "13px"}} />
                        {item.likes}
                      </p> </div>
                    </Col>
                    <Col xs={6} sm={12} md={6} lg={6}>
                     
                      <p className='commentsIP'>
                          <MessageIcon style={{fontSize: "13px"}} />
                          {item.comments}
                      </p>  
                    </Col>
                    </div>
                
                  <p className='dateIP'>{item.date}</p>
             </Col>
            )})}
       </div>
       </Col>
       </Row>
        </Col>
      
      </Row>
    </Container>
    );    
};
      
export default InfluencerPage;

// const BarChart = () => {
//     const [campaigns, setCampaigns] = useState([]);
//     useEffect(() => {
//       axios.get('http://127.0.0.1:8000/campaigns/')
//         .then(response => {
//           setCampaigns(response.data);
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     }, []);
  
//   const data = campaigns.map(item => ({
//     name: item.name,
//     cost: parseInt(item.cost.replace(',', '')),
//   }));

//   const maxCost = Math.max(...data.map(item => item.cost));
//   const barHeight = 200;
//   const barWidth = 20;

//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: '300px',
//         width: '300px',
//         border:'1px solid gray',
//       }}
//     >
//       <div
//         style={{
//           display: 'flex',
//           flexDirection: 'row-reverse',
//           alignItems: 'flex-end',
//         }}
//       >
//         {data.map((item, index) => (
//           <div
//             key={index}
//             style={{
//               height: barHeight * (item.cost / maxCost),
//               width: barWidth,
//               margin: '0 5px',
//               backgroundColor: 'red',

//             }}
//           >
//             <div style={{fontSize:'10px'}}>{item.name}</div>
//             <div style={{fontSize:'10px'}}>{item.cost}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const PieChartComponent = () => {
//     const [campaigns, setCampaigns] = useState([]);
//     useEffect(() => {
//       axios.get('http://127.0.0.1:8000/campaigns/')
//         .then(response => {
//           setCampaigns(response.data);
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     }, []);

    
//   const engagementRates = campaigns.map((story) => {
//     const engagementRate = parseFloat(story.engagementRate.replace('%', ''));
//     return engagementRate;
//   });

//   const totalEngagementRate = engagementRates.reduce((a, b) => a + b, 0);
//   const averageEngagementRate = totalEngagementRate / engagementRates.length;
//   const data = [
//     { name: 'Engagement Rate', value: averageEngagementRate },
//     { name: 'Non-Engagement Rate', value: 100 - averageEngagementRate },
//   ];

//   return (
//     <PieChart width={400} height={400}>
//       <Pie
//         data={data}
//         dataKey="value"
//         nameKey="name"
//         cx="50%"
//         cy="50%"
//         outerRadius={80}
//         fill="#8884d8"
//         label
//       >
//         {
//           data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={index === 0 ? '#8884d8' : '#FF0000'} />
//           ))
//         }
//       </Pie>
//       <Tooltip />
//       <Legend />
//     </PieChart>
//   );
// };


