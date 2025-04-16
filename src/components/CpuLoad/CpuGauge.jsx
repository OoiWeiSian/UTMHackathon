import React from 'react';
import './CpuLoad.css';

const CpuGauge = ({ value }) => {
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  const rotation = normalizedValue * 1.8;
  
  return (
    <div className="gauge">
      <div className="gauge-body">
        <div 
          className="gauge-fill" 
          style={{ transform: `rotate(${rotation / 2}deg)` }}
        ></div>
        <div className="gauge-cover">
          {normalizedValue}%
        </div>
      </div>
    </div>
  );
};

export default CpuGauge;