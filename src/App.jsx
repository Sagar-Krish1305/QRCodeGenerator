import React, { useState } from 'react';
import './App.css';
import QRCodeCanvas from './components/QRCodeCanvas';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isCanvasVisible, setIsCanvasVisible] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setErrorMessage('');  // Clear the error message when user starts typing
  };

  const handleButtonClick = () => {
    if (inputValue.trim() === '') {
      setErrorMessage('Please enter a valid URL');  // Set error message if input is empty
    } else {
      setErrorMessage('');  // Clear error message if input is valid
      setIsCanvasVisible((isCanvasVisible + 1) % 3 + 1);  // Toggle the canvas visibility
    }
  };

  // Adjust canvas size based on screen size
  const getResponsiveCanvasSize = () => {
    if (window.innerWidth < 576) return 300;  // Small screens (xs)
    if (window.innerWidth < 768) return 350;  // Medium screens (sm)
    return 400;  // Default for larger screens
  };

  const canvasSize = getResponsiveCanvasSize();

  return (
    <div className="homePage d-flex align-items-center justify-content-center min-vh-100">
      <Container className="text-center">
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <div className="centeredForm p-4 shadow rounded bg-light">
              {/* Conditionally render the canvas */}
              {isCanvasVisible ? (
                <div className="canvasContainer mb-4">
                  <QRCodeCanvas width={canvasSize} height={canvasSize} isButtonClicked={isCanvasVisible} />
                </div>
              ) : (
                <div className="mb-4">
                  <h5 className="text-muted">Enter URL to generate QR Code</h5>
                </div>
              )}

              <Form>
                <Form.Group controlId="formBasicText">
                  <Form.Control
                    type="text"
                    placeholder="Enter your URL"
                    value={inputValue}
                    onChange={handleInputChange}
                    className={`text-center ${errorMessage ? 'is-invalid' : ''}`}
                  />
                  {/* Conditionally render error message */}
                  {errorMessage && <Alert variant="danger" className="mt-2">{errorMessage}</Alert>}
                </Form.Group>
                <Button
                  variant="primary"
                  type="button"
                  onClick={handleButtonClick}
                  className="w-100 mt-2"
                >
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
