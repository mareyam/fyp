import Campaigns from '../brandManagerDashboard/Campaigns/Campaigns';
import RegisteredInfluencers from '../brandManagerDashboard/RegisteredInfluencers/RegisteredInfluencers';
import TopInfluencers from '../brandManagerDashboard/TopInfluencers/TopInfluencers';
import { Container, Row, Col } from 'react-grid-system';
import TopPerformingPosts from '../brandManagerDashboard/TopPerformingPosts/TopPerformingPosts';
import HashTag from '../brandManagerDashboard/Hashtag/HashTag';
import AllCampaigns from '../AllCampaignsPage/AllCampaigns';
import Navbarr from '../navbar/Navbarr';

const App = () => {
  return (
    
    <div>
      <Container style={{border: "2px solid red"}}>
        <Campaigns/>
          <Row>
              <Col xs={12} sm={12} md={6} lg={6}>
              <RegisteredInfluencers />
              <TopPerformingPosts />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6}>
              <TopInfluencers />
              <HashTag />
              </Col>
          </Row>
        </Container>
  </div>
  );
}

export default App;
