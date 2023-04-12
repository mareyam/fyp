import React,{useState} from 'react';
import AllStoriesList from "./AllStoriesList";
import { Button } from 'react-bootstrap';
import { ArrowBack, Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import '../../../Style/BrandManagerPanel/PostsAndStories/AllStories.css';
import { Container, Row, Col } from 'react-grid-system';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import CampaignIcon from '@mui/icons-material/Campaign';

const AllStories = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
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
        );
      };
    
      const Pagintation = () => {
        const [currentPage, setCurrentPage] = useState(1);
        const [itemsPerPage] = useState(3);
        const [searchValue, setSearchValue] = useState('');
        const [filteredResults, setFilteredResults] = useState(AllStoriesList);
        
        const handleSearch = (event) => {
            const searchText = event.target.value;
            setSearchValue(searchText);
            let results = AllStoriesList;
            if (searchText) {
            results = AllStoriesList.filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase()));
            }
            setFilteredResults(results);
        }
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = filteredResults.slice(indexOfFirstItem, indexOfLastItem);
      
        const paginate = pageNumber => setCurrentPage(pageNumber);
      
  return (
    <Container className="mt-2" style={{border:"1px solid rgb(198, 198, 198)"}}>
      <div className='d-lg-flex d-sm-block'>
      `<Col xs={12} sm={12} md={2} lg={2} className="mt-5" > 
            <div className='d-lg-block d-xs-flex'>
            <a href="BMCampaignDetails"><img className="influencerImage"src='https://media.istockphoto.com/id/487787108/photo/can-of-coca-cola-on-ice.jpg?s=612x612&w=0&k=20&c=xDSO_nl0qeDMBZJBJk09jj5_UeQkyQ70QdXuDMByCaY='></img></a>
            <div style={{textAlign:"center"}}><h6>Ali Zafar</h6>
            <p style={{fontSize:"12px"}}>@ali_zafar</p>
            <p style={{fontSize:"12px"}}><b>Posts:</b> 1,294</p>
            <p style={{fontSize:"12px"}}><b>Followers:</b> 1,294</p>
            <p style={{fontSize:"12px"}}><b>Following:</b> 1,294</p>
            <button type="button" className="btn btn-dark d-flex align-items-center justify-content-center" data-mdb-ripple-color="dark" style={{ marginTop:"-10px", fontSize: "12px", height: "35px", width: '100%' }}>
                      <a href="/BMDashboard"><p style={{ fontSize: '12px', margin: '0px', paddingRight:"10px" }}>Inactive Campaign</p></a>
                      <CampaignIcon style={{ fontSize: "12px", height: "25px" }} />
             </button>
            <button type="button" className="btn btn-dark d-flex align-items-center justify-content-center" data-mdb-ripple-color="dark" style={{ marginTop:"-10px", fontSize: "12px", height: "35px", width: '100%' }}>
                      <a href="/BMPDF"><p style={{ fontSize: '12px', margin: '0px',paddingRight:"10px" }}>PDF Report</p></a>
                      <PictureAsPdfIcon style={{ fontSize: "12px", height: "25px" }} />
            </button>
            <button type="button" className="btn btn-dark d-flex align-items-center justify-content-center" data-mdb-ripple-color="dark" style={{ marginTop:"-10px", fontSize: "12px", height: "35px", width: '100%' }}>
                      <a href="/BMStats"><p style={{ fontSize: '12px', margin: '0px',paddingRight:"10px" }}>View Stats</p></a>
                      <QueryStatsIcon style={{ fontSize: "12px", height: "25px" }} />
            </button></div></div>
      </Col>`

        <Col xs={12} sm={12} md={6} lg={8}>
          <div className="d-flex mt-3">
            <h6>All Stories from coke</h6>
            <input className="mx-2" type="text" placeholder="Search for story" value={searchValue} onChange={handleSearch} />
          </div>
          <div>
            {currentItems.map(item => {
                return (
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <div style={{}} className="subContainerAS my-2 d-lg-flex">
                            <div><img className="storyImageAS" src={`http://127.0.0.1:8000/${item.image}`} /></div>
                            <div className='d-lg-flex d-sm-block d-xs-block'>
                              <div className="mx-2 d-flex" style={{alignItems:"center"}}>
                                <div><img className="imageAS" src='https://static.toiimg.com/thumb/56200851.cms?width=170&height=240&imgsize=88803' /></div>
                                <div style={{marginLeft:'5px'}}><p style={{fontSize:"12px", marginTop:'30px'}}>{item.name}</p>
                                <p style={{fontSize:"12px", marginTop:"-15px"}}>{item.username}</p></div>
                              </div>
                              <div style={{textAlign:"left", alignItems:"center", justifyContent:"left", width: "auto", marginTop:"30px" }} className="mx-5">
                                <b><p style={{fontSize:"12px"}} className='costAS'>cost: Rs.{item.cost}</p></b>
                                <p style={{fontSize:"12px", marginTop:"-10px"}} className="dateAS">date: {item.date}</p>
                                <p style={{fontSize:"12px", marginTop:"-10px"}} className="hashtagAS">hashtag: #{item.hashtag}</p>
                              </div>
                            </div>
                        </div>
                    </Col>
                )})}
              <AllStories
                itemsPerPage={itemsPerPage}
                totalItems={filteredResults.length}
                paginate={paginate}/>
            
          </div>
        </Col>
      </div>
    </Container>  
       
  );
}

