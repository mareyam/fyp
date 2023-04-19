import Campaigns from '../../panels/BrandManagerPanel/Campaigns/Campaigns';
import HashtagsForDashboard from '../BrandManagerPanel/Hashtags/HashTagsForDashboard';
import RegisteredInfluencers from '../../panels/BrandManagerPanel/Influencers/RegisteredInfluencers';
import { Container, Row, Col } from 'react-grid-system';
import '../../Style/brandmanagerdashboard.css'

const App = () => {
  return (
    
    <div>
      <Container className="mt-3">
        <h4 className='header4BMD text-center text-sm-start'>BrandManager DashBoard</h4>
        <Campaigns/>
          <Row>
              <Col xs={12} sm={12} md={6} lg={6} style={{marginTop:"5px",border:'0.1px solid rgb(235, 232, 232)'}} >
              <RegisteredInfluencers />
              </Col>
              <Col xs={12} sm={12} md={6} lg={6} style={{marginTop:"5px",border:' 0.1px solid rgb(235, 232, 232)'}} >
              <HashtagsForDashboard />
              </Col>
          </Row>
        </Container>
  </div>
  );
}

export default App;
