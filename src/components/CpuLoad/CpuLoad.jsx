// CpuLoad.jsx
import React, { useState, useEffect } from 'react';
import CpuGauge from './CpuGauge';
import './CpuLoad.css';

const LineChart = ({ data, color, label, unit }) => {
  const values = data.map(item => item.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min > 0 ? max - min : 1;
  
  return (
    <div className="line-chart">
      <div className="line-chart-header">
        <span className="chart-label">{label}</span>
        <span className="chart-value">
          {data.length > 0 ? `${data[data.length-1].value}${unit}` : `0${unit}`}
        </span>
      </div>
      <div className="chart-container">
        <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.15" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <path
            d={`M0,40 L0,${40 - ((data[0].value - min) / range) * 35} ${
              data.map((point, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = 40 - ((point.value - min) / range) * 35;
                return `L${x},${y}`;
              }).join(' ')
            } L100,40 Z`}
            fill="url(#chartGradient)"
          />
          
          <polyline
            points={data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = 40 - ((point.value - min) / range) * 35;
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

const StatItem = ({ icon, label, value, progress, color, showGraph, history, toggleGraph, unit }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <div className="stat-info">
          <div className="stat-icon" style={{ color }}>
            {icon}
          </div>
          <div className="stat-details">
            <div className="stat-label">{label}</div>
            <div className="stat-value" style={{ color }}>
              {value}
              <span className="stat-unit">{unit}</span>
            </div>
          </div>
        </div>
        <button 
          className="graph-toggle"
          onClick={() => toggleGraph(label)}
          aria-label={`Toggle ${label} graph`}
        >
          {showGraph ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 3v18h18" strokeWidth="2" strokeLinecap="round"/>
              <path d="M19 9l-4 4-4-4-4 4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </div>
      
      <div className="stat-progress">
        <div 
          className="progress-bar"
          style={{ 
            width: `${progress}%`, 
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}`
          }}
        />
      </div>
      
      {showGraph && (
        <div className="stat-chart">
          <LineChart data={history} color={color} label={label} unit={unit} />
        </div>
      )}
    </div>
  );
};

const CpuLoad = () => {
  const [cpuLoad, setCpuLoad] = useState(11);
  const [frequency, setFrequency] = useState(3000);
  const [visibleGraphs, setVisibleGraphs] = useState({});
  
  const toggleGraph = (label) => {
    setVisibleGraphs(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };
  
  const [stats, setStats] = useState([
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: "CPU Frequency",
      value: "3000",
      progress: 60,
      color: "#4cc9f0",
      unit: "MHz",
      history: Array(15).fill().map((_, i) => ({ time: i, value: 2900 + Math.random() * 200 }))
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: "CPU Usage",
      value: "11",
      progress: 11,
      color: "#4cc9f0",
      unit: "%",
      history: Array(15).fill().map((_, i) => ({ time: i, value: Math.random() * 20 }))
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="2" y="2" width="20" height="20" rx="2" strokeWidth="2"/>
          <path d="M2 12h20M12 2v20" strokeWidth="2"/>
        </svg>
      ),
      label: "GPU Usage",
      value: "0",
      progress: 0,
      color: "#4cc9f0",
      unit: "%",
      history: Array(15).fill().map((_, i) => ({ time: i, value: Math.random() * 5 }))
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M14 14.76V3.5a2.5 2.5 0 00-5 0v11.26a4.5 4.5 0 105 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: "Temperature",
      value: "46",
      progress: 46,
      color: "#f8961e",
      unit: "°C",
      history: Array(15).fill().map((_, i) => ({ time: i, value: 44 + Math.random() * 5 }))
    }
  ]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newCpuLoad = Math.floor(8 + Math.random() * 12);
      setCpuLoad(newCpuLoad);
      
      const newGpuLoad = Math.floor(Math.random() * 5);
      const newFrequency = 2800 + Math.floor(Math.random() * 500);
      setFrequency(newFrequency);
      
      setStats(prev => prev.map(stat => {
        let newValue, newProgress, newColor;
        
        switch(stat.label) {
          case "CPU Frequency":
            newProgress = (newFrequency / 5000) * 100;
            newValue = `${newFrequency}`;
            newColor = "#4cc9f0";
            break;
            
          case "CPU Usage":
            newProgress = newCpuLoad;
            newValue = `${newCpuLoad}`;
            newColor = "#4cc9f0";
            break;
            
          case "GPU Usage":
            newProgress = newGpuLoad;
            newValue = `${newGpuLoad}`;
            newColor = "#4cc9f0";
            break;
            
          case "Temperature":
            newProgress = 42 + Math.floor(Math.random() * 12);
            newValue = `${newProgress}`;
            if (newProgress < 40) newColor = "#4cc9f0";
            else if (newProgress < 60) newColor = "#f8961e";
            else newColor = "#f94144";
            break;
            
          default:
            newProgress = stat.progress;
            newValue = stat.value;
            newColor = stat.color;
        }
        
        let parsedValue;
        if (stat.label === "CPU Frequency") {
          parsedValue = parseFloat(newValue);
        } else if (stat.label === "CPU Usage" || stat.label === "GPU Usage") {
          parsedValue = parseFloat(newValue);
        } else if (stat.label === "Temperature") {
          parsedValue = parseFloat(newValue);
        } else {
          parsedValue = newProgress;
        }
        
        const newHistory = [...stat.history.slice(1), {
          time: stat.history[stat.history.length - 1].time + 1,
          value: parsedValue
        }];
        
        return {
          ...stat,
          value: newValue,
          progress: newProgress,
          color: newColor,
          history: newHistory
        };
      }));
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="cpu-load">
      <div className="cpu-header">
        <div className="cpu-header-logo">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" />
            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <div className="cpu-header-info">
          <h1 className="cpu-header-title">System Performance</h1>
          <div className="cpu-header-subtitle">
            <p>AMD Ryzen 9 5900HX • 8 Cores • 16 Threads</p>
            <p>NVIDIA GeForce RTX 3070 • 8GB GDDR6</p>
          </div>
        </div>
        <div className="cpu-header-status">
          <div className="status-indicator active"></div>
          <span>Optimal Performance</span>
        </div>
      </div>

      <div className="cpu-grid">
        <div className="cpu-gauge-wrapper">
          <CpuGauge value={cpuLoad} frequency={frequency} />
        </div>
        
        {/* Changed from cpu-stats to cpu-stats-row for horizontal layout */}
        <div className="cpu-stats-row">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              {...stat}
              showGraph={visibleGraphs[stat.label]}
              toggleGraph={toggleGraph}
              unit={stat.unit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CpuLoad;