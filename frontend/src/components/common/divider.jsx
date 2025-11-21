import React from 'react';
import './divider.css'; // Import the CSS file

const Divider = ({ text }) => {
  return (
    <div className="divider">
      <span className="divider-line"></span>
      <span className="divider-text">{text}</span>
      <span className="divider-line"></span>
    </div>
  );
};

export default Divider;
