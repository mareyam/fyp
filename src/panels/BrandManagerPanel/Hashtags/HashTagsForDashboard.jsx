import axios from "axios";
import React,{useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../Style/BrandManagerPanel/brandManagerDashboard/HashTag.css';
import { ArrowBack, Search, FilterList, ArrowDropDown } from '@material-ui/icons';
import AddIcon from '@mui/icons-material/Add';

const HashtagsForDashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  

  useEffect(() => {
      axios.get('http://127.0.0.1:8000/activecampaigns/')
        .then(response => {
          setCampaigns(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);
  



  return (
      <Container style={{border:'1px solid rgb(212, 211, 211)'}}>
          <Row>
          <Col xs={8} sm={8} md={12} lg={12}>
              <div className=""><h5>All HashTags ({campaigns.length})</h5></div>
            </Col> 
        </Row>
          <div className="tablee">
            <table className="table">
              <thead className="thead-dark">
                <tr>
                    <th className="">Campaign</th>
                    <th className="" scope="col">Hashtag</th>
                    <th className="" scope="col">Created</th>
                    <th className="" scope="col">Total posts</th>
                
                </tr>
               </thead>
              <tbody style={{border:'1px solid rgb(212, 211, 211)'}} className="">
                        {campaigns.slice(0,5).map(item => {
                          return (
                              <tr>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="campaignNameHT">{item.name}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="campaignNameHT">{item.hashtag_campaign}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="startDateHT">{item.created}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}>
                                    <p className="">{item.usage_count}</p>

                                    </td>
                                   </tr> )})}
                </tbody>      
          </table>
          </div>
      </Container>
  );
}
export default HashtagsForDashboard;
