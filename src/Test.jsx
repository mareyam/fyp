import axios from "axios"
import {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, Row, Col } from 'react-bootstrap';
import './Style/BrandManagerPanel/NewCampaigns/newCampaigns.css'
import { ArrowBack } from '@material-ui/icons';
import { Card, Button } from 'react-bootstrap';
import AddIcon from '@mui/icons-material/Add';


const NewCampaign = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [influencers, setInfluencers] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [storyCost, setStoryCost] = useState(0);
  const [postCost, setPostCost] = useState(0);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/influencers/')
      .then((response) => {
        setInfluencers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  //make campaign live
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleInfluencerChangeStory = (index, e) => {
    const updatedInfluencers = [...influencers];
    updatedInfluencers[index].story = e.target.checked;
    setInfluencers(updatedInfluencers);

    const cost = e.target.checked ? influencers[index].influencerStoryCost : -influencers[index].influencerStoryCost;
    setStoryCost(storyCost + cost);
  };

  const handleInfluencerChangePost = (index, e) => {
    const updatedInfluencers = [...influencers];
    updatedInfluencers[index].post = e.target.checked;
    setInfluencers(updatedInfluencers);

    const cost = e.target.checked ? influencers[index].influencerInfluencerPostCost : -influencers[index].influencerInfluencerPostCost;
    setPostCost(postCost + cost);
  };

  const removeInfluencer = (indexToRemove) => {
  const removedInfluencer = influencers[indexToRemove];
  const updatedInfluencers = influencers.filter((_, index) => index !== indexToRemove);
  setInfluencers(updatedInfluencers);

  const storyCostChange = removedInfluencer.story ? -removedInfluencer.influencerStoryCost : 0;
  const postCostChange = removedInfluencer.post ? -removedInfluencer.influencerInfluencerPostCost : 0;
  setStoryCost(storyCost => storyCost + storyCostChange);
  setPostCost(postCost => postCost + postCostChange);
};

const fetchInfluencers = () => {
  axios
    .get('http://127.0.0.1:8000/influencers/')
    .then((response) => {
      setInfluencers(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

  useEffect(() => {
    // Calculate the total cost based on the sum of storyCost and postCost
    setTotalCost(storyCost + postCost);
  }, [storyCost, postCost]);


const handleCreateCampaign = async (campaignData) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/activecampaigns/', campaignData);
      console.log(response.data);
      // Do something with the response, such as show a success message
    } catch (error) {
      console.error(error);
      // Handle the error, such as showing an error message to the user
    }
  };


  return (
    <Container className="mt-2" style={{border:"1px solid rgb(198, 198, 198)"}}>
      <Row>
       <div className="pickedInfluencers" style={{display: 'flex', flexWrap: "nowrap"}}> 
            {influencers.map((item,index) => {
               const campaignData = {
                influencer_full_name : item.influencer_full_name,
                influencer_username : item.influencer_username,
                influencers: influencers.map((influencer) => influencer.id),
                storyCost: storyCost,
                postCost: postCost,
                totalCost: totalCost
              }

              return (
                <Col xs={8} sm={8} md={2} lg={2}>
                  <div className="subContainerNC" style={{overflow:'hidden'}}>
                    <img className='imageNC' src={`http://127.0.0.1:8000/${item.image}`}/>
                    <p className='nameNC'>{item.influencer_full_name.slice(0, 15)}...</p>
                    <p className='userNameNC'>@{item.influencer_username}</p>
                    <p className='EngagementRateNC'>Engagement Rate</p>
                    <p className='NumberNC'>{item.engagement_rate}</p>

                    <input
                      type="checkbox"
                      checked={item.story}
                      onChange={(e) => handleInfluencerChangeStory(index, e)}
                    />
                    <label>Story {item.influencerStoryCost}</label>

                    <input
                      type="checkbox"
                      checked={item.post}
                      onChange={(e) => handleInfluencerChangePost(index, e)}
                    />
                    <label>Post {item.influencerInfluencerPostCost}</label>


                    <button style={{backgroundColor:'red', borderRadius:'50%'}} onClick={() => removeInfluencer(index)}>-</button>
                  </div>
                </Col>

              )})}
           </div>

           <div className="d-lg-flex justify-content-between align-items-end d-sm-block " style={{border:'2px solid red'}}>
              <div>
                  <input
                    className='inputNC'
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  />
                  <label>Make Campaign Live</label>
              </div>
              <Button style={{backgroundColor: '#452c63'}}>
                  <AddIcon style={{ fontSize: '15px' }} />
                  Add Influencer
              </Button>

              <div className="d-block">
                <p>Total Cost: {totalCost}</p>
                <Button style={{backgroundColor: '#452c63'}} onClick={handleCreateCampaign(campaignData)}>
                  Create Campaign
                </Button>
              </div>
           </div>
      </Row>
    </Container>
  )  
}

export default NewCampaign;



// const NewCampaign = () => {
//   const [selected, setSelected] = useState('single');
//   const [isChecked, setIsChecked] = useState(false);
//   const [influencers, setInfluencers] = useState([]);

//   useEffect(() => {
//     axios
//       .get('http://127.0.0.1:8000/influencers/')
//       .then((response) => {
//         setInfluencers(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//   };

//   const removeInfluencer = (indexToRemove) => {
//     setInfluencers(influencers.filter((_, index) => index !== indexToRemove));
//   };

//   const [totalCost, setTotalCost] = useState(0);
//   useEffect(() => {
//     setTotalCost(
//       influencers.reduce(
//         (total, influencer) =>
//           total +
//           (isChecked
//             ? influencer.influencerInfluencerPostCost + influencer.influencerStoryCost
//             : 0),
//         0
//       )
//     );
//   }, [influencers, isChecked]);

//   return (
//     <Container className="mt-2" style={{ border: '1px solid rgb(198, 198, 198)' }}>
//       <Row>
//         <div className="pickedInfluencers" style={{ display: 'flex', flexWrap: 'nowrap' }}>
//           {influencers.map((item, index) => (
//             <Col xs={8} sm={8} md={2} lg={2} key={index}>
//               <div className="subContainerNC" style={{ overflow: 'hidden' }}>
//                 <img className="imageNC" src={`http://127.0.0.1:8000/${item.image}`} />
//                 <p className="nameNC">{item.influencer_full_name.slice(0, 15)}...</p>
//                 <p className="userNameNC">@{item.influencer_username}</p>
//                 <p className="EngagementRateNC">Engagement Rate</p>
//                 <div>
//                   <input
//                     className="inputNC"
//                     type="checkbox"
//                     checked={isChecked}
//                     onChange={handleCheckboxChange}
//                   />
//                   <label htmlFor="influencerPost">Influencer Post: {item.influencerInfluencerPostCost}</label>
//                 </div>
//                 <div>
//                   <input
//                     className="inputNC"
//                     type="checkbox"
//                     checked={isChecked}
//                     onChange={handleCheckboxChange}
//                   />
//                   <label htmlFor="story">Story: {item.influencerStoryCost}</label>
//                 </div>
//                 <button
//                   style={{ backgroundColor: 'red', borderRadius: '50%' }}
//                   onClick={() => removeInfluencer(index)}
//                 >
//                   -
//                 </button>
//               </div>
//             </Col>
//           ))}
//         </div>

//         <div className="d-lg-flex justify-content-between align-items-end d-sm-block ">
//           <div>
//             <input className="inputNC" type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
//             <label htmlFor="liveCampaign">Make Campaign Live</label>
//           </div>
//           <div className="d-block">
//             <p>Total Cost: {totalCost}</p>
//             <Button style={{ backgroundColor: '#452c63' }}>Create Campaign</Button>
//               </div>
//            </div>
//       </Row>
//     </Container>
//   )  
// }

// export default NewCampaign;
         



// const NewCampaign = () => {
//   const [selected, setSelected] = useState('single');
//   const [isChecked, setIsChecked] = useState(false);
//   const [influencers, setInfluencers] = useState([]);
  
//   useEffect(() => {
//     axios
//       .get('http://127.0.0.1:8000/influencers/')
//       .then((response) => {
//         setInfluencers(response.data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const handleCheckboxChange = () => {
//     setIsChecked(!isChecked);
//   };


//   const removeInfluencer = (indexToRemove) => {
//     setInfluencers(influencers.filter((_, index) => index !== indexToRemove));
//   };



//   return (
//     <Container className="mt-2" style={{border:"1px solid rgb(198, 198, 198)"}}>
//       <Row>
//        <div className="pickedInfluencers" style={{display: 'flex', flexWrap: "nowrap"}}> 
//             {influencers.map((item,index) => {
//               return (
//                 <Col xs={8} sm={8} md={2} lg={2}>
//                   <div className="subContainerNC" style={{overflow:'hidden'}}>
//                     <img className='imageNC' src={`http://127.0.0.1:8000/${item.image}`}/>
//                     <p className='nameNC'>{item.influencer_full_name.slice(0, 15)}...</p>
//                     <p className='userNameNC'>@{item.influencer_username}</p>
//                     <p className='EngagementRateNC'>Engagement Rate</p>
//                     {/* <p className='NumberNC'>{item.engagement_rate}</p> */}
//                     <button style={{backgroundColor:'red', borderRadius:'50%'}} onClick={() => removeInfluencer(index)}>-</button>
//                   </div>
//                 </Col>
//               )})}
//            </div>

//            <div className="d-lg-flex justify-content-between align-items-end d-sm-block ">
//               <div>
//                   <input className='inputNC'
//                     type="checkbox"
//                     checked={isChecked}
//                     onChange={handleCheckboxChange}/>
//                   <label>Make Campaign Live</label>
//               </div>
//               <div className="d-block">
//                 <p>Total Cost: 500k</p>
//                 <Button style={{backgroundColor: '#452c63'}}>
//                   Create Campaign
//                 </Button>
//               </div>
//            </div>
//       </Row>
//     </Container>
//   )  
// }

// export default NewCampaign;