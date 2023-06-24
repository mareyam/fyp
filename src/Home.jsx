import {Container, Row, Col} from 'react-grid-system';
import authAbstract from './images/authAbstract.png';
import {Button} from "./components/Button";

const Home = () => {
    const onClick = (path) => {
        window.location.href = path;
    };

    return (<Container fluid className="h-100">
        <Row className="h-100">
            <Col
                xs={12}
                sm={12}
                md={6}
                lg={6}
                className="d-flex align-items-center justify-content-center p-0 vh-100"
            >
                <img
                    className="w-100 h-100"
                    style={{objectFit: 'cover'}}
                    src={authAbstract}
                    alt="cover"
                />
            </Col>
            <Col
                xs={12}
                sm={12}
                md={6}
                lg={6}
                className="d-flex flex-column align-items-center justify-content-center"
            >
                <h1 className="fs-3">Welcome to BrandSense</h1>
                <h2 className="fs-4">Continue as:</h2>
                <Button label="Login" type="button" onClick={() => onClick("/Login")}/>
                <div>
                <span style={{ fontSize: 'small' }}>if you're an influencer, please click 
                <a href="/InfluencerSignup"> here</a></span>
                </div>
            </Col>
        </Row>
    </Container>);
}
export default Home;
