import React, { useState, useEffect, useRef } from 'react';
import './FanProfile.css';

// If you're using React with icons, you'd import them here:
// import { Settings, Wind, Activity, Thermometer, ChevronRight, Zap, Clock, Volume2 } from 'some-icon-library';

const FanProfile = () => {
  const [selectedMode, setSelectedMode] = useState('standard');
  const [showSettings, setShowSettings] = useState(false);
  const [currentTheme] = useState({
    primary: '#3b82f6',
    success: '#10b981'
  });
  const [showAnimation, setShowAnimation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [fanPercentage, setFanPercentage] = useState(0);
  const [fanStatus, setFanStatus] = useState('');
  const progressBarRef = useRef(null);

  // Effect to run when success message is shown
  useEffect(() => {
    if (showSuccess && progressBarRef.current) {
      progressBarRef.current.style.width = '100%';
      
      const progressAnimation = progressBarRef.current.animate(
        [
          { width: '100%' },
          { width: '0%' }
        ],
        {
          duration: 4000,
          easing: 'linear',
          fill: 'forwards'
        }
      );
      
      progressAnimation.onfinish = () => {
        if (progressBarRef.current) {
          progressBarRef.current.style.width = '0%';
        }
      };
    }
  }, [showSuccess]);

  // Icon components (replace with your preferred icon library or use SVGs)
  const Icons = {
    Settings: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>,
    Volume: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path><path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path></svg>,
    Wind: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg>,
    Activity: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>,
    Zap: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>,
    ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
    Clock: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
    CheckCircle: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
  };

  const fanModes = [
    {
      id: 'whisper',
      name: "Whisper Mode",
      description: "Dynamically maintains low fan speed for quiet operation",
      icon: <Icons.Volume />,
      color: "#4cc9f0",
      benefits: ["Near-silent operation", "Energy efficient", "Ideal for light tasks"],
      settings: {
        maxSpeed: 40,
        tempThreshold: 65,
        powerConsumption: "Low",
        noiseLevel: 28,
        response: "Gradual"
      }
    },
    {
      id: 'standard',
      name: "Standard Mode",
      description: "Balanced performance for everyday computing",
      icon: <Icons.Wind />,
      color: "#4361ee",
      benefits: ["Balanced performance", "Moderate noise", "Good for office work"],
      settings: {
        maxSpeed: 60,
        tempThreshold: 75,
        powerConsumption: "Medium",
        noiseLevel: 35,
        response: "Normal"
      }
    },
    {
      id: 'performance',
      name: "Performance Mode",
      description: "Optimized cooling for demanding applications",
      icon: <Icons.Activity />,
      color: "#f8961e",
      benefits: ["Enhanced cooling", "Better performance", "Ideal for gaming"],
      settings: {
        maxSpeed: 80,
        tempThreshold: 85,
        powerConsumption: "High",
        noiseLevel: 42,
        response: "Dynamic"
      }
    },
    {
      id: 'turbo',
      name: "Turbo Mode",
      description: "Maximum cooling for extreme performance scenarios",
      icon: <Icons.Zap />,
      color: "#f72585",
      benefits: ["Maximum cooling", "Best performance", "For heavy workloads"],
      settings: {
        maxSpeed: 100,
        tempThreshold: 95,
        powerConsumption: "Very High",
        noiseLevel: 48,
        response: "Aggressive"
      }
    }
  ];

  const handleModeSelect = (modeId) => {
    setSelectedMode(modeId);
    setShowSettings(true);
  };

  const applySettings = () => {
    // Show fan animation with loading sequence
    setShowAnimation(true);
    setFanStatus('Initializing fan profile...');
    
    // Animation sequence
    const selectedModeData = fanModes.find(mode => mode.id === selectedMode);
    const targetSpeed = selectedModeData.settings.maxSpeed;
    
    // Step 1: Start percentage counter
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setFanPercentage(count);
      
      // Update status message at different points
      if (count === 20) {
        setFanStatus('Adjusting fan curves...');
      } else if (count === 40) {
        setFanStatus('Optimizing power settings...');
      } else if (count === 70) {
        setFanStatus('Applying thermal configuration...');
      } else if (count === 85) {
        setFanStatus('Setting performance parameters...');
      } else if (count === 95) {
        setFanStatus('Finalizing profile...');
      }
      
      if (count >= 100) {
        clearInterval(interval);
        
        // Short delay before hiding animation
        setTimeout(() => {
          setShowAnimation(false);
          setFanPercentage(0);
          setShowSuccess(true);
          
          // Hide success message after 4 seconds
          setTimeout(() => {
            setShowSuccess(false);
          }, 4000);
        }, 500);
      }
    }, 30);
  };

  const selectedModeData = fanModes.find(mode => mode.id === selectedMode);

  return (
    <div className="fan-control-container">
      <div className="fan-header">
        <div className="fan-header-icon">
          <Icons.Settings />
        </div>
        <div className="fan-header-text">
          <h2>Fan Control Profile</h2>
          <p>Configure optimal cooling strategy for your workload</p>
        </div>
      </div>

      <div className="fan-modes-grid">
        {fanModes.map((mode) => (
          <div
            key={mode.id}
            className={`mode-card ${selectedMode === mode.id ? 'active' : ''}`}
            style={{
              borderColor: mode.color,
              backgroundColor: selectedMode === mode.id ? `${mode.color}20` : 'transparent'
            }}
            onClick={() => handleModeSelect(mode.id)}
          >
            <div className="mode-header">
              <div 
                className="mode-icon-wrapper" 
                style={{ backgroundColor: `${mode.color}20`, color: mode.color }}
              >
                {mode.icon}
              </div>
              <div>
                <h3 className="mode-title">{mode.name}</h3>
                <p className="mode-description">{mode.description}</p>
              </div>
            </div>
            <div className="mode-footer">
              <span>Select profile</span>
              <div style={{ color: selectedMode === mode.id ? mode.color : 'inherit' }}>
                <Icons.ChevronRight />
              </div>
            </div>
          </div>
        ))}
      </div>

      {showSettings && (
        <div className="settings-panel">
          <div className="settings-header">
            <div className="settings-title-group">
              <div 
                className="mode-icon-wrapper" 
                style={{ backgroundColor: `${selectedModeData.color}20`, color: selectedModeData.color, marginRight: '0.75rem' }}
              >
                {selectedModeData.icon}
              </div>
              <div>
                <h3 className="settings-title">{selectedModeData.name} Settings</h3>
                <p className="settings-subtitle">Configure advanced cooling parameters</p>
              </div>
            </div>
          </div>

          <div className="settings-grid">
            <div className="settings-column">
              <div className="settings-control">
                <label className="settings-label">Maximum Fan Speed</label>
                <div className="slider-container">
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={selectedModeData.settings.maxSpeed}
                    className="slider-input" 
                    readOnly
                  />
                  <span className="slider-value">{selectedModeData.settings.maxSpeed}%</span>
                </div>
              </div>
              
              <div className="settings-control">
                <label className="settings-label">Temperature Threshold</label>
                <div className="slider-container">
                  <input 
                    type="range" 
                    min="50" 
                    max="100" 
                    value={selectedModeData.settings.tempThreshold} 
                    className="slider-input"
                    readOnly
                  />
                  <span className="slider-value">{selectedModeData.settings.tempThreshold}°C</span>
                </div>
              </div>
              
              <div className="settings-control">
                <label className="settings-label">Fan Response</label>
                <div className="info-box">
                  <span className="info-box-icon"><Icons.Clock /></span>
                  <span>{selectedModeData.settings.response}</span>
                </div>
              </div>
            </div>
            
            <div className="settings-column">
              <div className="settings-control">
                <label className="settings-label">Power Consumption</label>
                <div className="info-box">
                  <span className="info-box-icon"><Icons.Zap /></span>
                  <span>{selectedModeData.settings.powerConsumption}</span>
                </div>
              </div>
              
              <div className="settings-control">
                <label className="settings-label">Noise Level</label>
                <div className="info-box">
                  <span className="info-box-icon"><Icons.Volume /></span>
                  <span>{selectedModeData.settings.noiseLevel} dB</span>
                </div>
              </div>
              
              <div className="settings-control">
                <label className="settings-label">Benefits</label>
                <div className="info-box" style={{display: 'block'}}>
                  <ul className="benefits-list">
                    {selectedModeData.benefits.map((benefit, idx) => (
                      <li key={idx}>{benefit}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="settings-footer">
            <button 
              className="button button-cancel"
              onClick={() => setShowSettings(false)}
            >
              Cancel
            </button>
            <button 
              className="button button-apply"
              style={{ backgroundColor: selectedModeData.color }}
              onClick={applySettings}
            >
              Apply Settings
            </button>
          </div>
        </div>
      )}

      {/* Enhanced Professional Fan Animation Overlay */}
      <div className={`fan-animation-container ${showAnimation ? 'show' : ''}`}>
        <div className="fan-animation-wrapper">
          <div className={`fan-animation fan-spinning`} style={{ color: selectedModeData?.color || currentTheme.primary }}>
            <div className="fan-outer-ring"></div>
            <div className="fan-inner-ring"></div>
            <div className="fan-glow" style={{ boxShadow: `0 0 30px ${selectedModeData?.color || currentTheme.primary}50` }}></div>
            <div className="fan-blade"></div>
            <div className="fan-blade"></div>
            <div className="fan-blade"></div>
            <div className="fan-blade"></div>
            <div className="fan-blade"></div>
            <div className="fan-circle"></div>
            <div className="fan-center-dot"></div>
            {/* Use inline styling to ensure percentage text always displays in black */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 5,
              color: 'black',
              fontSize: '0.85rem',
              fontWeight: 600,
              textShadow: '0 0 5px rgba(255, 255, 255, 0.7)',
              opacity: 0,
              transition: 'opacity 0.5s ease',
              ...(showAnimation ? { opacity: 1 } : {})
            }}>
              {fanPercentage}%
            </div>
          </div>
          <div className="fan-status">{fanStatus}</div>
        </div>
      </div>

      {/* Enhanced Success Message */}
      <div className={`success-message ${showSuccess ? 'show' : ''}`} style={{ backgroundColor: currentTheme.success }}>
        <div className="success-icon">
          <Icons.CheckCircle />
        </div>
        <div className="success-content">
          <h4 className="success-title">Settings Applied</h4>
          <p className="success-description">{selectedModeData?.name} profile activated successfully</p>
        </div>
        <div className="success-progress">
          <div className="success-progress-bar" ref={progressBarRef}></div>
        </div>
      </div>
    </div>
  );
};

export default FanProfile;