import './App.css';
import Campaigns from './components/Campaigns';
import RegisteredInfluencers from './components/RegisteredInfluencers';
import TopInfluencers from './components/TopInfluencers';
import { Container, Row, Col } from 'react-grid-system';
import Try from "./components/Try";
import TopPerformingPosts from './components/TopPerformingPosts';
import HashTag from './components/HashTag';
import AllCampaigns from './components/AllCampaignsPage/AllCampaigns';


const App = () => {
  return (
    <div>
      <AllCampaigns/>
      {/* <Campaigns/>
        <Row>
          <Col lg={6} md={4}>
          <RegisteredInfluencers/>
          <TopPerformingPosts/>
          </Col>
          <Col lg={6} md={4}>
          <TopInfluencers/>
          <HashTag/>
          </Col>
        </Row> */}
        
  </div>
  );
}

export default App;
