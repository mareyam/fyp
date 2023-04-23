import axios from "axios"
import React, {useEffect, useState} from 'react';
import './Style/BrandManagerPanel/NewCampaigns/newCampaigns.css'

function InfluencerList() {
  const [campaignName, setCampaignName] = useState('');
  const [influencers, setInfluencers] = useState([]);
  const [selectedInfluencers, setSelectedInfluencers] = useState([]);
  const [budget, setBudget] = useState(0);
  const [campaignType, setCampaignType] = useState('');
  const [date, setDate] = useState('');
  
  
  
 
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




  const handleCampaignNameChange = (event) => {
    setCampaignName(event.target.value);
  }

  
  const handleCampaignBudgetChange = (event) => {
    setBudget(event.target.value);
  }

  const handleDate = (event) => {
    setDate(event.target.value);
  }

  const handleCampaignType = (event) => {
    setCampaignType(event.target.value);
  }

   const handleCheckboxChange = (event, influencer) => {
     if (event.target.checked) {
       // Add user to selectedUsers list if checkbox is checked
       setSelectedInfluencers([...selectedInfluencers, influencer]);
     } else {
       // Remove user from selectedInfluencers list if checkbox is unchecked
       setSelectedInfluencers(selectedInfluencers.filter(selectedInfluencer => selectedInfluencer.id !== influencers.id));
    }
   }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      campaign_name: campaignName,
      influencers: selectedInfluencers.map(selectedInfluencer => selectedInfluencer.id),
      budget: budget,
      campaignType: campaignType
    };

    console.log(data);
    axios.post('http://127.0.0.1:8000/newactivecampaigns/', data)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

 

  return (
    <div>
      <h2>Create New Campaign</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="campaignName">Campaign Name:</label>
        <input type="text" id="campaignName" name="campaignName" value={campaignName} onChange={handleCampaignNameChange} />
     
        <label htmlFor="campaignBudget">Campaign budget:</label>
        <input type="text" id="budget" name="budget" value={budget} onChange={handleCampaignBudgetChange} />
     
        <label htmlFor="campaignType">Campaign type:</label>
        <input type="text" id="campaignType" name="campaignType" value={campaignType} onChange={handleCampaignType} />
     
    

        <label>Select Influencers: </label>
        {influencers.map(influencer => (
          <div key={influencer.id}>
            <input type="checkbox" id={influencer.id} name="influencers" value={influencer.id} onChange={(e) => handleCheckboxChange(e, influencer)} />
            <label htmlFor={influencer.id}>{influencer.influencer_username}</label>
           
          </div>
        ))}


        <label htmlFor="date">date:</label>
        <input type="text" id="date" name="date" value={date} onChange={handleDate} />
     


        <button type="submit">Create Campaign</button>
      </form>
    </div>
  );
}

export default InfluencerList;



// const NewCampaign = () => {
//   const [influencers, setInfluencers] = useState([]);
//   const [selectedInfluencers, setSelectedInfluencers] = useState([]);

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


//   const handleCheckboxChange = (event, user) => {
//     if (event.target.checked) {
//       // Add user to selectedUsers list if checkbox is checked
//       setSelectedInfluencers([...selectedInfluencers, user]);
//     } else {
//       // Remove user from selectedInfluencers list if checkbox is unchecked
//       setSelectedInfluencers(selectedInfluencers.filter(selectedInfluencer => selectedInfluencer.id !== influencers.id));
//     }
//   }


//   const handleOkButtonClick = async () => {
//     try {
//       const response = await fetch('http://127.0.0.1:8000/newactivecampaigns/', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(selectedInfluencers),
//       });
//       const data = await response.json();
//       console.log(data);
//       // Do something with the data, such as show a success message
//     } catch (error) {
//       console.error(error);
//       // Handle the error, such as showing an error message to the user
//     }
//   };




//   return (
//     <Container>
//       <Row>
//         <div>
//           {influencers.map(item => {
            
//             return (
//               <div key={item.id}>
//                  <input type="checkbox" onChange={event => handleCheckboxChange(event, influencers)} />
//                 <p>{item.influencer_full_name.slice(0, 15)}...</p>
//                 <p>@{item.influencer_username}</p>
                
               
//               </div>
//             );
//           })}
//         </div>
//         <Button style={{ backgroundColor: '#452c63' }} onClick={handleOkButtonClick}>
//           Create Campaign
//         </Button>
//       </Row>
//     </Container>
//   );
// };