export default Pagintation;

// import React from 'react';
// import { isCompositeComponentWithType } from 'react-dom/test-utils';
// import '../Style/campaigns.css';
// import AllStoriesList from "./CampaignsList";
// import { Button } from 'react-bootstrap';
// import { Search } from '@material-ui/icons';
// import AddIcon from '@material-ui/icons/Add';

// const Campaigns = () => {
//   return (
//     <div style={{margin: '1%'}}>
//       <h5>DashBoard</h5>
//       <div style={{display: "flex"}}>
//         <h6 style={{marginRight:"10px"}}>Active Campaigns</h6>
//         <input style={{height:"25px"}} type="text"></input><Search className="mx-3"/>
//         <Button style={{height:"25px"}} >
//           <div style={{marginTop:"-6px"}}>
//              <AddIcon style={{fontSize:"15px"}}/>Create
//           </div>
//         </Button>
//         <a  href="#" className="mx-3">View all campaigns</a>
//       </div>
//     <div className="mainContainerC" style={{display: 'flex', flexWrap: "nowrap"}}>
        
//       {AllStoriesList.map(item => {
//         return (
//             <div className="subContainerC" >
//                 <div>
//                 <div><img className="imageC" src={item.image}/></div>
//                 <div style={{display: 'flex',justifyContent:'space-between'}}>
//                 <p className='typeC'>{item.type}</p>
//                     <p className="hashtagC">{item.hashtag}</p>
//                 </div>
//                 <h3 className='nameC'>{item.name}</h3>
//                 <p className='influencersC'>{item.influencers}</p>
//                 <p className='dateC'>{item.startDate}</p>
//                 </div>
//             </div>
//         )})}
//     </div>
//     </div>
//   );
// }

// export default Campaigns;


//   return (
//     <Container style={{ margin: '1%' }}>
//       <Row>
//         <Col xs={12} sm={12} md={6} lg={6}>
//           <h5>DashBoard</h5>
//         </Col>
//         <Col xs={12} sm={12} md={6} lg={6}>
//           <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//             <Button style={{ height: '25px' }}>
//               <AddIcon style={{ fontSize: '15px' }} />
//               Create
//             </Button>
//             <a href="#" className="mx-3">
//               View all campaigns
//             </a>
//           </div>
//         </Col>
//       </Row>
//       <Row>
//         <Col xs={12} sm={12} md={6} lg={6}>
//           <h6 style={{ marginRight: '10px' }}>Active Campaigns</h6>
//         </Col>
//         <Col xs={12} sm={12} md={6} lg={6}>
//           <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//             <input
//               style={{ height: '25px' }}
//               type="text"
//               value={searchValue}
//               onChange={handleSearch}
//             />
//             <Search className="mx-3" />
//           </div>
//         </Col>
//       </Row>
//       <Row>
//         <Col xs={12}>
//           <div className="mainContainerC" style={{ display: 'flex', flexWrap: 'wrap' }}>
//             {filteredResults.map(item => (
//               <div className="subContainerC">
//                 <div>
//                   <div>
//                     <img className="imageC" src={item.image} alt="campaign image" />
//                   </div>
//                   <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                     <p className="typeC">{item.type}</p>
//                     <p className="hashtagC">{item.hashtag}</p>
//                   </div>
//                   <h3 className="nameC">{item.name}</h3>
//                 </div>
//                 </div>
//             ))}</div>
//             </Col>
//             </Row>
//             </Container>
//   )}

// export default Campaigns;