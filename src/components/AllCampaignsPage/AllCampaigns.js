import React,{useState} from 'react';
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import AllCampaignsList from "./AllCampaignsList";
import { Button } from 'react-bootstrap';
import { Search } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import "../../Style/AllCampaigns/AllCampaigns.css"
import { Grid } from '@material-ui/core';

const AllCampaigns = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredResults, setFilteredResults] = useState(AllCampaignsList);
  
  const handleSearch = (event) => {
  setSearchValue(event.target.value);
  let results;
  if (searchValue === '') {
    results = AllCampaignsList;
  } else {
    results = AllCampaignsList.filter((campaign) => campaign.name.includes(searchValue));
  }
  setFilteredResults(results);
  }

  return (
    <div style={{margin: '1%'}}>
      <h5>DashBoard</h5>
      <div style={{display: "flex"}}>
        <h6 style={{marginRight:"10px"}}>Active Campaigns</h6>
        {/* <input style={{height:"25px"}} type="text"></input><Search className="mx-3"/>\ */}
        <input style={{height:"25px"}} className="mx-3" type="text" value={searchValue} onChange={handleSearch} />
        <Button style={{height:"25px"}} >
          <div style={{marginTop:"-6px"}}>
             <AddIcon style={{fontSize:"15px"}}/>Create
          </div>
        </Button>
      </div>
    {/* <div className="mainContainerAC" style={{display: 'flex', flexWrap: "nowrap"}}> */}

     <Grid item xs={12} container spacing={2} className="mainContainerAC mx-4">
      {filteredResults.map(item => {
        return (
          <Grid className="subContainerAC mx-3 my-3" item lg={2} xs={12}>
                <div>
                <div><img className="imageAC" src={item.image}/></div>
                <div style={{display: 'flex',justifyContent:'space-between'}}>
                <p className='typeAC'>{item.type}</p>
                    <p className="hashtagAC">{item.hashtag}</p>
                </div>
                <h3 className='nameAC'>{item.name}</h3>
                <p className='influencersAC'>{item.influencers}</p>
                <p className='dateAC'>{item.startDate}</p>
                </div>
          </Grid>
        )})}
      </Grid>
    </div>    
    // </div> 
    );
}

export default AllCampaigns;
