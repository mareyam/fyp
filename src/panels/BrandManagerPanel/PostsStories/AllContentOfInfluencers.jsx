import axios from "axios";
import React, {useState, useEffect} from 'react';
// import AllStoriesList from "./AllStoriesList";
import { Button } from 'react-bootstrap';
import { ArrowBack, Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import '../../../Style/BrandManagerPanel/PostsAndStories/AllPosts.css';
import { Container, Row, Col } from 'react-grid-system';
import LaunchIcon from '@mui/icons-material/Launch';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CampaignIcon from '@mui/icons-material/Campaign';
import { isContentEditable } from "@testing-library/user-event/dist/utils";

const AllPosts = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
          pageNumbers.push(i); //number of pages i.e 3
        }
        return (
          <Col xs={12} sm={12} md={12} lg={12}>
            <ul className='pagination'>
              {pageNumbers.map(number => (
                  <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                    <a onClick={() => paginate(number)} href={currentPage} className='page-link'>
                      {number}
                    </a>
                  </li>
              ))}
            </ul>
          </Col>
        );
      };
    
      const Pagintation = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [itemsPerPage] = useState(3);
        const [searchValue, setSearchValue] = useState('');
        const [campaigns, setCampaigns] = useState([]);
        const [selected, setSelected] = useState('');

        const handleToggle = (value) => {
          setSelected(value);
        };

        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await axios.get(
                'https://oauth.reddit.com/r/apple/new.json?limit=50&fields=title',
                {
                  headers: {
                    Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0MjEzNDUyLCJqdGkiOiIyNDQ5NTMxNzM4MjUzLTZXR2xSOG1fcnRvUURGcjdRWThuQURtOHZyVjNtdyIsImNpZCI6Ijc1OFlUT01OZ0U4UzA4MW5jSEJmNUEiLCJsaWQiOiJ0Ml92OWFyeTlvdCIsImFpZCI6InQyX3Y5YXJ5OW90IiwibGNhIjoxNjcyMjIzODM5MDAwLCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyJ9.ax4qqUajbzGdFohTweUNn-lwRRVshXDe7vNnZWLbi8aToBmPXGt4DKV5qFIclUIQsD3qr5bNl3yx74IUKszPtRO9vMNsQZmIEeKLd4xH4i_GcFqPgHEtpqjoe-fgyxDdBgTENZDPUqfeiTC-tUva7ecV2qxooKTb8t9lsHTUYbQiXz5oFL3G9oLxiBzaj9_vUsOA9tNvzJEaRuoRX9w1v7pn7K989TLOehDA0azmNsWhlmpeKornkwItY3LloIdNZEWGJ15aSUa_lZ9mXmvVrWtJrupjXgI70KD4dVW0LKt7M7-zqSaXnSBeuyxd4NOAJMRV0pD6E-irYZDHPncVVw',
                    'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
                  }
                }
              );
            
              const jsonData = response.data.data.children;
              const postsArray = jsonData.map((post) => ({
                title: post.data.title,
                image: post.data.thumbnail ? post.data.thumbnail : 'https://i.pinimg.com/736x/10/a9/1b/10a91b37c6e5efb1cb18cebb1b4077ac.jpg',
                profilepic: post.data.icon_img ? post.data.icon_img : 'https://i.pinimg.com/736x/10/a9/1b/10a91b37c6e5efb1cb18cebb1b4077ac.jpg',
                likes: post.data.ups,
                comments: post.data.num_comments,
                author: post.author.fullname,
                up: post.data.ups,
                down: post.data.downs,
                created: new Date(post.data.created_utc * 1000).toLocaleString(),
                postType: post.data.post_hint,
                subreddit: post.data.subreddit,
                num_comments: post.data.num_comments,
                score: post.data.score
              }));
              setCampaigns(postsArray);
              console.log(postsArray);
      
            } catch (error) {
              console.error(error);
            }
          };
          fetchData();
        }, []);
      
        const handleSearch = (event) => {
            const searchText = event.target.value;
            setSearchValue(searchText);
            let results = campaigns;
            if (searchText) {
            results = campaigns.filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase()));
            }
            setCampaigns(results);
        }

        const filteredCampaigns = campaigns.filter(item => {
          if (selected === 'link') {
            return item.postType === 'link';
          } else if (selected === 'self') {
            return item.postType === 'self';
          } else {
            return true; // show all campaigns
          }
        });


        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = campaigns.slice(indexOfFirstItem, indexOfLastItem);
      
        const paginate = pageNumber => setCurrentPage(pageNumber);
      
  return (
    <div>
    <Container className="mt-2" style={{border:"1px solid rgb(198, 198, 198)"}}>
      <div className='d-lg-flex d-sm-block'>
        <Col xs={12} sm={12} md={2} lg={2} className="mt-4" > 
            <div className='d-lg-block d-xs-flex'>
               {/* <a href="/BMCampaignDetails" style={{outline: 'none'}} ></a> */}
              <img className="influencerImage"src='data:image/jpeg;base64,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'></img>
                <div style={{textAlign:"center"}}><h6>Coke</h6>
                  <p style={{fontSize:"12px"}}><b>Active Influencers: number</b></p>
                  <p style={{fontSize:"12px"}}><b>Started on: date</b> </p>
                  <p style={{fontSize:"12px"}}><b>Ends on: date</b></p>
                  <p style={{fontSize:"12px"}}><b>Days Left: date</b></p>
                  <p style={{fontSize:"12px"}}><b>Cycle: Periodic</b></p>
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
        <Col xs={12} sm={12} md={6} lg={8}>
              <div className="header1 d-lg-flex mt-4 d-xs-block ">
                <h6>All Posts from Apple</h6>
                <input style={{height:'20%'}}className="mx-2" type="text" placeholder="Search for story" value={searchValue} onChange={handleSearch} />
                <div className="d-xs-block ">
                  <button
                    onClick={() => handleToggle('link')}
                    style={{
                      backgroundColor: selected === 'link' ? '#452c63' : 'white',
                      color: selected === 'link' ? 'white' : 'black',
                      width: '110px',
                      borderRadius:'16px'
                    }}> Link </button>
                  <button
                    onClick={() => handleToggle('self')}
                    style={{
                      backgroundColor: selected === 'self' ? '#452c63' : 'white',
                      color: selected === 'self' ? 'white' : 'black',
                      width: '110px',
                      borderRadius:'16px'
                    }}
                  > Self </button>
                  <button
                    onClick={() => handleToggle('Both')}
                    style={{
                      backgroundColor: selected === 'Both' ? '#452c63' : 'white',
                      color: selected === 'Both' ? 'white' : 'black',
                      width: '110px',
                      borderRadius:'16px'
                    }}
                  >
                    Both
                  </button>
                </div>

              </div>
              <div className="mainContainerAS"> 
                {currentItems.map(item => {
                    return (
                        <Col xs={12} sm={12} md={12} lg={12} >
                            <div style={{}} className="subContainerAS my-2 d-lg-flex">
                                <div><img className="storyImageAS img-fluid" src={item.image}/></div>
                                <div className='d-lg-flex d-sm-block d-xs-block'>
                                  <div className="mx-2 d-flex" style={{alignItems:"center"}}>
                                    <div><img className="imageAS" src='https://i.pinimg.com/736x/10/a9/1b/10a91b37c6e5efb1cb18cebb1b4077ac.jpg'/></div>
                                    <div style={{marginLeft:'5px'}}><b><p style={{fontSize:"12px", marginTop:'30px'}}>{item.author}</p></b>
                                    <p style={{fontSize:"12px", marginTop:"-15px"}}>@{item.name}</p></div>
                                  </div>
                                  <div style={{textAlign:"left", alignItems:"center", justifyContent:"left", width: "auto", marginTop:"30px" }} className="mx-4">
                                    <b><p style={{fontSize:"10px"}} className='costAS'>cost: Rs.{item.budget}</p></b>
                                    <a href="/BMCampaignDetails"><p style={{fontSize:"10px", marginTop:"-10px"}} className="dateAS"><LaunchIcon style={{fontSize:"11px"}}/>Link to Instagram Post</p></a>
                                    <a href=""><p style={{fontSize:"10px", marginTop:"-10px"}} className="dateAS"><LaunchIcon style={{fontSize:"11px"}}/>Link to Instagram Profile</p></a>
                                  </div>
                                  <div style={{textAlign:"left", alignItems:"center", justifyContent:"left", width: "auto", marginTop:"30px" }} className="mx-4">
                                    <b><p style={{fontSize:"10px", marginTop:"5px"}} className="dateAS">date: {item.created}</p></b>
                                    <p style={{fontSize:"10px", marginTop:"-10px"}} className="hashtagAS">hashtag: {item.subreddit.slice(0,15)}...</p>
                                  </div>
                                </div>
                            </div>
                        </Col>
                        )})}
              </div>
              <div xs={12} sm={12} md={12} lg={12}>
                  <AllPosts
                    itemsPerPage={itemsPerPage}
                    totalItems={campaigns.length}
                    paginate={paginate}/>
             </div>
        </Col>
      </div>
    </Container>  
    </div>
       
  );
}

