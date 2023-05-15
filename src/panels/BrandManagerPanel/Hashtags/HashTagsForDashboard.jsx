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
              Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0MjEzNDUyLCJqdGkiOiIyNDQ5NTMxNzM4MjUzLTZXR2xSOG1fcnRvUURGcjdRWThuQURtOHZyVjNtdyIsImNpZCI6Ijc1OFlUT01OZ0U4UzA4MW5jSEJmNUEiLCJsaWQiOiJ0Ml92OWFyeTlvdCIsImFpZCI6InQyX3Y5YXJ5OW90IiwibGNhIjoxNjcyMjIzODM5MDAwLCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyJ9.ax4qqUajbzGdFohTweUNn-lwRRVshXDe7vNnZWLbi8aToBmPXGt4DKV5qFIclUIQsD3qr5bNl3yx74IUKszPtRO9vMNsQZmIEeKLd4xH4i_GcFqPgHEtpqjoe-fgyxDdBgTENZDPUqfeiTC-tUva7ecV2qxooKTb8t9lsHTUYbQiXz5oFL3G9oLxiBzaj9_vUsOA9tNvzJEaRuoRX9w1v7pn7K989TLOehDA0azmNsWhlmpeKornkwItY3LloIdNZEWGJ15aSUa_lZ9mXmvVrWtJrupjXgI70KD4dVW0LKt7M7-zqSaXnSBeuyxd4NOAJMRV0pD6E-irYZDHPncVVw',
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
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="">{item.upvotes}</p>   </td>
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
