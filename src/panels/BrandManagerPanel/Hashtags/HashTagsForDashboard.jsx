import axios from "axios";
import React,{useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../Style/BrandManagerPanel/brandManagerDashboard/HashTag.css';
import { ArrowBack, Search, FilterList, ArrowDropDown } from '@material-ui/icons';
import AddIcon from '@mui/icons-material/Add';

const HashtagsForDashboard = () => {
  const [hashtags, setHashtags] = useState([]);
  

  useEffect(() => {
      axios.get('http://127.0.0.1:8000/hashtags/')
        .then(response => {
          setHashtags(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  



  return (
      <Container style={{border:'1px solid rgb(212, 211, 211)'}}>
          <Row>
          <Col xs={8} sm={8} md={12} lg={12}>
              <div className=""><h5>All HashTags ({hashtags.length})</h5></div>
            </Col> 
        </Row>
          <div className="tablee">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                    <th className="">Campaign</th>
                    <th className="" scope="col">Brands</th>
                    <th className="" scope="col">Created</th>
                    {/* <th className="" scope="col">End Date</th> */}
                    <th className="" scope="col">Hashtag</th>
                    {/* <th className="" scope="col">Type</th> */}
                    <th className="" scope="col">Total posts</th>
                    {/* <th className="" scope="col">Status</th> */}
                </tr>
               </thead>
              <tbody style={{border:'1px solid rgb(212, 211, 211)'}} className="">
                        {hashtags.map(item => {
                          return (
                              <tr>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="campaignNameHT">{item.campaign_hashtag}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="brandLogoHT">{item.brandLogo}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="startDateHT">{item.created}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="hashtagHT">{item.hashtag}</p></td>
                                  {/* <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="typeHT">{item.type}</p></td> */}
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="totalPostsHT">{item.total_posts}</p></td>
                              </tr> )})}
                </tbody>      
          </table>
          </div>
      </Container>
  );
}
export default HashtagsForDashboard;
