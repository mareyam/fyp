import axios from "axios"
import React,{useState, useEffect} from 'react';
import RegisteredInfluencersList from "./RegisteredInfluencersList";
import '../../../Style/BrandManagerPanel/brandManagerDashboard/registeredInfluencers.css';
import { Container, Row, Col } from 'react-grid-system';

const RegisteredInfluencers = () => {
  const [influencers, setInfluencers] = useState([]);


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/newinfluencers/')
      .then(response => {
        setInfluencers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  return (
    <div className='mainContainerRI'>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <div className='mainContainerHeadersRI'style={{display:"flex"}}>
            <h5 className=''>Registered Influencers ({RegisteredInfluencersList.length})</h5>
            <a href="/BMCampaigns" className="mx-3 text-dark"><p><u style={{fontSize:'13px'}}>View all</u></p></a>
          </div>
        </Col>
      </Row>

  <Row className="mx-1" >
    {influencers.map(item => (
      <Col xs={5} sm={5} md={4} lg={3} className="subContainerRI m-1">
        <Col xs={5} lg={3}>
          <img className="imageRI" src={`http://127.0.0.1:8000/${item.image}`} />  
        </Col>
        <Col xs={12} lg={12}>
            <div className="ColDetailsRI" style={{ width: '100%', height: '100%', overflow: 'hidden'}}>
              <p className='nameRI'>{item.fullname.slice(0, 15)}</p>
              <p className='usernameRI'>@{item.username.slice(0, 12)}</p>
            </div>
        </Col>
      </Col>

    ))}
  </Row>
</div>

    );
}

export default RegisteredInfluencers;
















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

      // <div className='container mx-2'>
    //   <div style={{display:"flex"}}>
    //     <div>
    //       <h6 style={{marginRight:"10px"}}>Registred Inflencers ({RegisteredInfluencersList.length})</h6>
    //       {/* <p style={{fontSize:"12px"}}>List of influencers registered with you</p> */}
    //     </div>
    //     {/* <Search style={{fontSize:"20px"}}className="mx-3"/> */}
    //     <input style={{height:"25px"}} type="text" value={searchValue} onChange={handleSearch}></input>
    //     <p style={{fontSize:"13px"}}>View all</p>
    //     <p className="mx-2" style={{fontSize:"13px"}}>Filters</p> 
    //   </div>
    //   <Grid item xs={12} container spacing={2} className="mainContainerRI">
    //    {filteredResults.map(item => {
    //     return (
    //       <Grid className="subContainerRI m-1" item lg={6} xs={12}>
    //             <div><img className="imageRI" src={item.image}/></div>
    //             <div>
    //                 <h3 className='nameRI'>{item.name}</h3>
    //                 <p className='usernameRI'>{item.hashtag}</p>
    //                 <p className='detailsRI'>{item.type}</p>
    //             </div>
    //       </Grid>
    //     )})}
    //   </Grid>
    // </div>
