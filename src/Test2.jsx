import axios from "axios";
import React, {useState, useEffect} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import "./Style/BrandManagerPanel/AllRegisteredInfluencers/AllRegisteredInfluencers.css"
import { FilterList } from '@material-ui/icons';
import Card from 'react-bootstrap/Card';
import LaunchIcon from '@mui/icons-material/Launch';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

import 'react-input-range/lib/css/index.css';
import InputRange from 'react-input-range';

const Pagintation = () => {
  
  const GENDER_OPTIONS = ["Male", "Female", "Other"];
  const ISPARENT = ["Yes", "No"];

  const [influencers, setInfluencers] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedIsParent, setSelectedIsParent] = useState("");

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/newinfluencers/')
      .then(response => {
        setInfluencers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

    const toggleFilter = () => {
      setShowFilter(!showFilter);
    }; 
    
    const handleCloseFilter = () => {
      setShowFilter(false);
    };
  
    
    const handleGenderSelect = (gender) => {
      setSelectedGender(gender);
    };

    const handleIsParentSelect = (isparent) => {
      setSelectedIsParent(isparent);
    };


    const currentData = influencers.filter((item) =>
    (selectedGender === "" || item.gender === selectedGender) &&
    (selectedIsParent === "" || item.isparent  === selectedIsParent) 
);
console.log(currentData);
  return (
    <Container >
      <Row>
          <Col xs={8} sm={8} md={12} lg={10}>
             <Row className="mainContainerARI ms-4">
                <div style={{display:"flex"}}>
                <h3 className='campaignHeaderARI' >Registered Influencers ({influencers.length}) </h3></div>
                <div className="ms-4 d-lg-flex d-xs-block" >
                  
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
                        <h3>Are you a parent?</h3>
                        {ISPARENT.map((option) => (
                            <div
                              className={`option ${selectedIsParent === option ? "selected" : ""}`}
                              key={option}
                              onClick={() => handleIsParentSelect(option)}
                            >{option}
                            </div>
                          ))}
                      </div>    
                    </div>

         
                </div>
                  {currentData.map(item => {
                  return (
                    <div>
                    <p>name  {item.fullname}</p>
                    <p>gender  {item.gender}</p>
                    <p>parent  {item.isparent}</p>
                    </div>
                  //   <Col xs={8} sm={8} md={2} lg={2} className="subContainerARI mx-3 my-3">
                  //   <Card style={{ height: "100%", width:"200px"}}>
                  //     <Card.Img style={{height:"150px", width:"100%", objectFit:"cover"}} className="CardImg" src={`http://127.0.0.1:8000/${item.influencerImage}`} />
                      
                  //     <Card.Body className="d-flex flex-column">
                  //       <Card.Text className="d-flex flex-column align-items-center justify-content-center text-center flex-grow-1" style={{ width: '100%', height: '100%', overflow: 'hidden'}}>
                        
                  //         <h6 style={{ fontWeight: "bolder", fontSize: "16px", height: '40px', width:'80%', overflow:'hidden' }}>{item.influencer_username}</h6>
                  //         <p style={{fontSize: '13px'}}>@{item.age}</p>
                  //         <p style={{ fontSize: "15px", marginTop:"-10px" }}>{item.followersCount}K</p>
                          
                  //         <a href={`instagram.com/${item.influencer_username}`}>
                  //         <button type="button" className="btn btn-dark d-flex align-items-center justify-content-center" data-mdb-ripple-color="dark" style={{ marginTop:"-10px", fontSize: "12px", height: "35px", width: '100%' }}>
                  //           <p style={{ fontSize: '12px', margin: '0px' }}>Instagram Link</p>
                  //           <LaunchIcon style={{ fontSize: "12px", height: "25px" }} />
                  //         </button></a>
                  //         <div className="data-item" key={item.name}>
                  //         <div>Name: {item.influencer_username}</div>
                  //         <div>Name: {item.influencer_full_name}</div>
                          
                  //         <div>Gender: {item.influencerGender}</div>
                  //         <div>Age: {item.influencerAge}</div>

                  //         <div>post: {item.influencerStoryCost}</div>
                  //         <div>story: {item.influencerInfluencerPostCost}</div>
                          
                  //         {/* <div>Options: {item.options.join(", ")}</div> */}
                  //         <div>IsParent: {item.isParent}</div>
                  //         <div>Children Count: {item.influencerChildrenCount}</div>
                  //         {/* <div>Children Age: {item.kidsAge.join(", ")}</div> */}
                  //         <div>followersssssssss: {item.followersCount}</div>
                  //         <div>influencer age: {item.influencerAge}</div>
                  //         </div>
                  //       </Card.Text>
                  //     </Card.Body>
                  //   </Card>
                  // </Col>
                  )})}
                  
             
           </Row>
         </Col> 
      </Row>
  </Container>     
  );
};

export default Pagintation;
// import React, { useState } from "react";
// import "./Test.css";

// const FILTER_OPTIONS = ["Option 1", "Option 2", "Option 3"];
// const GENDER_OPTIONS = ["Male", "Female"];
// const isParent = ["Yes", "No"];


// function App() {
//   const [showFilter, setShowFilter] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [selectedGender, setSelectedGender] = useState("");
//   const [selectedIsParent, setSelectedIsParent] = useState(false);


//   const toggleFilter = () => {
//     setShowFilter(!showFilter);
//   };

//   const handleOptionClick = (option) => {
//     if (selectedOptions.includes(option)) {
//       setSelectedOptions(selectedOptions.filter((item) => item !== option));
//     } else {
//       setSelectedOptions([...selectedOptions, option]);
//     }
//   };

//   const handleGenderSelect = (gender) => {
//     setSelectedGender(gender);
//   };

//   const handleIsParentSelect = (isParent) => {
//     setSelectedIsParent(isParent);
//   };

//   function handleFilter() {
//     const isParentFilteredData = testData.filter(item => {
//       return (
//         item.gender === selectedGender && 
//         (isParent ? item.isParent : true)
//       );
//     });


//   const handleCloseFilter = () => {
//     setShowFilter(false);
//   };

//   const filteredOptions = FILTER_OPTIONS.filter((option) =>
//     selectedOptions.includes(option)
//   );

//   const filteredData = testData.filter((item) =>
//       (selectedGender === "" || item.gender === selectedGender) &&
//       (filteredOptions.length === 0 ||
//         filteredOptions.some((option) => item.options.includes(option))) &&
//         (isParent ? item.isParent : true)
        
//   );
//   console.log(filteredData);

//   return (
//     <div className="mt-5 App" style={{backgroundColor:'red'}}>
//       <div className="header">
//         <div>Header</div>
//         <div>
//           <button onClick={toggleFilter}>Filter</button>
//         </div>
//       </div>
//       <div className={`filter ${showFilter ? "show" : ""}`}>
//         <button className="close-btn" onClick={handleCloseFilter}>
//           X
//         </button>
//         <div>
//           <h3>Gender</h3>
//           {GENDER_OPTIONS.map((option) => (
//             <div
//               className={`option ${selectedGender === option ? "selected" : ""}`}
//               key={option}
//               onClick={() => handleGenderSelect(option)}
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//         <div>
//           <h3>Filter Options</h3>
//           {FILTER_OPTIONS.map((option) => (
//             <div
//               className={`option ${
//                 filteredOptions.includes(option) ? "selected" : ""
//               }`}
//               key={option}
//               onClick={() => handleOptionClick(option)}
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//         <div>
//         <h3>Are you a parent?</h3>
//         {isParent.map((option) => (
//             <div
//               className={`option ${selectedIsParent === option ? "selected" : ""}`}
//               key={option}
//               onClick={() => handleIsParentSelect(option)}
//             >
//               {option}
//             </div>
//           ))}
//       </div>
//       </div>
//       <div className="content">
//         {filteredData.map((item) => (
//           <div className="data-item" key={item.name}>
//             <div>Name: {item.name}</div>
//             <div>Gender: {item.gender}</div>
//             <div>Options: {item.options.join(", ")}</div>
//             <div>IsParent: {item.isParent}</div>
            
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }}

