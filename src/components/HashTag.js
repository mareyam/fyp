import React,{useState} from 'react';
import '../Style/HashTag.css';
import HashTagList from './HashTagList';
import { Grid } from '@material-ui/core';

const HashTag = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredResults, setFilteredResults] = useState(HashTagList);
  
  const handleSearch = (event) => {
  setSearchValue(event.target.value);
  let results;
  if (searchValue === '') {
    results = HashTagList;
  } else {
    results = HashTagList.filter((campaign) => campaign.hashtags.includes(searchValue));
  }
  setFilteredResults(results);
  }

  return (
    <div className="topContainer">
      <div style={{display:"flex"}}>
        <h6>HashTags</h6>
        <input style={{height:"25px"}} type="text" value={searchValue} onChange={handleSearch} />
         {/* <p style={{fontSize:"12px"}}>All your hashtags stastics</p> */}
         </div>
     <Grid item xs={12} container spacing={2} className="mainContainer2HT">
        <Grid item xs={6} md={6} lg={6} container spacing={0}>
            {/* <p style={{fontSize:"12px"}}className="">HashTags</p>
            <p style={{fontSize:"12px",}}className="mx-5">Posts</p>
            <p style={{fontSize:"12px"}}className="mx-1">Likes</p> */}
            {/* <p style={{fontSize:"12px"}}className="">Comments</p> */}
        </Grid>
        <div className="mainContainerHT">
       {filteredResults.map(item => {
        return (
          <Grid className="subContainerHT mx-auto" item lg={12} container spacing={0}>
            <p className="hashtagsHT">{item.hashtags}</p>
            <p className="postsHT mx-5">{item.posts}</p>
            <p className="likesHT mx-5">{item.likes}</p>
            <p className="commentsHT mx-5">{item.comments}</p>
            <a href="" className="detailsHT mx-4">Details</a>
           </Grid>
        )})}
        </div>
      </Grid>
    </div>
    
        );
      }
export default HashTag;