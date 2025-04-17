import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  // Mock data for demonstration
  const systemData = {
    cpu: {
      usage: 10,
      temperature: 50,
      cores: 8,
      frequency: 3.2
    },
    memory: {
      used: 8.7,
      total: 16.0,
      percentage: 54
    },
    fans: {
      main: 1800,
      gpu: 2100,
      mode: 'Auto'
    },
    storage: {
      ssd: {
        used: 130,
        total: 1,
        percentage: 13
      }
    },
    network: {
      upload: 1.2,
      download: 5.6,
      latency: 24
    },
    uptime: '5 days 7 hours'
  };
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>System Overview</h2>
        <div className="dashboard-stats">
          <div className="stat-item">
            <span className="stat-label">Uptime</span>
            <span className="stat-value">{systemData.uptime}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Status</span>
            <span className="stat-value status-healthy">Healthy</span>
          </div>
        </div>
      </div>
      
      <div className="dashboard-grid">
        {/* CPU Widget */}
        <div className="widget">
          <div className="widget-header">
            <h3><i className="widget-icon cpu-icon"></i> CPU Performance</h3>
            <span className="widget-badge">{systemData.cpu.usage}%</span>
          </div>
          <div className="widget-content">
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className={`progress-fill ${systemData.cpu.usage > 80 ? 'critical' : systemData.cpu.usage > 60 ? 'warning' : 'normal'}`} 
                  style={{width: `${systemData.cpu.usage}%`}}
                ></div>
              </div>
              <div className="progress-label">{systemData.cpu.usage}%</div>
            </div>
            
            <div className="metric-grid">
              <div className="metric">
                <span className="metric-label">Temperature</span>
                <span className="metric-value">{systemData.cpu.temperature}°C</span>
              </div>
              <div className="metric">
                <span className="metric-label">Cores</span>
                <span className="metric-value">{systemData.cpu.cores}</span>
              </div>
              <div className="metric">
                <span className="metric-label">Frequency</span>
                <span className="metric-value">{systemData.cpu.frequency} GHz</span>
              </div>
            </div>
          </div>
        </div>

        {/* Memory Widget */}
        <div className="widget">
          <div className="widget-header">
            <h3><i className="widget-icon memory-icon"></i> Memory</h3>
            <span className="widget-badge">{systemData.memory.percentage}%</span>
          </div>
          <div className="widget-content">
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className={`progress-fill ${systemData.memory.percentage > 80 ? 'critical' : systemData.memory.percentage > 60 ? 'warning' : 'normal'}`} 
                  style={{width: `${systemData.memory.percentage}%`}}
                ></div>
              </div>
              <div className="progress-label">
                {systemData.memory.used} GB / {systemData.memory.total} GB
              </div>
            </div>
            
            <div className="memory-chart">
              <div className="chart-segment used" style={{width: `${systemData.memory.percentage}%`}}></div>
              <div className="chart-segment free" style={{width: `${100 - systemData.memory.percentage}%`}}></div>
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <span className="legend-color used"></span>
                <span>Used: {systemData.memory.used} GB</span>
              </div>
              <div className="legend-item">
                <span className="legend-color free"></span>
                <span>Free: {(systemData.memory.total - systemData.memory.used).toFixed(1)} GB</span>
              </div>
            </div>
          </div>
        </div>

        {/* Fan Widget */}
        <div className="widget">
          <div className="widget-header">
            <h3><i className="widget-icon fan-icon"></i> Fan Control</h3>
            <span className="widget-badge">{systemData.fans.mode}</span>
          </div>
          <div className="widget-content">
            <div className="fan-speed-container">
              <div className="fan-speed-gauge">
                <div className="gauge-value">{systemData.fans.main}</div>
                <div className="gauge-label">RPM</div>
              </div>
            </div>
            
            <div className="metric-grid">
              <div className="metric">
                <span className="metric-label">Main Fan</span>
                <span className="metric-value">{systemData.fans.main} RPM</span>
              </div>
              <div className="metric">
                <span className="metric-label">GPU Fan</span>
                <span className="metric-value">{systemData.fans.gpu} RPM</span>
              </div>
              <div className="metric">
                <span className="metric-label">Mode</span>
                <span className="metric-value">{systemData.fans.mode}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Storage Widget */}
        <div className="widget">
          <div className="widget-header">
            <h3><i className="widget-icon storage-icon"></i> Storage</h3>
          </div>
          <div className="widget-content">
            <div className="storage-device">
              <div className="storage-label">
                <span className="device-name">SSD</span>
                <span className="device-capacity">{systemData.storage.ssd.used} GB / {systemData.storage.ssd.total} TB </span>
              </div>
              <div className="progress-container">
                <div className="progress-bar">
                  <div 
                    className={`progress-fill ${systemData.storage.ssd.percentage > 80 ? 'warning' : 'normal'}`} 
                    style={{width: `${systemData.storage.ssd.percentage}%`}}
                  ></div>
                </div>
                <div className="progress-label">{systemData.storage.ssd.percentage}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Network Widget */}
        <div className="widget">
          <div className="widget-header">
            <h3><i className="widget-icon network-icon"></i> Network</h3>
          </div>
          <div className="widget-content">
            <div className="network-stats">
              <div className="network-stat">
                <div className="network-value">{systemData.network.download}</div>
                <div className="network-label">MB/s <span className="network-direction">↓</span></div>
              </div>
              <div className="network-stat">
                <div className="network-value">{systemData.network.upload}</div>
                <div className="network-label">MB/s <span className="network-direction">↑</span></div>
              </div>
              <div className="network-stat">
                <div className="network-value">{systemData.network.latency}</div>
                <div className="network-label">ms</div>
              </div>
            </div>
          </div>
        </div>

        {/* System Health Widget */}
        <div className="widget">
          <div className="widget-header">
            <h3><i className="widget-icon health-icon"></i> System Health</h3>
          </div>
          <div className="widget-content">
            <div className="health-indicators">
              <div className="health-item">
                <div className="health-icon health-ok"></div>
                <div className="health-label">Temperature</div>
              </div>
              <div className="health-item">
                <div className="health-icon health-ok"></div>
                <div className="health-label">Storage</div>
              </div>
              <div className="health-item">
                <div className="health-icon health-ok"></div>
                <div className="health-label">Memory</div>
              </div>
              <div className="health-item">
                <div className="health-icon health-ok"></div>
                <div className="health-label">Network</div>
              </div>
            </div>
            <div className="last-check">
              Last checked: Today at 16:45
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;