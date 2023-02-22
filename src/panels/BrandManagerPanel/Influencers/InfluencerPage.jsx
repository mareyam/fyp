import React,{useState} from 'react';
import { Button } from 'react-bootstrap';
import { ArrowBack, Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import '../../../Style/BrandManagerPanel/AllRegisteredInfluencers/influencerpage.css';
import { Container, Row, Col } from 'react-grid-system';
import LaunchIcon from '@mui/icons-material/Launch';
import AllCampaignsList from '../Campaigns/AllCampaignsList';
import AllPostsOfInfluencers from '../PostsStories/AllPostsList';
import AllStoriesList from '../PostsStories/AllStoriesList';


const InfluencerPage = () => {
    const [posts, setPosts] = useState(AllPostsOfInfluencers);
    const [stories, setStories] = useState(AllStoriesList);
    

    return (
        <Container className="mt-2" style={{border:"1px solid rgb(198, 198, 198)"}}>
          <div className='d-lg-flex d-sm-block'>
            <Col xs={12} sm={12} md={2} lg={2} className="mt-4"> 
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
                     
                    </div>
                </div>
            </Col>
            <Col xs={8} sm={8} md={2} lg={10} className="mainContainerIP d-flex" style={{border:'2px solid red'}}>
               <div className="d-flex"> 
               {posts.map(item => {
                return (
                  <Col xs={8} sm={8} md={2} lg={1} className="subContainerIP" style={{border:'2px solid red'}}>
                    <div style={{border:'2px solid blue'}}>
                      <div><img className="imageIP" src={item.image}/></div>
                      <div style={{display: 'flex',justifyContent:'space-between'}}>
                         <p className="hashtagIP">{item.hashtag}</p>
                      </div>
                      <h3 className='nameIP'>{item.name}</h3>
                      <p className='dateIP'>{item.startDate}</p>
                    </div>
                </Col>
                  
                )})}
              {/* {stories.map(item => {
                return (
                    <Row>
                         <Col xs={8} sm={8} md={2} lg={10}>
                           <img src={item.image}/>
                           <p>{item.name}</p>
                         </Col>
                    </Row>
                )})} */}
                  {/* // <Row>
                    //      <Col xs={8} sm={8} md={2} lg={10}>
                    //        <img src={item.image}/>
                    //        <p>{item.name}</p>
                    //      </Col>
                    // </Row> */}
            </div>

            </Col>
          </div>
        </Container>  
           
      );    
};
        

    export default InfluencerPage;
