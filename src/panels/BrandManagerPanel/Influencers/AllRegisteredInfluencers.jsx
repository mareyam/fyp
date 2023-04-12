import axios from "axios";
import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import "../../../Style/BrandManagerPanel/AllCampaigns/AllCampaigns.css"
import { ArrowBack, Search, FilterList, ArrowDropDown } from '@material-ui/icons';
import Card from 'react-bootstrap/Card';
import LaunchIcon from '@mui/icons-material/Launch';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import Filters from './Filters';

const AllCampaigns = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
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

const Pagintation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchValue, setSearchValue] = useState('');
  const [influencers, setInfluencers] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/influencers/')
      .then(response => {
        setInfluencers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


    const handleSearch = (event) => {
      const searchText = event.target.value;
      setSearchValue(searchText);
      let results = influencers;
      if (searchText) {
        results = influencers.filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase()));
      }
      setInfluencers(results);
    }


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = influencers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Container >
      <Row>
         <Col xs={8} sm={8} md={12} lg={2}>
          <div >
            <h3 style={{textAlign:'center'}}>Filters</h3>
            <Filters/>
          </div>
          </Col>
          <Col xs={8} sm={8} md={12} lg={10}>
        

                

                <Row className="mainContainerARI ms-4">
                <div style={{display:"flex"}}><ArrowBack/>
                <h3 className='campaignHeaderAC' >Campaigns</h3></div>
                <div className="ms-4 d-lg-flex d-xs-block" >
                  <div className="align-item-center"><h6>All Campaigns({influencers.length})</h6></div>
                  <div className="d-flex">
                      <input  style={{height:"25px"}} placeholder="Search by name &#x1F50D;"/>
                      <Button style={{backgroundColor:'#452c63',fontSize:"12px",height:"25px", marginLeft:'5px'}}>
                        <div style={{marginTop:"-6px"}}>
                          <a href="/BMCompare" className="mx-3" style={{display: 'block', textDecoration:'none'}}>
                            <p>Compare<CompareArrowsIcon style={{fontSize:"15px",height:"25px"}}/></p>
                          </a>
                        </div>
                      </Button>
                    </div>
                    <div className="d-flex d-xs-justify-center d-xs-align-center">
                      <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><FilterList style={{fontSize:"12px",height:"25px"}} />Filter</button>
                      <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><ArrowDropDown style={{fontSize:"12px",height:"25px"}} />To</button>
                      <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><ArrowDropDown style={{fontSize:"12px",height:"25px"}} />From</button>
                    </div>
                </div>
                  {currentItems.map(item => {
                  return (
                    <Col xs={8} sm={8} md={2} lg={2} className="subContainerARI mx-3 my-3">
                    <Card style={{ height: "100%", width:"200px"}}>
                      <Card.Img style={{height:"150px", width:"100%", objectFit:"cover"}} className="CardImg" src={`http://127.0.0.1:8000/${item.image}`} />
                      
                      <Card.Body className="d-flex flex-column">
                        <Card.Text className="d-flex flex-column align-items-center justify-content-center text-center flex-grow-1" style={{ fontFamily: 'Oswald' }}>
                          <h6 style={{ fontWeight: "bolder", fontSize: "20px" }}>{item.influencer_full_name}</h6>
                          <p style={{fontSize: '13px'}}>@{item.influencer_username}</p>
                          <p style={{ fontSize: "15px", marginTop:"-10px" }}>{item.influencerFollowerCount}K</p>
                          <a href='instagram.com'>
                          <button type="button" className="btn btn-dark d-flex align-items-center justify-content-center" data-mdb-ripple-color="dark" style={{ marginTop:"-10px", fontSize: "12px", height: "35px", width: '100%' }}>
                            <p style={{ fontSize: '12px', margin: '0px' }}>Instagram Link</p>
                            <LaunchIcon style={{ fontSize: "12px", height: "25px" }} />
                          </button></a>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  )})}
                  
              <AllCampaigns
                  itemsPerPage={itemsPerPage}
                  totalItems={influencers.length}
                  paginate={paginate}
                />
           </Row>
         </Col> 
      </Row>
  </Container>     
  );
};

export default Pagintation;




//bootstrap card componentn
{/* <Card >
        <Card.Img variant="top" src={item.image} />
        <Card.Body>
          <Card.Text className="align-items-center justify-content-center text-center" style={{fontFamily: 'Oswald'}}>
            <h6 style={{fontWeight:"bolder", fontSize:"20px"}}>{item.name}</h6>
            <p>{item.userName}</p>
            <p style={{fontSize:"15px"}}>{item.followers}K</p>
          </Card.Text>
            <button type="button" className="btn btn-dark d-flex align-items-center justify-content-center" data-mdb-ripple-color="dark" style={{fontSize: "12px", height: "35px", width: '100%'}}>
              <p style={{fontSize: '12px', margin: '0px'}}>Instagram Link</p>
              <LaunchIcon style={{fontSize:"12px",height:"25px"}}/>
            </button>
        </Card.Body>
      </Card>

       */}






















       // import React,{useState} from 'react';
// import influencers from "../../components/brandManagerDashboard/RegisteredInfluencers/influencers";
// import { Container, Row, Col } from 'react-grid-system';
// import "../../Style/AllRegisteredInfluencers/AllRegisteredInfluencers.css";


// const AllRegisteredInfluencers = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
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


// const Pagintation = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [searchValue, setSearchValue] = useState('');
//   const [influencers, setFilteredResults] = useState(influencers);
  
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = influencers.slice(indexOfFirstItem, indexOfLastItem);

//   const handleSearch = (event) => {
//       const searchText = event.target.value;
//       setSearchValue(searchText);
//       let results = influencers;
//       if (searchText) {
//         results = influencers.filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase()));
//       }
//       setFilteredResults(results);
//     }
//   const paginate = pageNumber => setCurrentPage(pageNumber);
 
//   return (
//     <Container className="">
//       {/* row and container same occupt */}
//       <Row className="mt-1">
//         <Col xs={7} sm={7} md={12} lg={12} >
//             <div style={{display: "flex", justifyContent: "space-between"}}>
//               <div>
//                 <h6>Registred Inflencers ({influencers.length})</h6>
//               </div>
//               <div style={{display:"flex"}}>
//                 <input style={{height:"25px"}} placeholder="Search by name" type="text" value={searchValue} onChange={handleSearch}></input>
//                 <p style={{fontSize:"13px"}}>Filters</p>
//               </div>
//             </div>
      
//         </Col>
//         {currentItems.map(item => {
//               return (
//                 // cards below
//           <Col xs={12} sm={12} md={5} lg={2} className="subContainerARI mx-2">
//               <div className='subContainer2ARI'>
//                 <div className='subContainer3ARI'><img className="imageARI" src={item.image}/></div>
//                   <div className='' style={{textAlign:"center"}}>
//                     <h3 className='nameARI'>{item.name}</h3>
//                     <p className='usernameARI'>{item.userName}</p>
//                     <p className="followersARI">{item.followers}K</p>
//                  </div>
//               </div>
//           </Col>
//         )})}
//     </Row>
//     <AllRegisteredInfluencers
//         itemsPerPage={itemsPerPage}
//         totalItems={influencers.length}
//         paginate={paginate}
//       />
//     </Container>
//   );
// }

// export default Pagintation;