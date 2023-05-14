import axios from "axios"
import React,{useEffect, useState} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PendingCampaignsList from './PendingCampaignsList';


// const InfluencerDashboard = () => {
//   const [pendingCampaigns, setPendingCampaigns] = useState(PendingCampaignsList);

//   return (
//     <Container className="mt-4" style={{border:"1px solid rgb(198, 198, 198)"}}>
//       <Row className='d-lg-flex d-sm-block d-xs-block'>

//         <Col xs={12} sm={12} md={12} lg={2} >
//          <div className='d-lg-block d-xs-flex'>
//              {/* <a href="/BMCampaignDetails" style={{outline: 'none'}} ></a> */}
//             <img className="influencerImage"src='https://media.istockphoto.com/id/487787108/photo/can-of-coca-cola-on-ice.jpg?s=612x612&w=0&k=20&c=xDSO_nl0qeDMBZJBJk09jj5_UeQkyQ70QdXuDMByCaY='></img>
//               <div style={{textAlign:"center"}}><h6>Ali Zafar</h6>
//               </div>
//           </div>

//         </Col>
//         <Col xs={12} sm={12} md={12} lg={10}>

//         </Col>
//         </Row>
//     </Container>
//     );    
// };
      




const Hashtag = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i); //number of pages i.e 3
  }
  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <a onClick={() => paginate(number)} href={currentPage} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const Pagintation = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7);
  const [searchValue, setSearchValue] = useState('');
  const [pendingCampaigns, setPendingCampaigns] = useState(PendingCampaignsList);

  const [campaigns, setCampaigns] = useState([]);
  const [fullname, setFullname] = useState([]);
  const [username, setUsername] = useState([]);
  const [profileURL, setProfileURL] = useState('');
  

  
    const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchValue(searchText);
    let results = PendingCampaignsList;
    if (searchText) {
      results = PendingCampaignsList.filter((campaign) => campaign.name.toLowerCase().includes(searchText.toLowerCase()));
    }
    setPendingCampaigns(results);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = pendingCampaigns.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = pageNumber => setCurrentPage(pageNumber);


  
  const Status = ({ status }) => {
    let color;
    let border;
    if (status === 'active') {
      color = 'green';
      border= '2px solid green';
    } else if (status === 'pending') {
      color = 'red';
    } 
    return <p style={{ color }}>{status}</p>;
  };
  
  const ActionButton = ({ status }) => {
    let bgColor;
    let text;
    if (status === 'active') {
      bgColor = 'red';
      text = 'Deactivate';
    } else if (status === 'suspended') {
      bgColor = 'green';
      text = 'Activate';
    } else {
      bgColor = 'gray';
      text = 'Activate';
    }
    return <Button style={{ backgroundColor: bgColor, color: 'white' }}>{text}</Button>;
  };
  
  const TableCell = ({ children }) => {
    return <td style={{ border: '1px solid rgb(212, 211, 211)', fontSize: '15px' }}>{children}</td>;
  };
  
  const handleButtonState = ({status}) => {
    let bgColor;
    let text;
    if(status === 'active') {
      bgColor = 'red';
      text = 'Deactivate';
    }
    else if (status === 'suspended') {
      bgColor = 'green';
      text = 'Activate';
    } else {
      bgColor = 'gray';
      text = 'Activate';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://oauth.reddit.com/user/saadghauri/',
          {
            headers: {
              Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IlNIQTI1NjphVXJUQUUrdnZWVTl4K0VMWFNGWEcrNk5WS1FlbEdtSjlWMkQxcWlCZ3VnIiwidHlwIjoiSldUIn0.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNjg0MTI3NDA5LCJqdGkiOiIyNDQ5NTMxNzM4MjUzLU45U25PMTRHaTYyTzFoUmFtUmhIWld3cm1qWWRNUSIsImNpZCI6Ijc1OFlUT01OZ0U4UzA4MW5jSEJmNUEiLCJsaWQiOiJ0Ml92OWFyeTlvdCIsImFpZCI6InQyX3Y5YXJ5OW90IiwibGNhIjoxNjcyMjIzODM5MDAwLCJzY3AiOiJlSnlLVnRKU2lnVUVBQURfX3dOekFTYyJ9.hal1L4-snSsj-yfWhWi-HxRd8n1lTXJQu5U7sOJNxCuV-BHaTmHHlCja4-pRP9zbpaUx0gpVtTrsbJCF3K9kwaK7TmhXWiQfyp4nHOSdoJaVcnsK78vGy0mVF8DWpD0K2JOfgYCiLc3U4DXDCnbAS9W_vv566fgdkS3tYLM3gIdEOrRMH7dRiUKKc4Y9zVRw6Bo1Bl-keUZBQDQECybhNic_xahykNs6uM-KsGc1DGLdKHqrX6j1XvNRV5-NgqwDkbiIUGQHDaSUFagBfQT-WybEJbKm2NJd_aR2dYQgzlIioQKzsxE1jTuxlTaab4VAU8AwXkFiWns-P1CBEO67nQ',
              'User-Agent': 'ChangeMeClient/0.1 by YourUsername'
            }
          }
        );
      
        const jsonData = response.data.data.children;
        const postsArray = jsonData.map((post) => ({
          title: post.data.link_title,
          fullname: post.data.author_fullname,
          username: post.data.author,
          comments: post.data.num_comments,
          
          permalink: post.data.link_permalink,
          subreddit_name_prefixed: post.data.subreddit_name_prefixed,
          image: post.data.thumbnail ? post.data.thumbnail : 'https://i.pinimg.com/736x/10/a9/1b/10a91b37c6e5efb1cb18cebb1b4077ac.jpg',
          likes: post.data.ups,
        
          created: new Date(post.data.created_utc * 1000).toLocaleString(),
         
          subreddit: post.data.subreddit,
         
          score: post.total_karma,
         
        }));
        setCampaigns(postsArray);
        setUsername(postsArray[0].username);
        setFullname(postsArray[0].fullname);
        setProfileURL(`https://reddit.com/user/${username}/`);

        console.log(postsArray);

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);




  return (
    <Container className="mt-4" style={{border:"1px solid rgb(198, 198, 198)"}}>
          <Row className='d-lg-flex d-sm-block d-xs-block'>
          <Col xs={12} sm={12} md={12} lg={2}>
            <div className='d-lg-block d-xs-flex'>
              <img className="influencerImage"src='https://i.pinimg.com/736x/10/a9/1b/10a91b37c6e5efb1cb18cebb1b4077ac.jpg'></img>
                <div style={{textAlign:"center"}}>
                  <h6>{username}</h6>
                  <p>{fullname}</p>
                  <a href={profileURL}>Profile URL</a>
                </div>
            </div>
          </Col>

          <Col xs={12} sm={12} md={12} lg={10}>
          <h5>Campaign Requests:</h5>
          <div className="tablee">
            <table class="table">
              <thead class="thead-dark">
                <tr>
                   
                    <th className="" scope="col">Brand Name</th>
                    <th className="" scope="col">Hashtag</th>
                    <th className="" scope="col">Type</th>
                    <th className="" scope="col">Cost</th>
                    <th className="" scope="col">Status</th>
                </tr>
               </thead>
              <tbody style={{border:'1px solid rgb(212, 211, 211)'}} className="">
                        {currentItems.map(item => {
                          return (
                              <tr>
                                  <TableCell>{item.brandName}</TableCell>
                                  <TableCell>{item.hashtag}</TableCell>
                                  <TableCell>{item.type}</TableCell>
                                  <TableCell>{item.cost}</TableCell>
                                   <TableCell><Status status={item.status} /></TableCell>
                                  <TableCell>
                                    <Button className="btn btn-primary">Accept</Button>
                                    <Button className="btn btn-danger">Reject</Button>
                                    
                                    {/* <ActionButton status={item.status}   onClick={() => handleButtonState(item.status)}/>
                                  <ActionButton status={item.status}   onClick={() => handleButtonState(item.status)}/> */}
                                  </TableCell>                                  
                              </tr> )})}
                      <Hashtag
                          itemsPerPage={itemsPerPage}
                          totalItems={pendingCampaigns.length}
                          paginate={paginate}/>
                </tbody>      
          </table>
          </div> 
         </Col> 
        </Row>
      </Container>
  );
}
export default Pagintation;