// const testData = [
//   { name: "John", gender: "Male", isParent: 'yes', numOfKids: 2, kidsAge: [4, 6], options: ["Option 1", "Option 2"] },
//   { name: "Jane", gender: "Female", isParent: 'yes', numOfKids: 1, kidsAge: [3], options: ["Option 1", "Option 2"] },
//   { name: "Bob", gender: "Male", isParent: 'no', numOfKids: 0, kidsAge: [],options: ["Option 2"] },
//   { name: "Alice", gender: "Female", isParent: 'yes', numOfKids: 3, kidsAge: [2, 5, 8],options: ["Option 3", "Option 2"] },
//   { name: "Tom", gender: "Male", isParent: 'yes', numOfKids: 2, kidsAge: [7, 9],options: ["Option 1", "Option 3"] },
//   { name: "Sara", gender: "Female", isParent: 'no', numOfKids: 0, kidsAge: [],options: ["Option 1", "Option 3"] }
// ];

// export default App;

// import axios from "axios";
// import React, {useState, useEffect} from 'react';
// import { Container, Row, Col, Button } from 'react-bootstrap';
// import AddIcon from '@mui/icons-material/Add';
// import "./Style/BrandManagerPanel/AllCampaigns/AllCampaigns.css"
// import { ArrowBack, Search, FilterList, ArrowDropDown } from '@material-ui/icons';
// import Card from 'react-bootstrap/Card';
// import LaunchIcon from '@mui/icons-material/Launch';
// import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

