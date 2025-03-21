import React, { useEffect, useState } from 'react';
import './styles/NotFound.css';

const FallingDigit = ({ digit, delay }) => {
  const [position, setPosition] = useState(-500);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const fallTimeout = setTimeout(() => {
      setPosition(0);
      setOpacity(1);
    }, delay * 700);
    return () => clearTimeout(fallTimeout);
  }, [delay]);

  return (
    <div
      style={{
        transform: `translateY(${position}px)`,
        opacity,
      }}
      className="digit"
    >
      {digit}
    </div>
  );
};

const NotFound = () => {
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowText(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="notfoundcontainer">
      <div className="digits-container">
        {[4, 0, 4].map((digit, index) => (
          <FallingDigit key={index} digit={digit} delay={index * 1.2} />
        ))}
      </div>
      {showText && (
        <div className="not-found-text">Page Not Found</div>
      )}
    </div>
  );
};

export default NotFound;
