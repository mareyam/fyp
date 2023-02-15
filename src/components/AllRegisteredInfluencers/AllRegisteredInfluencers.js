import React,{useState} from 'react';
import RegisteredInfluencersList from "../../components/brandManagerDashboard/RegisteredInfluencers/RegisteredInfluencersList";
import { Container, Row, Col } from 'react-grid-system';
import "../../Style/AllRegisteredInfluencers/AllRegisteredInfluencers.css";


const AllRegisteredInfluencers = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
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
  const [itemsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [filteredResults, setFilteredResults] = useState(RegisteredInfluencersList);
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (event) => {
      const searchText = event.target.value;
      setSearchValue(searchText);
      let results = RegisteredInfluencersList;
      if (searchText) {
        results = RegisteredInfluencersList.filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase()));
      }
      setFilteredResults(results);
    }
  const paginate = pageNumber => setCurrentPage(pageNumber);
 
  return (
    <Container className="">
      {/* row and container same occupt */}
      <Row className="mt-1">
        <Col xs={7} sm={7} md={12} lg={12} >
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <div>
                <h6>Registred Inflencers ({RegisteredInfluencersList.length})</h6>
              </div>
              <div style={{display:"flex"}}>
                <input style={{height:"25px"}} placeholder="Search by name" type="text" value={searchValue} onChange={handleSearch}></input>
                <p style={{fontSize:"13px"}}>Filters</p>
              </div>
            </div>
      
        </Col>
        {currentItems.map(item => {
              return (
                // cards below
          <Col xs={12} sm={12} md={5} lg={2} className="subContainerARI mx-2">
              <div className='subContainer2ARI'>
                <div className='subContainer3ARI'><img className="imageARI" src={item.image}/></div>
                  <div className='' style={{textAlign:"center"}}>
                    <h3 className='nameARI'>{item.name}</h3>
                    <p className='usernameARI'>{item.userName}</p>
                    <p className="followersARI">{item.followers}K</p>
                 </div>
              </div>
          </Col>
        )})}
    </Row>
    <AllRegisteredInfluencers
        itemsPerPage={itemsPerPage}
        totalItems={filteredResults.length}
        paginate={paginate}
      />
    </Container>
  );
}

export default Pagintation;


// import React,{useState} from 'react';
// import RegisteredInfluencersList from '../brandManagerDashboard/RegisteredInfluencers/RegisteredInfluencersList';
// import { Search } from '@material-ui/icons';
// import '../../Style/brandManagerDashboard/registeredInfluencers.css'
// import { Container, Row, Col } from 'react-grid-system';
// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { CardActionArea } from '@mui/material';


// const AllRegisteredInfluencers = () => {
//   const [searchValue, setSearchValue] = useState('');
//   const [filteredResults, setFilteredResults] = useState(RegisteredInfluencersList);
  
//   const handleSearch = (event) => {
//   setSearchValue(event.target.value);
//   let results;
//   if (searchValue === '') {
//     results = RegisteredInfluencersList;
//   } else {
//     results = RegisteredInfluencersList.filter((campaign) => campaign.name.includes(searchValue));
//   }
//   setFilteredResults(results);
//   }


 
//   return (
//     <Container className='mainContainerRI mx-2'>
//   <Row>
//     <Col xs={7} sm={7} md={12} lg={12}>
//       <div style={{display:"flex"}}><h6 style={{marginRight:"10px"}}>Registred Inflencers ({RegisteredInfluencersList.length})</h6>
//       <p style={{fontSize:"13px"}}>View all</p>
//       <p className="mx-2" style={{fontSize:"13px"}}>Filters</p>
//       <input style={{height:"25px"}} placeholder="Search by name" type="text" value={searchValue} onChange={handleSearch}></input></div>
//     </Col>
//       <div><p style={{fontSize:"12px"}}>List of influencers registered with you</p></div>
//   </Row>
//   <Row>
//     {filteredResults.map(item => (
//       <Col xs={5} sm={5} md={5} lg={3} className="subContainerRI m-1">
//         <div className='my-2'><img className="imageRI" src={item.image}/></div>
//         <div className='my-2'>
//           <h3 className='nameRI'>{item.name}</h3>
//           <p className='usernameRI'>{item.hashtag}</p>
//           <p className='detailsRI'>{item.type}</p>
//         </div>
//       </Col>
//     ))}
//   </Row>
// </Container>
//     );
// }

// export default AllRegisteredInfluencers;
