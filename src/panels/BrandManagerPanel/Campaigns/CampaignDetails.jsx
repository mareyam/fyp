import axios from "axios";
import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';
import { ArrowBack, Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import { Container, Row, Col } from 'react-grid-system';
import LaunchIcon from '@mui/icons-material/Launch';
import '../../../Style/BrandManagerPanel/AllCampaigns/CampaignDetails.css';

const CampaignDetails = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
      const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
              pageNumbers.push(i); //number of pages i.e 3
            }
          return (
            <nav>
              <ul className='pagination'>
                {pageNumbers.map(number => (
                  // <Col xs={1} sm={6} md={12} lg={12} className="mt-1" >
                    <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                      <a onClick={() => paginate(number)} href={currentPage} className='page-link'>
                        {number}
                      </a>
                    </li>
                  // </Col>
                ))}
              </ul>
            </nav>
          ); };

        const Pagintation = () => {
          const [currentPage, setCurrentPage] = useState(1);
          const [itemsPerPage] = useState(3);
          const [searchValue, setSearchValue] = useState('');

          const [campaigns, setCampaigns] = useState([]);
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
              setCampaigns(results);}
          const indexOfLastItem = currentPage * itemsPerPage;
          const indexOfFirstItem = indexOfLastItem - itemsPerPage;
          const currentItems = campaigns.slice(indexOfFirstItem, indexOfLastItem);
        
          const paginate = pageNumber => setCurrentPage(pageNumber);
        
         return (
           <Container className="mt-2" style={{border:"1px solid rgb(198, 198, 198)"}}>
              <div className='d-lg-flex d-sm-block'>
                  <Col  xs={12} sm={12} md={2} lg={2} className="mt-5" > 
                    <div className="mx-auto justify-content-center d-flex">
                        <Col xs={3} sm={3} md={5} lg={5}>
                        <img style={{height:'100px', width:'100px', borderRadius:'50%'}}src="https://static.toiimg.com/thumb/56200851.cms?width=170&height=240&imgsize=88803" className="img1"/>
                        </Col>
                        <Col xs={3} sm={3} md={7} lg={7} >
                        <img style={{height:'100px', width:'100px', borderRadius:'50%'}}src="https://media.istockphoto.com/id/487787108/photo/can-of-coca-cola-on-ice.jpg?s=612x612&w=0&k=20&c=xDSO_nl0qeDMBZJBJk09jj5_UeQkyQ70QdXuDMByCaY=" className="img2"/>
                        </Col>
                    </div>
                    <div className='d-lg-block d-xs-flex'>
                    <div style={{textAlign:"center"}}><h6>Coke</h6>
                    <p style={{fontSize:"12px"}}>Posted on: today</p>
                    <p style={{fontSize:"12px"}}>Saves</p>
                    <p style={{fontSize:"12px"}}>Likes</p>
                    <p style={{fontSize:"12px"}}>Comments</p></div></div>
                 </Col>
                 <Col xs={12} sm={12} md={6} lg={8}>
                  <div className="d-flex mt-3">
                    <h6>Coke Campaign Statistics with Ali Zafar</h6>
                  </div>
                  <div> 
                  {currentItems.map(item => {
                      return (
                          <Col xs={12} sm={12} md={12} lg={12} >
                              <div style={{}} className="subContainerCD my-2 d-lg-flex">
                                  <div>
                                    <img className="storyImageCD" src={`http://127.0.0.1:8000/${item.image}`} />
                                  </div>
                                  <div className='d-lg-flex d-sm-block d-xs-block'>
                                    <div className="mx-2 d-flex" style={{alignItems:"center"}}>
                                      <div><img className="imageCD" src='https://static.toiimg.com/thumb/56200851.cms?width=170&height=240&imgsize=88803' /></div>
                                      <div style={{marginLeft:'5px'}}><b><p style={{fontSize:"12px", marginTop:'30px'}}>{item.name}</p></b>
                                      <p style={{fontSize:"12px", marginTop:"-15px"}}>{item.username}</p></div>
                                    </div>
                                    <div style={{textAlign:"left", alignItems:"center", justifyContent:"left", width: "auto", marginTop:"30px" }} className="mx-4">
                                      <b><p style={{fontSize:"10px"}} className='costCD'>cost: Rs.{item.cost}</p></b>
                                      <a href="/BMCampaignDetails"><p style={{fontSize:"10px", marginTop:"-10px"}} className="dateCD"><LaunchIcon style={{fontSize:"11px"}}/>Link to Instagram Post</p></a>
                                      <a href=""><p style={{fontSize:"10px", marginTop:"-10px"}} className="dateCD"><LaunchIcon style={{fontSize:"11px"}}/>Link to Instagram Profile</p></a>
                                    </div>
                                    <div style={{textAlign:"left", alignItems:"center", justifyContent:"left", width: "auto", marginTop:"30px" }} className="mx-4">
                                      <b><p style={{fontSize:"10px", marginTop:"5px"}} className="dateCD">date: {item.date}</p></b>
                                      <p style={{fontSize:"10px", marginTop:"-10px"}} className="hashtagCD">hashtag: #{item.hashtag}</p>
                                    </div>
                                  </div>
                              </div>
                          </Col>
                      )})}
                  <CampaignDetails
                    itemsPerPage={itemsPerPage}
                    totalItems={campaigns.length}
                    paginate={paginate}
                  />
               </div>
                </Col>
              </div>
      
    </Container>  
        );
      };
    

export default Pagintation;
