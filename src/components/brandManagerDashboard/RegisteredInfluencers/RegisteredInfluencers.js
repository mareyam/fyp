// import React,{useState} from 'react';
// import { Container, Row, Col, Button } from 'react-bootstrap';
// import RegisteredInfluencersList from '../RegisteredInfluencers/RegisteredInfluencersList';
// import AddIcon from '@material-ui/icons/Add';
// import "../../Style/AllRegisteredInfluencers/AllRegisteredInfluencers.css";
// import { ArrowBack, Search } from '@material-ui/icons';
// import "../../../Style/AllRegisteredInfluencers/AllRegisteredInfluencers.css"


// const AllCampaigns = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
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
//   const [filteredResults, setFilteredResults] = useState(RegisteredInfluencersList);
//   const handleSearch = (event) => {
//     setSearchValue(event.target.value);
//     let results;
//     if (searchValue === '') {
//     results = filteredResults;
//     } else {
//     results = filteredResults.filter((campaign) => campaign.name.includes(searchValue));
//     }
//     setFilteredResults(results);
//     }

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = pageNumber => setCurrentPage(pageNumber);

//   return (
//       <Container >
//    {/* <h5>DashBoard</h5> */}
//    <Row>
//        <Col xs={6} sm={6} md={6} lg={6}>
//         <div  style={{display:"flex"}}>
//             <div className="d-flex">
//             <a href='/BMDashboard'><ArrowBack/></a> 
//               <h6 className="">Active Campaigns</h6><input type="text" placeholder="search for campaign" value={searchValue} onChange={handleSearch} />
//               <Button>
//                 <div style={{marginTop:"-6px"}}>
//                   <AddIcon style={{fontSize:"15px"}}/>
//                 </div>
//               </Button>
//             </div>
//             <div>
//               <p>filter</p>
//             </div>
//         </div>
//         </Col>
//     </Row>
//     <Row className="mainContainerAC">
//     {currentItems.map(item => {
//     return (
//        <Col xs={8} sm={8} md={2} lg={2} className="subContainerAC mx-1 my-1">
//          <div>
//          <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}><img className="imageAC" src={item.image}/></div>
//          <div style={{display: 'flex',justifyContent:'space-between'}}>
//         <p className='typeAC'>{item.type}</p>
//         <p className="hashtagAC">{item.hashtag}</p>
//          </div>
//          <h3 className='nameAC'>{item.name}</h3>
//          <p className='influencersAC'>{item.influencers}</p>
//          <p className='dateAC'>{item.startDate}</p>
//          </div>
//        </Col> 
//     )})}
//           <div className='mainContainerRI' style={{border:"2px solid red"}}>
//    <Row>
//      <Col xs={12} sm={12} md={12} lg={12}>
//        <a href='/BMDashboard'><ArrowBack/></a> 
//        <div><h6>Registred Inflencers ({RegisteredInfluencersList.length})</h6></div>
//        <div style={{display:"flex", border:"2px solid red"}}>
//          <h6>Search</h6><input className='' style={{height:"25px"}} placeholder="Search by name" type="text" value={searchValue} onChange={handleSearch}></input>
//         <div className="mx-5" style={{border:"2px solid green", display:"flex"}}><p style={{fontSize:"13px"}}>View all</p>
//          <p className="" style={{fontSize:"13px"}}>Filters</p></div>
//        </div>
//      </Col>
//        <div><p style={{fontSize:"12px"}}></p></div>
//   </Row>
//   <Row>
//      {filteredResults.map(item => (
//        <Col xs={5} sm={5} md={5} lg={3} className="subContainerRI m-1">
//          <div className='my-2'><img className="imageRI" src={item.image}/></div>
//          <div className='my-2'>
//            <h3 className='nameRI'>{item.name}</h3>
//            <p className='usernameRI'>{item.hashtag}</p>
//            <p className='detailsRI'>{item.type}</p>
//          </div>
//        </Col>
//      ))}
//    </Row>
//       </div>
//     </Row>
//     <AllCampaigns
//         itemsPerPage={itemsPerPage}
//         totalItems={filteredResults.length}
//         paginate={paginate}
//       />
//   </Container>
//   );
// };

