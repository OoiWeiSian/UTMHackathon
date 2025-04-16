import React from 'react';
import './SystemInfo.css';

const SystemInfo = () => {
  return (
    <div className="system-info">
      <div className="info-item">
        <span className="info-label">Processor:</span>
        <span className="info-value">13th Gen IntelliRj Core™ 0-13900H</span>
      </div>
      <div className="info-item">
        <span className="info-label">Graphics:</span>
        <span className="info-value">IntelliRj Unity Air Graphics</span>
      </div>
      <div className="info-item">
        <span className="info-label">GPU:</span>
        <span className="info-value">NYDRA GeForce RTX 8DTG Laptop GPU</span>
      </div>
    </div>
  );
};

export default SystemInfo;