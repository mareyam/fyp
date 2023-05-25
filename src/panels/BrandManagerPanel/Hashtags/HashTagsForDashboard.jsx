import axios from "axios";
import React,{useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../Style/BrandManagerPanel/brandManagerDashboard/HashTag.css';
import { ArrowBack, Search, FilterList, ArrowDropDown, TitleTwoTone } from '@material-ui/icons';
import AddIcon from '@mui/icons-material/Add';

const HashtagsForDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://oauth.reddit.com/r/apple/search.json?q=apple&restrict_sr=on&limit=100',
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0NTU3MTA5LjMzNzExMCwiaWF0IjoxNjg0NDcwNzA5LjMzNzEwOSwianRpIjoiMjQ0OTUzMTczODI1My1VVjJLS18zbG9NOWNwcE9rYWtmMXRXcHZrSEI1VmciLCJjaWQiOiI3NThZVE9NTmdFOFMwODFuY0hCZjVBIiwibGlkIjoidDJfdjlhcnk5b3QiLCJhaWQiOiJ0Ml92OWFyeTlvdCIsImxjYSI6MTY3MjIyMzgzOTAwMCwic2NwIjoiZUp5S1Z0SlNpZ1VFQUFEX193TnpBU2MiLCJmbG8iOjl9.IaXaQgjGzVhq9sFgD39Zj9M8EavnwTablc5IrjvlQYWHDs9CzfxO9LPm7diFo9N4cWBOPWJlyv2mEv-ngZXQRQ1uENSpBhbps3GNt-z6g9dO5vlcm7ngKbOUyzw8Cl3QnAz4GUpsOfjReEHjK8RdreOCFydRGXZYSGkOI49x7TZdoJTUSF34sbMF8OID33R_QOX_joMHyABuViARuXvz0AglWlnXLwWoJNug3JQqTiDRvAVuAiWIw0vJoMd6afzs4VZGaJigjz9sZfmTo6HHNurG5GqUGttJFRTHUYkEIHJRFOeFrhuMH48liZ9aquCUdjL7J57Yy_F59eWBcisF2g',
              'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
            }
          }
        );

        const jsonData = response.data.data.children;
        const postsArray = jsonData.map((post) => ({
          title: post.data.title,
          created: new Date(post.data.created_utc * 1000).toLocaleString(),
          upvotes: post.data.ups,
          hashtag: post.data.subreddit
        }));
        setCampaigns(postsArray);


      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


  return (
      <Container style={{border:'1px solid rgb(212, 211, 211)'}}>
          <Row>
          <Col xs={8} sm={8} md={12} lg={12}>
              <div className="d-flex"><h5>All HashTags ({campaigns.length})</h5>
              <a href="/BMHashtags" className="mx-3 text-dark"><p><u style={{fontSize:'13px'}}>View all</u></p></a></div>
            </Col> 
        </Row>
          <div className="tablee">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                    <th className="">Title</th>
                    <th className="" scope="col">Subreddit</th>
                    <th className="" scope="col">Created</th>
                    <th className="" scope="col">Upvotes</th>
                
                </tr>
               </thead>
              <tbody style={{border:'1px solid rgb(212, 211, 211)'}} className="">
                        {campaigns.slice(0,5).map(item => {
                          return (
                              <tr>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="campaignNameHT">{item.title.slice(0,12)}...</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="campaignNameHT">{item.hashtag}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="startDateHT">{item.created}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="startDateHT">{item.upvotes}</p>   </td>
                                   </tr> )})}
                </tbody>      
          </table>
          </div>
      </Container>
  );
}
export default HashtagsForDashboard;


// const HashtagsForDashboard = () => {
//   const [campaigns, setCampaigns] = useState([]);
  

//   useEffect(() => {
//       axios.get('http://127.0.0.1:8000/activecampaigns/')
//         .then(response => {
//           setCampaigns(response.data);
//         })
//         .catch(error => {
//           console.error(error);
//         });
//     }, []);
  



//   return (
//       <Container style={{border:'1px solid rgb(212, 211, 211)'}}>
//           <Row>
//           <Col xs={8} sm={8} md={12} lg={12}>
//               <div className="d-flex"><h5>All HashTags ({campaigns.length})</h5>
//               <a href="/BMHashtags" className="mx-3 text-dark"><p><u style={{fontSize:'13px'}}>View all</u></p></a></div>
//             </Col> 
//         </Row>
//           <div className="tablee">
//             <table className="table">
//               <thead className="thead-dark">
//                 <tr>
//                     <th className="">Campaign</th>
//                     <th className="" scope="col">Hashtag</th>
//                     <th className="" scope="col">Created</th>
//                     <th className="" scope="col">Total posts</th>
                
//                 </tr>
//                </thead>
//               <tbody style={{border:'1px solid rgb(212, 211, 211)'}} className="">
//                         {campaigns.slice(0,5).map(item => {
//                           return (
//                               <tr>
//                                   <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="campaignNameHT">{item.campaign_name}</p></td>
//                                   <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="campaignNameHT">{item.hashtag}</p></td>
//                                   <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="startDateHT">{item.created}</p></td>
//                                   <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}>
//                                     <p className="">{item.usage_count}</p>

//                                     </td>
//                                    </tr> )})}
//                 </tbody>      
//           </table>
//           </div>
//       </Container>
//   );
// }
// export default HashtagsForDashboard;
