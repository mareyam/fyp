import React,{useState} from 'react';
import '../Style/registeredInfluencers.css';
import RegisteredInfluencersList from "../components/RegisteredInfluencersList";
import { Grid } from '@material-ui/core';
import { Search } from '@material-ui/icons';

const RegisteredInfluencers = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredResults, setFilteredResults] = useState(RegisteredInfluencersList);
  
  const handleSearch = (event) => {
  setSearchValue(event.target.value);
  let results;
  if (searchValue === '') {
    results = RegisteredInfluencersList;
  } else {
    results = RegisteredInfluencersList.filter((campaign) => campaign.name.includes(searchValue));
  }
  setFilteredResults(results);
  }


 
  return (
    <div className='container mx-2'>
      <div style={{display:"flex"}}>
        <div>
          <h6 style={{marginRight:"10px"}}>Registred Inflencers ({RegisteredInfluencersList.length})</h6>
          {/* <p style={{fontSize:"12px"}}>List of influencers registered with you</p> */}
        </div>
        {/* <Search style={{fontSize:"20px"}}className="mx-3"/> */}
        <input style={{height:"25px"}} type="text" value={searchValue} onChange={handleSearch}></input>
        <p style={{fontSize:"13px"}}>View all</p>
        <p className="mx-2" style={{fontSize:"13px"}}>Filters</p> 
      </div>
      <Grid item xs={12} container spacing={2} className="mainContainerRI">
       {filteredResults.map(item => {
        return (
          <Grid className="subContainerRI m-1" item lg={6} xs={12}>
                <div><img className="imageRI" src={item.image}/></div>
                <div>
                    <h3 className='nameRI'>{item.name}</h3>
                    <p className='usernameRI'>{item.hashtag}</p>
                    <p className='detailsRI'>{item.type}</p>
                </div>
          </Grid>
        )})}
      </Grid>
    </div>
    // <div style={{margin: '5%'}}>
    // <div className="mainContainerRI" style={{display: 'flex', flexWrap: "nowrap", border: "2px solid red"}}>
        
    //   {RegisteredInfluencersList.map(item => {
    //     return (
    //         <div className="subContainerRI" >
    //             <div><img className="imageRI" src={item.image}/></div>
    //             <div>
    //                 <h3 className='nameRI'>{item.name}</h3>
    //                 <p className='usernameRI'>{item.hashtag}</p>
    //                 <p className='detailsRI'>{item.type}</p>
    //             </div>
    //         </div>
    //     )})}
    // </div>
    // </div>
  );
}

export default RegisteredInfluencers;
