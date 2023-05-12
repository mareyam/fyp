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
  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://oauth.reddit.com/r/apple/new.json?limit=100&fields=title',
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjgzODczNjkxLCJqdGkiOiIyNDQ5NTMxNzM4MjUzLWVtd3pzUTF0bU8wNDB0eTNUdWNFVXp6aHlSOEd2ZyIsImNpZCI6Ijc1OFlUT01OZ0U4UzA4MW5jSEJmNUEiLCJsaWQiOiJ0Ml92OWFyeTlvdCIsImFpZCI6InQyX3Y5YXJ5OW90IiwibGNhIjoxNjcyMjIzODM5MDAwLCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyJ9.w7nl8ztozL6pxxj-YJDN8eQbRmqkE5gxOJudvRkGcuPFGvQUJ9g4ZO2AI-XTyyNVvuhIlyzFqWIuuyKrfkMMxviG_7nhxwRNM531JB5wpCwmBQujK2Fuszo24m3lllMflBqZQJcuQh00YL0zKrjH9086mln0Njq0fYzl8cuInQOtgG4p7eebQ2pflk4b5M6OR5e0_PrZz0LI0d_YoDBzgjKMUO_y-UOguo1cH7pHcJ3-BJlFxFZq-wXd_kj7WPr8MiKYMDwIuu8721c2ePuFnoBt0Ve0rtQpxocMIo7kgmBttti5cTeU3u-TawmrW0Qdv25ltmSdybpP8l60A39srA',
            'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
          }
        }
      );
    
      const jsonData = response.data.data.children;
      const postsArray = jsonData.map((post) => ({
        title: post.data.title,
        image: post.data.thumbnail ? post.data.thumbnail : 'https://i.pinimg.com/736x/10/a9/1b/10a91b37c6e5efb1cb18cebb1b4077ac.jpg',
        likes: post.data.ups,
        comments: post.data.num_comments,
        author: post.author,
        up: post.data.ups,
        down: post.data.downs,
        created: post.created_utc,
        postType: post.data.post_hint,
        subreddit: post.data.subreddit
      }));
      setCampaigns(postsArray);
      console.log(postsArray);

    } catch (error) {
      console.error(error);
    }
  };
  fetchData();
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
                <img className="imageC" src={item.image} />
              </div>

              <Row className='mt-2'>
                  <Col xs={12} sm={12} md={6} lg={7}>
                      <h3 className='nameC'>{item.title.slice(0,12)}...</h3>
                      {/* <h3 className='nameC'>{item.name.slice(0, 10)}</h3> */}
                      <p className='influencersC'><People style={{height:"15px"}}/>{item.likes}</p>                      
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={5} key={item.id}>
                      <p className="hashtagC">#{item.subreddit}</p>
                      {/* <p className="hashtagC">#{item.hashtag_campaign.hashtag}</p>
                       */}
                      <p className='typeC' style={{ backgroundColor: item.campaign_type === "Single" ? "#B47EE5" : "green" }}>{item.campaign_type}</p>

                  </Col>
                </Row>
                <p className='dateC'>{item.created}</p>
                
                {/* <p className='dateC'>{new Date(item.start_date).toLocaleDateString()}</p> */}
               
            </div>
        )})}
    </div>
    </Row>
  );
}

export default Campaigns;
// import axios from "axios"
// import React,{useEffect, useState} from 'react';
// import { Button } from 'react-bootstrap';
// import { ArrowBack, Search } from '@material-ui/icons';
// import AddIcon from '@material-ui/icons/Add';
// import { Container, Row, Col } from 'react-grid-system';
// import { Home, People } from '@mui/icons-material';
// import '../../../Style/BrandManagerPanel/brandManagerDashboard/campaigns.css'

// const Campaigns = () => {
//  const [campaigns, setCampaigns] = useState([]);


//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/activecampaigns/')
//       .then(response => {
//         setCampaigns(response.data);
//         console.log(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   return (
//       <Row style={{border: '0.1px solid rgb(235, 232, 232)'}}>
//         <Col xs={12} sm={12} md={12} lg={12}>
//           <div className='campaignsHeadersC d-lg-flex mt-2'>
//             <h5 className='d-sm-text-center'>Active Campaigns</h5>
//                <Button style={{backgroundColor:'#452c63', height:'25px', marginLeft:'5px'}}>
//                     <div style={{marginTop:"-6px"}}>
//                       <a href="/BMNewCampaign" className="mx-3" style={{display: 'block'}}>
//                         <p>Create<AddIcon className='AddIcon' style={{fontSize:"15px"}}/></p>
//                       </a>
//                     </div>
//                  </Button>
//                 <a href="/BMCampaigns" className="mx-3 text-dark"><p><u style={{fontSize:'13px'}}>View all</u></p></a>
//           </div>
//         </Col>


//     <div className="mainContainerC" style={{display: 'flex', flexWrap: "nowrap"}}> 
//       {campaigns.slice(0,20).map(item => {
//         return (
//             <div className="subContainerC" >
//               <div>
//                 <img className="imageC" src={`http://127.0.0.1:8000/${item.image}`} />
//               </div>

//               <Row className='mt-2'>
//                   <Col xs={12} sm={12} md={6} lg={7}>
//                       <h3 className='nameC'>{item.campaign_name}</h3>
//                       {/* <h3 className='nameC'>{item.name.slice(0, 10)}</h3> */}
//                       <p className='influencersC'><People style={{height:"15px"}}/>{item.influencers.length}</p>                      
//                   </Col>
//                   <Col xs={12} sm={12} md={6} lg={5} key={item.id}>
//                       <p className="hashtagC">#{item.hashtag}</p>
//                       {/* <p className="hashtagC">#{item.hashtag_campaign.hashtag}</p>
//                        */}
//                       <p className='typeC' style={{ backgroundColor: item.campaign_type === "Single" ? "#B47EE5" : "green" }}>{item.campaign_type}</p>

//                   </Col>
//                 </Row>
//                 <p className='dateC'>{item.created}</p>
                
//                 {/* <p className='dateC'>{new Date(item.start_date).toLocaleDateString()}</p> */}
               
//             </div>
//         )})}
//     </div>
//     </Row>
//   );
// }

// export default Campaigns;