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
                Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NDk4NDE1LCJpYXQiOjE2ODQ0MTIwMTUsImp0aSI6IjI0NDk1MzE3MzgyNTMtNlF5RTZLcVFfRnJhQ0w5RGk2aXVWeG5nQ1VzUkV3IiwiY2lkIjoiNzU4WVRPTU5nRThTMDgxbmNIQmY1QSIsImxpZCI6InQyX3Y5YXJ5OW90IiwiYWlkIjoidDJfdjlhcnk5b3QiLCJsY2EiOjE2NzIyMjM4MzkwMDAsInNjcCI6ImVKeUtWdEpTaWdVRUFBRF9fd056QVNjIiwiZmxvIjo5fQ.31-Qve-EMr261HJ4LMJilIFnkowoQyOxpS2BZklK2ofWX5qwqZJKTq5j61SSfseuQPG5U2eWKJjHh2lW8bQE3sdwNOG2991vCoQuwWHVf-GKbrqcM9lxE0q_5KmCkJcaPTo5ezkYQfcl10cSusUp_weuyKbEPBzOf3fWQJle7as5zhNaA0UUDDMoNcMwbhNpOx2qnzdDamzXVkEhYykieOy2Ad4NK7mCzjiDeLFWT0q91DVi_SlXwUd00MfE8gJGB4yBxwwrElyEo8GaBK0MeKHzUeqGCocEjB54TCmTVBAYfP_u1G1skilnyMh_dlLmteoFqcuHyojv7Q0bJDQHcA',
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
      <Container style={{border:'1px solid rgb(212, 211, 211)'}} className='mt-3'>
          <Row>
          <Col xs={8} sm={8} md={12} lg={12}>
          {/* <div style={{display:"flex"}}>
          <h5 className='campaignHeaderAC' >Hashtags</h5></div> */}
                <div className="ms-4 d-lg-flex d-xs-block">
                  <div className="align-item-center"><h6>All HashTags ({hashtags.length})</h6></div>
                  <div className="d-flex">
                      <input  style={{height:"25px"}} placeholder="Search by name &#x1F50D;"/>

                    </div>
                    <div className="d-flex d-xs-justify-center d-xs-align-center">
                      {/* <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><FilterList style={{fontSize:"12px",height:"25px"}} />Filter</button>
                      <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><ArrowDropDown style={{fontSize:"12px",height:"25px"}} />To</button>
                      <button type="button" className="btn btn-outline-dark d-flex align-items-center" data-mdb-ripple-color="dark" style={{fontSize:"12px",height:"25px"}}><ArrowDropDown style={{fontSize:"12px",height:"25px"}} />From</button> */}
                    </div>
                </div>
          </Col> 
        </Row>
            <div className="tablee">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                    <th className="" scope="col">Title</th>
                    <th className="" scope="col">Hashtag</th>
                    <th className="" scope="col">Created</th>
                    <th className="" scope="col">Comments</th>
                    <th className="" scope="col">Likes</th>
                    {/* <th className="" scope="col">Follower</th> */}
                </tr>
               </thead>
              <tbody style={{border:'1px solid rgb(212, 211, 211)'}} className="">
                        {currentItems.map(item => {
                          return (
                              <tr>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="campaignNameHT">{item.title.slice(0,70)}...</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="brandLogoHT">{item.hashtag}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="startDateHT">{item.created}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="hashtagHT">{item.comments}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="hashtagHT">{item.likes}</p></td>
                                  {/* <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="hashtagHT">{item.followers}</p></td> */}
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
