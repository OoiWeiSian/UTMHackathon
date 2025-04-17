import React from 'react';
import SidebarItem from './SidebarItem';
import './Sidebar.css';

const Sidebar = ({ activeView, setActiveView, sidebarOpen, setSidebarOpen }) => {
  const navItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard' },
    { id: 'cpu', icon: '💻', label: 'CPU Performance' },
    { id: 'memory', icon: '🧠', label: 'Memory & Storage' },
    { id: 'fan', icon: '🌀', label: 'Fan Profile' },
    { id: 'game', icon: '🎮', label: 'Game Performance' }
  ];

  return (
    <aside className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
      <div className="sidebar-header">
        {sidebarOpen ? (
          <h2>System Monitor</h2>
        ) : (
          <h2>SM</h2>
        )}
      </div>
      
      <nav className="sidebar-nav">
        {navItems.map(item => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeView === item.id}
            onClick={() => setActiveView(item.id)}
            sidebarOpen={sidebarOpen}
          />
        ))}
      </nav>
      
      <div className="sidebar-footer">
        {sidebarOpen && (
          <p className="version">v2.0.0</p>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;