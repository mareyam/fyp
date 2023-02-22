import React,{useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import RegisteredInfluencersList from './RegisteredInfluencersList';
import AddIcon from '@mui/icons-material/Add';
import "../../../Style/BrandManagerPanel/AllCampaigns/AllCampaigns.css"
import { ArrowBack, Search, FilterList, ArrowDropDown } from '@material-ui/icons';
import Card from 'react-bootstrap/Card';
import LaunchIcon from '@mui/icons-material/Launch';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

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
  const [itemsPerPage] = useState(10);
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
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Container >
      <Row>
          <Col xs={8} sm={8} md={12} lg={12}>
          <div style={{display:"flex"}}><ArrowBack/>
          <h5 className='campaignHeaderAC' >CAMPAIGNS</h5></div>

                <div className="ms-4 d-lg-flex d-xs-block" >
                  <div className="align-item-center"><h6>All Campaigns({RegisteredInfluencersList.length})</h6></div>
                  <div className="d-flex">
                      <input  style={{height:"25px"}} placeholder="Search by name &#x1F50D;"/>
                      <a href="/BMCompare" style={{textDecoration:"none"}}><button 
                        type="button" 
                        className="btn btn-dark d-flex align-items-center" 
                        data-mdb-ripple-color="dark" 
                        style={{fontSize:"12px",height:"25px"}}><CompareArrowsIcon style={{fontSize:"15px",height:"25px"}}/>Compare</button></a>
                  </div>
                  <div className="d-flex d-xs-justify-center d-xs-align-center">
                      <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><FilterList style={{fontSize:"12px",height:"25px"}} />Filter</button>
                      <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><ArrowDropDown style={{fontSize:"12px",height:"25px"}} />To</button>
                      <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><ArrowDropDown style={{fontSize:"12px",height:"25px"}} />From</button>
                  </div>
                </div>
        </Col> 

    <Row className="mainContainerARI ms-4">
    {currentItems.map(item => {
    return (
      <Col xs={8} sm={8} md={2} lg={2} className="subContainerARI mx-3 my-3">
      <Card style={{ height: "100%", width:"200px"}}>
        <Card.Img style={{height:"150px", width:"100%", objectFit:"cover"}} className="CardImg" src={item.image} />
        <Card.Body className="d-flex flex-column">
          <Card.Text className="d-flex flex-column align-items-center justify-content-center text-center flex-grow-1" style={{ fontFamily: 'Oswald' }}>
            <h6 style={{ fontWeight: "bolder", fontSize: "20px" }}>{item.name}</h6>
            <p style={{fontSize: '13px'}}>@{item.userName}</p>
            <p style={{ fontSize: "15px", marginTop:"-10px" }}>{item.followers}K</p>
            <button type="button" className="btn btn-dark d-flex align-items-center justify-content-center" data-mdb-ripple-color="dark" style={{ marginTop:"-10px", fontSize: "12px", height: "35px", width: '100%' }}>
              <p style={{ fontSize: '12px', margin: '0px' }}>Instagram Link</p>
              <LaunchIcon style={{ fontSize: "12px", height: "25px" }} />
            </button>
          </Card.Text>
        </Card.Body>
      </Card>

    </Col>
    )})}
    
    <AllCampaigns
        itemsPerPage={itemsPerPage}
        totalItems={filteredResults.length}
        paginate={paginate}
      />
      </Row></Row>
  </Container>     
  );
};

export default Pagintation;

