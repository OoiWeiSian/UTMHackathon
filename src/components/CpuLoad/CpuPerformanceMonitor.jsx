import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Cpu, Clock, ThermometerSun, Zap, Activity } from 'lucide-react';
import './CpuPerformanceMonitor.css';

const CpuPerformanceMonitor = () => {
  // Mock data with higher initial values for better visibility
  const [cpuData, setCpuData] = useState({
    usage: 42,  // Starting with a higher value that's clearly visible
    frequency: 2.4,
    temperature: 56,
    voltage: 1450,
    memoryFreq: 4800
  });
  
  const [usageHistory, setUsageHistory] = useState([
    { time: '5s ago', value: 38 },
    { time: '4s ago', value: 40 },
    { time: '3s ago', value: 42 },
    { time: '2s ago', value: 41 },
    { time: '1s ago', value: 43 },
    { time: 'now', value: 42 },
  ]);

  // Simulate updating values
  useEffect(() => {
    const interval = setInterval(() => {
      // In a real app, these would be fetched from an API
      // Using more noticeable variations for demo purposes
      const newUsage = Math.max(25, Math.min(75, cpuData.usage + (Math.random() - 0.5) * 10));
      const newTemp = Math.max(45, Math.min(80, cpuData.temperature + (Math.random() - 0.5) * 3));
      
      // Add dynamic changes for frequency, voltage and memory frequency
      const newFreq = Math.max(1.8, Math.min(3.2, cpuData.frequency + (Math.random() - 0.5) * 0.2));
      const newVoltage = Math.max(1300, Math.min(1550, cpuData.voltage + (Math.random() - 0.5) * 40));
      const newMemFreq = Math.max(4600, Math.min(5000, cpuData.memoryFreq + (Math.random() - 0.5) * 60));
      
      setCpuData(prev => ({
        usage: Math.round(newUsage),  // Rounded to eliminate decimals for cleaner display
        temperature: Math.round(newTemp),
        frequency: parseFloat(newFreq.toFixed(2)),
        voltage: Math.round(newVoltage),
        memoryFreq: Math.round(newMemFreq)
      }));
      
      setUsageHistory(prev => {
        const newHistory = [...prev.slice(1), { time: 'now', value: Math.round(newUsage) }];
        // Update time labels
        return newHistory.map((item, index) => ({
          time: index === newHistory.length - 1 ? 'now' : `${newHistory.length - 1 - index}s ago`,
          value: item.value
        }));
      });
    }, 2000);
    
    return () => clearInterval(interval);
  }, [cpuData]);

  // Helper function to determine color based on value and threshold
  const getStatusColor = (value, type) => {
    if (type === 'temperature') {
      if (value < 60) return 'status-info';
      if (value < 80) return 'status-warning';
      return 'status-danger';
    }
    if (type === 'usage') {
      if (value < 50) return 'status-info';
      if (value < 80) return 'status-warning';
      return 'status-danger';
    }
    if (type === 'frequency') {
      if (value < 2.0) return 'status-info';
      if (value < 3.0) return 'status-primary';
      return 'status-accent';
    }
    if (type === 'voltage') {
      if (value < 1300) return 'status-info';
      if (value < 1500) return 'status-primary';
      return 'status-accent';
    }
    if (type === 'memoryFreq') {
      if (value < 4700) return 'status-info';
      if (value < 4900) return 'status-primary';
      return 'status-accent';
    }
    return 'status-primary';
  };

  // Dynamic gauge component with rotation based on value
  const Gauge = ({ value, max, type, size = 'md' }) => {
    const percentage = (value / max) * 100;
    const rotation = (percentage / 100) * 180;
    const statusClass = getStatusColor(percentage, type);
    
    return (
      <div className={`gauge gauge-${size}`}>
        <div className="gauge-body">
          <div 
            className={`gauge-fill ${statusClass}`}
            style={{ transform: `rotate(${rotation}deg)` }}
          ></div>
          <div className="gauge-cover">
            <div className="gauge-value">
              <span>{value}</span>
              <span className="gauge-unit">
                {type === 'temperature' ? '°C' : type === 'usage' ? '%' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const Metric = ({ icon, label, value, unit, type, max = 100 }) => {
    const statusClass = getStatusColor(value, type);
    const percentage = (value / max) * 100;
    
    return (
      <div className="metric-card">
        <div className="metric-header">
          <div className="metric-icon">{icon}</div>
          <span className="metric-label">{label}</span>
        </div>
        <div className="metric-value-container">
          <span className={`metric-value`}>
            {value} <span className="metric-unit">{unit}</span>
          </span>
        </div>
        <div className="metric-progress">
          <div 
            className={`progress-bar ${statusClass}`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="cpu-monitor">
      <div className="monitor-header">
        <div>
          <h1 className="monitor-title">CPU Performance Monitor</h1>
          <p className="monitor-subtitle">Real-time hardware metrics tracking</p>
        </div>
        <div className="live-indicator">
          <span>Live</span>
        </div>
      </div>
      
      <div className="monitor-grid">
        {/* Main CPU usage gauge */}
        <div className="usage-gauge-container">
          <h2 className="section-title">Current CPU Load</h2>
          <Gauge 
            value={cpuData.usage} 
            max={100} 
            type="usage" 
            size="lg" 
          />
          {/* Enhanced visibility for utilization text */}
          <span className="usage-label" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>
            {cpuData.usage}% Utilization
          </span>
        </div>
        
        {/* CPU usage graph */}
        <div className="usage-graph-container">
          <div className="graph-header">
            <h2 className="section-title">Usage History</h2>
            <div className="live-status">
              <Activity className="icon-small" />
              <span>Live</span>
            </div>
          </div>
          <div className="graph-container">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={usageHistory}>
                <CartesianGrid strokeDasharray="3 3" className="chart-grid" />
                <XAxis 
                  dataKey="time" 
                  className="chart-axis" 
                />
                <YAxis 
                  className="chart-axis" 
                  domain={[0, 100]} 
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} 
                  labelStyle={{ color: 'var(--text-secondary)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  className="chart-line" 
                  strokeWidth={2} 
                  dot={{ strokeWidth: 2, r: 4 }} 
                  activeDot={{ r: 6 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Metrics grid */}
      <div className="metrics-grid">
        <Metric 
          icon={<Clock className="icon" />} 
          label="Frequency" 
          value={cpuData.frequency} 
          unit="GHz" 
          type="frequency"
          max={5}
        />
        
        <Metric 
          icon={<ThermometerSun className="icon" />} 
          label="Temperature" 
          value={cpuData.temperature} 
          unit="°C" 
          type="temperature"
          max={100}
        />
        
        <Metric 
          icon={<Zap className="icon" />} 
          label="Voltage" 
          value={cpuData.voltage} 
          unit="mV" 
          type="voltage"
          max={2000}
        />
        
        <Metric 
          icon={<Cpu className="icon" />} 
          label="Memory Freq" 
          value={cpuData.memoryFreq} 
          unit="MHz" 
          type="memoryFreq"
          max={6000}
        />
      </div>
      
      {/* Additional info */}
      <div className="status-message">
        <Cpu className="icon" />
        <div>
          <p className="status-title">System is operating efficiently</p>
          <p className="status-subtitle">Next scan in 2 seconds</p>
        </div>
      </div>
    </div>
  );
};

export default CpuPerformanceMonitor;