import axios from "axios";
import React,{useState, useEffect} from 'react';
import '../../../Style/InfluencerPanel/PostsAndStories/InfluencerPosts.css';

import { Container, Row, Col } from 'react-grid-system';

const InfluencerPosts = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
          pageNumbers.push(i); //number of pages i.e 3
        }
        return (
          <Col xs={12} sm={12} md={12} lg={12}>
            <ul className='pagination'>
              {pageNumbers.map(number => (
                  <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                    <a onClick={() => paginate(number)} href={currentPage} className='page-link'>
                      {number}
                    </a>
                  </li>
              ))}
            </ul>
          </Col>
        );
      };
    
      const Pagintation = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [itemsPerPage] = useState(3);
        const [searchValue, setSearchValue] = useState('');
        const [posts, setPosts] = useState([]);
            
        const handleSearch = (event) => {
            const searchText = event.target.value;
            setSearchValue(searchText);
            let results = posts;
            if (searchText) {
            results = posts.filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase()));
            }
            setPosts(results);
        }

        useEffect(() => {
          axios.get('http://127.0.0.1:8000/campaigns/')
            .then(response => {
              setPosts(response.data);
            })
            .catch(error => {
              console.error(error);
            });
        }, []);

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);
      
        const paginate = pageNumber => setCurrentPage(pageNumber);
      
  return (
    <Container className="mt-2" style={{border:"1px solid rgb(198, 198, 198)"}}>
      <div className='d-lg-flex d-sm-block'>
        <Col xs={12} sm={12} md={2} lg={2} className="mt-4" > 
            <div className='d-lg-block d-xs-flex'>
               {/* <a href="/BMCampaignDetails" style={{outline: 'none'}} ></a> */}
              <img className="influencerImage"src='data:image/jpeg;base64,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'></img>
                <div style={{textAlign:"center"}}><h6>Ali Zafar</h6>
                  <p style={{fontSize:"12px"}}>@alizafar</p>
                  <p style={{fontSize:"12px"}}><u>View Profile</u></p>
                  <p style={{fontSize:"12px"}}><b>Brands:</b></p>
                </div>
            </div>
        </Col>
        <Col xs={12} sm={12} md={6} lg={8}>
              <div className="header1 d-flex mt-4">
                <h6>All Posts by you:</h6>
                <input className="mx-2" type="text" placeholder="Search for story" style={{fontSize:'10px'}}value={searchValue} onChange={handleSearch} />
              </div>
              <div className="mainContainerIPIP"> 
                {currentItems.map(item => {
                    return (
                        <Col xs={12} sm={12} md={12} lg={12} >
                            <div style={{}} className="subContainerIPIP my-2 d-lg-flex">
                                <div style={{marginRight:'2%'}}><img className="storyImageIPIP img-fluid"src={`http://127.0.0.1:8000/${item.image}`}/></div>
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12} >
                                      <div>
                                         <p style={{marginBottom:'-1%'}}><b>Hashtags:</b></p>
                                         <p>{item.hashtag}</p>
                                      </div>
                                      <h6>Engagement</h6>
                                      <div style={{display:'flex', justifyContent:'space-between'}}>
                                        <p>Likes:300</p>
                                        <p>Likes:300</p>
                                        <p>Likes:300</p>
                                      </div>
                                      <h6>Sentiment Analysis based on comments</h6>
                                      <div style={{display:'flex', justifyContent:'space-between'}}>
                                        <p>Likes:300</p>
                                        <p>Likes:300</p>
                                        <p>Likes:300</p>
                                      </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        )})}
              </div>
              <Col xs={12} sm={12} md={12} lg={12}>
                  <InfluencerPosts
                    itemsPerPage={itemsPerPage}
                    totalItems={posts.length}
                    paginate={paginate}/>
             </Col>
        </Col>
      </div>
      
    </Container>  
       
  );
}

export default Pagintation;
