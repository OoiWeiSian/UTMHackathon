import React, { useState } from 'react';
import SystemInfo from './SystemInfo';
import CpuLoad from './CpuLoad';
import MemoryStorage from './MemoryStorage';
import FanProfile from './FanProfile';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('systemInfo');

  // Handle tab switching
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="dashboard">
      {/* Header section */}
      <header>
        <h1>System Dashboard</h1>
        <p>View your computer's specifications and performance metrics.</p>
      </header>

      {/* Tab buttons for different sections */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'systemInfo' ? 'active' : ''}`} 
          onClick={() => handleTabClick('systemInfo')}
        >
          System Info
        </button>
        <button 
          className={`tab ${activeTab === 'cpuLoad' ? 'active' : ''}`} 
          onClick={() => handleTabClick('cpuLoad')}
        >
          CPU Load
        </button>
        <button 
          className={`tab ${activeTab === 'memoryStorage' ? 'active' : ''}`} 
          onClick={() => handleTabClick('memoryStorage')}
        >
          Memory & Storage
        </button>
        <button 
          className={`tab ${activeTab === 'fanProfile' ? 'active' : ''}`} 
          onClick={() => handleTabClick('fanProfile')}
        >
          Fan Profile
        </button>
      </div>

      {/* Tab content */}
      <div className="tab-content">
        {activeTab === 'systemInfo' && <SystemInfo />}
        {activeTab === 'cpuLoad' && <CpuLoad />}
        {activeTab === 'memoryStorage' && <MemoryStorage />}
        {activeTab === 'fanProfile' && <FanProfile />}
      </div>
    </div>
  );
};

export default Dashboard;
