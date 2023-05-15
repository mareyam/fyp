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
  
  // useEffect(() => {
  //   axios
  //     .get('http://127.0.0.1:8000/activecampaigns/')
  //     .then((response) => {
  //       setCampaigns(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://oauth.reddit.com/r/apple/new.json?limit=100&fields=title',
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
          likes: post.data.ups,
          comments: post.data.num_comments,
          author: post.author,
          up: post.data.ups,
          down: post.data.downs,
          date: new Date(post.data.created_utc * 1000).toLocaleString(),
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



  const handleSort = (order) => {
    const sorted = [...campaigns].sort((a, b) =>
      order === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    );
    setCampaigns(sorted);
  };


  const handleDateSort = (order) => {
    const sorted = [...campaigns].sort((a, b) => {
      const dateA = new Date(a.created).toLocaleDateString('en-GB');
      const dateB = new Date(b.created).toLocaleDateString('en-GB');
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
    <Container className='mt-3'>
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
       
      </Row>

      <Row className="mainContainerAC mt-2">
        {currentItems.map((item) => {
          return (
            <Col xs={8} sm={8} md={2} lg={2} className="subContainerAC mx-1">
         <div>
         <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
         <img className="imageAC" src={item.image ? item.image : 'https://i.pinimg.com/736x/10/a9/1b/10a91b37c6e5efb1cb18cebb1b4077ac.jpg'} />
         </div>
         <div style={{display: 'flex',justifyContent:'space-between'}}>

         <div> <p className='typeAC' style={{backgroundColor: item.postType === 'link' ? '#B47EE5' : 'green', }}>
             {item.postType ? item.postType : 'others'}</p>
         </div>

     
         <p className="hashtagAC">#{item.subreddit}</p>
        </div>
         <h3 className='nameAC'>{item.title.slice(0,30)}...</h3>
         <p className='influencersAC'><People style={{height:"15px"}}/>{item.up}</p>  
         <p className='dateC'>{item.date}</p>
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

