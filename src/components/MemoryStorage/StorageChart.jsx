import React, { useEffect, useState } from 'react';
import './MemoryStorage.css';

const StorageChart = ({ used, total, color }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  useEffect(() => {
    const newPercentage = (used / total) * 100;
    const animationDuration = 800; // ms
    
    let start = null;
    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / animationDuration, 1);
      setAnimatedPercentage(progress * newPercentage);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [used, total]);

  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (animatedPercentage / 100) * circumference;

  return (
    <div className="storage-chart">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle
          className="chart-background"
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#333333"
          strokeWidth="8"
        />
        <circle
          className="chart-progress"
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 50 50)"
        />
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          className="chart-text"
        >
          {Math.round(animatedPercentage)}%
        </text>
      </svg>
    </div>
  );
};

export default StorageChart;