import Campaigns from '../../panels/BrandManagerPanel/Campaigns/Campaigns';
import RegisteredInfluencers from '../../panels/BrandManagerPanel/Influencers/RegisteredInfluencers';
import { Container, Row, Col } from 'react-grid-system';
import TopPerformingPosts from '../../panels/BrandManagerPanel/PostsStories/TopPerformingPosts';

import Navbarr from '../../panels/BrandManagerPanel/Navbar/Navbarr';
// import HashTag from '../../panels/BrandManagerPanel/Hashtags/HashTags';
// import Try from '../Try';
// import AllCampaigns from '../../panels/BrandManagerPanel/Campaigns/AllCampaigns';
// import TopInfluencers from '../../BrandManagerPanel/Influencers/TopInfluencers';


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
