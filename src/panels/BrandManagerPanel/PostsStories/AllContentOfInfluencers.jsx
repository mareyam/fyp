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
// import AllCampaignsList from '../Campaigns/AllCampaignsList';

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
          axios.get('http://127.0.0.1:8000/campaigns/')
            .then(response => {
              setCampaigns(response.data);
            })
            .catch(error => {
              console.error(error);
            });
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
          if (selected === 'Post') {
            return item.content_type === 'Post';
          } else if (selected === 'Story') {
            return item.content_type === 'Story';
          } else {
            return true; // show all campaigns
          }
        });


        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = campaigns.slice(indexOfFirstItem, indexOfLastItem);
      
        const paginate = pageNumber => setCurrentPage(pageNumber);
      
  return (
    <Container className="mt-2" style={{border:"1px solid rgb(198, 198, 198)"}}>
      <div className='d-lg-flex d-sm-block'>
        <Col xs={12} sm={12} md={2} lg={2} className="mt-4" > 
            <div className='d-lg-block d-xs-flex'>
               {/* <a href="/BMCampaignDetails" style={{outline: 'none'}} ></a> */}
              <img className="influencerImage"src='https://media.istockphoto.com/id/487787108/photo/can-of-coca-cola-on-ice.jpg?s=612x612&w=0&k=20&c=xDSO_nl0qeDMBZJBJk09jj5_UeQkyQ70QdXuDMByCaY='></img>
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
                <h6>All Posts from coke</h6>
                <input style={{height:'20%'}}className="mx-2" type="text" placeholder="Search for story" value={searchValue} onChange={handleSearch} />
                <div className="d-xs-block ">
                  <button
                    onClick={() => handleToggle('Post')}
                    style={{
                      backgroundColor: selected === 'Post' ? '#452c63' : 'white',
                      color: selected === 'Post' ? 'white' : 'black',
                      width: '110px',
                      borderRadius:'16px'
                    }}>
                    Post
                  </button>
                  <button
                    onClick={() => handleToggle('Story')}
                    style={{
                      backgroundColor: selected === 'Story' ? '#452c63' : 'white',
                      color: selected === 'Story' ? 'white' : 'black',
                      width: '110px',
                      borderRadius:'16px'
                    }}
                  >
                    Story
                  </button>
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
                {filteredCampaigns.map(item => {
                    return (
                        <Col xs={12} sm={12} md={12} lg={12} >
                            <div style={{}} className="subContainerAS my-2 d-lg-flex">
                                <div><img className="storyImageAS img-fluid" src={`http://127.0.0.1:8000/${item.image}`}/></div>
                                <div className='d-lg-flex d-sm-block d-xs-block'>
                                  <div className="mx-2 d-flex" style={{alignItems:"center"}}>
                                    <div><img className="imageAS" src='https://static.toiimg.com/thumb/56200851.cms?width=170&height=240&imgsize=88803' /></div>
                                    <div style={{marginLeft:'5px'}}><b><p style={{fontSize:"12px", marginTop:'30px'}}>{item.influencers}</p></b>
                                    <p style={{fontSize:"12px", marginTop:"-15px"}}>@{item.influencers}</p></div>
                                  </div>
                                  <div style={{textAlign:"left", alignItems:"center", justifyContent:"left", width: "auto", marginTop:"30px" }} className="mx-4">
                                    <b><p style={{fontSize:"10px"}} className='costAS'>cost: Rs.{item.campaign_cost}</p></b>
                                    <a href="/BMCampaignDetails"><p style={{fontSize:"10px", marginTop:"-10px"}} className="dateAS"><LaunchIcon style={{fontSize:"11px"}}/>Link to Instagram Post</p></a>
                                    <a href=""><p style={{fontSize:"10px", marginTop:"-10px"}} className="dateAS"><LaunchIcon style={{fontSize:"11px"}}/>Link to Instagram Profile</p></a>
                                  </div>
                                  <div style={{textAlign:"left", alignItems:"center", justifyContent:"left", width: "auto", marginTop:"30px" }} className="mx-4">
                                    <b><p style={{fontSize:"10px", marginTop:"5px"}} className="dateAS">date: {item.start_date}</p></b>
                                    <p style={{fontSize:"10px", marginTop:"-10px"}} className="hashtagAS">hashtag: {item.hashtag_campaign}</p>
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