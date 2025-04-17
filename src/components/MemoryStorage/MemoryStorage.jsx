import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import StorageChart from './StorageChart';
import './MemoryStorage.css';

const MemoryStorage = () => {
  // Initial memory data
  const [memoryData, setMemoryData] = useState({
    total: 16.0,
    used: 8.7,
    free: 6.5,
    compressed: 0.185,
    cached: 3.8,
    committed: 11.8,
    maxCommitted: 18.2,
    pagedPool: 1.0,
    nonPagedPool: 0.689,
    hardwareReserved: 0.677
  });

  // Initial storage data
  const [storageData, setStorageData] = useState({
    total: 952,
    used: 130,
    free: 822,
    readSpeed: 3500,
    writeSpeed: 2800
  });

  // Historical data for memory and storage
  const [memoryHistory, setMemoryHistory] = useState([]);
  const [diskPerformanceHistory, setDiskPerformanceHistory] = useState([]);

  // Update free memory value when used changes
  useEffect(() => {
    setMemoryData(prev => ({
      ...prev,
      free: parseFloat((prev.total - prev.used).toFixed(1))
    }));
  }, [memoryData.used]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      // Random fluctuation for memory data
      setMemoryData(prev => {
        const newUsed = Math.max(6, Math.min(15, prev.used + (Math.random() * 0.4 - 0.2)));
        const newCached = Math.max(3, Math.min(4.5, prev.cached + (Math.random() * 0.2 - 0.1)));
        const newCommitted = Math.max(10, Math.min(13, prev.committed + (Math.random() * 0.3 - 0.15)));
        
        // Update memory history
        setMemoryHistory(history => {
          const newHistory = [...history, {
            time: timestamp,
            used: parseFloat(newUsed.toFixed(1)),
            cached: parseFloat(newCached.toFixed(1)),
            free: parseFloat((prev.total - newUsed).toFixed(1))
          }];
          return newHistory.slice(-20); // Keep last 20 points
        });
        
        return {
          ...prev,
          used: newUsed,
          cached: newCached,
          committed: newCommitted,
        };
      });

      // Random fluctuation for storage data
      setStorageData(prev => {
        const newUsed = Math.max(125, Math.min(135, prev.used + (Math.random() * 0.2 - 0.1)));
        const newReadSpeed = Math.max(3000, Math.min(4000, prev.readSpeed + (Math.random() * 100 - 50)));
        const newWriteSpeed = Math.max(2500, Math.min(3000, prev.writeSpeed + (Math.random() * 80 - 40)));
        
        // Update disk performance history
        setDiskPerformanceHistory(history => {
          const newHistory = [...history, {
            time: timestamp,
            read: parseInt(newReadSpeed),
            write: parseInt(newWriteSpeed)
          }];
          return newHistory.slice(-20); // Keep last 20 points
        });
        
        return {
          ...prev,
          used: newUsed,
          readSpeed: newReadSpeed,
          writeSpeed: newWriteSpeed,
          free: prev.total - newUsed
        };
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="memory-storage">
      <div className="memory-header">
        <h2>System Resources</h2>
        <p className="subtitle">Real-time monitoring of memory and storage utilization</p>
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
              <span className="detail-value">{memoryData.total.toFixed(1)} GB</span>
            </div>
            <div className="detail">
              <span className="detail-label">Used:</span>
              <span className="detail-value" style={{ color: '#4361ee' }}>
                {memoryData.used.toFixed(1)} GB
              </span>
            </div>
            <div className="detail">
              <span className="detail-label">Free:</span>
              <span className="detail-value">{memoryData.free.toFixed(1)} GB</span>
            </div>
          </div>

          <div className="memory-composition">
            <div className="composition-row">
              <span className="composition-label">In use (Compressed)</span>
              <span className="composition-value">
                {memoryData.used.toFixed(1)} GB ({memoryData.compressed.toFixed(1)} GB)
              </span>
            </div>
            <div className="composition-bar">
              <div 
                className="composition-progress" 
                style={{
                  width: `${(memoryData.used / memoryData.total) * 100}%`,
                  background: '#4361ee'
                }}
              />
            </div>

            <div className="composition-row">
              <span className="composition-label">Committed</span>
              <span className="composition-value">
                {memoryData.committed.toFixed(1)}/{memoryData.maxCommitted.toFixed(1)} GB
              </span>
            </div>
            <div className="composition-bar">
              <div 
                className="composition-progress" 
                style={{
                  width: `${(memoryData.committed / memoryData.maxCommitted) * 100}%`,
                  background: '#7209b7'
                }}
              />
            </div>

            <div className="composition-row">
              <span className="composition-label">Cached</span>
              <span className="composition-value">
                {memoryData.cached.toFixed(1)} GB
              </span>
            </div>
            <div className="composition-bar">
              <div 
                className="composition-progress" 
                style={{
                  width: `${(memoryData.cached / memoryData.total) * 100}%`,
                  background: '#4895ef'
                }}
              />
            </div>
          </div>
          
          {memoryHistory.length > 1 && (
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={memoryHistory} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="#a0a0a0" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#a0a0a0" tick={{ fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#333', borderColor: '#555', fontSize: 12 }}
                    formatter={(value) => [`${value} GB`]}
                  />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Area type="monotone" dataKey="free" stackId="1" stroke="#a0a0a0" fill="rgba(160,160,160,0.3)" name="Free" />
                  <Area type="monotone" dataKey="cached" stackId="1" stroke="#4895ef" fill="rgba(72,149,239,0.5)" name="Cached" />
                  <Area type="monotone" dataKey="used" stackId="1" stroke="#4361ee" fill="rgba(67,97,238,0.8)" name="Used" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
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
                {storageData.used.toFixed(1)} GB
              </span>
            </div>
            <div className="detail">
              <span className="detail-label">Free:</span>
              <span className="detail-value">{storageData.free.toFixed(1)} GB</span>
            </div>
          </div>

          <div className="memory-composition">
            <div className="composition-row">
              <span className="composition-label">Read Speed</span>
              <span className="composition-value">
                {storageData.readSpeed.toFixed(0)} MB/s
              </span>
            </div>
            <div className="composition-row">
              <span className="composition-label">Write Speed</span>
              <span className="composition-value">
                {storageData.writeSpeed.toFixed(0)} MB/s
              </span>
            </div>
          </div>
          
          {diskPerformanceHistory.length > 1 && (
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={diskPerformanceHistory} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="#a0a0a0" tick={{ fontSize: 10 }} />
                  <YAxis stroke="#a0a0a0" tick={{ fontSize: 10 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#333', borderColor: '#555', fontSize: 12 }}
                    formatter={(value) => [`${value} MB/s`]}
                  />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Line type="monotone" dataKey="read" stroke="#4cc9f0" strokeWidth={2} name="Read Speed" dot={false} />
                  <Line type="monotone" dataKey="write" stroke="#f72585" strokeWidth={2} name="Write Speed" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
      
      <div className="system-info">
        <div className="info-chip">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 4H4C3.44772 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19V5C21 4.44772 20.5523 4 20 4ZM19 18H5V6H19V18ZM10 8H14V10H10V8ZM10 12H14V14H10V12ZM8 10H6V12H8V10ZM16 10H18V12H16V10Z"></path>
          </svg>
          AMD Ryzen 9 5900HX
        </div>
        <div className="info-chip">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
            <rect x="9" y="9" width="6" height="6"></rect>
          </svg>
          16GB DDR5 RAM @ 3200 MT/s
        </div>
        <div className="info-chip">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 5H20C20.5523 5 21 5.44772 21 6V18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18V6C3 5.44772 3.44772 5 4 5ZM4 6V18H20V6H4ZM5 8H7V10H5V8ZM9 8H11V10H9V8ZM13 8H15V10H13V8ZM17 8H19V10H17V8ZM5 12H7V14H5V12ZM9 12H11V14H9V12ZM13 12H15V14H13V12ZM17 12H19V14H17V12Z"/>
  </svg>
  1TB NVMe SSD
</div>

      </div>
    </div>
  );
};

export default MemoryStorage;