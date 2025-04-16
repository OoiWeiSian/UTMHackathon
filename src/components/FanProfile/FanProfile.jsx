import React, { useState } from 'react';
import './FanProfile.css';

const FanProfile = () => {
  const [selectedMode, setSelectedMode] = useState('standard');

  const fanModes = [
    {
      id: 'whisper',
      name: "Whisper Mode",
      description: "Dynamically maintains fan speed for quiet operation",
      icon: "🔇",
      color: "#4cc9f0",
      benefits: ["Quiet operation", "Energy saving", "Ideal for light tasks"]
    },
    {
      id: 'standard',
      name: "Standard Mode",
      description: "Balanced performance for everyday computing",
      icon: "🔉",
      color: "#4361ee",
      benefits: ["Balanced performance", "Moderate noise", "Good for office work"]
    },
    {
      id: 'performance',
      name: "Performance Mode",
      description: "Optimized cooling for demanding applications",
      icon: "🔊",
      color: "#f8961e",
      benefits: ["Enhanced cooling", "Better performance", "Ideal for gaming"]
    },
    {
      id: 'fullspeed',
      name: "Full Speed Mode",
      description: "Maximum cooling for extreme performance",
      icon: "🚀",
      color: "#f72585",
      benefits: ["Maximum cooling", "Best performance", "For heavy workloads"]
    }
  ];

  return (
    <div className="fan-profile">
      <div className="fan-header">
        <h2>Fan Control Profile</h2>
        <p className="subtitle">Select the optimal cooling strategy for your current workload</p>
      </div>
      
      <div className="fan-modes">
        {fanModes.map((mode) => (
          <div 
            key={mode.id}
            className={`fan-mode-card ${selectedMode === mode.id ? 'active' : ''}`}
            onClick={() => setSelectedMode(mode.id)}
            style={{
              borderColor: mode.color,
              backgroundColor: selectedMode === mode.id ? `${mode.color}20` : 'var(--bg-secondary)'
            }}
          >
            <div className="mode-icon" style={{ color: mode.color }}>
              {mode.icon}
            </div>
            <div className="mode-content">
              <h3>{mode.name}</h3>
              <p>{mode.description}</p>
              
              {selectedMode === mode.id && (
                <div className="mode-benefits">
                  <h4>Benefits:</h4>
                  <ul>
                    {mode.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FanProfile;