// import 'react-input-range/lib/css/index.css';
// import InputRange from 'react-input-range';
// import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
// import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
// import Accordion from 'react-bootstrap/Accordion';


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
//   const [itemsPerPage] = useState(8);
//   const [searchValue, setSearchValue] = useState('');
//   const [influencers, setInfluencers] = useState([]);

//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/newinfluencers/')
//       .then(response => {
//         setInfluencers(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);


//   const handleSort = (order) => {
//     const sorted = [...influencers].sort((a, b) =>
//       order === 'asc' ? a.influencer_full_name.localeCompare(b.influencer_full_name) : b.influencer_full_name.localeCompare(a.influencer_full_name)
//     );
//     setInfluencers(sorted);
//   };

  

//     const handleSearch = (event) => {
//       const searchText = event.target.value;
//       setSearchValue(searchText);
//       let results = influencers;
//       if (searchText) {
//         results = influencers.filter((influencer) => influencer.influencer_full_name.toLowerCase().includes(searchText.toLowerCase()));
//       }
//       setInfluencers(results);
//     }


//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = influencers.slice(indexOfFirstItem, indexOfLastItem);

//   const paginate = pageNumber => setCurrentPage(pageNumber);

//   return (
//     <Container >
//       <Row>
//           <Col xs={8} sm={8} md={12} lg={12}>
        

                

//                 <Row className="mainContainerARI ms-4">
//                 <div style={{display:"flex"}}><ArrowBack/>
//                 <h3 className='campaignHeaderAC' >Influencers</h3></div>
//                 <div className="ms-4 d-lg-flex d-xs-block" >
//                   <div className="align-item-center"><h6>All Influencers({influencers.length})</h6></div>
//                   <div className="d-flex">
//                       <input  style={{height:"25px"}} placeholder="Search by name &#x1F50D;"/>
//                       <Button style={{backgroundColor:'#452c63',fontSize:"12px",height:"25px", marginLeft:'5px'}}>
//                         <div style={{marginTop:"-6px"}}>
//                           <a href="/BMCompare" className="mx-3" style={{display: 'block', textDecoration:'none'}}>
//                             <p>Compare<CompareArrowsIcon style={{fontSize:"15px",height:"25px"}}/></p>
//                           </a>
//                         </div>
//                       </Button>
//                     </div>
//                     <div className="d-flex d-xs-justify-center d-xs-align-center">
//                       <SortButton handleSort={handleSort} />  
//                     </div>
//                     <div className="d-flex d-xs-justify-center d-xs-align-center">
//                       <FilterButton />  
//                     </div>
//                 </div>
//                   {currentItems.map(item => {
//                   return (
//                     <Col xs={8} sm={8} md={2} lg={2} className="subContainerARI mx-3 my-3">
//                     <Card style={{ height: "100%", width:"200px"}}>
//                       <Card.Img style={{height:"150px", width:"100%", objectFit:"cover"}} className="CardImg" src={`http://127.0.0.1:8000/${item.influencerImage}`} />
                      
