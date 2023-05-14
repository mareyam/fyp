import axios from "axios"
import React,{useState, useEffect} from 'react';
import RegisteredInfluencersList from "./RegisteredInfluencersList";
import '../../../Style/BrandManagerPanel/brandManagerDashboard/registeredInfluencers.css';
import { Container, Row, Col } from 'react-grid-system';

const RegisteredInfluencers = () => {
  const [influencers, setInfluencers] = useState([]);


  // useEffect(() => {
  //   axios.get('http://127.0.0.1:8000/influencers/')
  //     .then(response => {
  //       setInfluencers(response.data);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://oauth.reddit.com/r/apple/search.json?q=apple&restrict_sr=on&limit=100',
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0MTI3NDA5LCJqdGkiOiIyNDQ5NTMxNzM4MjUzLU45U25PMTRHaTYyTzFoUmFtUmhIWld3cm1qWWRNUSIsImNpZCI6Ijc1OFlUT01OZ0U4UzA4MW5jSEJmNUEiLCJsaWQiOiJ0Ml92OWFyeTlvdCIsImFpZCI6InQyX3Y5YXJ5OW90IiwibGNhIjoxNjcyMjIzODM5MDAwLCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyJ9.hal1L4-snSsj-yfWhWi-HxRd8n1lTXJQu5U7sOJNxCuV-BHaTmHHlCja4-pRP9zbpaUx0gpVtTrsbJCF3K9kwaK7TmhXWiQfyp4nHOSdoJaVcnsK78vGy0mVF8DWpD0K2JOfgYCiLc3U4DXDCnbAS9W_vv566fgdkS3tYLM3gIdEOrRMH7dRiUKKc4Y9zVRw6Bo1Bl-keUZBQDQECybhNic_xahykNs6uM-KsGc1DGLdKHqrX6j1XvNRV5-NgqwDkbiIUGQHDaSUFagBfQT-WybEJbKm2NJd_aR2dYQgzlIioQKzsxE1jTuxlTaab4VAU8AwXkFiWns-P1CBEO67nQ',
              'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
            }
          }
        );
  
        const jsonData = response.data.data.children;
        const uniqueUsers = {};
  
        // Loop through the data and store unique users in an object
        jsonData.forEach((post) => {
          const author = post.data.author;
          if (!uniqueUsers[author]) {
            uniqueUsers[author] = {
              fullname: post.data.author_fullname,
              image: post.data.icon_img ? post.data.icon_img : 'https://i.pinimg.com/736x/10/a9/1b/10a91b37c6e5efb1cb18cebb1b4077ac.jpg'
            };
          }
        });
  
        const influencersArray = Object.keys(uniqueUsers).map((key) => ({
          username: key,
          fullname: uniqueUsers[key].fullname,
          image: uniqueUsers[key].image
        }));
  
        setInfluencers(influencersArray);
        // console.log(influencersArray);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, []);

  


  return (
    <div className='mainContainerRI'>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <div className='mainContainerHeadersRI'style={{display:"flex"}}>
            <h5 className=''>Registered Influencers ({influencers.length})</h5>
            <a href="/BMCampaigns" className="mx-3 text-dark"><p><u style={{fontSize:'13px'}}>View all</u></p></a>
          </div>
        </Col>
      </Row>

  <Row className="mx-1" >
    {influencers.map(item => (
      <Col xs={5} sm={5} md={4} lg={3} className="subContainerRI m-1">
        <Col xs={5} lg={3}>
          <img className="imageRI" src={item.image} />  
        </Col>
        <Col xs={12} lg={12}>
            <div className="ColDetailsRI" style={{ width: '100%', height: '100%', overflow: 'hidden'}}>
              <p className='nameRI'>{item.fullname}</p>
              <p className='usernameRI'>@{item.username}</p>
            </div>
        </Col>
      </Col>

    ))}
  </Row>
</div>

    );
}

export default RegisteredInfluencers;




// const RegisteredInfluencers = () => {
//   const [influencers, setInfluencers] = useState([]);


//   useEffect(() => {
//     axios.get('http://127.0.0.1:8000/influencers/')
//       .then(response => {
//         setInfluencers(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <div className='mainContainerRI'>
//       <Row>
//         <Col xs={12} sm={12} md={12} lg={12}>
//           <div className='mainContainerHeadersRI'style={{display:"flex"}}>
//             <h5 className=''>Registered Influencers ({RegisteredInfluencersList.length})</h5>
//             <a href="/BMCampaigns" className="mx-3 text-dark"><p><u style={{fontSize:'13px'}}>View all</u></p></a>
//           </div>
//         </Col>
//       </Row>

//   <Row className="mx-1" >
//     {influencers.map(item => (
//       <Col xs={5} sm={5} md={4} lg={3} className="subContainerRI m-1">
//         <Col xs={5} lg={3}>
//           <img className="imageRI" src={`http://127.0.0.1:8000/${item.image}`} />  
//         </Col>
//         <Col xs={12} lg={12}>
//             <div className="ColDetailsRI" style={{ width: '100%', height: '100%', overflow: 'hidden'}}>
//               <p className='nameRI'>{item.fullname.slice(0, 15)}</p>
//               <p className='usernameRI'>@{item.username.slice(0, 12)}</p>
//             </div>
//         </Col>
//       </Col>

//     ))}
//   </Row>
// </div>

//     );
// }

// export default RegisteredInfluencers;
















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
