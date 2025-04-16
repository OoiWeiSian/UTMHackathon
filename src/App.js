import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import FanProfile from './components/FanProfile/FanProfile';
import CpuLoad from './components/CpuLoad/CpuLoad';
import MemoryStorage from './components/MemoryStorage/MemoryStorage';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import './App.css';

const views = {
  dashboard: <Dashboard />,
  fan: <FanProfile />,
  cpu: <CpuLoad />,
  memory: <MemoryStorage />
};

function App() {
  const [activeView, setActiveView] = useState('dashboard'); // Changed to dashboard as default
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ThemeProvider>
      <div className="app-container">
        <Sidebar 
          activeView={activeView}
          setActiveView={setActiveView}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
          <div className="content-header">
            <button 
              className="menu-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? '◄' : '►'}
            </button>
            <h1 className="view-title">
              {activeView === 'dashboard' && 'Dashboard'}
              {activeView === 'fan' && 'Fan Profile'}
              {activeView === 'cpu' && 'CPU Performance'}
              {activeView === 'memory' && 'Memory & Storage'}
            </h1>
            <ThemeToggle />
          </div>
          
          <div className="view-container">
            {views[activeView]}
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;