//                       <Card.Body className="d-flex flex-column">
//                         <Card.Text className="d-flex flex-column align-items-center justify-content-center text-center flex-grow-1" style={{ width: '100%', height: '100%', overflow: 'hidden'}}>
                        
//                           <h6 style={{ fontWeight: "bolder", fontSize: "16px", height: '40px', width:'80%', overflow:'hidden' }}>{item.influencer_full_name}</h6>
//                           <p style={{fontSize: '13px'}}>@{item.influencer_username}</p>
//                           <p style={{ fontSize: "15px", marginTop:"-10px" }}>{item.influencerFollowerCount}K</p>
                          
//                           <a href={`instagram.com/${item.influencer_username}`}>
//                           <button type="button" className="btn btn-dark d-flex align-items-center justify-content-center" data-mdb-ripple-color="dark" style={{ marginTop:"-10px", fontSize: "12px", height: "35px", width: '100%' }}>
//                             <p style={{ fontSize: '12px', margin: '0px' }}>Instagram Link</p>
//                             <LaunchIcon style={{ fontSize: "12px", height: "25px" }} />
//                           </button></a>
//                         </Card.Text>
//                       </Card.Body>
//                     </Card>
//                   </Col>
//                   )})}
                  
//               <Pagintation
//                   itemsPerPage={itemsPerPage}
//                   totalItems={influencers.length}
//                   paginate={paginate}
//                 />
//            </Row>
//          </Col> 
//       </Row>
//   </Container>     
//   );
// };

// export default AllCampaigns;

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
//                Sort
//             </button>
          
//       <div className={`dropdown-menu ${isOpen ? 'show' : ''}`}>
//         <button className="dropdown-item" onClick={() => handleSortOrder('asc')}>
//           Name Ascending
//         </button>
//         <button className="dropdown-item" onClick={() => handleSortOrder('desc')}>
//           Name Descending
//         </button>
//         <button className="dropdown-item" onClick={() => handleSortOrder('desc')}>
//           Gender Descending
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

// const FilterButton = ({ handleSort, handleDateSort }) => {
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
//           Name Ascending
//         </button>
//         <button className="dropdown-item" onClick={() => handleSortOrder('desc')}>
//           Name Descending
//         </button>
//         <button className="dropdown-item" onClick={() => handleSortOrder('desc')}>
//           Gender Descending
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


// function Filters() {
//     // const [gender, setGender] = useState('');
//     const [isParent, setIsParent] = useState(false);
//     const [childrenCount, setChildrenCount] = useState({ min: 0, max: 10 });
//     const [childAge, setChildAge] = useState({ min: 0, max: 25 });
//     const [followers, setFollowers] = useState({ min: 100000, max: 300000 });
//     const [age, setAge] = useState({ min: 15, max: 100 });

//     const [gender, setGender] = useState([]);
//     useEffect(() => {
//       axios.get('http://127.0.0.1:8000/filters/')
//         .then(response => {
//           setAge(response.data);
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     }, []);


//     const handleGenderChange = (gender) => {
//       setGender(gender);
//     };
  
//     const handleParentCheckbox = (isParent) => {
//       setIsParent(isParent);
//     }

//     const handleChildrenCountChange = (childrenCount) => {
//       setChildAge((prevState) => {
//         return {
//           ...prevState,
//           max: childrenCount.max,
//           min: childrenCount.min,
//         };
//       });
//     };

    
//     const handleChildAgeChange = (childAge) => {
//       setChildrenCount((prevState) => {
//         return {
//           ...prevState,
//           max: childAge.max,
//           min: childAge.min,
//         }
//       })
//     };

//     const handleFollowersCountChange = (followers) => {
//       setFollowers((prevState) => {
//         return {
//           ...prevState,
//           max: followers.max,
//           min: followers.min,
//         }
//       })
//     };

