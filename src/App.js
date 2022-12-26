import './App.css';
import Campaigns from './components/Campaigns';
import RegisteredInfluencers from './components/RegisteredInfluencers';
import TopInfluencers from './components/TopInfluencers';
import { Container, Row, Col } from 'react-grid-system';
import Try from "./components/Try";
import TopPerformingPosts from './components/TopPerformingPosts';
const App = () => {
  return (
    <div>
      {/* <Campaigns/> */}
        {/* <Row>
          <Col lg={6} md={4}>
          <RegisteredInfluencers/>
          </Col>
          <Col lg={6} md={4}>
          <TopInfluencers/>
          </Col>
        </Row> */}
        <TopPerformingPosts/>
  </div>
  );
}

export default App;
