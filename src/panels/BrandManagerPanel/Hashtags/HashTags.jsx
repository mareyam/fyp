import axios from "axios";
import React,{useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../Style/BrandManagerPanel/brandManagerDashboard/HashTag.css';
import { ArrowBack, Search, FilterList, ArrowDropDown } from '@material-ui/icons';
import AddIcon from '@mui/icons-material/Add';

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
  

  useEffect(() => {
      axios.get('http://127.0.0.1:8000/hashtags/')
        .then(response => {
          setHashtags(response.data);
        })
        .catch(error => {
          console.error(error);
        });
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
                    <th className="" scope="col">Brands</th>
                    <th className="" scope="col">Created</th>
                    {/* <th className="" scope="col">End Date</th> */}
                    <th className="" scope="col">Hashtag</th>
                    {/* <th className="" scope="col">Type</th> */}
                    <th className="" scope="col">Total posts</th>
                    {/* <th className="" scope="col">Status</th> */}
                </tr>
               </thead>
              <tbody style={{border:'1px solid rgb(212, 211, 211)'}} className="">
                        {currentItems.map(item => {
                          return (
                              <tr>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="campaignNameHT">{item.campaign_hashtag}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="brandLogoHT">{item.brandLogo}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="startDateHT">{item.created}</p></td>
                                  {/* <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="endDateHT">{item.endDate}</p></td> */}
                                  
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="hashtagHT">{item.hashtag}</p></td>
                                  {/* <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="typeHT">{item.type}</p></td> */}
                    
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="totalPostsHT">{item.total_posts}</p></td>
                                  {/* <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="statusHT">{item.status}</p></td> */}
                              </tr> )})}
                      <Pagintation
                          itemsPerPage={itemsPerPage}
                          totalItems={hashtags.length}
                          paginate={paginate}/>
                </tbody>      
          </table>
          </div>
      </Container>
  );
}
export default Hashtags;
