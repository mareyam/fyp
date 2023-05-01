import axios from "axios";
import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';
import "../../../Style/BrandManagerPanel/AllRegisteredInfluencers/AllRegisteredInfluencers.css"
import { ArrowBack, Search, FilterList, ArrowDropDown } from '@material-ui/icons';
import Card from 'react-bootstrap/Card';
import LaunchIcon from '@mui/icons-material/Launch';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

import 'react-input-range/lib/css/index.css';
import InputRange from 'react-input-range';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import Accordion from 'react-bootstrap/Accordion';


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
  
  const FILTER_OPTIONS = ["Option 1", "Option 2", "Option 3"];
  const GENDER_OPTIONS = ["Male", "Female", "Other"];
  const isParent = ["Yes", "No"];
  const childrenAgeRange = ["toddler", "preschooler", "elementary", "teen", "adult"]


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [searchValue, setSearchValue] = useState('');
  const [influencers, setInfluencers] = useState([]);

  const [showFilter, setShowFilter] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedIsParent, setSelectedIsParent] = useState("");
  const [childrenCount, setChildrenCount] = useState({ min: 1, max: 10 });
  const [followers, setFollowers] = useState({ min: 10, max: 100 });
  const [childrenAge, setChildrenAge] = useState([]);
  const [influencerAge, setInfluencerAge] = useState({ min: 10, max: 100 });
  


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/newinfluencers/')
      .then(response => {
        setInfluencers(response.data);
        console.log(influencers);
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
    const toggleFilter = () => {
      setShowFilter(!showFilter);
    };
  
    const handleGenderSelect = (gender) => {
      setSelectedGender(gender);
    };
  
    const handleIsParentSelect = (isParent) => {
      setSelectedIsParent(isParent);
      if (isParent === "No") {
        setChildrenCount("");
        setChildrenAge("");
      }
    };
  
    
    const handleCloseFilter = () => {
      setShowFilter(false);
    };

  
    const handleChildAgeClick = (option) => {
      if (childrenAge.includes(option)) {
        setChildrenAge(childrenAge.filter((item) => item !== option));
      } else {
        setChildrenAge([...childrenAge, option]);
      }
    };
  
  
    const handleFollowersCountChange = (followers) => {
      setFollowers((prevState) => {
        return {
          ...prevState,
          max: followers.max,
          min: followers.min,
        }
      })
    };
  
    const handleChildrenCount = (childrenCount) => {
      setChildrenCount((prevState) => {
        return {
          ...prevState,
          max: childrenCount.max,
          min: childrenCount.min,
        }
      })
    };
  
    const handleInfluencerAge = (influencerAge) => {
      setInfluencerAge((prevState) => {
        return {
          ...prevState,
          max: influencerAge.max,
          min: influencerAge.min,
        }
      })
    };
  
   
  
    const filteredChildrenAge = childrenAgeRange.filter((option) =>
    childrenAge.includes(option)
  );
  
    
  
    // const filteredData = testData.filter((item) =>
    //     (selectedGender === "" || item.gender === selectedGender) &&
    //     (filteredOptions.length === 0 || filteredOptions.some((option) => item.options.includes(option))) &&
    //     (selectedIsParent === "" || item.isParent === selectedIsParent) &&
    //     (item.followersCount >= followers.min && item.followersCount <= followers.max) &&
    //     (filteredChildrenAge.length === 0 || filteredChildrenAge.some((option) => item.kidsAge.includes(option))) &&
    //     (item.numOfKids >= childrenCount.min && item.numOfKids <= childrenCount.max) &&
    //     (item.influencerAge >= influencerAge.min && item.influencerAge <= influencerAge.max)  
    // );
    // console.log(filteredData);
  

    const currentData = influencers.filter((item) =>
    (selectedGender === "" || item.influencerGender === selectedGender)  &&
     (selectedIsParent === "" || item.InfluencerChildExist === selectedIsParent) 
    // (item.influencerFollowers >= followers.min && item.influencerFollowers <= followers.max) &&
    // (filteredChildrenAge.length === 0 || filteredChildrenAge.some((option) => item.InfluencerChildrenAge.includes(option))) &&
    // (item.influencerChildrenCount >= childrenCount.min && item.influencerChildrenCount <= childrenCount.max) &&
    // (item.influencerAge >= influencerAge.min && item.influencerAge <= influencerAge.max)  
);
console.log(currentData);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Container >
      <Row>
          <Col xs={8} sm={8} md={12} lg={10}>
             <Row className="mainContainerARI ms-4">
                <div style={{display:"flex"}}>
                <h3 className='campaignHeaderARI' >Registered Influencers ({influencers.length}) </h3></div>
                <div className="ms-4 d-lg-flex d-xs-block" >
                  
                  <div className="d-flex">
                      <input  style={{height:"25px"}} placeholder="Search by name &#x1F50D;" onChange={handleSearch}/>
                      <Button style={{backgroundColor:'#452c63',fontSize:"12px",height:"25px", marginLeft:'5px'}}>
                        <div style={{marginTop:"-6px"}}>
                          <a href="/BMCompare" className="mx-3" style={{display: 'block', textDecoration:'none'}}>
                            <p>Compare<CompareArrowsIcon style={{fontSize:"15px",height:"25px"}}/></p>
                          </a>
                        </div>
                      </Button>
                    </div>
                    <div className="d-flex d-xs-justify-center d-xs-align-center">
                      <button onClick={toggleFilter} type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}>
                        <FilterList style={{fontSize:"12px",height:"25px"}} />Filter</button>
                    </div>
                    <div className={`filter ${showFilter ? "show" : ""}`}>
        <button className="close-btn" onClick={handleCloseFilter}>
          X
        </button>
        <div>
          <h3>Gender</h3>
          {GENDER_OPTIONS.map((option) => (
            <div
              className={`option ${selectedGender === option ? "selected" : ""}`}
              key={option}
              onClick={() => handleGenderSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
        <div>
          <h3>Influencer Age</h3>
              <InputRange
              minValue={10}
              maxValue={100}
              value={influencerAge}
              onChange={handleInfluencerAge}
              draggableTrack
              allowSameValues
              />
        </div>


        <div>
          Number of followers:<br/>
          <InputRange
          minValue={10}
          maxValue={100}
          value={followers}
          onChange={handleFollowersCountChange}
          draggableTrack
          allowSameValues
          />
        </div>


        <div>
        <h3>Are you a parent?</h3>
        {isParent.map((option) => (
            <div
              className={`option ${selectedIsParent === option ? "selected" : ""}`}
              key={option}
              onClick={() => handleIsParentSelect(option)}
            >{option}
            </div>
          ))}
      </div>

     

    {selectedIsParent === "Yes" && (
      <div>
        <div>
          <h3>Children Count</h3>
              <InputRange
              minValue={1}
              maxValue={10}
              value={childrenCount}
              onChange={handleChildrenCount}
              draggableTrack
              allowSameValues
              />
        </div>
        <div>
        <div>
          Children age :<br/>
          {childrenAgeRange.map((option) => (
            <div
              className={`option ${
                filteredChildrenAge.includes(option) ? "selected" : ""
              }`}
              key={option}
              onClick={() => handleChildAgeClick(option)}
            >
              {option}
            </div>
          ))}
      </div>
        </div>
      </div>
          )}
       
        </div>
              </div>
                  {currentData.map(item => {
                  return (
                    <Col xs={8} sm={8} md={2} lg={2} className="subContainerARI mx-3 my-3">
                    <Card style={{ height: "100%", width:"200px"}}>
                      <Card.Img style={{height:"150px", width:"100%", objectFit:"cover"}} className="CardImg" src={`http://127.0.0.1:8000/${item.image}`} />
                      
                      <Card.Body className="d-flex flex-column">
                        <Card.Text className="d-flex flex-column align-items-center justify-content-center text-center flex-grow-1" style={{ width: '100%', height: '100%', overflow: 'hidden'}}>
                        
                          <h6 style={{ fontWeight: "bolder", fontSize: "16px", height: '40px', width:'80%', overflow:'hidden' }}>{item.username}</h6>
                          <p style={{fontSize: '13px'}}>@{item.age}</p>
                          <p style={{ fontSize: "15px", marginTop:"-10px" }}>{item.followersCount}K</p>
                          
                          <a href={`instagram.com/${item.username}`}>
                          <button type="button" className="btn btn-dark d-flex align-items-center justify-content-center" data-mdb-ripple-color="dark" style={{ marginTop:"-10px", fontSize: "12px", height: "35px", width: '100%' }}>
                            <p style={{ fontSize: '12px', margin: '0px' }}>Instagram Link</p>
                            <LaunchIcon style={{ fontSize: "12px", height: "25px" }} />
                          </button></a>
                          <div className="data-item" key={item.name}>
                          <div>Name: {item.username}</div>  
                          <div>Gender: {item.gender}</div>
                          <div>Age: {item.age}</div>
                          <div>IsParent: {item.isParent}</div>
                        
                          </div>
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