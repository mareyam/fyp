import React,{useState} from 'react';
import RegisteredInfluencersList from '../Influencers/RegisteredInfluencersList';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../Style/BrandManagerPanel/Reports/brandpdf.css';

const BrandPDF = () => {
    const [results, setResults] = useState(RegisteredInfluencersList);
  return (
      <Container style={{border:'1px solid rgb(212, 211, 211)'}} className="mt-2">

          <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div>
                <h5>Combined Statistics for Coke Campaign</h5>
            </div>
          <div className="tableBP">
            <table class="table table-striped">
              <thead class="thead-dark">
                <tr>
                    <th className="">Active Influencers</th>
                    <th className="" scope="col">Posts</th>
                    <th className="" scope="col">Stories</th>
                    <th className="" scope="col">Followers</th>
                    <th className="" scope="col">Likes</th>
                    <th className="" scope="col">Shares</th>
                    <th className="" scope="col">Comments</th>
                    <th className="" scope="col">Engagement Rate</th>
                </tr>
               </thead>
              <tbody style={{border:'1px solid rgb(212, 211, 211)'}} className="">
                        {results.map(item => {
                          return (
                              <tr>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="influencerNameBP">{item.name}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="postsBP">{item.posts}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="storiesBP">{item.stories}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="followersBP">{item.followers}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="likesBP">{item.likes}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="sharesBP">{item.shares}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="commentsBP">{item.comments}</p></td>
                                  <td className='' style={{border:'1px solid rgb(212, 211, 211)'}}><p className="engagementrateBP">{item.engagementRate}</p></td>
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
