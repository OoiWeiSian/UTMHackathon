import React from 'react';
import './Sidebar.css';

const SidebarItem = ({ icon, label, active, onClick, sidebarOpen }) => {
  return (
    <div
      className={`sidebar-item ${active ? 'active' : ''}`}
      onClick={onClick}
    >
      <span className="sidebar-icon">{icon}</span>
      {sidebarOpen && (
        <span className="sidebar-label">{label}</span>
      )}
    </div>
  );
};

export default SidebarItem;