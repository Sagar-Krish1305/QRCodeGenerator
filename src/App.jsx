import './App.css';
import QRCodeCanvas from './components/QRCodeCanvas';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function App() {
  return (
    <div className="homePage">
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={4}>
            <div className="centeredForm">
              <Row className="qrCanvas justify-content-center">
                <QRCodeCanvas />
              </Row>
              <Form>
                <Form.Group controlId="formBasicText">
                  <Form.Control
                    type="text"
                    placeholder="Enter your text"
                    className="text-center"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" block>
                  Create
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
