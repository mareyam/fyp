import axios from "axios";
import React,{useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../Style/BrandManagerPanel/brandManagerDashboard/HashTag.css';
import { ArrowBack, Search, FilterList, ArrowDropDown, TitleTwoTone } from '@material-ui/icons';
import AddIcon from '@mui/icons-material/Add';

const HashtagsForDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         'https://oauth.reddit.com/r/apple/search.json?q=apple&restrict_sr=on&limit=100',
  //         {
  //           headers: {
  //             Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjgzODczNjkxLCJqdGkiOiIyNDQ5NTMxNzM4MjUzLWVtd3pzUTF0bU8wNDB0eTNUdWNFVXp6aHlSOEd2ZyIsImNpZCI6Ijc1OFlUT01OZ0U4UzA4MW5jSEJmNUEiLCJsaWQiOiJ0Ml92OWFyeTlvdCIsImFpZCI6InQyX3Y5YXJ5OW90IiwibGNhIjoxNjcyMjIzODM5MDAwLCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyJ9.w7nl8ztozL6pxxj-YJDN8eQbRmqkE5gxOJudvRkGcuPFGvQUJ9g4ZO2AI-XTyyNVvuhIlyzFqWIuuyKrfkMMxviG_7nhxwRNM531JB5wpCwmBQujK2Fuszo24m3lllMflBqZQJcuQh00YL0zKrjH9086mln0Njq0fYzl8cuInQOtgG4p7eebQ2pflk4b5M6OR5e0_PrZz0LI0d_YoDBzgjKMUO_y-UOguo1cH7pHcJ3-BJlFxFZq-wXd_kj7WPr8MiKYMDwIuu8721c2ePuFnoBt0Ve0rtQpxocMIo7kgmBttti5cTeU3u-TawmrW0Qdv25ltmSdybpP8l60A39srA',
  //             'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
  //           }
  //         }
  //       );
  
  //       const jsonData = response.data.data.children;
  //       const subreddits = {};

  //       // Loop through the data and store unique subreddits in an object
  //       jsonData.forEach((post) => {
  //         const subreddit = post.data.subreddit;
  //         const upvotes = post.data.ups;
  //         const title = post.data.title;
  //         const createdDate = post.data.created_utc;
  //         if (!subreddits[subreddit]) {
  //           subreddits[subreddit] = {
  //             count: 1,
  //             upvotes: upvotes,
  //             titles: [title],
  //             created: [createdDate]
  //           };
  //         } else {
  //           subreddits[subreddit].count++;
  //           subreddits[subreddit].upvotes += upvotes;
  //           subreddits[subreddit].titles.push(title);
  //           subreddits[subreddit].created.push(createdDate);
  //         }
  //       });
        
  //       // Convert the object to an array of objects
  //       const subredditsArray = Object.keys(subreddits).map((key) => ({
  //         subreddit: key,
  //         count: subreddits[key].count,
  //         upvotes: subreddits[key].upvotes,
  //         titles: subreddits[key].titles
  //         // created: subreddits[key].created
  //       }));

  //       setCampaigns(subredditsArray);
  //       console.log(subredditsArray);        
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://oauth.reddit.com/r/apple/search.json?q=apple&restrict_sr=on&limit=100',
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjgzODczNjkxLCJqdGkiOiIyNDQ5NTMxNzM4MjUzLWVtd3pzUTF0bU8wNDB0eTNUdWNFVXp6aHlSOEd2ZyIsImNpZCI6Ijc1OFlUT01OZ0U4UzA4MW5jSEJmNUEiLCJsaWQiOiJ0Ml92OWFyeTlvdCIsImFpZCI6InQyX3Y5YXJ5OW90IiwibGNhIjoxNjcyMjIzODM5MDAwLCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyJ9.w7nl8ztozL6pxxj-YJDN8eQbRmqkE5gxOJudvRkGcuPFGvQUJ9g4ZO2AI-XTyyNVvuhIlyzFqWIuuyKrfkMMxviG_7nhxwRNM531JB5wpCwmBQujK2Fuszo24m3lllMflBqZQJcuQh00YL0zKrjH9086mln0Njq0fYzl8cuInQOtgG4p7eebQ2pflk4b5M6OR5e0_PrZz0LI0d_YoDBzgjKMUO_y-UOguo1cH7pHcJ3-BJlFxFZq-wXd_kj7WPr8MiKYMDwIuu8721c2ePuFnoBt0Ve0rtQpxocMIo7kgmBttti5cTeU3u-TawmrW0Qdv25ltmSdybpP8l60A39srA',
              'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
            }
          }
        );

        const jsonData = response.data.data.children;
        const postsArray = jsonData.map((post) => ({
          title: post.data.title,
          created: post.created_utc,
          upvotes: post.data.ups,
          hashtag: post.data.link_flair_text || ''
        }));
        setCampaigns(postsArray);
        console.log(postsArray);

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