export default Pagintation;

// import React from 'react';
// import { isCompositeComponentWithType } from 'react-dom/test-utils';
// import '../Style/campaigns.css';
// import AllCampaignsList from "./AllCampaignsList";
// import { Button } from 'react-bootstrap';
// import { Search } from '@material-ui/icons';
// import AddIcon from '@material-ui/icons/Add';

// const Campaigns = () => {
//   return (
//     <div style={{margin: '1%'}}>
//       <h5>DashBoard</h5>
//       <div style={{display: "flex"}}>
//         <h6 style={{marginRight:"10px"}}>Active Campaigns</h6>
//         <input style={{height:"25px"}} type="text"></input><Search className="mx-3"/>
//         <Button style={{height:"25px"}} >
//           <div style={{marginTop:"-6px"}}>
//              <AddIcon style={{fontSize:"15px"}}/>Create
//           </div>
//         </Button>
//         <a  href="#" className="mx-3">View all campaigns</a>
//       </div>
//     <div className="mainContainerC" style={{display: 'flex', flexWrap: "nowrap"}}>
        
//       {AllStoriesList.map(item => {
//         return (
//             <div className="subContainerC" >
//                 <div>
//                 <div><img className="imageC" src={item.image}/></div>
//                 <div style={{display: 'flex',justifyContent:'space-between'}}>
//                 <p className='typeC'>{item.type}</p>
//                     <p className="hashtagC">{item.hashtag}</p>
//                 </div>
//                 <h3 className='nameC'>{item.name}</h3>
//                 <p className='influencersC'>{item.influencers}</p>
//                 <p className='dateC'>{item.startDate}</p>
//                 </div>
//             </div>
//         )})}
//     </div>
//     </div>
//   );
// }

