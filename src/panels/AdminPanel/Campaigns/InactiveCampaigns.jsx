import axios from "axios"
import React,{useEffect, useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import '../../../Style/BrandManagerPanel/AllCampaigns/AllCampaigns.css';
import { ArrowBack, Search, FilterList, ArrowDropDown } from '@material-ui/icons';
import { Home, People } from '@mui/icons-material';
import Test from "../../../Test";

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


const InactiveCampaigns = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [campaigns, setCampaigns] = useState([]);
  
  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/inactivecampaigns/')
      .then((response) => {
        setCampaigns(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSort = (order) => {
    const sorted = [...campaigns].sort((a, b) =>
      order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setCampaigns(sorted);
  };


  const handleDateSort = (order) => {
    const sorted = [...campaigns].sort((a, b) => {
      const dateA = new Date(a.start_date);
      const dateB = new Date(b.start_date);
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setCampaigns(sorted);
  };
  

  const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchValue(searchText);
    let results = campaigns;
    if (searchText) {
      results = campaigns.filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase()));
    }
    setCampaigns(results);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = campaigns.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Container className='mt-3'>
      <Row>
        <Col xs={8} sm={8} md={12} lg={12}>
          {/* <div style={{display:"flex"}}><ArrowBack/>
          <h5 className='campaignHeaderAC' >Campaigns</h5></div> */}

                <div className="ms-4 d-lg-flex d-xs-block">
                  <div className="align-item-center"><h6>All Campaigns({campaigns.length})</h6></div>
                  <div className="d-flex">
                      {/* <input  style={{height:"25px"}} placeholder="Search by name &#x1F50D;"/> */}
                       <input style={{height:"25px"}}  type="text" placeholder="search for name &#x1F50D;" value={searchValue} onChange={handleSearch} />
                         <a href='/BMAllCampaigns'>
                         <Button style={{backgroundColor:'#452c63', height:'28px', marginLeft:'5px'}}>
                          <div style={{marginTop:"-6px"}}>
                            <p>Active campaigns</p>
                          </div>
                        </Button></a>
                  </div>
                    <div className="d-flex d-xs-justify-center d-xs-align-center">
                      <SortButton handleSort={handleSort} handleDateSort={handleDateSort}/>  
                      <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><ArrowDropDown style={{fontSize:"12px",height:"25px"}} />To</button>
                      <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><ArrowDropDown style={{fontSize:"12px",height:"25px"}} />From</button>
                    </div>
                </div>
        </Col> 
       
        <Col xs={8} sm={8} md={12} lg={12}>
          <div className="ms-4 d-lg-flex d-xs-block">
                       
          </div>
        </Col>

      </Row>

      <Row className="mainContainerAC mt-2">
        {campaigns.map((item) => {
          return (
            <Col xs={8} sm={8} md={2} lg={2} className="subContainerAC mx-1">
         <div>
         <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
           <img className="imageAC" src={`http://127.0.0.1:8000/${item.image}`} />
         </div>
         <div style={{display: 'flex',justifyContent:'space-between'}}>
         <p className='typeAC' style={{ backgroundColor: item.campaign_type === "Single" ? "#B47EE5" : "green" }}>{item.campaign_type}</p>

         <p className="hashtagAC">#{item.hashtag_campaign}</p>
        </div>
         <h3 className='nameAC'>{item.name}</h3>
         {/* <p className='influencersAC'>{item.influencers}</p> */}
         <p className='influencersAC'><People style={{height:"15px"}}/>{item.influencers.length}</p>   
         {/* <p className='dateAC'>{item.start_date}</p> */}
         <p className='dateC'>{new Date(item.start_date).toLocaleDateString()}</p>
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


export default InactiveCampaigns;




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

