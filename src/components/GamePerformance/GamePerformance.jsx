import React, { useState, useEffect } from 'react';
import PerformanceIssues from '../Performance/PerformanceIssues';
import './GamePerformance.css';

const GamePerformance = () => {
  // Available games with their default settings
  const gameProfiles = {
    cyberpunk: {
      name: 'Cyberpunk 2077',
      icon: '🎮',
      resolution: '1920x1080',
      renderAPI: 'DirectX 12',
      preset: 'Ultra',
      dlss: 'Quality',
      rtx: 'On'
    },
    csgo: {
      name: 'Counter-Strike 2',
      icon: '🔫',
      resolution: '1920x1080',
      renderAPI: 'DirectX 11',
      preset: 'High',
      dlss: null,
      rtx: null
    },
    lol: {
      name: 'League of Legends',
      icon: '🧙‍♂️',
      resolution: '1920x1080',
      renderAPI: 'DirectX 11',
      preset: 'Very High',
      dlss: null,
      rtx: null
    },
    apex: {
      name: 'Apex Legends',
      icon: '🛡️',
      resolution: '1920x1080',
      renderAPI: 'DirectX 11',
      preset: 'High',
      dlss: null,
      rtx: null
    }
  };
  
  // Performance modes
  const performanceModes = {
    balanced: {
      name: 'Balanced',
      description: 'Default balance between performance and power consumption',
      fpsMultiplier: 1.0,
      powerSaving: 0
    },
    eco: {
      name: 'Eco Mode',
      description: 'Reduced power consumption and temperatures, limited FPS',
      fpsMultiplier: 0.6,
      powerSaving: 25
    },
    performance: {
      name: 'High Performance',
      description: 'Maximum performance, higher power consumption',
      fpsMultiplier: 1.2,
      powerSaving: -15
    }
  };
  
  // State for selected game and performance mode
  const [selectedGame, setSelectedGame] = useState('cyberpunk');
  const [performanceMode, setPerformanceMode] = useState('balanced');
  
  // Base performance data - FPS values now in 5-15 range
  const basePerformanceData = {
    cyberpunk: {
      fps: {
        current: 8,
        average: 7,
        min: 5,
        max: 12,
        history: [7, 8, 7, 9, 8, 7, 6, 8, 9, 10, 12, 10, 8, 9, 8]
      },
      gpu: {
        temperature: 78,
        fanSpeed: 72,
        usage: 94,
        power: 220
      },
      cpu: {
        temperature: 72,
        usage: 65
      },
      network: {
        ping: 42
      }
    },
    csgo: {
      fps: {
        current: 12,
        average: 11,
        min: 8,
        max: 15,
        history: [11, 12, 13, 12, 10, 9, 11, 13, 14, 12, 11, 10, 12, 13, 14]
      },
      gpu: {
        temperature: 65,
        fanSpeed: 52,
        usage: 70,
        power: 160
      },
      cpu: {
        temperature: 68,
        usage: 58
      },
      network: {
        ping: 22
      }
    },
    lol: {
      fps: {
        current: 10,
        average: 9,
        min: 7,
        max: 13,
        history: [9, 10, 11, 10, 9, 8, 9, 10, 11, 12, 11, 9, 8, 9, 10]
      },
      gpu: {
        temperature: 60,
        fanSpeed: 45,
        usage: 55,
        power: 120
      },
      cpu: {
        temperature: 62,
        usage: 40
      },
      network: {
        ping: 18
      }
    },
    apex: {
      fps: {
        current: 9,
        average: 8,
        min: 5,
        max: 14,
        history: [8, 9, 10, 9, 7, 6, 8, 10, 11, 10, 9, 8, 7, 9, 10]
      },
      gpu: {
        temperature: 72,
        fanSpeed: 65,
        usage: 85,
        power: 190
      },
      cpu: {
        temperature: 70,
        usage: 60
      },
      network: {
        ping: 30
      }
    }
  };
  
  // Calculate performance data based on selected game and mode
  const calculatePerformanceData = (game, mode) => {
    const baseData = basePerformanceData[game];
    const modeSettings = performanceModes[mode];
    
    // Apply performance mode modifiers - ensure we stay within 5-15 FPS range
    const applyFpsMultiplier = (value) => {
      const result = Math.round(value * modeSettings.fpsMultiplier);
      return Math.min(15, Math.max(5, result)); // Keep within 5-15 range
    };
    
    const current = applyFpsMultiplier(baseData.fps.current);
    const average = applyFpsMultiplier(baseData.fps.average);
    const min = applyFpsMultiplier(baseData.fps.min);
    const max = applyFpsMultiplier(baseData.fps.max);
    const history = baseData.fps.history.map(v => applyFpsMultiplier(v));
    
    // Temperature and fan speed adjustments for eco mode
    const tempAdjustment = mode === 'eco' ? -8 : (mode === 'performance' ? 5 : 0);
    const fanAdjustment = mode === 'eco' ? -10 : (mode === 'performance' ? 15 : 0);
    const usageAdjustment = mode === 'eco' ? -10 : (mode === 'performance' ? 5 : 0);
    
    return {
      fps: {
        current,
        average,
        min,
        max,
        history
      },
      gpu: {
        model: 'NVIDIA GeForce RTX 3070',
        temperature: Math.max(45, baseData.gpu.temperature + tempAdjustment),
        fanSpeed: Math.min(100, Math.max(30, baseData.gpu.fanSpeed + fanAdjustment)),
        usage: Math.min(99, Math.max(10, baseData.gpu.usage + usageAdjustment)),
        memoryUsage: 5.8,
        memoryTotal: 12,
        clockSpeed: mode === 'eco' ? 1650 : (mode === 'performance' ? 2100 : 1950),
        power: mode === 'eco' ? Math.round(baseData.gpu.power * 0.7) : 
               (mode === 'performance' ? Math.round(baseData.gpu.power * 1.15) : baseData.gpu.power)
      },
      cpu: {
        model: 'AMD Ryzen 9 5900HX',
        temperature: Math.max(45, baseData.cpu.temperature + tempAdjustment),
        usage: Math.min(99, Math.max(10, baseData.cpu.usage + usageAdjustment)),
        clockSpeed: mode === 'eco' ? 2.9 : (mode === 'performance' ? 4.0 : 3.7)
      },
      network: {
        ping: baseData.network.ping,
        packetLoss: 0,
        bandwidth: {
          up: 1.2,
          down: 8.5
        }
      },
      memory: {
        usage: 12.4,
        total: 16.0
      },
      frameTime: {
        current: Math.round((1000 / current) * 10) / 10, // Round to 1 decimal place
        average: Math.round((1000 / average) * 10) / 10,
        '1%_low': Math.round((1000 / (min * 0.9)) * 10) / 10,
        '0.1%_low': Math.round((1000 / (min * 0.75)) * 10) / 10
      },
      game: {
        ...gameProfiles[game],
        performanceMode: modeSettings.name
      },
      session: {
        duration: '01:23:45',
        startTime: '13:22:12',
        powerSaving: modeSettings.powerSaving
      }
    };
  };
  
  const [performanceData, setPerformanceData] = useState(
    calculatePerformanceData(selectedGame, performanceMode)
  );
  
  // Update performance data when game or mode changes
  useEffect(() => {
    setPerformanceData(calculatePerformanceData(selectedGame, performanceMode));
    
    // Simulate data updates
    const updateInterval = setInterval(() => {
      setPerformanceData(prev => {
        const baseData = calculatePerformanceData(selectedGame, performanceMode);
        
        // Add small random fluctuations - ensure we stay within 5-15 FPS range
        const randomFps = Math.max(5, Math.min(15, baseData.fps.current + (Math.random() * 3 - 1.5)));
        
        const newHistory = [...prev.fps.history.slice(1), Math.round(randomFps)];
        
        return {
          ...baseData,
          fps: {
            ...baseData.fps,
            current: Math.round(randomFps),
            history: newHistory
          },
          gpu: {
            ...baseData.gpu,
            temperature: Math.max(45, baseData.gpu.temperature + (Math.random() * 2 - 1)),
            fanSpeed: Math.max(30, Math.min(100, baseData.gpu.fanSpeed + (Math.random() * 4 - 2))),
          },
          network: {
            ...baseData.network,
            ping: Math.max(10, baseData.network.ping + (Math.random() * 6 - 3))
          },
          frameTime: {
            current: Math.round((1000 / randomFps) * 10) / 10,
            average: baseData.frameTime.average,
            '1%_low': baseData.frameTime['1%_low'],
            '0.1%_low': baseData.frameTime['0.1%_low']
          }
        };
      });
    }, 1000);
    
    return () => clearInterval(updateInterval);
  }, [selectedGame, performanceMode]);
  
  // Function to render FPS graph
  const renderFpsGraph = () => {
    // For ultra-low FPS, we adjust the scale to make variations more visible
    const values = performanceData.fps.history;
    const min = 4; // Set minimum to 4 for better visualization
    const max = 16; // Set maximum to 16 for better visualization
    
    return (
      <div className="fps-graph">
        {values.map((value, index) => {
          // Scale heights more aggressively for better visualization of small differences
          const height = ((value - min) / (max - min)) * 100;
          
          // All FPS in this range would be considered "bad" in normal circumstances
          // But we can still use color gradients to show relative performance
          let colorClass = 'bad';
          if (value >= 12) colorClass = 'average';
          else if (value >= 8) colorClass = 'low';
          else colorClass = 'critical';
          
          return (
            <div key={index} className="fps-bar-container">
              <div 
                className={`fps-bar ${colorClass}`} 
                style={{ height: `${height}%` }}
                data-value={value}
              ></div>
            </div>
          );
        })}
      </div>
    );
  };
  
  return (
    <div className="game-performance-container">
      <div className="game-selection">
        <div className="game-selector">
          <h3>Select Game</h3>
          <div className="game-options">
            {Object.entries(gameProfiles).map(([key, game]) => (
              <div 
                key={key}
                className={`game-option ${selectedGame === key ? 'active' : ''}`}
                onClick={() => setSelectedGame(key)}
              >
                <span className="game-icon">{game.icon}</span>
                <span className="game-name">{game.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="performance-selector">
          <h3>Performance Mode</h3>
          <div className="performance-options">
            {Object.entries(performanceModes).map(([key, mode]) => (
              <div 
                key={key}
                className={`performance-option ${performanceMode === key ? 'active' : ''}`}
                onClick={() => setPerformanceMode(key)}
              >
                <span className="mode-name">{mode.name}</span>
                <span className="mode-description">{mode.description}</span>
                {mode.powerSaving !== 0 && (
                  <span className={`power-indicator ${mode.powerSaving > 0 ? 'saving' : 'consuming'}`}>
                    {mode.powerSaving > 0 ? `${mode.powerSaving}% less power` : `${Math.abs(mode.powerSaving)}% more power`}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="game-performance-header">
        <div className="game-info">
          <h2>{performanceData.game.name}</h2>
          <div className="game-details">
            <span>{performanceData.game.resolution}</span>
            <span>{performanceData.game.renderAPI}</span>
            <span>Preset: {performanceData.game.preset}</span>
            {performanceData.game.dlss && <span>DLSS: {performanceData.game.dlss}</span>}
            {performanceData.game.rtx && <span>RTX: {performanceData.game.rtx}</span>}
          </div>
        </div>
        <div className="session-info">
          <div className="mode-badge">
            <span className={`mode-indicator ${
              performanceMode === 'eco' ? 'eco' : 
              performanceMode === 'performance' ? 'performance' : 'balanced'
            }`}>
              {performanceData.game.performanceMode}
            </span>
          </div>
          <div className="session-time">
            <span className="label">Session Duration</span>
            <span className="value">{performanceData.session.duration}</span>
          </div>
        </div>
      </div>

      <div className="performance-grid">
        {/* Main FPS Widget */}
        <div className="performance-widget fps-widget">
          <div className="widget-header">
            <h3>FPS</h3>
            <div className="fps-value critical">{performanceData.fps.current}</div>
          </div>
          <div className="widget-content">
            <div className="fps-stats">
              <div className="stat">
                <span className="stat-label">Avg</span>
                <span className="stat-value">{performanceData.fps.average}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Min</span>
                <span className="stat-value">{performanceData.fps.min}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Max</span>
                <span className="stat-value">{performanceData.fps.max}</span>
              </div>
            </div>
            <div className="fps-graph-container">
              {renderFpsGraph()}
            </div>
          </div>
        </div>

        {/* Frame Time Widget */}
        <div className="performance-widget frame-time-widget">
          <div className="widget-header">
            <h3>Frame Time</h3>
            <div className="frame-time-value critical">{performanceData.frameTime.current.toFixed(1)} ms</div>
          </div>
          <div className="widget-content">
            <div className="frame-time-table">
              <div className="frame-time-row">
                <span className="frame-time-label">Average</span>
                <span className="frame-time-value">{performanceData.frameTime.average.toFixed(1)} ms</span>
              </div>
              <div className="frame-time-row">
                <span className="frame-time-label">1% Low</span>
                <span className="frame-time-value">{performanceData.frameTime['1%_low'].toFixed(1)} ms</span>
              </div>
              <div className="frame-time-row">
                <span className="frame-time-label">0.1% Low</span>
                <span className="frame-time-value">{performanceData.frameTime['0.1%_low'].toFixed(1)} ms</span>
              </div>
            </div>
          </div>
        </div>

        {/* GPU Widget */}
        <div className="performance-widget gpu-widget">
          <div className="widget-header">
            <h3>GPU</h3>
            <div className="gpu-model">{performanceData.gpu.model}</div>
          </div>
          <div className="widget-content">
            <div className="gpu-metrics">
              <div className="gpu-metric temperature">
                <div className="metric-label">Temperature</div>
                <div className="metric-gauge">
                  <svg viewBox="0 0 36 36" className="circular-gauge">
                    <path 
                      className="gauge-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path 
                      className="gauge-fill"
                      strokeDasharray={`${performanceData.gpu.temperature}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="21" className="gauge-text">{Math.round(performanceData.gpu.temperature)}°C</text>
                  </svg>
                </div>
              </div>
              <div className="gpu-metric usage">
                <div className="metric-label">Usage</div>
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${performanceData.gpu.usage > 90 ? 'high' : ''}`}
                    style={{ width: `${performanceData.gpu.usage}%` }}
                  ></div>
                </div>
                <div className="metric-value">{Math.round(performanceData.gpu.usage)}%</div>
              </div>
              <div className="gpu-metric memory">
                <div className="metric-label">VRAM</div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${(performanceData.gpu.memoryUsage / performanceData.gpu.memoryTotal) * 100}%` }}
                  ></div>
                </div>
                <div className="metric-value">
                  {performanceData.gpu.memoryUsage} / {performanceData.gpu.memoryTotal} GB
                </div>
              </div>
            </div>
            <div className="gpu-secondary-metrics">
              <div className="secondary-metric">
                <span className="secondary-label">Clock</span>
                <span className="secondary-value">{performanceData.gpu.clockSpeed} MHz</span>
              </div>
              <div className="secondary-metric">
                <span className="secondary-label">Fan</span>
                <span className="secondary-value">{Math.round(performanceData.gpu.fanSpeed)}%</span>
              </div>
              <div className="secondary-metric">
                <span className="secondary-label">Power</span>
                <span className="secondary-value">{performanceData.gpu.power}W</span>
              </div>
            </div>
          </div>
        </div>

        {/* CPU Widget */}
        <div className="performance-widget cpu-widget">
          <div className="widget-header">
            <h3>CPU</h3>
            <div className="cpu-model">{performanceData.cpu.model}</div>
          </div>
          <div className="widget-content">
            <div className="cpu-metrics">
              <div className="cpu-metric temperature">
                <div className="metric-label">Temperature</div>
                <div className="metric-gauge">
                  <svg viewBox="0 0 36 36" className="circular-gauge">
                    <path 
                      className="gauge-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path 
                      className="gauge-fill"
                      strokeDasharray={`${performanceData.cpu.temperature}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="21" className="gauge-text">{Math.round(performanceData.cpu.temperature)}°C</text>
                  </svg>
                </div>
              </div>
              <div className="cpu-metric usage">
                <div className="metric-label">Usage</div>
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${performanceData.cpu.usage > 90 ? 'high' : ''}`}
                    style={{ width: `${performanceData.cpu.usage}%` }}
                  ></div>
                </div>
                <div className="metric-value">{Math.round(performanceData.cpu.usage)}%</div>
              </div>
            </div>
            <div className="cpu-secondary-metrics">
              <div className="secondary-metric">
                <span className="secondary-label">Clock</span>
                <span className="secondary-value">{performanceData.cpu.clockSpeed} GHz</span>
              </div>
              <div className="secondary-metric">
                <span className="secondary-label">Threads</span>
                <span className="secondary-value">12</span>
              </div>
            </div>
          </div>
        </div>

        {/* Network Performance */}
        <div className="performance-widget network-widget">
          <div className="widget-header">
            <h3>Network</h3>
            <div className="ping-value">
              <span className={`ping ${performanceData.network.ping < 30 ? 'good' : performanceData.network.ping < 70 ? 'average' : 'bad'}`}>
                {Math.round(performanceData.network.ping)} ms
              </span>
            </div>
          </div>
          <div className="widget-content">
            <div className="network-metrics">
              <div className="network-metric">
                <span className="metric-label">Download</span>
                <span className="metric-value">{performanceData.network.bandwidth.down} MB/s</span>
              </div>
              <div className="network-metric">
                <span className="metric-label">Upload</span>
                <span className="metric-value">{performanceData.network.bandwidth.up} MB/s</span>
              </div>
              <div className="network-metric">
                <span className="metric-label">Packet Loss</span>
                <span className="metric-value">{performanceData.network.packetLoss}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Issues Widget */}
        <div className="performance-widget">
          <PerformanceIssues performanceData={performanceData} />
        </div>
      </div>
    </div>
  );
};

export default GamePerformance;