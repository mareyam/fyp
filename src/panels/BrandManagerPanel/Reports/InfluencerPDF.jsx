import axios from "axios";
import React,{useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../Style/BrandManagerPanel/Reports/influencerpdf.css';

const BrandPDF = () => {
    const [report, setReport] = useState([]);

    useEffect(() => {
      axios.get('http://127.0.0.1:8000/hashtags/')
        .then(response => {
          setReport(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

  return (
      <Container style={{border:'1px solid rgb(212, 211, 211)'}} className="mt-2">

          <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div>
                <h5>Ali Zafar Campaigns</h5>
            </div>
          <div className="tableIP">
            <table class="table table-striped">
              <thead class="thead-dark">
                <tr>
                    <th className="" scope="col">Type</th>
                    <th className="" scope="col">Followers</th>
                    <th className="" scope="col">Likes</th>
                    <th className="" scope="col">Shares</th>
                    <th className="" scope="col">Comments</th>
                    <th className="" scope="col">Engagement Rate</th>
                </tr>
               </thead>
              <tbody style={{border:'1px solid rgb(212, 211, 211)'}} className="">
                        {report.map(item => {
                          return (
                              <tr>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="influencerNameIP">{item.type}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="followersIP">{item.followers}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="likesIP">{item.likes}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="sharesIP">{item.shares}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="commentsIP">{item.comments}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="engagementrateIP">{item.engagementRate}</p></td>
                              </tr> )})}
                </tbody>      
          </table>
          </div>
          </Col> 
        </Row>
         
           
      </Container>
  );
}
export default BrandPDF;
