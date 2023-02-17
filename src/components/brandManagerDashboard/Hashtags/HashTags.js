import React,{useState} from 'react';
import HashTagList from './HashTagList';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../Style/brandManagerDashboard/HashTag.css';
import { ArrowBack, Search, FilterList, ArrowDropDown } from '@material-ui/icons';
import AddIcon from '@mui/icons-material/Add';

const Hashtag = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
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
  const [itemsPerPage] = useState(7);
  const [searchValue, setSearchValue] = useState('');
  const [filteredResults, setFilteredResults] = useState(HashTagList);
  
    const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchValue(searchText);
    let results = HashTagList;
    if (searchText) {
      results = HashTagList.filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase()));
    }
    setFilteredResults(results);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);


  return (
      <Container style={{border:'1px solid rgb(212, 211, 211)'}}>
          <Row>
          <Col xs={8} sm={8} md={12} lg={12}>
          <div style={{display:"flex"}}><ArrowBack/>
          <h5 className='campaignHeaderAC' >Hashtags</h5></div>
                <div className="ms-4 d-lg-flex d-xs-block">
                  <div className="align-item-center"><h6>All HashTags ({HashTagList.length})</h6></div>
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
            {/* <div className="mainContainerHT" style={{border:'2px solid green'}}>
              <table>
                <thead>
                  <tr>
                    <th>Campaign</th>
                    <th>Brands</th>
                    <th>Created</th>
                    <th>End Date</th>
                    <th>Hashtag</th>
                    <th>Type</th>
                    <th>Total posts</th>
                    <th>Status</th>
                  </tr>
                </thead>
            <tbody style={{border:'2px solid red'}}>
              {currentItems.map(item => {
                return (
                  
              <Col sm={12} xs={12} md={12} lg={12} className="subContainerHT">
                   <tr>
                   <td style={{border:'2px solid red'}}><p className="campaignNameHT">{item.campaignName}</p></td>
                   <td style={{border:'2px solid red'}}><p className="brandLogoHT mx-4">{item.brandLogo}</p></td>
                   <td style={{border:'2px solid red'}}><p className="startDateHT mx-4">{item.startDate}</p></td>
                   <td style={{border:'2px solid red'}}><p className="endDateHT mx-4">{item.endDate}</p></td>
                   
                   <td style={{border:'2px solid red'}}><p className="hashtagHT mx-4">{item.hashtag}</p></td>
                   <td style={{border:'2px solid red'}}><p className="typeHT mx-4">{item.type}</p></td>
    
                   <td style={{border:'2px solid red'}}><p className="totalPostsHT mx-4">{item.totalPosts}</p></td>
                   <td style={{border:'2px solid red'}}><p className="statusHT mx-4">{item.status}</p></td>
                   </tr>
                     
                </Col>)})}
                <Hashtag
                    itemsPerPage={itemsPerPage}
                    totalItems={filteredResults.length}
                    paginate={paginate}
                />
                </tbody>                
                </table>
            </div> */}
            <div className="tablee">
            <table class="table">
              <thead class="thead-dark">
                <tr>
                    <th className="">Campaign</th>
                    <th className="" scope="col">Brands</th>
                    <th className="" scope="col">Created</th>
                    <th className="" scope="col">End Date</th>
                    <th className="" scope="col">Hashtag</th>
                    <th className="" scope="col">Type</th>
                    <th className="" scope="col">Total posts</th>
                    <th className="" scope="col">Status</th>
                </tr>
               </thead>
              <tbody style={{border:'1px solid rgb(212, 211, 211)'}} className="">
                        {currentItems.map(item => {
                          return (
                              <tr>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="campaignNameHT">{item.campaignName}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="brandLogoHT">{item.brandLogo}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="startDateHT">{item.startDate}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="endDateHT">{item.endDate}</p></td>
                                  
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="hashtagHT">{item.hashtag}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="typeHT">{item.type}</p></td>
                    
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="totalPostsHT">{item.totalPosts}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="statusHT">{item.status}</p></td>
                              </tr> )})}
                      <Hashtag
                          itemsPerPage={itemsPerPage}
                          totalItems={filteredResults.length}
                          paginate={paginate}/>
                </tbody>      
          </table>
          </div>
      </Container>
  );
}
export default Pagintation;

// import React,{useState} from 'react';
// import HashTagList from './HashTagList';
// import { Grid } from '@material-ui/core';
// import '../../../Style=/brandManagerDashboard/HashTag.css';
// import HashTag from './HashTags';


// const HashTag = () => {
//   const [searchValue, setSearchValue] = useState('');
//   const [filteredResults, setFilteredResults] = useState(HashTagList);
  
//   const handleSearch = (event) => {
//   setSearchValue(event.target.value);
//   let results;
//   if (searchValue === '') {
//     results = HashTagList;
//   } else {
//     results = HashTagList.filter((campaign) => campaign.hashtags.includes(searchValue));
//   }
//   setFilteredResults(results);
//   }

//   return (
//     <div className="topContainer">
//       <div style={{display:"flex"}}>
//         <h6>HashTags</h6>
//         <input style={{height:"25px"}} type="text" value={searchValue} onChange={handleSearch} />
//          {/* <p style={{fontSize:"12px"}}>All your hashtags stastics</p> */}
//          </div>
//      <Grid item xs={12} container spacing={2} className="mainContainer2HT">
//         <Grid item xs={6} md={6} lg={6} container spacing={0}>
//             {/* <p style={{fontSize:"12px"}}className="">HashTags</p>
//             <p style={{fontSize:"12px",}}className="mx-5">Posts</p>
//             <p style={{fontSize:"12px"}}className="mx-1">Likes</p> */}
//             {/* <p style={{fontSize:"12px"}}className="">Comments</p> */}
//         </Grid>
//         <div className="mainContainerHT">
//        {filteredResults.map(item => {
//         return (
//           <Grid className="subContainerHT mx-auto" item lg={12} container spacing={0}>
//             <p className="hashtagsHT">{item.hashtags}</p>
//             <p className="postsHT mx-5">{item.posts}</p>
//             <p className="likesHT mx-5">{item.likes}</p>
//             <p className="commentsHT mx-5">{item.comments}</p>
//             <a href="" className="detailsHT mx-4">Details</a>
//            </Grid>
//         )})}
//         </div>
//       </Grid>
//     </div>
    
//         );
//       }
// export default HashTag;