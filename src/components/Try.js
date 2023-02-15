import React,{useState} from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import AllCampaignsList from './AllCampaignsPage/AllCampaignsList';

const MediaCard = () => {
    const [filteredResults, setFilteredResults] = useState(AllCampaignsList);
filteredResults.map (item => {
    return (
        <Col xs={12} sm={6} md={4} lg={3}>
            <p>hello</p>
            <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p> <p>hello</p>
          <Card>
            <Card.Img
              variant="top"
              src="https://media.istockphoto.com/id/487787108/photo/can-of-coca-cola-on-ice.jpg?s=612x612&w=0&k=20&c=xDSO_nl0qeDMBZJBJk09jj5_UeQkyQ70QdXuDMByCaY="
              alt="green iguana"
            />
            <Card.Body>
              <Card.Title>Lizard</Card.Title>
              <Card.Text>
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Card.Text>
            </Card.Body>
            <Card.Footer>
              <Button size="sm" variant="secondary">
                Share
              </Button>
              <Button size="sm" variant="primary">
                Learn More
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      )
})};
export default MediaCard;
