import axios from "axios";
import React,{useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../Style/BrandManagerPanel/brandManagerDashboard/HashTag.css';
import { ArrowBack, Search, FilterList, ArrowDropDown } from '@material-ui/icons';
import AddIcon from '@mui/icons-material/Add';
import Navbarr from '../Navbar/Navbar';

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

const Hashtags = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [searchValue, setSearchValue] = useState('');
  const [hashtags, setHashtags] = useState([]);
  

  // useEffect(() => {
  //     axios.get('http://127.0.0.1:8000/hashtags/')
  //       .then(response => {
  //         setHashtags(response.data);
  //       })
  //       .catch(error => {
  //         console.error(error);
  //       });
  //   }, []);
  

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            'https://oauth.reddit.com/r/apple/search.json?q=apple&restrict_sr=on&limit=100',
            {
              headers: {
                Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0MTI3NDA5LCJqdGkiOiIyNDQ5NTMxNzM4MjUzLU45U25PMTRHaTYyTzFoUmFtUmhIWld3cm1qWWRNUSIsImNpZCI6Ijc1OFlUT01OZ0U4UzA4MW5jSEJmNUEiLCJsaWQiOiJ0Ml92OWFyeTlvdCIsImFpZCI6InQyX3Y5YXJ5OW90IiwibGNhIjoxNjcyMjIzODM5MDAwLCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyJ9.hal1L4-snSsj-yfWhWi-HxRd8n1lTXJQu5U7sOJNxCuV-BHaTmHHlCja4-pRP9zbpaUx0gpVtTrsbJCF3K9kwaK7TmhXWiQfyp4nHOSdoJaVcnsK78vGy0mVF8DWpD0K2JOfgYCiLc3U4DXDCnbAS9W_vv566fgdkS3tYLM3gIdEOrRMH7dRiUKKc4Y9zVRw6Bo1Bl-keUZBQDQECybhNic_xahykNs6uM-KsGc1DGLdKHqrX6j1XvNRV5-NgqwDkbiIUGQHDaSUFagBfQT-WybEJbKm2NJd_aR2dYQgzlIioQKzsxE1jTuxlTaab4VAU8AwXkFiWns-P1CBEO67nQ',
                'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
              }
            }
          );
  
          const jsonData = response.data.data.children;
          const postsArray = jsonData.map((post) => ({
            title: post.data.title,
            hashtag: post.data.link_flair_text || '',
            created: new Date(post.data.created_utc * 1000).toLocaleString(),
            likes: post.data.ups,
            comments: post.data.num_comments,
            followers: post.data.subreddit_subscribers           
          }));
          setHashtags(postsArray);
          console.log(postsArray);
  
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);
  

    

    const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchValue(searchText);
    let results = hashtags;
    if (searchText) {
      results = hashtags.filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase()));
    }
    setHashtags(results);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = hashtags.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = pageNumber => setCurrentPage(pageNumber);


  return (
    <div>
      {/* <Navbarr/> */}
      <Container style={{border:'1px solid rgb(212, 211, 211)'}}>
          <Row>
          <Col xs={8} sm={8} md={12} lg={12}>
          <div style={{display:"flex"}}><ArrowBack/>
          <h5 className='campaignHeaderAC' >Hashtags</h5></div>
                <div className="ms-4 d-lg-flex d-xs-block">
                  <div className="align-item-center"><h6>All HashTags ({hashtags.length})</h6></div>
                  <div className="d-flex">
                      <input  style={{height:"25px"}} placeholder="Search by name &#x1F50D;"/>
                      <button 
                        type="button" 
                        className="btn btn-outline-dark d-flex align-items-center" 
                        data-mdb-ripple-color="dark" 
                        style={{fontSize:"12px",height:"25px"}}><AddIcon style={{fontSize:"12px",height:"25px"}}/>Create</button>
                    </div>
                    <div className="d-flex d-xs-justify-center d-xs-align-center">
                      <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><FilterList style={{fontSize:"12px",height:"25px"}} />Filter</button>
                      <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><ArrowDropDown style={{fontSize:"12px",height:"25px"}} />To</button>
                      <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><ArrowDropDown style={{fontSize:"12px",height:"25px"}} />From</button>
                    </div>
                </div>
          </Col> 
        </Row>
            <div className="tablee">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                    <th className="">Campaign</th>
                    <th className="" scope="col">Hashtag</th>
                    <th className="" scope="col">Created</th>
                    <th className="" scope="col">Comments</th>
                    <th className="" scope="col">Likes</th>
                    <th className="" scope="col">Follower</th>
                </tr>
               </thead>
              <tbody style={{border:'1px solid rgb(212, 211, 211)'}} className="">
                        {currentItems.map(item => {
                          return (
                              <tr>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="campaignNameHT">{item.title.slice(0,15)}...</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="brandLogoHT">{item.hashtag}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="startDateHT">{item.created}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="hashtagHT">{item.comments}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="hashtagHT">{item.likes}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="hashtagHT">{item.followers}</p></td>
                              </tr> )})}
                      <Pagintation
                          itemsPerPage={itemsPerPage}
                          totalItems={hashtags.length}
                          paginate={paginate}/>
                </tbody>      
          </table>
          </div>
      </Container>
      </div>
  );
}
export default Hashtags;
