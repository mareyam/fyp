import axios from "axios"
import React,{useEffect, useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import '../../../Style/BrandManagerPanel/AllCampaigns/AllCampaigns.css';
import { ArrowBack, Search, FilterList, ArrowDropDown } from '@material-ui/icons';


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

    console.log(campaigns);
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
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = campaigns.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Container>
      <Row>
          <Col xs={8} sm={8} md={12} lg={12}>
          <div style={{display:"flex"}}><ArrowBack/>
          <h5 className='campaignHeaderAC' >CAMPAIGNS</h5></div>

                <div className="ms-4 d-lg-flex d-xs-block">
                  <div className="align-item-center"><h6>All Campaigns({campaigns.length})</h6></div>
                  <div className="d-flex">
                      {/* <input  style={{height:"25px"}} placeholder="Search by name &#x1F50D;"/> */}
                       <input style={{height:"25px"}}  type="text" placeholder="search for name &#x1F50D;" value={searchValue} onChange={handleSearch} />
                        <a href='/BMNewCampaign'>
                        <Button style={{backgroundColor:'#452c63', height:'30px', marginLeft:'5px'}}>
                          <div style={{marginTop:"-6px"}}>
                            Create<AddIcon style={{fontSize:"12px",height:"25px"}}/>
                          </div>
                        </Button></a>
                         <a href='/BMInactiveCampaigns'>
                         <Button style={{backgroundColor:'#452c63', height:'30px', marginLeft:'5px'}}>
                          <div style={{marginTop:"-6px"}}>
                            <p>Inactive campaigns</p>
                          </div>
                        </Button></a>
                  </div>
                    <div className="d-flex d-xs-justify-center d-xs-align-center">
                      <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><FilterList style={{fontSize:"12px",height:"25px"}} />Filter</button>
                      <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><ArrowDropDown style={{fontSize:"12px",height:"25px"}} />To</button>
                      <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><ArrowDropDown style={{fontSize:"12px",height:"25px"}} />From</button>
                    </div>
                </div>
        </Col> 

    <Row className="mainContainerAC">
    {currentItems.map(item => {
    return (
      <Col xs={8} sm={8} md={2} lg={2} className="subContainerAC mx-1">
        <div>
        {/* <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}><img className="imageAC" src={item.image}/>
        </div> */}
        <div style={{display: 'flex',justifyContent:'space-between'}}>
        <p className='typeAC'>{item.campaign_type}</p>
        <p className="hashtagAC">{item.hashtag_campaign}</p>
        </div>
        <h3 className='nameAC'>{item.name}</h3>
        <p className='influencersAC'>{item.influencers}</p>
        <p className='dateAC'>{item.start_date}</p>
        </div>
      </Col>
    )})}
    
    <Pagintation
        itemsPerPage={itemsPerPage}
        totalItems={campaigns.length}
        paginate={paginate}
      />
      </Row>
    </Row>
  </Container>     
  );
};

export default AllCampaigns;

