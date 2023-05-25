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
const [posts, setPosts] = useState([]);
const [subreddits, setSubreddits] = useState([]);
const [likes, setLikes] = useState([]);

const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage] = useState(10);
const [searchValue, setSearchValue] = useState('');
const [campaigns, setCampaigns] = useState([]);


useEffect(()=>{
if(campaigns.length > 0 && likes.length > 0){
  console.log("We are here")
    // Map campaigns against likes where campaign name matches subreddit name
    const campaignLikes = campaigns.map(campaign => ({
      image: 'https://i.pinimg.com/736x/10/a9/1b/10a91b37c6e5efb1cb18cebb1b4077ac.jpg',
      // image: campaign.image ? campaign.image : 'https://i.pinimg.com/736x/10/a9/1b/10a91b37c6e5efb1cb18cebb1b4077ac.jpg',
      // \
      created: campaign.created, 
      campaign_name : campaign.campaign_name,
      hashtag: campaign.hashtag,
      likes: likes.filter(post => post.subreddit === campaign.hashtag)
                      .reduce((acc, post) => acc + post.likes, 0)
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
     console.error(error);
   });
}, []);

useEffect(() => {
 const fetchData = async () => {
   try {
     const response = await axios.get(
       'https://oauth.reddit.com/r/apple/new.json?limit=100&fields=title',
       {
         headers: {
           Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTU3MTA5LjMzNzExMCwiaWF0IjoxNjg0NDcwNzA5LjMzNzEwOSwianRpIjoiMjQ0OTUzMTczODI1My1VVjJLS18zbG9NOWNwcE9rYWtmMXRXcHZrSEI1VmciLCJjaWQiOiI3NThZVE9NTmdFOFMwODFuY0hCZjVBIiwibGlkIjoidDJfdjlhcnk5b3QiLCJhaWQiOiJ0Ml92OWFyeTlvdCIsImxjYSI6MTY3MjIyMzgzOTAwMCwic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.IaXaQgjGzVhq9sFgD39Zj9M8EavnwTablc5IrjvlQYWHDs9CzfxO9LPm7diFo9N4cWBOPWJlyv2mEv-ngZXQRQ1uENSpBhbps3GNt-z6g9dO5vlcm7ngKbOUyzw8Cl3QnAz4GUpsOfjReEHjK8RdreOCFydRGXZYSGkOI49x7TZdoJTUSF34sbMF8OID33R_QOX_joMHyABuViARuXvz0AglWlnXLwWoJNug3JQqTiDRvAVuAiWIw0vJoMd6afzs4VZGaJigjz9sZfmTo6HHNurG5GqUGttJFRTHUYkEIHJRFOeFrhuMH48liZ9aquCUdjL7J57Yy_F59eWBcisF2g',
           'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
         }
       }
     );
     const jsonData = response.data.data.children;
     const postsArray = jsonData.map((post) => ({
       likes: post.data.ups,
       subreddit: post.data.subreddit
     }));
     setLikes(postsArray);

   } catch (error) {
     console.error("error is"+ error);
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
  const currentItems = campaigns.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
    {/* <Navbarr/> */}
    <Container>
      <Row>
        <Col xs={8} sm={8} md={12} lg={12}>
          

                <div className="ms-4 d-lg-flex d-xs-block">
                <div className="align-item-center"><h6>All Campaigns({campaigns.length})</h6></div>
                  {/* <div className="align-item-center"><h6>All Campaigns({campaigns.length})</h6></div> */}
                  <div className="d-flex">
                      {/* <input  style={{height:"25px"}} placeholder="Search by name &#x1F50D;"/> */}
                       <input style={{height:"25px"}}  type="text" placeholder="search for name &#x1F50D;" value={searchValue} onChange={handleSearch} />
                       
                  </div>
                    <div className="d-flex d-xs-justify-center d-xs-align-center">
                      <SortButton handleSort={handleSort} handleDateSort={handleDateSort}/>  

                    </div>
                </div>
        </Col> 
       
        <Col xs={8} sm={8} md={12} lg={12}>
          <div className="ms-4 d-lg-flex d-xs-block">
                       
          </div>
        </Col>

      </Row>

      <Row className="mainContainerAC mt-2">
        {posts.map((item) => {
          return (
            <Col xs={8} sm={8} md={2} lg={2} className="subContainerAC mx-1">
         <div>
         <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
           <img className="imageAC" src={item.image}/>
         </div>
         <div style={{display: 'flex',justifyContent:'space-between'}}>
            <div><p className='typeC' style={{backgroundColor: item.campaign_type === 'periodic' ? '#B47EE5' : 'green', }}>
                {item.campaign_type ? item.campaign_type : 'others'}</p>
            </div>
         <p className="hashtagAC">#{item.hashtag}</p>
        </div>
         <h6 className='nameAC'>{item.campaign_name.slice(0,30)}</h6>
         <p className='influencersAC'><People style={{height:"15px"}}/>{item.likes}</p>  
         <p className='dateC'>{item.created}</p>
         </div>
       </Col>
          );
        })}
        <Pagintation
        itemsPerPage={itemsPerPage}
        totalItems={15}
        // totalItems={campaigns.length}
        paginate={paginate}
      />
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


// const Pagintation = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
//     pageNumbers.push(i); //number of pages i.e 3
//   }
//   return (
//     <nav>
//       <ul className='pagination'>
//         {pageNumbers.map(number => (
//           <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
//             <a onClick={() => paginate(number)} href={currentPage} className='page-link'>
//               {number}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };


// const AllCampaigns = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [searchValue, setSearchValue] = useState('');
//   const [campaigns, setCampaigns] = useState([]);
  
//   // useEffect(() => {
//   //   axios
//   //     .get('http://127.0.0.1:8000/activecampaigns/')
//   //     .then((response) => {
//   //       setCampaigns(response.data);
//   //     })
//   //     .catch((error) => {
//   //       console.error(error);
//   //     });
//   // }, []);

//     useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           'https://oauth.reddit.com/r/apple/new.json?limit=100&fields=title',
//           {
//             headers: {
//               Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjgzODczNjkxLCJqdGkiOiIyNDQ5NTMxNzM4MjUzLWVtd3pzUTF0bU8wNDB0eTNUdWNFVXp6aHlSOEd2ZyIsImNpZCI6Ijc1OFlUT01OZ0U4UzA4MW5jSEJmNUEiLCJsaWQiOiJ0Ml92OWFyeTlvdCIsImFpZCI6InQyX3Y5YXJ5OW90IiwibGNhIjoxNjcyMjIzODM5MDAwLCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyJ9.w7nl8ztozL6pxxj-YJDN8eQbRmqkE5gxOJudvRkGcuPFGvQUJ9g4ZO2AI-XTyyNVvuhIlyzFqWIuuyKrfkMMxviG_7nhxwRNM531JB5wpCwmBQujK2Fuszo24m3lllMflBqZQJcuQh00YL0zKrjH9086mln0Njq0fYzl8cuInQOtgG4p7eebQ2pflk4b5M6OR5e0_PrZz0LI0d_YoDBzgjKMUO_y-UOguo1cH7pHcJ3-BJlFxFZq-wXd_kj7WPr8MiKYMDwIuu8721c2ePuFnoBt0Ve0rtQpxocMIo7kgmBttti5cTeU3u-TawmrW0Qdv25ltmSdybpP8l60A39srA',
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
//           created: post.created_utc
//         }));
//         setCampaigns(postsArray);
//         console.log(postsArray);

//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);



//   const handleSort = (order) => {
//     const sorted = [...campaigns].sort((a, b) =>
//       order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
//     );
//     setCampaigns(sorted);
//   };


//   const handleDateSort = (order) => {
//     const sorted = [...campaigns].sort((a, b) => {
//       const dateA = new Date(a.start_date);
//       const dateB = new Date(b.start_date);
//       return order === 'asc' ? dateA - dateB : dateB - dateA;
//     });
//     setCampaigns(sorted);
//   };
  

//   const handleSearch = (event) => {
//     const searchText = event.target.value;
//     setSearchValue(searchText);
//     let results = campaigns;
//     if (searchText) {
//       results = campaigns.filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase()));
//     }
//     setCampaigns(results);
//   }

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = campaigns.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = pageNumber => setCurrentPage(pageNumber);

//   return (
//     <div>
//     {/* <Navbarr/> */}
//     <Container>
//       <Row>
//         <Col xs={8} sm={8} md={12} lg={12}>
//           <div style={{display:"flex"}}><ArrowBack/>
//           <h5 className='campaignHeaderAC' >Campaigns</h5></div>

//                 <div className="ms-4 d-lg-flex d-xs-block">
//                   <div className="align-item-center"><h6>All Campaigns({campaigns.length})</h6></div>
//                   <div className="d-flex">
//                       {/* <input  style={{height:"25px"}} placeholder="Search by name &#x1F50D;"/> */}
//                        <input style={{height:"25px"}}  type="text" placeholder="search for name &#x1F50D;" value={searchValue} onChange={handleSearch} />
//                         <a href='/BMNewCampaign'>
//                         <Button style={{backgroundColor:'#452c63', height:'30px', marginLeft:'5px'}}>
//                           <div style={{marginTop:"-6px"}}>
//                             Create<AddIcon style={{fontSize:"12px",height:"25px"}}/>
//                           </div>
//                         </Button></a>
//                          <a href='/BMInactiveCampaigns'>
//                          <Button style={{backgroundColor:'#452c63', height:'30px', marginLeft:'5px'}}>
//                           <div style={{marginTop:"-6px"}}>
//                             <p>Inactive campaigns</p>
//                           </div>
//                         </Button></a>
//                   </div>
//                     <div className="d-flex d-xs-justify-center d-xs-align-center">
//                       <SortButton handleSort={handleSort} handleDateSort={handleDateSort}/>  
//                       <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><ArrowDropDown style={{fontSize:"12px",height:"25px"}} />To</button>
//                       <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><ArrowDropDown style={{fontSize:"12px",height:"25px"}} />From</button>
//                     </div>
//                 </div>
//         </Col> 
       
//         <Col xs={8} sm={8} md={12} lg={12}>
//           <div className="ms-4 d-lg-flex d-xs-block">
                       
//           </div>
//         </Col>

//       </Row>

//       <Row className="mainContainerAC mt-2">
//         {campaigns.map((item) => {
//           return (
//             <Col xs={8} sm={8} md={2} lg={2} className="subContainerAC mx-1">
//          <div>
//          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
//            <img className="imageAC" src={`http://127.0.0.1:8000/${item.image}`} />
//          </div>
//          <div style={{display: 'flex',justifyContent:'space-between'}}>
//          <p className='typeAC' style={{ backgroundColor: item.campaign_type === "Single" ? "#B47EE5" : "green" }}>{item.campaign_type}</p>

//          <p className="hashtagAC">#{item.hashtag_campaign}</p>
//         </div>
//          <h3 className='nameAC'>{item.name}</h3>
//          {/* <p className='influencersAC'>{item.influencers}</p> */}
//          <p className='influencersAC'><People style={{height:"15px"}}/>{item.influencers.length}</p>   
//          {/* <p className='dateAC'>{item.start_date}</p> */}
//          <p className='dateC'>{new Date(item.start_date).toLocaleDateString()}</p>
//          </div>
//        </Col>
//           );
//         })}
//         <Pagintation
//         itemsPerPage={itemsPerPage}
//         totalItems={campaigns.length}
//         paginate={paginate}
//       />
//       </Row>
//     </Container>
//     </div>
//   );
// };

// const SortButton = ({ handleSort, handleDateSort }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSortOrder = (order) => {
//     handleSort(order);
//     setIsOpen(false);
//   };

//   const handleDateSortOrder = (order) => {
//     handleDateSort(order)
//     setIsOpen(false);
//   };


//   return (
//     <div className="dropdown">
//        <button
//               type="button"
//               className="btn btn-outline-dark d-flex align-items-center dropdown-toggle" onClick={toggleDropdown}
//               data-mdb-ripple-color="dark"
//               style={{ fontSize: '12px', height: '25px' }}>
//               <FilterList style={{ marginRight: "5px", fontSize: "12px", height: "25px" }} />
//                Filter
//             </button>
//       <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
//         <button className="dropdown-item" onClick={() => handleSortOrder('asc')}>
//           Ascending
//         </button>
//         <button className="dropdown-item" onClick={() => handleSortOrder('desc')}>
//           Descending
//         </button>
//         <button className="dropdown-item" onClick={() => handleDateSortOrder('asc')}>
//           Ascending Date
//         </button>
//         <button className="dropdown-item" onClick={() => handleDateSortOrder('desc')}>
//           Descending Date
//         </button>

//       </div>
//     </div>
//   );
// };


// export default AllCampaigns;


//not needed 
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////

// import axios from "axios"
// import React,{useEffect, useState} from 'react';
// import { Container, Row, Col, Button } from 'react-bootstrap';
// import AddIcon from '@mui/icons-material/Add';
// import '../../../Style/BrandManagerPanel/AllCampaigns/AllCampaigns.css';
// import { ArrowBack, Search, FilterList, ArrowDropDown } from '@material-ui/icons';
// import Test from "../../../Test";

// const Pagintation = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
//   const pageNumbers = [];
//   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
//     pageNumbers.push(i); //number of pages i.e 3
//   }
//   return (
//     <nav>
//       <ul className='pagination'>
//         {pageNumbers.map(number => (
//           <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
//             <a onClick={() => paginate(number)} href={currentPage} className='page-link'>
//               {number}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// const AllCampaigns = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [searchValue, setSearchValue] = useState('');
//   const [campaigns, setCampaigns] = useState([]);

//     console.log(campaigns);
//       useEffect(() => {
//       axios.get('http://127.0.0.1:8000/campaigns/')
//         .then(response => {
//           setCampaigns(response.data);
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     }, []);
  

//     const handleSearch = (event) => {
//       const searchText = event.target.value;
//       setSearchValue(searchText);
//       let results = campaigns;
//       if (searchText) {
//         results = campaigns.filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase()));
//       }
//       setCampaigns(results);
//     }
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = campaigns.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = pageNumber => setCurrentPage(pageNumber);

//   return (
//     <Container>
//       <Row>
//           <Col xs={8} sm={8} md={12} lg={12}>
//           <div style={{display:"flex"}}><ArrowBack/>
//           <h5 className='campaignHeaderAC' >CAMPAIGNSss</h5></div>

//                 <div className="ms-4 d-lg-flex d-xs-block">
//                   <div className="align-item-center"><h6>All Campaigns({campaigns.length})</h6></div>
//                   <div className="d-flex">
//                       {/* <input  style={{height:"25px"}} placeholder="Search by name &#x1F50D;"/> */}
//                        <input style={{height:"25px"}}  type="text" placeholder="search for name &#x1F50D;" value={searchValue} onChange={handleSearch} />
//                         <a href='/BMNewCampaign'>
//                         <Button style={{backgroundColor:'#452c63', height:'30px', marginLeft:'5px'}}>
//                           <div style={{marginTop:"-6px"}}>
//                             Create<AddIcon style={{fontSize:"12px",height:"25px"}}/>
//                           </div>
//                         </Button></a>
//                          <a href='/BMInactiveCampaigns'>
//                          <Button style={{backgroundColor:'#452c63', height:'30px', marginLeft:'5px'}}>
//                           <div style={{marginTop:"-6px"}}>
//                             <p>Inactive campaigns</p>
//                           </div>
//                         </Button></a>
//                   </div>
//                     <div className="d-flex d-xs-justify-center d-xs-align-center">
//                       <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}>
//                         <FilterList style={{fontSize:"12px",height:"25px"}} /><FilteredList/></button>
                        
//                       <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><ArrowDropDown style={{fontSize:"12px",height:"25px"}} />To</button>
//                       <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><ArrowDropDown style={{fontSize:"12px",height:"25px"}} />From</button>
//                     </div>
//                 </div>
//         </Col> 

//     <Row className="mainContainerAC">
//     {currentItems.map(item => {
//     return (
//       <Col xs={8} sm={8} md={2} lg={2} className="subContainerAC mx-1">
//         <div>
//         <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
//           <img className="imageAC" src={`http://127.0.0.1:8000/${item.image}`} />
//         </div>
//         <div style={{display: 'flex',justifyContent:'space-between'}}>
//         <p className='typeAC'>{item.campaign_type}</p>
//         <p className="hashtagAC">{item.hashtag_campaign}</p>
//         </div>
//         <h3 className='nameAC'>{item.name}</h3>
//         <p className='influencersAC'>{item.influencers}</p>
//         <p className='dateAC'>{item.start_date}</p>
//         </div>
//       </Col>
//     )})}
    
//     <Pagintation
//         itemsPerPage={itemsPerPage}
//         totalItems={campaigns.length}
//         paginate={paginate}
//       />
//       </Row>
//     </Row>
//   </Container>     
//   );
// };

// const SortButton = ({ handleSort }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleSortOrder = (order) => {
//     handleSort(order);
//     setIsOpen(false);
//   };

//   return (
//     <div className="dropdown">
//       <button className="btn btn-secondary dropdown-toggle" onClick={toggleDropdown}>
//         Filter
//       </button>
//       <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
//         <button className="dropdown-item" onClick={() => handleSortOrder('asc')}>
//           Ascending
//         </button>
//         <button className="dropdown-item" onClick={() => handleSortOrder('desc')}>
//           Descending
//         </button>
//       </div>
//     </div>
//   );
// };

// const FilteredList = () => {
//   const [sortedNames, setSortedNames] = useState([]);
//   const [sortOrder, setSortOrder] = useState('asc');

//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/campaigns/')
//       .then(response => {
//         setSortedNames(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   useEffect(() => {
//     const sorted = [...sortedNames].sort((a, b) =>
//       sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
//     );
//     setSortedNames(sorted);
//   }, [sortOrder]);

//   const handleSort = (order) => {
//     setSortOrder(order);
//   };

//   return (
//     <div>
//       <SortButton handleSort={handleSort} />
//       <ul>
//         {sortedNames.map((name) => (
//           <li key={name.id}>{name.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AllCampaigns;

