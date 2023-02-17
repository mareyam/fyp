import React,{useState} from 'react';
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import CampaignList from "./CampaignsList";
import { Button } from 'react-bootstrap';
import { ArrowBack, Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import '../../../Style/brandManagerDashboard/campaigns.css';
import { Container, Row, Col } from 'react-grid-system';
import { Home, People } from '@mui/icons-material';

const Campaigns = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredResults, setFilteredResults] = useState(CampaignList);
  


  const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchValue(searchText);
    let results = CampaignList;
    if (searchText) {
      results = CampaignList.filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase()));
    }
    setFilteredResults(results);
  }
  return (
      <Row style={{border:"1px solid rgb(198, 198, 198)"}}>
        <Col xs={12} sm={12} md={6} lg={6}>
          <div className="d-flex">
            <h6>Active Campaigns</h6>
            <input type="text" placeholder="search for campaign" value={searchValue} onChange={handleSearch} />
           <Button>
              <div style={{marginTop:"-6px"}}>
                <AddIcon style={{fontSize:"15px"}}/>
              </div>
            </Button>
            <a href="/BMCampaigns" className="mx-3">View all</a>
          </div>
        </Col>

    <div className="mainContainerC" style={{display: 'flex', flexWrap: "nowrap"}}> 
      {filteredResults.map(item => {
        return (
            <div className="subContainerC" >
              <div><img className="imageC" src={item.image}/></div>
              <Row className='mt-2'>
                  <Col xs={12} sm={12} md={6} lg={7}>
                      <h3 className='nameC'>{item.name}</h3>
                      <p className='influencersC'><People style={{height:"15px"}}/>{item.influencers}</p>                      
                  </Col>
                  <Col xs={12} sm={12} md={6} lg={5}>
                      <p className="hashtagC">{item.hashtag}</p>
                      <p className='typeC'>{item.type}</p> 
                  </Col>
                </Row>
                <p className='dateC'>{item.startDate}</p>
                  {/* <div style={{display: 'flex',justifyContent:'space-between'}}>
                    <h3 className='nameC'>{item.name}</h3>
                    <div><p className="hashtagC">{item.hashtag}</p>
                    <p className='typeC'>{item.type}</p></div>
                  </div> */}
                  {/* <p className='influencersC'>{item.influencers}</p>
                  <p className='dateC'>{item.startDate}</p> */}
            </div>
        )})}
    </div>
    </Row>
  );
}

export default Campaigns;

// import React from 'react';
// import { isCompositeComponentWithType } from 'react-dom/test-utils';
// import '../Style/campaigns.css';
// import CampaignList from "./CampaignsList";
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
        
//       {CampaignList.map(item => {
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