// export default Campaigns;


//   return (
//     <Container style={{ margin: '1%' }}>
//       <Row>
//         <Col xs={12} sm={12} md={6} lg={6}>
//           <h5>DashBoard</h5>
//         </Col>
//         <Col xs={12} sm={12} md={6} lg={6}>
//           <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//             <Button style={{ height: '25px' }}>
//               <AddIcon style={{ fontSize: '15px' }} />
//               Create
//             </Button>
//             <a href="#" className="mx-3">
//               View all campaigns
//             </a>
//           </div>
//         </Col>
//       </Row>
//       <Row>
//         <Col xs={12} sm={12} md={6} lg={6}>
//           <h6 style={{ marginRight: '10px' }}>Active Campaigns</h6>
//         </Col>
//         <Col xs={12} sm={12} md={6} lg={6}>
//           <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//             <input
//               style={{ height: '25px' }}
//               type="text"
//               value={searchValue}
//               onChange={handleSearch}
//             />
//             <Search className="mx-3" />
//           </div>
//         </Col>
//       </Row>
//       <Row>
//         <Col xs={12}>
//           <div className="mainContainerC" style={{ display: 'flex', flexWrap: 'wrap' }}>
//             {filteredResults.map(item => (
//               <div className="subContainerC">
//                 <div>
//                   <div>
//                     <img className="imageC" src={item.image} alt="campaign image" />
//                   </div>
//                   <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <p className="typeC">{item.type}</p>
//                     <p className="hashtagC">{item.hashtag}</p>
//                   </div>
//                   <h3 className="nameC">{item.name}</h3>
//                 </div>
//                 </div>
//             ))}</div>
//             </Col>
//             </Row>
//             </Container>
//   )}

// export default Campaigns;