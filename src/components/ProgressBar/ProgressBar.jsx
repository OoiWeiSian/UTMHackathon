import React from 'react';
import './ProgressBar.css';

const ProgressBar = ({ value, max = 100, color = 'var(--primary)' }) => {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className="progress-container">
      <div 
        className="progress-bar"
        style={{
          width: `${percentage}%`,
          backgroundColor: color
        }}
      ></div>
      <span className="progress-text">{value}/{max} GB ({Math.round(percentage)}%)</span>
    </div>
  );
};

export default ProgressBar;