import Campaigns from '../brandManagerDashboard/Campaigns/Campaigns';
import RegisteredInfluencers from '../brandManagerDashboard/RegisteredInfluencers/RegisteredInfluencers';
import TopInfluencers from '../brandManagerDashboard/TopInfluencers/TopInfluencers';
import { Container, Row, Col } from 'react-grid-system';
import TopPerformingPosts from '../brandManagerDashboard/TopPerformingPosts/TopPerformingPosts';
import HashTag from './Hashtags/HashTags';
import AllCampaigns from '../AllCampaignsPage/AllCampaigns';
import Navbarr from '../navbar/Navbarr';
import Try from '../Try';


const App = () => {
  return (
    
    <div>
      <Container className="mt-1">
        <Campaigns/>
          <Row>
              <Col xs={12} sm={12} md={6} lg={6} style={{marginTop:"5px",border:'1px solid rgb(212, 211, 211)'}} >
              <RegisteredInfluencers />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} style={{marginTop:"5px",border:'1px solid rgb(212, 211, 211)'}} >
              {/* <TopInfluencers /> */}
              <TopPerformingPosts />
              {/* <HashTag /> */}
              </Col>
          </Row>
        </Container>
  </div>
  );
}

export default App;
