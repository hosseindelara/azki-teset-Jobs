import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import NavbarMneu from './Components/NavbarMneu';
import CarIcon from './Components/CarIcon';
import FromMainger from './Components/FromMainger';
function App() {
  return (
    <Container fluid>
      <NavbarMneu />
      <section>
        <Row>
          <Col>
            <Row className='mt-5'>
              <Col md={9} lg={9} xs={12} sm={12}>
                <FromMainger />
                <CarIcon />
              </Col>
              <Col md={3} lg={3} className=" ColorColm" >
                <span></span>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    </Container>
  );
}

export default App;
