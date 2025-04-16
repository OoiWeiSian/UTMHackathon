// CpuGauge.jsx
import React from 'react';

const CpuGauge = ({ value, frequency }) => {
  // Convert MHz to a 0-100 scale (assuming max 5000MHz)
  const frequencyPercentage = (frequency / 5000) * 100;
  
  // Color based on load
  const getColor = (val) => {
    if (val < 30) return '#43aa8b'; // Green - low
    if (val < 60) return '#f8961e'; // Orange - medium
    return '#ff1a3d'; // Red - high
  };
  
  const cpuColor = getColor(value);
  const frequencyColor = getColor(frequencyPercentage);
  
  // Calculate circular progress values
  const frequencyRadius = 35;
  const cpuRadius = 25;
  const centerX = 50;
  const centerY = 50;
  
  const frequencyCircumference = 2 * Math.PI * frequencyRadius;
  const cpuCircumference = 2 * Math.PI * cpuRadius;
  
  const frequencyStrokeDashoffset = frequencyCircumference * (1 - (frequencyPercentage / 100));
  const cpuStrokeDashoffset = cpuCircumference * (1 - (value / 100));
  
  // Performance status based on CPU load
  const getStatus = (val) => {
    if (val < 30) return 'Low Load';
    if (val < 60) return 'Moderate Load';
    return 'High Load';
  };

  return (
    <div className="cpu-gauge-modern" style={{
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }}>
      <svg viewBox="0 0 100 100" style={{
        filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.2))',
        maxHeight: '100%',
        maxWidth: '100%'
      }}>
        {/* Background Circles */}
        <circle cx={centerX} cy={centerY} r={frequencyRadius} 
          fill="none" 
          stroke="var(--bg-dark)" 
          strokeWidth="4" 
        />
        
        <circle cx={centerX} cy={centerY} r={cpuRadius} 
          fill="none" 
          stroke="var(--bg-dark)" 
          strokeWidth="4" 
        />
        
        {/* CPU Load Progress Ring */}
        <circle 
          cx={centerX} 
          cy={centerY} 
          r={cpuRadius}
          fill="none"
          stroke={cpuColor}
          strokeWidth="4"
          strokeDasharray={cpuCircumference}
          strokeDashoffset={cpuStrokeDashoffset}
          transform={`rotate(-90 ${centerX} ${centerY})`}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.5s ease, stroke 0.5s ease',
            filter: `drop-shadow(0 0 3px ${cpuColor})`
          }}
        />
        
        {/* Frequency Progress Ring */}
        <circle 
          cx={centerX} 
          cy={centerY} 
          r={frequencyRadius}
          fill="none"
          stroke={frequencyColor}
          strokeWidth="4"
          strokeDasharray={frequencyCircumference}
          strokeDashoffset={frequencyStrokeDashoffset}
          transform={`rotate(-90 ${centerX} ${centerY})`}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.5s ease, stroke 0.5s ease',
            filter: `drop-shadow(0 0 3px ${frequencyColor})`
          }}
        />
        
        {/* CPU Percentage Text */}
        <text 
          x={centerX} 
          y={centerY - 8} 
          fontSize="14" 
          fontWeight="700" 
          fill="var(--text-primary)" 
          textAnchor="middle"
        >
          {value}%
        </text>
        <text 
          x={centerX} 
          y={centerY + 8} 
          fontSize="6" 
          fill="var(--text-secondary)" 
          textAnchor="middle"
        >
          CPU LOAD
        </text>
        
        {/* Frequency Markers */}
        {[0, 25, 50, 75, 100].map((mark, i) => {
          const angle = -90 + (mark * 3.6);
          const x = centerX + (frequencyRadius + 9) * Math.cos(angle * Math.PI / 180);
          const y = centerY + (frequencyRadius + 6) * Math.sin(angle * Math.PI / 180);
          
          return (
            <text 
              key={`mark-${i}`}
              x={x}
              y={y}
              fontSize="3"
              fontWeight="500"
              fill="var(--text-tertiary)"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {mark === 0 ? '0' : mark === 100 ? '' : `${mark/20}GHz`}
            </text>
          );
        })}
      </svg>
      
      {/* Info Panel - Right Bottom Corner */}
<div style={{
  position: 'absolute',
  bottom: '2%',
  right: '2%', // Changed from left: 90% to right: 2%
  transform: 'none', // Removed translateX(-50%) as we're using right positioning
  background: 'transparent',
  padding: '1rem', // Reduced padding to fit better
  borderRadius: '0.75rem',
  boxShadow: 'var(--shadow-md)',
  border: '1px solid var(--border-dark)',
  width: 'auto', // Changed from 60% to auto to size to content
  maxWidth: '40%', // Added max-width to ensure it doesn't get too large
  textAlign: 'center'
}}>
  <div style={{
    fontSize: '0.875rem',
    color: 'var(--text-secondary)',
    marginBottom: '0.25rem'
  }}>
    CPU Frequency
  </div>
  <div style={{
    fontSize: '1.5rem',
    fontWeight: '600',
    color: frequencyColor,
    textShadow: `0 0 10px ${frequencyColor}40`,
    marginBottom: '0.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.25rem'
  }}>
    {(frequency / 1000).toFixed(1)}
    <span style={{
      fontSize: '1rem',
      color: 'var(--text-secondary)',
      fontWeight: '400'
    }}>GHz</span>
  </div>
  <div style={{
    fontSize: '0.875rem',
    fontWeight: '500',
    color: cpuColor,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem'
  }}>
    <div style={{
      width: '0.5rem',
      height: '0.5rem',
      borderRadius: '50%',
      backgroundColor: cpuColor,
      boxShadow: `0 0 8px ${cpuColor}`
    }}></div>
    {getStatus(value)}
        </div>
      </div>
    </div>
  );
};

export default CpuGauge;