//     const handleAgeChange = (age) => {
//       setAge((prevState) => {
//         return {
//           ...prevState,
//           max: age.max,
//           min: age.min
//         }
//       })
//     }
  


  
//     return (
//       <div>
//       <Accordion>
//         <Accordion.Item eventKey="0">
//           <Accordion.Header> Gender</Accordion.Header>
//           <Accordion.Body>
//             <GenderCheckbox onGenderChange={handleGenderChange}/>
//             {/* <p>{gender}</p> */}
//           </Accordion.Body>
//         </Accordion.Item>
//         <Accordion.Item eventKey="1">
//           <Accordion.Header>Parents?</Accordion.Header>
//           <Accordion.Body>
//             <ParentCheckbox onIsParent={handleParentCheckbox} onChildrenCount={handleChildrenCountChange} onChildAge={handleChildAgeChange}/>
    

//           </Accordion.Body>
//         </Accordion.Item>
//         <Accordion.Item eventKey="2">
//           <Accordion.Header>Follower Count</Accordion.Header>
//           <Accordion.Body>
//             <FollowerCount onFollowersCount={handleFollowersCountChange}/>  
//             {/* <p> value is {followers.max.toString()}</p>
//             <p> value is {followers.min.toString()}</p> */}
//           </Accordion.Body>
//         </Accordion.Item>
//         <Accordion.Item eventKey="3">
//           <Accordion.Header>Age</Accordion.Header>
//           <Accordion.Body>
//             <Age onAge={handleAgeChange}/>  
//             {/* <p> value is {age.max.toString()}</p>
//             <p> value is {age.min.toString()}</p> */}
//           </Accordion.Body>
//         </Accordion.Item>
//       </Accordion>
//       <button className="btn btn-primary " type="submit" style={{backgroundColor:'#452c63', width:'170px'}}>Filter Items</button>
//       </div>
//     );
  
//   }
  
  
//   function GenderCheckbox(props) {
//     const [gender, setGender] = useState('');
  
//     function handleGenderCheckbox(e) {
//       const newGender = e.target.value;
//       setGender(newGender);
//       props.onGenderChange(newGender);
//     }
  
  
//     return (
//       <div>
//         <label>
//           <input
//             type="checkbox"
//             value="male"
//             checked={gender === 'male'}
//             onChange={handleGenderCheckbox}
//           />
//           Male
//         </label><br/>
//         <label>
//           <input
//             type="checkbox"
//             value="female"
//             checked={gender === 'female'}
//             onChange={handleGenderCheckbox}
//           />
//           Female
//         </label>
//       </div>
//     );
//   }
  
//   function ParentCheckbox(props) {
//     const [isParent, setIsParent] = useState(false);
//     const [childrenCount, setChildrenCount] = useState({ min: 0, max: 10 });
//     const [childAge, setChildAge] = useState({ min: 0, max: 25 });
//     const handleParentCheckbox = (e) => {
//       const value = e.target.checked;
//       setIsParent(value);
//       props.onIsParent(value);
//     }
  
//      const handleChildrenCount = (childrenCount) => {
//       if(childrenCount.min < 0)
//       childrenCount.min = 0;
//       if(childrenCount.max > 10)
//       childrenCount.max = 10;
//       setChildrenCount(childrenCount);
//       props.onChildrenCount(childrenCount);
//     }

//      const handleChildAge = (childAge) => {
//        if(childAge.min < 0)
//        childAge.min = 0;
//        if(childAge.max > 10)
//        childAge.max = 10;
//        setChildAge(childAge);
//        props.onChildAge(childAge);
//     };
    
//     return (
//       <div>
//         <div>
//           <label> 
//             <input type='checkbox' checked={isParent} onChange={handleParentCheckbox} />
//             Are you a parent?
//           </label>
//         </div>
//   { isParent? (
//     <div>
//         <div>
//           <div>How many children do you have?</div>
//           <div>
//             <InputRange
//               minValue={0}
//               maxValue={10}
//               value={childrenCount}
//               onChange={handleChildrenCount}
//               draggableTrack
//               allowSameValues
//               />
//           </div>
//         </div>
//         <div>
//           <div>Children age group?</div>
//           <div>
//               <InputRange
//               minValue={0}
//               maxValue={25}
//               value={childAge}
//               onChange={handleChildAge}
//               draggableTrack
//               allowSameValues
//               />
//           </div>
//         </div>
//     </div>
//   ) : null }
  
