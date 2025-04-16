import React from 'react';
import CpuGauge from './CpuGauge';
import './CpuLoad.css';

const CpuLoad = () => {
  const cpuStats = [
    { label: "Frequency", value: "1.69 GHz", icon: "⏱️", progress: 45 },
    { label: "Usage", value: "2%", icon: "📊", progress: 2, color: "#4cc9f0" },
    { label: "Memory Freq", value: "4800 MHz", icon: "🧠", progress: 75 },
    { label: "Temperature", value: "46°C", icon: "🌡️", progress: 30, color: "#f8961e" },
    { label: "Voltage", value: "1400 mV", icon: "⚡", progress: 60 }
  ];

  return (
    <div className="cpu-load">
      <div className="cpu-header">
        <h2>CPU Performance Metrics</h2>
        <p className="subtitle">Real-time monitoring of your processor</p>
      </div>
      
      <div className="cpu-grid">
        <div className="cpu-gauge-container">
          <CpuGauge value={2} />
          <div className="gauge-label">Current CPU Load: 2%</div>
        </div>
        
        <div className="cpu-stats">
          {cpuStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <span className="stat-label">{stat.label}</span>
                <span 
                  className="stat-value" 
                  style={{ color: stat.color || 'var(--text-primary)' }}
                >
                  {stat.value}
                </span>
                <div className="stat-progress">
                  <div 
                    className="progress-bar" 
                    style={{
                      width: `${stat.progress}%`,
                      backgroundColor: stat.color || 'var(--primary)'
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CpuLoad;