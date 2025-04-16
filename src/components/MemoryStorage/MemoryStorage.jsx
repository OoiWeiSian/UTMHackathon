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
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
          13th Gen Intel® Core™ i9-13900H
        </div>
        <div className="info-chip">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
            <rect x="9" y="9" width="6" height="6"></rect>
          </svg>
          32GB DDR5 RAM @ 3200 MT/s
        </div>
        <div className="info-chip">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 20 0 10 10 0 0 0-10-10z"></path>
          </svg>
          1TB NVMe SSD
        </div>
      </div>
    </div>
  );
};

export default MemoryStorage;