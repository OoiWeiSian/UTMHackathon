import React from 'react';
import StorageChart from './StorageChart';
import './MemoryStorage.css';

const MemoryStorage = () => {
  const memoryData = {
    total: 7.68,
    used: 3.2,
    free: 4.48
  };

  const storageData = {
    total: 952,
    used: 130,
    free: 822
  };

  return (
    <div className="memory-storage">
      <div className="memory-header">
        <h2>System Resources</h2>
        <p className="subtitle">Monitor your memory and storage utilization</p>
      </div>
      
      <div className="resource-grid">
        <div className="resource-card memory-card">
          <h3>Memory Usage</h3>
          <StorageChart 
            used={memoryData.used} 
            total={memoryData.total} 
            color="#4361ee"
          />
          <div className="resource-details">
            <div className="detail">
              <span className="detail-label">Total:</span>
              <span className="detail-value">{memoryData.total} GB</span>
            </div>
            <div className="detail">
              <span className="detail-label">Used:</span>
              <span className="detail-value" style={{ color: '#4361ee' }}>
                {memoryData.used} GB
              </span>
            </div>
            <div className="detail">
              <span className="detail-label">Free:</span>
              <span className="detail-value">{memoryData.free} GB</span>
            </div>
          </div>
        </div>
        
        <div className="resource-card storage-card">
          <h3>Storage Usage</h3>
          <StorageChart 
            used={storageData.used} 
            total={storageData.total} 
            color="#f72585"
          />
          <div className="resource-details">
            <div className="detail">
              <span className="detail-label">Total:</span>
              <span className="detail-value">{storageData.total} GB</span>
            </div>
            <div className="detail">
              <span className="detail-label">Used:</span>
              <span className="detail-value" style={{ color: '#f72585' }}>
                {storageData.used} GB
              </span>
            </div>
            <div className="detail">
              <span className="detail-label">Free:</span>
              <span className="detail-value">{storageData.free} GB</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="system-info">
        <div className="info-chip">13th Gen Intel® Core™ i9-13900H</div>
        <div className="info-chip">32GB DDR5 RAM</div>
        <div className="info-chip">1TB NVMe SSD</div>
      </div>
    </div>
  );
};

export default MemoryStorage;