// export default Pagintation;

import React,{useState} from 'react';
import RegisteredInfluencersList from "./RegisteredInfluencersList";
import { Grid } from '@material-ui/core';
import { ArrowBack, Search } from '@material-ui/icons';
import '../../../Style/brandManagerDashboard/registeredInfluencers.css';
import { Container, Row, Col } from 'react-grid-system';
import { Diversity1Rounded } from '@mui/icons-material';


const RegisteredInfluencers = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredResults, setFilteredResults] = useState(RegisteredInfluencersList);
  


  const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchValue(searchText);
    let results = RegisteredInfluencersList;
    if (searchText) {
      results = RegisteredInfluencersList.filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase()));
    }
    setFilteredResults(results);
  }

  return (
    <div className='mainContainerRI' style={{border:"1px solid rgb(198, 198, 198)"}}>
  <Row>
    <Col xs={12} sm={12} md={12} lg={12}>
      <a href='/BMDashboard'></a> 
      <div style={{display:"flex"}}>
        <h6>Registred Inflencers ({RegisteredInfluencersList.length})</h6>
        <input className='' style={{height:"25px"}} placeholder="Search by name" type="text" value={searchValue} onChange={handleSearch}></input>
        <div className="" style={{display:"flex"}}><p style={{fontSize:"13px"}}>View all</p>
        <p className="" style={{fontSize:"13px"}}>Filters</p></div>
      </div>
    </Col>
      <div><p style={{fontSize:"12px"}}></p></div>
  </Row>
  <Row>
    {filteredResults.map(item => (
      <Col xs={5} sm={5} md={5} lg={3} className="subContainerRI m-1">
        <div className='my-2'><img className="imageRI" src={item.image}/></div>
        <div className='my-2'>
          <p className='nameRI'>{item.name}</p>
          <p className='usernameRI'>{item.hashtag}</p>
          {/* <p className='detailsRI'>{item.type}</p> */}
        </div>
      </Col>
    ))}
  </Row>
</div>

    );
}

export default RegisteredInfluencers;
















    // <div style={{margin: '5%'}}>
    // <div className="mainContainerRI" style={{display: 'flex', flexWrap: "nowrap", border: "2px solid red"}}>
        
    //   {RegisteredInfluencersList.map(item => {
    //     return (
    //         <div className="subContainerRI" >
    //             <div><img className="imageRI" src={item.image}/></div>
    //             <div>
    //                 <h3 className='nameRI'>{item.name}</h3>
    //                 <p className='usernameRI'>{item.hashtag}</p>
    //                 <p className='detailsRI'>{item.type}</p>
    //             </div>
    //         </div>
    //     )})}
    // </div>
    // </div>

      // <div className='container mx-2'>
    //   <div style={{display:"flex"}}>
    //     <div>
    //       <h6 style={{marginRight:"10px"}}>Registred Inflencers ({RegisteredInfluencersList.length})</h6>
    //       {/* <p style={{fontSize:"12px"}}>List of influencers registered with you</p> */}
    //     </div>
    //     {/* <Search style={{fontSize:"20px"}}className="mx-3"/> */}
    //     <input style={{height:"25px"}} type="text" value={searchValue} onChange={handleSearch}></input>
    //     <p style={{fontSize:"13px"}}>View all</p>
    //     <p className="mx-2" style={{fontSize:"13px"}}>Filters</p> 
    //   </div>
    //   <Grid item xs={12} container spacing={2} className="mainContainerRI">
    //    {filteredResults.map(item => {
    //     return (
    //       <Grid className="subContainerRI m-1" item lg={6} xs={12}>
    //             <div><img className="imageRI" src={item.image}/></div>
    //             <div>
    //                 <h3 className='nameRI'>{item.name}</h3>
    //                 <p className='usernameRI'>{item.hashtag}</p>
    //                 <p className='detailsRI'>{item.type}</p>
    //             </div>
    //       </Grid>
    //     )})}
    //   </Grid>
    // </div>