//       </div>
//     )
//   }
  
//   function Age(props) { 
//     const [age, setAge] = useState({ min: 15, max: 100 });

//     const handleAge = (age) => {
//       if(age.min < 15)
//       age.min = 15;
//       if(age.max > 100)
//       age.max = 100;
//       setAge(age);
//       props.onAge(age);
//     };

//   return ( 
//     <div>
//       Number of age:<br/>
//       <InputRange
//       minValue={15}
//       maxValue={100}
//       value={age}
//       onChange={handleAge}
//       draggableTrack
//       allowSameValues
//       />
//     </div>
//   )
//   }
  
//   function FollowerCount(props) { 
//     const [followers, setFollowers] = useState({ min: 100000, max: 300000 });
  
//     const handleFollowers = (followers) => {
//       if(followers.min < 100000)
//       followers.min = 100000;
//       if(followers.max > 300000)
//       followers.max = 300000;
//       setFollowers(followers);
//       props.onFollowersCount(followers);
//     };

//   return ( 
//     <div>
//       Number of followers:<br/>
//       <InputRange
//       minValue={100000}
//       maxValue={300000}
//       value={followers}
//       onChange={handleFollowers}
//       draggableTrack
//       allowSameValues
//       />
//     </div>
//   )
//   }
  

// import axios from "axios"
// import {useEffect, useState} from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { Container, Row, Col } from 'react-bootstrap';
// import './Style/BrandManagerPanel/NewCampaigns/newCampaigns.css'
// import { ArrowBack } from '@material-ui/icons';
// import { Card, Button } from 'react-bootstrap';
// import AddIcon from '@mui/icons-material/Add';

// const NewCampaign = () => {
//     const [isChecked, setIsChecked] = useState(false);
//     const [influencers, setInfluencers] = useState([]);
//     const [totalCost, setTotalCost] = useState(0);
//     const [storyCost, setStoryCost] = useState(0);
//     const [postCost, setPostCost] = useState(0);
  
//     useEffect(() => {
//       axios
//         .get('http://127.0.0.1:8000/influencers/')
//         .then((response) => {
//           setInfluencers(response.data);
//         })
//         .catch((error) => {
//           console.error(error);
//         });
//     }, []);
  
//     //make campaign live
//     const handleCheckboxChange = (e) => {
//       setIsChecked(e.target.checked);
//     };
  
//     const handleInfluencerChangeStory = (index, e) => {
//       const updatedInfluencers = [...influencers];
//       updatedInfluencers[index].story = e.target.checked;
//       setInfluencers(updatedInfluencers);
  
//       const cost = e.target.checked ? influencers[index].influencerStoryCost : -influencers[index].influencerStoryCost;
//       setStoryCost(storyCost + cost);
//     };
  
//     const handleInfluencerChangePost = (index, e) => {
//       const updatedInfluencers = [...influencers];
//       updatedInfluencers[index].post = e.target.checked;
//       setInfluencers(updatedInfluencers);
  
//       const cost = e.target.checked ? influencers[index].influencerInfluencerPostCost : -influencers[index].influencerInfluencerPostCost;
//       setPostCost(postCost + cost);
//     };
  
//     const removeInfluencer = (indexToRemove) => {
//     const removedInfluencer = influencers[indexToRemove];
//     const updatedInfluencers = influencers.filter((_, index) => index !== indexToRemove);
//     setInfluencers(updatedInfluencers);
  
//     const storyCostChange = removedInfluencer.story ? -removedInfluencer.influencerStoryCost : 0;
//     const postCostChange = removedInfluencer.post ? -removedInfluencer.influencerInfluencerPostCost : 0;
//     setStoryCost(storyCost => storyCost + storyCostChange);
//     setPostCost(postCost => postCost + postCostChange);
//   };
  
//   const fetchInfluencers = () => {
//     axios
//       .get('http://127.0.0.1:8000/influencers/')
//       .then((response) => {
//         setInfluencers(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };
  
