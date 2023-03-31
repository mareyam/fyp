import { useEffect, useState } from "react";
import axios from "axios";
const Test =()=>{
    const [Campaign, setCampaign]  = useState([]);
   
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/campaigns/");
        console.log(response);
        setCampaign(response.data);
        console.log(Campaign);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  },[])
    return (
      // <>{
      // Campaign.map((item)=>{return(<>
      //   <p className='typeAC'>{item.type}</p>
      //   <p className="hashtagAC">{item.hashtag}</p>   
    
    
      // </>)})}
        <div><h1>Campaign</h1></div>
        // </>
    )
}
export default Test;