// export default NewCampaign;



// const NewCampaign = () => {
//   const [isChecked, setIsChecked] = useState(false);
//   const [influencers, setInfluencers] = useState([]);
//   const [totalCost, setTotalCost] = useState(0);
//   const [storyCost, setStoryCost] = useState(0);
//   const [postCost, setPostCost] = useState(0);
  
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

//   //make campaign live
//   const handleCheckboxChange = (e) => {
//     setIsChecked(e.target.checked);
//   };

//   const handleInfluencerChangeStory = (index, e) => {
//     const updatedInfluencers = [...influencers];
//     updatedInfluencers[index].story = e.target.checked;
//     setInfluencers(updatedInfluencers);

//     const cost = e.target.checked ? influencers[index].influencerStoryCost : -influencers[index].influencerStoryCost;
//     setStoryCost(storyCost + cost);
//   };

//   const handleInfluencerChangePost = (index, e) => {
//     const updatedInfluencers = [...influencers];
//     updatedInfluencers[index].post = e.target.checked;
//     setInfluencers(updatedInfluencers);

//     const cost = e.target.checked ? influencers[index].influencerInfluencerPostCost : -influencers[index].influencerInfluencerPostCost;
//     setPostCost(postCost + cost);
//   };

//   const removeInfluencer = (indexToRemove) => {
//   const removedInfluencer = influencers[indexToRemove];
//   const updatedInfluencers = influencers.filter((_, index) => index !== indexToRemove);
//   setInfluencers(updatedInfluencers);

//   const storyCostChange = removedInfluencer.story ? -removedInfluencer.influencerStoryCost : 0;
//   const postCostChange = removedInfluencer.post ? -removedInfluencer.influencerInfluencerPostCost : 0;
//   setStoryCost(storyCost => storyCost + storyCostChange);
//   setPostCost(postCost => postCost + postCostChange);
// };

// const fetchInfluencers = () => {
//   axios
//     .get('http://127.0.0.1:8000/influencers/')
//     .then((response) => {
//       setInfluencers(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

//   useEffect(() => {
//     // Calculate the total cost based on the sum of storyCost and postCost
//     setTotalCost(storyCost + postCost);
//   }, [storyCost, postCost]);


// const handleCreateCampaign = async (campaignData) => {
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/activecampaigns/', campaignData);
//       console.log(response.data);
//       // Do something with the response, such as show a success message
//     } catch (error) {
//       console.error(error);
//       // Handle the error, such as showing an error message to the user
//     }
//   };


//   return (
//     <Container className="mt-2" style={{border:"1px solid rgb(198, 198, 198)"}}>
//       <Row>
//        <div className="pickedInfluencers" style={{display: 'flex', flexWrap: "nowrap"}}> 
//             {influencers.map((item,index) => {
//                const campaignData = {
//                 influencer_full_name : item.influencer_full_name,
//                 influencer_username : item.influencer_username,
//                 influencers: influencers.map((influencer) => influencer.id),
//                 storyCost: storyCost,
//                 postCost: postCost,
//                 totalCost: totalCost
//               }

//               return (
//                 <Col xs={8} sm={8} md={2} lg={2}>
//                   <div className="subContainerNC" style={{overflow:'hidden'}}>
//                     <img className='imageNC' src={`http://127.0.0.1:8000/${item.image}`}/>
//                     <p className='nameNC'>{item.influencer_full_name.slice(0, 15)}...</p>
//                     <p className='userNameNC'>@{item.influencer_username}</p>
//                     <p className='EngagementRateNC'>Engagement Rate</p>
//                     <p className='NumberNC'>{item.engagement_rate}</p>

                  
//                   </div>
//                 </Col>

//               )})}
//            </div>

//            <div className="d-lg-flex justify-content-between align-items-end d-sm-block " style={{border:'2px solid red'}}>
            

//                 <Button style={{backgroundColor: '#452c63'}} onClick={handleCreateCampaign(campaignData)}>
//                   Create Campaign
//                 </Button>
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