//     useEffect(() => {
//       // Calculate the total cost based on the sum of storyCost and postCost
//       setTotalCost(storyCost + postCost);
//     }, [storyCost, postCost]);
  
  
//   const handleCreateCampaign = async (campaignData) => {
//       try {
//         const response = await axios.post('http://127.0.0.1:8000/newcampaign/', campaignData);
//         console.log(response.data);
//         // Do something with the response, such as show a success message
//       } catch (error) {
//         console.error(error);
//         // Handle the error, such as showing an error message to the user
//       }
//     };
  
  
//     return (
//       <Container className="mt-2" style={{border:"1px solid rgb(198, 198, 198)"}}>
//         <Row>
//          <div className="pickedInfluencers" style={{display: 'flex', flexWrap: "nowrap"}}> 
//               {influencers.map((item,index) => {
//                  const campaignData = {

//                   influencer_full_name : item.influencer_full_name,
//                   influencer_username : item.influencer_username,
//                   influencers: influencers.map((influencer) => influencer.id),
//                 }
  
//                 return (
//                   <Col xs={8} sm={8} md={2} lg={2}>
//                     <div className="subContainerNC" style={{overflow:'hidden'}}>
//                       <img className='imageNC' src={`http://127.0.0.1:8000/${item.image}`}/>
//                       <p className='nameNC'>{item.influencer_full_name.slice(0, 15)}...</p>
//                       <p className='userNameNC'>@{item.influencer_username}</p>
//                       <p className='EngagementRateNC'>Engagement Rate</p>
//                       <p className='NumberNC'>{item.engagement_rate}</p>
  
//                       {/* <input
//                         type="checkbox"
//                         checked={item.story}
//                         onChange={(e) => handleInfluencerChangeStory(index, e)}
//                       />
//                       <label>Story {item.influencerStoryCost}</label>
   
//                       <input
//                         type="checkbox"
//                         checked={item.post}
//                         onChange={(e) => handleInfluencerChangePost(index, e)}
//                       />
//                       <label>Post {item.influencerInfluencerPostCost}</label> */}
  
//                       {/* <button style={{backgroundColor:'red', borderRadius:'50%'}} onClick={() => removeInfluencer(index)}>-</button> */}
//                     </div>
//                   </Col>
  
//                 )})}
//              </div>
  
//              <div className="d-lg-flex justify-content-between align-items-end d-sm-block " style={{border:'2px solid red'}}>
//                 <div>
//                     <input
//                       className='inputNC'
//                       type="checkbox"
//                       checked={isChecked}
//                       onChange={handleCheckboxChange}
//                     />
//                     <label>Make Campaign Live</label>
//                 </div>
//                 <Button style={{backgroundColor: '#452c63'}}>
//                     <AddIcon style={{ fontSize: '15px' }} />
//                     Add Influencer
//                 </Button>
  
//                 <div className="d-block">
//                   <p>Total Cost: {totalCost}</p>
//                   {/* <Button style={{backgroundColor: '#452c63'}} onClick={handleCreateCampaign(campaignData)}>
//                     Create Campaign
//                   </Button> */}
//                 </div>
//              </div>
//         </Row>
//       </Container>
//     )  
//   }
  
//   export default NewCampaign;
  








////



// import React, { useState } from "react";
// import "./Test.css";

// const Test = () => {
//   const FILTER_OPTIONS = ["Option 1", "Option 2", "Option 3"];
//   const GENDER_OPTIONS = ["Male", "Female"];
//   const isParent = ["Yes", "No"];

//   const [showFilter, setShowFilter] = useState(false);
//   const [selectedOptions, setSelectedOptions] = useState([]);
//   const [selectedGender, setSelectedGender] = useState("");
//   const [selectedIsParent, setSelectedIsParent] = useState("");
//   const [childrenCount, setChildrenCount] = useState("");
//   const [childrenAge, setChildrenAge] = useState("");

//   const toggleFilter = () => {
//     setShowFilter(!showFilter);
//   };

//   const handleGenderSelect = (gender) => {
//     setSelectedGender(gender);
//   };

//   const handleIsParentSelect = (isParent) => {
//     setSelectedIsParent(isParent);
//     if (isParent === "No") {
//       setChildrenCount("");
//       setChildrenAge("");
//     }
//   };

