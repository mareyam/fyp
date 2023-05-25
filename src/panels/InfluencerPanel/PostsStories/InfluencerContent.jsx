import axios from "axios"
import React,{useEffect, useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import '../../../Style/BrandManagerPanel/AllCampaigns/AllCampaigns.css';
import { ArrowBack, Search, FilterList, ArrowDropDown } from '@material-ui/icons';
import { People } from '@mui/icons-material';

const Pagintation = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i); //number of pages i.e 3
  }
  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href={currentPage} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};


const AllCampaigns = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  const [fullname, setFullname] = useState([]);
  const [username, setUsername] = useState([]);
  const [profileURL, setProfileURL] = useState('');
  
  
  
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://oauth.reddit.com/user/saadghauri/',
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTU3MTA5LjMzNzExMCwiaWF0IjoxNjg0NDcwNzA5LjMzNzEwOSwianRpIjoiMjQ0OTUzMTczODI1My1VVjJLS18zbG9NOWNwcE9rYWtmMXRXcHZrSEI1VmciLCJjaWQiOiI3NThZVE9NTmdFOFMwODFuY0hCZjVBIiwibGlkIjoidDJfdjlhcnk5b3QiLCJhaWQiOiJ0Ml92OWFyeTlvdCIsImxjYSI6MTY3MjIyMzgzOTAwMCwic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.IaXaQgjGzVhq9sFgD39Zj9M8EavnwTablc5IrjvlQYWHDs9CzfxO9LPm7diFo9N4cWBOPWJlyv2mEv-ngZXQRQ1uENSpBhbps3GNt-z6g9dO5vlcm7ngKbOUyzw8Cl3QnAz4GUpsOfjReEHjK8RdreOCFydRGXZYSGkOI49x7TZdoJTUSF34sbMF8OID33R_QOX_joMHyABuViARuXvz0AglWlnXLwWoJNug3JQqTiDRvAVuAiWIw0vJoMd6afzs4VZGaJigjz9sZfmTo6HHNurG5GqUGttJFRTHUYkEIHJRFOeFrhuMH48liZ9aquCUdjL7J57Yy_F59eWBcisF2g',
              'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
            }
          }
        );
      
        const jsonData = response.data.data.children;
        const postsArray = jsonData.map((post) => ({
          title: post.data.link_title,
          fullname: post.data.author_fullname,
          username: post.data.author,
          comments: post.data.num_comments,
          
          permalink: post.data.link_permalink,
          subreddit_name_prefixed: post.data.subreddit_name_prefixed,
          image: post.data.thumbnail ? post.data.thumbnail : 'https://i.pinimg.com/736x/10/a9/1b/10a91b37c6e5efb1cb18cebb1b4077ac.jpg',
          likes: post.data.ups,
        
          created: new Date(post.data.created_utc * 1000).toLocaleString(),
         
          subreddit: post.data.subreddit,
         
          score: post.total_karma,
         
        }));
        setCampaigns(postsArray);
        setUsername(postsArray[0].username);
        setFullname(postsArray[0].fullname);
        setProfileURL(`https://reddit.com/user/${username}/`);

        console.log(postsArray);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSort = (order) => {
    const sorted = [...campaigns].sort((a, b) =>
      order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    setCampaigns(sorted);
  };


  const handleDateSort = (order) => {
    const sorted = [...campaigns].sort((a, b) => {
      const dateA = new Date(a.created);
      const dateB = new Date(b.created);
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setCampaigns(sorted);
  };
  

  const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchValue(searchText);
    let results = campaigns;
    if (searchText) {
      results = campaigns.filter((campaign) => campaign.title.toLowerCase().includes(searchText.toLowerCase()));
    }
    setCampaigns(results);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = campaigns;


  // campaigns.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
    <Container className='mt-3'>
      <Row>
        <Col xs={12} sm={12} md={12} lg={2}>
          <div className='d-lg-block d-xs-flex'>
             <img className="influencerImage"src='https://i.pinimg.com/736x/10/a9/1b/10a91b37c6e5efb1cb18cebb1b4077ac.jpg'></img>
               <div style={{textAlign:"center"}}>
                 <h6>{username}</h6>
                 <p>{fullname}</p>
                 <a href={profileURL}>Profile URL</a>
               </div>
           </div>
         </Col>

        <Col xs={8} sm={8} md={12} lg={10}>
        
          <h5 className='campaignHeaderAC' >Author name</h5>
                <div className="ms-4 d-lg-flex d-xs-block">
                   <h6>All Content({campaigns.length})</h6>
                  <div className="d-flex">
                       <input style={{height:"25px"}}  type="text" placeholder="search for name &#x1F50D;" value={searchValue} onChange={handleSearch} />                        
                  </div>
                    <div className="d-flex d-xs-justify-center d-xs-align-center">
                      <SortButton handleSort={handleSort} handleDateSort={handleDateSort}/>  
                    </div>
                </div>
                <Row className="mainContainerAC mt-2">
        {currentItems.map((item) => {
          return (
            <Col xs={8} sm={8} md={2} lg={2} className="subContainerAC mx-1">
         <div>
         <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
           <img className="imageAC" src={item.image}/>
         </div>
         <div style={{display: 'flex',justifyContent:'space-between'}}>
         <div> <p className='typAC' style={{backgroundColor: item.postType === 'link' ? '#B47EE5' : 'green', }}>
                        {item.postType ? item.postType : 'others'}</p>
                      </div>
         <p className="hashtagAC">#{item.subreddit}</p>
        </div>
         <h3 className='nameAC'>{item.title.slice(0,30)}...</h3>
         
         <p className='influencersAC'><People style={{height:"15px"}}/>{item.comments}</p>  
         <p className='dateC'>{item.created}</p>
         <a className='dateC' href={item.permalink}>Reddit Link</a>
        
         </div>
            </Col>
          );
        })}
        <Pagintation
        itemsPerPage={itemsPerPage}
        totalItems={campaigns.length}
        paginate={paginate}
      />
      </Row>
        </Col> 
       
      </Row>

      
    </Container>
    </div>
  );
};

const SortButton = ({ handleSort, handleDateSort }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSortOrder = (order) => {
    handleSort(order);
    setIsOpen(false);
  };

  const handleDateSortOrder = (order) => {
    handleDateSort(order)
    setIsOpen(false);
  };


  return (
    <div className="dropdown">
       <button
              type="button"
              className="btn btn-outline-dark d-flex align-items-center dropdown-toggle" onClick={toggleDropdown}
              data-mdb-ripple-color="dark"
              style={{ fontSize: '12px', height: '25px' }}>
              <FilterList style={{ marginRight: "5px", fontSize: "12px", height: "25px" }} />
               Filter
            </button>
      <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
        <button className="dropdown-item" onClick={() => handleSortOrder('asc')}>
          Ascending
        </button>
        <button className="dropdown-item" onClick={() => handleSortOrder('desc')}>
          Descending
        </button>
        <button className="dropdown-item" onClick={() => handleDateSortOrder('asc')}>
          Ascending Date
        </button>
        <button className="dropdown-item" onClick={() => handleDateSortOrder('desc')}>
          Descending Date
        </button>

      </div>
    </div>
  );
};


export default AllCampaigns;
// import axios from "axios"
// import React,{useEffect, useState} from 'react';
// import { Container, Row, Col } from 'react-grid-system';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import MessageIcon from '@material-ui/icons/Message';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import QueryStatsIcon from '@mui/icons-material/QueryStats';
// import CampaignIcon from '@mui/icons-material/Campaign';
// import { PieChart, Pie, Legend, Cell, Tooltip } from 'recharts';
// import '../../../Style/InfluencerPanel/PostsAndStories/InfluencerDashboard.css';


// const InfluencerContent = () => {
//   const [posts, setPosts] = useState([]);
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           'https://oauth.reddit.com/user/Atiflash/submitted?sort=new',
//           {
//             headers: {
//               Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTU3MTA5LjMzNzExMCwiaWF0IjoxNjg0NDcwNzA5LjMzNzEwOSwianRpIjoiMjQ0OTUzMTczODI1My1VVjJLS18zbG9NOWNwcE9rYWtmMXRXcHZrSEI1VmciLCJjaWQiOiI3NThZVE9NTmdFOFMwODFuY0hCZjVBIiwibGlkIjoidDJfdjlhcnk5b3QiLCJhaWQiOiJ0Ml92OWFyeTlvdCIsImxjYSI6MTY3MjIyMzgzOTAwMCwic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.IaXaQgjGzVhq9sFgD39Zj9M8EavnwTablc5IrjvlQYWHDs9CzfxO9LPm7diFo9N4cWBOPWJlyv2mEv-ngZXQRQ1uENSpBhbps3GNt-z6g9dO5vlcm7ngKbOUyzw8Cl3QnAz4GUpsOfjReEHjK8RdreOCFydRGXZYSGkOI49x7TZdoJTUSF34sbMF8OID33R_QOX_joMHyABuViARuXvz0AglWlnXLwWoJNug3JQqTiDRvAVuAiWIw0vJoMd6afzs4VZGaJigjz9sZfmTo6HHNurG5GqUGttJFRTHUYkEIHJRFOeFrhuMH48liZ9aquCUdjL7J57Yy_F59eWBcisF2g',
//               'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
//             }
//           }
//         );
      
//         const jsonData = response.data.data.children;
//         const postsArray = jsonData.map((post) => ({
//           title: post.data.title,
//           image: post.data.thumbnail,
//           likes: post.data.ups,
//           comments: post.data.num_comments,
//           author: post.author,
//           up: post.data.ups,
//           down: post.data.downs,
//           created: new Date(post.data.created_utc * 1000).toLocaleString(),
//           postType: post.data.post_hint,
//           subreddit: post.data.subreddit,
//           url: post.data.url,
//           score: post.data.score,
//           subreddit: post.data.subreddit
//         }));
//         setPosts(postsArray);
//         console.log(postsArray);

//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);



//   return (
//     <Container className="mt-4" style={{border:"1px solid rgb(198, 198, 198)"}}>
//       <Row className='d-lg-flex d-sm-block d-xs-block'>

//         <Col xs={12} sm={12} md={12} lg={2} >
//          <div className='d-lg-block d-xs-flex'>
            
//             <img className="influencerImage"src='https://i.pinimg.com/736x/10/a9/1b/10a91b37c6e5efb1cb18cebb1b4077ac.jpg'></img>
//               <div style={{textAlign:"center"}}>
//                 <h6>{posts.author}</h6>
//                 <p>{posts.url}</p>
        
//               </div>
//           </div>

//         </Col>
//         <Col xs={12} sm={12} md={12} lg={10}>
//         <Row>     
//       <Col xs={12} sm={12} md={12} lg={12} >
     
//         <div className='align-items-center justify-content-center'>
//           <h6>POST INSIGHTS</h6>
//           <div className='d-flex'>
//             {/* <BarChart/>
//             <PieChartComponent/> */}
//           </div>
//         </div>
//        <div className="mainContainerIP" style={{display: 'flex', flexWrap: "nowrap"}}>            
//           {posts.map(item => {
//             return (
//               <Col className="subContainerIP" xs={12} sm={12} md={12} lg={3}>
//                 <div className='d-flex' style={{display:"flex", alignItems:"center", height:'75px'}}>
//                         <div>
//                           <img src={item.image} className='influencerImageIP'/>
//                       </div> 
//                       <div>
//                           <p className='influencerNameIP'>{item.author}</p>
//                           <p className='influencerUserNameIP'>{item.username} </p>
//                       </div>
//                       <div style={{marginLeft:"auto"}}>
//                           <p className='detailsIP'><ArrowForwardIosIcon/></p>
//                         </div> 
//                 </div>
//                 <img className='postIP' src={item.post} />
               
//                   <div className='d-flex'>
//                       <Col xs={6} sm={12} md={6} lg={6}>
//                       <div className=""><p className='likesIP'>
//                         <FavoriteIcon style={{color: "red", fontSize: "13px"}} />
//                         {item.likes}
//                       </p> </div>
//                     </Col>
//                     <Col xs={6} sm={12} md={6} lg={6}>
                     
//                       <p className='commentsIP'>
//                           <MessageIcon style={{fontSize: "13px"}} />
//                           {item.comments}
//                       </p>  
//                     </Col>
//                     </div>
                
//                   <p className='dateIP'>{item.created}</p>
//              </Col>
//             )})}
//        </div>
//        </Col>
//        <Col xs={12} sm={12} md={12} lg={12} >
//        <div className="mainContainerIP" style={{display: 'flex', flexWrap: "nowrap"}}> 
//           {/* {stories.map(item => {
//             return (
//               <Col className="subContainerIP" xs={12} sm={12} md={12} lg={3}>
//                 <div className='d-flex' style={{display:"flex", alignItems:"center", height:'75px'}}>
//                         <div>
//                           <img src={`http://127.0.0.1:8000/${item.image}`} className='influencerImageIP'/>
//                       </div> 
//                       <div>
//                           <p className='influencerNameIP'>{item.name}</p>
//                           <p className='influencerUserNameIP'>{item.username} </p>
//                       </div>
//                       <div style={{marginLeft:"auto"}}>
//                           <p className='detailsIP'><ArrowForwardIosIcon/></p>
//                         </div> 
//                 </div>
//                 <img className='postIP' src={item.post} />
               
//                   <div className='d-flex'>
//                       <Col xs={6} sm={12} md={6} lg={6}>
//                       <div className=""><p className='likesIP'>
//                         <FavoriteIcon style={{color: "red", fontSize: "13px"}} />
//                         {item.likes}
//                       </p> </div>
//                     </Col>
//                     <Col xs={6} sm={12} md={6} lg={6}>
                     
//                       <p className='commentsIP'>
//                           <MessageIcon style={{fontSize: "13px"}} />
//                           {item.comments}
//                       </p>  
//                     </Col>
//                     </div>
                
//                   <p className='dateIP'>{item.date}</p>
//              </Col>
//             )})} */}
//        </div>
//        </Col>
//        </Row>
//         </Col>
      
//       </Row>
//     </Container>
//     );    
// };
      
// export default InfluencerContent;

// const BarChart = () => {
//   const data = AllStoriesList.map(item => ({
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
//   const engagementRates = AllStoriesList.map((story) => {
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

//needed^
//////////////////////////////////////////////////
///////////////////////////////////////////////
//////////////////////////////////////////////
// import React,{useState} from 'react';
// import { Container, Row, Col } from 'react-grid-system';
// import AllPostsOfInfluencers from './InfluencerPostsList';
// import AllStoriesList from './InfluencerStoriesList';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import MessageIcon from '@material-ui/icons/Message';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import QueryStatsIcon from '@mui/icons-material/QueryStats';
// import CampaignIcon from '@mui/icons-material/Campaign';
// import { PieChart, Pie, Legend, Cell, Tooltip } from 'recharts';
// import '../../../Style/InfluencerPanel/PostsAndStories/InfluencerDashboard.css';


// const InfluencerContent = () => {
//   const [posts, setPosts] = useState(AllPostsOfInfluencers);
//   const [stories, setStories] = useState(AllStoriesList);

//   return (
//     <Container className="mt-4" style={{border:"1px solid rgb(198, 198, 198)"}}>
//       <Row className='d-lg-flex d-sm-block d-xs-block'>

//         <Col xs={12} sm={12} md={12} lg={2} >
//          <div className='d-lg-block d-xs-flex'>
//              {/* <a href="/BMCampaignDetails" style={{outline: 'none'}} ></a> */}
//             <img className="influencerImage"src='https://media.istockphoto.com/id/487787108/photo/can-of-coca-cola-on-ice.jpg?s=612x612&w=0&k=20&c=xDSO_nl0qeDMBZJBJk09jj5_UeQkyQ70QdXuDMByCaY='></img>
//               <div style={{textAlign:"center"}}><h6>Coke</h6>
//                 <p style={{fontSize:"12px"}}><b>Active Influencers: number</b></p>
//                 <p style={{fontSize:"12px"}}><b>Started on: date</b> </p>
//                 <p style={{fontSize:"12px"}}><b>Ends on: date</b></p>
//                 <p style={{fontSize:"12px"}}><b>Days Left: date</b></p>
//                 <p style={{fontSize:"12px"}}><b>Cycle: periodic</b></p>
//                 <p style={{fontSize:"12px"}}><b>Type: date</b></p>
//                 <p style={{fontSize:"12px"}}><b>Total Likes: number</b></p>
               
//                 <button type="button" className="btn btn-dark d-flex align-items-center justify-content-center" data-mdb-ripple-color="dark" style={{ marginTop:"-10px", fontSize: "12px", height: "35px", width: '100%' }}>
//                           <a href="/BMDashboard"><p style={{ fontSize: '12px', margin: '0px', paddingRight:"10px" }}>Inactive Campaign</p></a>
//                           <CampaignIcon style={{ fontSize: "12px", height: "25px" }} />
//                 </button>
//                 <button type="button" className="btn btn-dark d-flex align-items-center justify-content-center" data-mdb-ripple-color="dark" style={{ marginTop:"-10px", fontSize: "12px", height: "35px", width: '100%' }}>
//                           <a href="/BMPDF"><p style={{ fontSize: '12px', margin: '0px',paddingRight:"10px" }}>PDF Report</p></a>
//                           <PictureAsPdfIcon style={{ fontSize: "12px", height: "25px" }} />
//                 </button>
//                 <button type="button" className="btn btn-dark d-flex align-items-center justify-content-center" data-mdb-ripple-color="dark" style={{ marginTop:"-10px", fontSize: "12px", height: "35px", width: '100%' }}>
//                           <a href="/BMStats"><p style={{ fontSize: '12px', margin: '0px',paddingRight:"10px" }}>View Stats</p></a>
//                           <QueryStatsIcon style={{ fontSize: "12px", height: "25px" }} />
//                 </button>
//               </div>
//           </div>

//         </Col>
//         <Col xs={12} sm={12} md={12} lg={10}>
//         <Row>     
//       <Col xs={12} sm={12} md={12} lg={12} >
//         <div>
//           <h6>Coke Campaign Statistics</h6>
//         </div>
//         <div className='d-block'>
//           <p>Coke: The classic cola that's been enjoyed for over a century." - Coke is a well-known and beloved soda that has been around since 1886, and has become a staple in many households and restaurants around the world</p>
//           <p> #coke #company</p>
//         </div>
//         <div className='align-items-center justify-content-center'>
//           <h6>POST INSIGHTS</h6>
//           <div className='d-flex'>
//             <BarChart/>
//             <PieChartComponent/>
//           </div>
//         </div>
//        <div className="mainContainerIP" style={{display: 'flex', flexWrap: "nowrap"}}>            
//           {posts.map(item => {
//             return (
//               <Col className="subContainerIP" xs={12} sm={12} md={12} lg={3}>
//                 <div className='d-flex' style={{display:"flex", alignItems:"center", height:'75px'}}>
//                         <div>
//                           <img src={`http://127.0.0.1:8000/${item.image}`} className='influencerImageIP'/>
//                       </div> 
//                       <div>
//                           <p className='influencerNameIP'>{item.name}</p>
//                           <p className='influencerUserNameIP'>{item.username} </p>
//                       </div>
//                       <div style={{marginLeft:"auto"}}>
//                           <p className='detailsIP'><ArrowForwardIosIcon/></p>
//                         </div> 
//                 </div>
//                 <img className='postIP' src={item.post} />
               
//                   <div className='d-flex'>
//                       <Col xs={6} sm={12} md={6} lg={6}>
//                       <div className=""><p className='likesIP'>
//                         <FavoriteIcon style={{color: "red", fontSize: "13px"}} />
//                         {item.likes}
//                       </p> </div>
//                     </Col>
//                     <Col xs={6} sm={12} md={6} lg={6}>
                     
//                       <p className='commentsIP'>
//                           <MessageIcon style={{fontSize: "13px"}} />
//                           {item.comments}
//                       </p>  
//                     </Col>
//                     </div>
                
//                   <p className='dateIP'>{item.date}</p>
//              </Col>
//             )})}
//        </div>
//        </Col>
//        <Col xs={12} sm={12} md={12} lg={12} >
//        <div className="mainContainerIP" style={{display: 'flex', flexWrap: "nowrap"}}> 
//           {stories.map(item => {
//             return (
//               <Col className="subContainerIP" xs={12} sm={12} md={12} lg={3}>
//                 <div className='d-flex' style={{display:"flex", alignItems:"center", height:'75px'}}>
//                         <div>
//                           <img src={`http://127.0.0.1:8000/${item.image}`} className='influencerImageIP'/>
//                       </div> 
//                       <div>
//                           <p className='influencerNameIP'>{item.name}</p>
//                           <p className='influencerUserNameIP'>{item.username} </p>
//                       </div>
//                       <div style={{marginLeft:"auto"}}>
//                           <p className='detailsIP'><ArrowForwardIosIcon/></p>
//                         </div> 
//                 </div>
//                 <img className='postIP' src={item.post} />
               
//                   <div className='d-flex'>
//                       <Col xs={6} sm={12} md={6} lg={6}>
//                       <div className=""><p className='likesIP'>
//                         <FavoriteIcon style={{color: "red", fontSize: "13px"}} />
//                         {item.likes}
//                       </p> </div>
//                     </Col>
//                     <Col xs={6} sm={12} md={6} lg={6}>
                     
//                       <p className='commentsIP'>
//                           <MessageIcon style={{fontSize: "13px"}} />
//                           {item.comments}
//                       </p>  
//                     </Col>
//                     </div>
                
//                   <p className='dateIP'>{item.date}</p>
//              </Col>
//             )})}
//        </div>
//        </Col>
//        </Row>
//         </Col>
      
//       </Row>
//     </Container>
//     );    
// };
      
// export default InfluencerContent;

// const BarChart = () => {
//   const data = AllStoriesList.map(item => ({
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
//   const engagementRates = AllStoriesList.map((story) => {
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


