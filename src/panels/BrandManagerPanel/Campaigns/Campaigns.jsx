import axios from "axios"
import React,{useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import { ArrowBack, Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import { Container, Row, Col } from 'react-grid-system';
import { Home, People } from '@mui/icons-material';
import '../../../Style/BrandManagerPanel/brandManagerDashboard/campaigns.css'


const Campaigns = () => {
const [posts, setPosts] = useState([]);
const [campaigns, setCampaigns] = useState([]);
const [subreddits, setSubreddits] = useState([]);
const [likes, setLikes] = useState([]);

useEffect(()=>{
if(campaigns.length > 0 && likes.length > 0){
    // Map campaigns against likes where campaign name matches subreddit name
    const campaignLikes = campaigns.map(campaign => ({
      created: campaign.created, 
      campaign_name : campaign.campaign_name,
      hashtag: campaign.hashtag,
      likes: likes.map(post => {
        if(post.subreddit === campaign.hashtag){
          return post.likes
        }
        return 0
      }
      )[0]
                     
    }));

    setPosts(campaignLikes);
}
},[campaigns, likes])

useEffect(() => {
 axios
   .get('http://127.0.0.1:8000/activecampaigns/')
   .then((response) => {
     setCampaigns(response.data);
   })
   .catch((error) => {
   
   });
}, []);

useEffect(() => {
 const fetchData = async (hashtag,index) => {
   try {
     const response = await axios.get(
       `https://oauth.reddit.com/r/${hashtag}/new.json?limit=100&fields=title`,
       {
         headers: {
           Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NDg0MjQ0LCJpYXQiOjE2ODQzOTc4NDQsImp0aSI6IjI0NDk1MzE3MzgyNTMtb2p2bkVQVXp4M0JEQTM2ejJQdnJWbjFxUi16RG1nIiwiY2lkIjoiNzU4WVRPTU5nRThTMDgxbmNIQmY1QSIsImxpZCI6InQyX3Y5YXJ5OW90IiwiYWlkIjoidDJfdjlhcnk5b3QiLCJsY2EiOjE2NzIyMjM4MzkwMDAsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.yEdA5QCrR0Co5A2A-t8AhV9rK62ZOvuitUOs38K0naydsSkrljth1FIBzHUQFx3H8uPEeXX18IEwGDxq0t8I7dLAKKxWsslSBIEVRNZXrG10f89wru89JWHMgQrdAQZxm49Usx5LR2xxJ5ZD5lSUkNE4HC_2rXqM5FZzY2Gw5ZQ3t5tSCHZnnmFxXKEGxkLmz_JxADWKR80SuCcrxAW-Vt-w4jO-xPmAm3CeCvphj9oEf-IhSM6LWbzXGtK7d1zJ-rOmoa_F7u371Wk0Fybyc_CcvKb-cqvcaIyhZDBgA_YK0VQ4oZ5S8gE5i3nGsCgg3BkQunNrWnc2qOkGjeiX5g',
           'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
         }
       }
     );
     const jsonData = response.data.data.children;
     const post = {
      subreddit: hashtag,
      likes: jsonData.reduce((total, item)=> total + item.data.ups, 0)
     }
     const postsArray = jsonData.map((post) => ({
       likes: post.data.ups,
       subreddit: post.data.subreddit
     }));
     if(!likes[hashtag])
     setLikes([...likes, post]);

   } catch (error) {
  
   }
 };
 if(campaigns)
 campaigns.map(campaign => fetchData(campaign.hashtag))
 
}, [campaigns]);
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
    {posts.slice(0,20).map(item => {
        return (
            <div className="subContainerC" >
              <div>
              <img className="imageC" src={item.image ? item.image : 'https://i.pinimg.com/736x/10/a9/1b/10a91b37c6e5efb1cb18cebb1b4077ac.jpg'} />
              </div>

              <Row className='mt-2'>
                  <Col xs={12} sm={12} md={6} lg={7}>
                      <h3 className='nameC'>{item.campaign_name.slice(0,18)}...</h3>
                      <p className='influencersC'><People style={{height:"15px"}}/>{item.likes}</p>                      
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={5} key={item.id}>
                      <p className="hashtagC">#{item.hashtag}</p>
                      <div><p className='typeC' style={{backgroundColor: item.campaign_type === 'periodic' ? '#B47EE5' : 'green', }}>
                        {item.campaign_type ? item.campaign_type : 'others'}</p>
                      </div>
                  </Col>
                </Row>
                <p className='dateC'>{item.created}</p>
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
// const [posts, setPosts] = useState([]);
// const [campaigns, setCampaigns] = useState([]);
// const [subreddits, setSubreddits] = useState([]);
// const [likes, setLikes] = useState([]);
// useEffect(()=>{
// if(campaigns.length > 0 && likes.length > 0){
//   console.log("We are here")
//     // Map campaigns against likes where campaign name matches subreddit name
//     const campaignLikes = campaigns.map(campaign => ({
//       created: campaign.created, 
//       campaign_name : campaign.campaign_name,
//       hashtag: campaign.hashtag,
//       likes: likes.filter(post => post.subreddit === campaign.hashtag)
//                       .reduce((acc, post) => acc + post.likes, 0)
//     }));
//     setPosts(campaignLikes);
// }
// },[campaigns, likes])

// useEffect(() => {
//  axios
//    .get('http://127.0.0.1:8000/activecampaigns/')
//    .then((response) => {
//      setCampaigns(response.data);
//    })
//    .catch((error) => {
//      console.error(error);
//    });
// }, []);

// useEffect(() => {
//  const fetchData = async () => {
//    try {
//      const response = await axios.get(
//        'https://oauth.reddit.com/r/apple/new.json?limit=100&fields=title',
//        {
//          headers: {
//            Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTU3MTA5LjMzNzExMCwiaWF0IjoxNjg0NDcwNzA5LjMzNzEwOSwianRpIjoiMjQ0OTUzMTczODI1My1VVjJLS18zbG9NOWNwcE9rYWtmMXRXcHZrSEI1VmciLCJjaWQiOiI3NThZVE9NTmdFOFMwODFuY0hCZjVBIiwibGlkIjoidDJfdjlhcnk5b3QiLCJhaWQiOiJ0Ml92OWFyeTlvdCIsImxjYSI6MTY3MjIyMzgzOTAwMCwic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.IaXaQgjGzVhq9sFgD39Zj9M8EavnwTablc5IrjvlQYWHDs9CzfxO9LPm7diFo9N4cWBOPWJlyv2mEv-ngZXQRQ1uENSpBhbps3GNt-z6g9dO5vlcm7ngKbOUyzw8Cl3QnAz4GUpsOfjReEHjK8RdreOCFydRGXZYSGkOI49x7TZdoJTUSF34sbMF8OID33R_QOX_joMHyABuViARuXvz0AglWlnXLwWoJNug3JQqTiDRvAVuAiWIw0vJoMd6afzs4VZGaJigjz9sZfmTo6HHNurG5GqUGttJFRTHUYkEIHJRFOeFrhuMH48liZ9aquCUdjL7J57Yy_F59eWBcisF2g',
//            'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
//          }
//        }
//      );
//      const jsonData = response.data.data.children;
//      const postsArray = jsonData.map((post) => ({
//        likes: post.data.ups,
//        subreddit: post.data.subreddit
//      }));
//      setLikes(postsArray);

//    } catch (error) {
//      console.error("error is"+ error);
//    }
//  };
//  fetchData();
// }, []);

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
//     {posts.slice(0,20).map(item => {
//         return (
//             <div className="subContainerC" >
//               <div>
//               <img className="imageC" src={item.image ? item.image : 'https://i.pinimg.com/736x/10/a9/1b/10a91b37c6e5efb1cb18cebb1b4077ac.jpg'} />
//               </div>

//               <Row className='mt-2'>
//                   <Col xs={12} sm={12} md={6} lg={7}>
//                       <h3 className='nameC'>{item.campaign_name.slice(0,18)}...</h3>
//                       <p className='influencersC'><People style={{height:"15px"}}/>{item.likes}</p>                      
//                   </Col>
//                   <Col xs={12} sm={12} md={6} lg={5} key={item.id}>
//                       <p className="hashtagC">#{item.hashtag}</p>
//                       <div><p className='typeC' style={{backgroundColor: item.campaign_type === 'periodic' ? '#B47EE5' : 'green', }}>
//                         {item.campaign_type ? item.campaign_type : 'others'}</p>
//                       </div>
//                   </Col>
//                 </Row>
//                 <p className='dateC'>{item.created}</p>
//             </div>
//         )})}
        
//        </div>
//     </Row>
//   );
//       }

// export default Campaigns;


   {/* {posts.slice(0,20).map(item => {
        return (
            <div className="subContainerC" >
              <div>
              <img className="imageC" src={item.image ? item.image : 'https://i.pinimg.com/736x/10/a9/1b/10a91b37c6e5efb1cb18cebb1b4077ac.jpg'} />
              </div>

              <Row className='mt-2'>
                  <Col xs={12} sm={12} md={6} lg={7}>
                      <h3 className='nameC'>{item.title.slice(0,18)}...</h3>
                      <p className='influencersC'><People style={{height:"15px"}}/>{item.likes}</p>                      
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={5} key={item.id}>
                      <p className="hashtagC">#{item.subreddit}</p>
                      <div> <p className='typeC' style={{backgroundColor: item.postType === 'link' ? '#B47EE5' : 'green', }}>
                        {item.postType ? item.postType : 'others'}</p>
                      </div>
                  </Col>
                </Row>
                <p className='dateC'>{item.created}</p>
            </div>
        )})} */}





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







//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const [subreddits, setSubreddits] = useState([]);

// useEffect(() => {
//   const fetchData = async () => {
//     const subData = await axios.get('http://127.0.0.1:8000/activecampaigns/');
//     const subNames = subData.data.map(campaign => campaign.hashtag);
//     setSubreddits(subNames);

//     const likesBySub = await Promise.all(
//       subNames.map(async (sub) => {
//         const response = await axios.get(`https://oauth.reddit.com/r/${sub}/new.json?limit=100&fields=likes`);
//         const jsonData = response.data.data.children;
//         const postsArray = jsonData
//           .filter(post => post.data.likes !== null)
//           .reduce((acc, post) => acc + post.data.likes, 0);
//         console.log(`Subreddit "${sub}" has ${postsArray} total likes.`);
//         return { subreddit: sub, likes: postsArray };
      // })
      // );

      // useEffect(() => {
      //   const fetchData = async () => {
      //     const likesArray = [];
      //     for (const subreddit of subreddits) {
      //       try {
      //         const response = await axios.get(
      //           `https://oauth.reddit.com/r/${subreddit}/new.json?limit=100&fields=likes`,
      //           {
      //             headers: {
      //               Authorization: 'Bearer token',
      //               'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
      //             }
      //           }
      //         );
      //         const jsonData = response.data.data.children;
      //         const likes = jsonData
      //           .filter(post => post.data.likes !== null)
      //           .reduce((acc, post) => acc + post.data.likes, 0);
      //         likesArray.push({ subreddit, likes });
      //         console.log(`Subreddit "${subreddit}" has ${likes} total likes.`);
      //       } catch (error) {
      //         console.error(error);
      //       }
      //     }
      //     setLikes(likesArray);
      //   };
      //   fetchData();
      // }, [subreddits]);
      