//   const handleChildrenCount = (count) => {
//     setChildrenCount(count);
//   };

//   const handleChildrenAge = (age) => {
//     setChildrenAge(age);
//   };

//   const handleCloseFilter = () => {
//     setShowFilter(false);
//   };

//   const handleOptionClick = (option) => {
//     if (selectedOptions.includes(option)) {
//       setSelectedOptions(selectedOptions.filter((item) => item !== option));
//     } else {
//       setSelectedOptions([...selectedOptions, option]);
//     }
//   };

//   const filteredOptions = FILTER_OPTIONS.filter((option) =>
//     selectedOptions.includes(option)
//   );

//   const filteredData = testData.filter((item) =>
//     (selectedGender === "" || item.gender === selectedGender) &&
//     (filteredOptions.length === 0 || filteredOptions.some((option) => item.options.includes(option))) &&
//     (selectedIsParent === "" || item.isParent === selectedIsParent) &&
//     ((selectedIsParent === "No") || ((selectedIsParent === "Yes") && (item.numOfKids === childrenCount) && (item.kidsAge.includes(parseInt(childrenAge)))))
//   );

//   return (
//     <div>
//       <div className="header">
//         <div>Header</div>
//         <div>
//           <button onClick={toggleFilter}>Filter</button>
//         </div>
//       </div>
//       <div className={`filter ${showFilter ? "show" : ""}`}>
//         <button className="close-btn" onClick={handleCloseFilter}>
//           X
//         </button>
//         <div>
//           <h3>Gender</h3>
//           {GENDER_OPTIONS.map((option) => (
//             <div
//               className={`option ${selectedGender === option ? "selected" : ""}`}
//               key={option}
//               onClick={() => handleGenderSelect(option)}
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//         <div>
//           <h3>Filter Options</h3>
//           {FILTER_OPTIONS.map((option) => (
//             <div
//               className={`option ${
//                 filteredOptions.includes(option) ? "selected" : ""
//               }`}
//               key={option}
//               onClick={() => handleOptionClick(option)}
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//         <div>
//           <h3>Are you a parent?</h3>
//           {isParent.map((option) => (
//             <div
//               className={`option ${selectedIsParent === option ? "selected" : ""}`}
//               key={option}
//               onClick={() => handleIsParentSelect(option)}
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//         {selectedIsParent === "Yes" && (
//   <div>
//     <div>
//       <h3>Children Count</h3>
//       <input type="number" min="0" value={childrenCount} onChange={handleChildrenCount} />
//     </div>
//     <div>
//       <h3>Children Age</h3>
//       <input type="text" value={childrenAge} onChange={handleChildrenAge} />
//     </div>
//   </div>
//         )}
//         <div className="content">
//         {filteredData.map((item) => (
//           <div className="data-item" key={item.name}>
//             <div>Name: {item.name}</div>
//             <div>Gender: {item.gender}</div>
//             <div>Options: {item.options.join(", ")}</div>
//             <div>IsParent: {item.isParent}</div>
            
//           </div>
//         ))}
//       </div>
//         </div>
//         </div>
//   )}
//   const testData = [
//     { name: "John", gender: "Male", isParent: 'yes', numOfKids: 2, kidsAge: [4, 6], options: ["Option 1", "Option 2"] },
//     { name: "Jane", gender: "Female", isParent: 'yes', numOfKids: 1, kidsAge: [3], options: ["Option 1", "Option 2"] },
//     { name: "Bob", gender: "Male", isParent: 'no', numOfKids: 0, kidsAge: [],options: ["Option 2"] },
//     { name: "Alice", gender: "Female", isParent: 'yes', numOfKids: 3, kidsAge: [2, 5, 8],options: ["Option 3", "Option 2"] },
//     { name: "Tom", gender: "Male", isParent: 'yes', numOfKids: 2, kidsAge: [7, 9],options: ["Option 1", "Option 3"] },
//     { name: "Sara", gender: "Female", isParent: 'no', numOfKids: 0, kidsAge: [],options: ["Option 1", "Option 3"] }
//   ];

// export default Test;
