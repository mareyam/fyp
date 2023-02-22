import React,{useState} from 'react';
import '../../../Style/BrandManagerPanel/others/privacy.css';
import { Container, Row, Col } from 'react-grid-system';

const Privacy = () => {
        
        return (
            <Container>
                <Row>
                  <Col sm={12} xs={12} md={12} lg={12}>
                     <div><h4>Privacy & Policy</h4>
                     <p style={{fontSize: "12px"}}>Last updated on 12 May, 2022</p>
                     <p style={{fontSize: "12px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis commodo id ridiculus risus,
                        sagittis, sed vel risus. Purus neque urna pretium nulla nam.</p></div>

                     <div><h6>Licensing Policy</h6>
                        <p style={{fontSize: "12px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit feugiat urna diam neque sapien, 
                            suspendisse pellentesque commodo leo. Mollis nunc lobortis dolor molestie ipsum. Parturient 
                            sem ligula sem malesuada commodo diam risus. Aliquet pretium, </p></div>

                    <div>
                        <h6>Here are the terms of our Standard Liscense</h6>
                        <p style={{fontSize: "12px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis convallis scelerisq
                        ue massa viverra. Risus suscipit ac curabitur leo urna, venenatis hendrerit.</p>
                        <p style={{fontSize: "12px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis convallis scelerisq
                        ue massa viverra. Risus suscipit ac curabitur leo urna, venenatis hendrerit.</p>
                    </div>

                    <div>
                        <h6>If you opt for an Extended Liscense</h6>
                        <p style={{fontSize: "12px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sagittis convallis scelerisq
                        ue massa viverra. Risus suscipit ac curabitur leo urna, venenatis hendrerit.</p>
                    </div>

                    <div>
                        <h6>Additonal Policy</h6>
                        <p style={{fontSize: "12px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit feugiat urna diam neque sapien, 
                            suspendisse pellentesque commodo leo. Mollis nunc lobortis dolor molestie ipsum. Parturient 
                            sem ligula sem malesuada commodo diam risus. Aliquet pretium, 
                        </p>
                        <p style={{fontSize: "12px"}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit feugiat urna diam neque sapien, 
                            suspendisse pellentesque commodo leo. Mollis nunc lobortis dolor molestie ipsum. Parturient 
                            sem ligula sem malesuada commodo diam risus. Aliquet pretium, 
                        </p>
                    </div>
                   </Col>
                </Row>
            </Container>
        );
      };
    
export default Privacy;
