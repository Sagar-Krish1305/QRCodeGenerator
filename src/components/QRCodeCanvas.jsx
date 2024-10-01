import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const QRCodeCanvas = ({ width, height, isButtonClicked }) => {
  const canvasRef = useRef(null);  // Ref for the DOM element where the canvas will be rendered
  const p5InstanceRef = useRef(null);  // Ref for the p5 instance to manage lifecycle

  const styles = {
    canvasContainer: {
      border: '1px solid #ddd',
      borderRadius: '4px',
      padding: '10px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      display: 'inline-block',
      backgroundColor: '#f9f9f9',
      width: `${width}px`,
      height: `${height}px`,
    },
  };

  useEffect(() => {
    if (isButtonClicked) {
      // Remove the existing p5 instance, if any
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }

      // Define the p5 sketch
      const sketch = (p) => {
        p.setup = () => {
          const canvas = p.createCanvas(width, height);
          canvas.style('border', '1px solid #ccc');
          p.noLoop();  // Stop continuous redrawing
        };

        p.draw = () => {
          p.background(0);
          p.fill(255);

          const cellSize = 20;
          for (let x = 0; x < width; x += cellSize) {
            for (let y = 0; y < height; y += cellSize) {
              if (p.random() > 0.7) {
                p.noStroke();
                p.rect(x, y, cellSize, cellSize);
              }
            }
          }
        };
      };

      // Create a new p5 instance after removing the previous one
      p5InstanceRef.current = new p5(sketch, canvasRef.current);
    }

    // Cleanup when the component is unmounted or when dependencies change
    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
      }
    };
  }, [isButtonClicked, width, height]);  // Re-run if the button is clicked or dimensions change

  return isButtonClicked ? (
    <div ref={canvasRef} style={styles.canvasContainer}></div>
  ) : (
    <div>Enter URL to generate QR Code</div>
  );
};

export default QRCodeCanvas;
