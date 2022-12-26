import React,{useState} from 'react';
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import '../Style/campaigns.css';
import CampaignList from "./CampaignsList";
import { Button } from 'react-bootstrap';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';

const Campaigns = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredResults, setFilteredResults] = useState(CampaignList);
  
  const handleSearch = (event) => {
  setSearchValue(event.target.value);
  let results;
  if (searchValue === '') {
    results = CampaignList;
  } else {
    results = CampaignList.filter((campaign) => campaign.name.includes(searchValue));
  }
  setFilteredResults(results);
  }


  return (
    <div style={{margin: '1%'}}>
      <h5>DashBoard</h5>
      <div style={{display: "flex"}}>
        <h6 style={{marginRight:"10px"}}>Active Campaigns</h6>
        {/* <input style={{height:"25px"}} type="text"></input><Search className="mx-3"/> */}
        <input style={{height:"25px"}} type="text" value={searchValue} onChange={handleSearch} />
        <Button style={{height:"25px"}} >
          <div style={{marginTop:"-6px"}}>
             <AddIcon style={{fontSize:"15px"}}/>Create
          </div>
        </Button>
        <a  href="#" className="mx-3">View all campaigns</a>
      </div>
    <div className="mainContainerC" style={{display: 'flex', flexWrap: "nowrap"}}>
        
      {filteredResults.map(item => {
        return (
            <div className="subContainerC" >
                <div>
                <div><img className="imageC" src={item.image}/></div>
                <div style={{display: 'flex',justifyContent:'space-between'}}>
                <p className='typeC'>{item.type}</p>
                    <p className="hashtagC">{item.hashtag}</p>
                </div>
                <h3 className='nameC'>{item.name}</h3>
                <p className='influencersC'>{item.influencers}</p>
                <p className='dateC'>{item.startDate}</p>
                </div>
            </div>
        )})}
    </div>
    </div>
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
