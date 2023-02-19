import React,{useState} from 'react';
// import '../../Style/others/TermsConditions.css';
import { Container, Row, Col } from 'react-grid-system';

const Terms = () => {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = (event) => {
      setIsChecked(event.target.checked);
    };
  
        
        return (
            <Container>
                <Row>
                  <Col sm={12} xs={12} md={12} lg={12}>
                     <div><h4>Terms and Conditions</h4>
                     <p style={{fontSize: "12px"}}>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus semper pellentesque tristique pr
                    oin semper in lectus sapien gravida. In semper adipiscing congue in ultrices. Vel euismod sed t
                    ristique eu a. Magna ut nibh mauris massa at quis semper interdum enim. Eget sit magna platea
                    aliquet faucibus urna in. Sit nullam vitae turpis suspendisse. Id enim ornare eget justo elemen
                    tum, velit sit amet. Netus id donec eget convallis bibendum pulvinar mattis vitae. Tempor mas
                    sa, pulvinar ultricies aliquam, habitant turpis. Quisque hac metus, rhoncus aliquet urna, pellente
                    sque felis. Aliquam malesuada viverra vestibulum nisl, faucibus in orci eu. Odio tincidunt vitae 
                    quisque sapien. Cursus arcu nec in blandit non aliquet amet.</p>

                    <p style={{fontSize: "12px"}}>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus semper pellentesque tristique pr
                    oin semper in lectus sapien gravida. In semper adipiscing congue in ultrices. Vel euismod sed t
                    ristique eu a. Magna ut nibh mauris massa at quis semper interdum enim. Eget sit magna platea
                    aliquet faucibus urna in. Sit nullam vitae turpis suspendisse. Id enim ornare eget justo elemen
                    tum, velit sit amet. Netus id donec eget convallis bibendum pulvinar mattis vitae. Tempor mas
                    sa, pulvinar ultricies aliquam, habitant turpis. Quisque hac metus, rhoncus aliquet urna, pellente
                    sque felis. Aliquam malesuada viverra vestibulum nisl, faucibus in orci eu. Odio tincidunt vitae 
                    quisque sapien. Cursus arcu nec in blandit non aliquet amet.</p>

                    <p style={{fontSize: "12px"}}>
                     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus semper pellentesque tristique pr
                    oin semper in lectus sapien gravida. In semper adipiscing congue in ultrices. Vel euismod sed t
                    ristique eu a. Magna ut nibh mauris massa at quis semper interdum enim. Eget sit magna platea
                    aliquet faucibus urna in. Sit nullam vitae turpis suspendisse. Id enim ornare eget justo elemen
                    tum, velit sit amet. Netus id donec eget convallis bibendum pulvinar mattis vitae. Tempor mas
                    sa, pulvinar ultricies aliquam, habitant turpis. Quisque hac metus, rhoncus aliquet urna, pellente
                    sque felis. Aliquam malesuada viverra vestibulum nisl, faucibus in orci eu. Odio tincidunt vitae 
                    quisque sapien. Cursus arcu nec in blandit non aliquet amet.</p>

                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleCheckboxChange}/>
                     <label><b>I agree to the terms and Conditionsl</b></label>

                    </div>
                   </Col>
                </Row>
            </Container>
        );
      };
    
export default Terms;
