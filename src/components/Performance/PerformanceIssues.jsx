import React from 'react';
import './PerformanceIssues.css';

const PerformanceIssues = ({ performanceData }) => {
  // Analyze performance data to determine issues and their severity
  const analyzePerformance = (data) => {
    const issues = [];
    const recommendations = [];
    let overallStatus = 'normal';
    
    // FPS analysis
    if (data.fps.current < 15) {
      issues.push({
        severity: 'critical',
        category: 'FPS',
        title: 'Critical FPS',
        description: `Current FPS (${data.fps.current}) is extremely low, causing severe stuttering and unplayable experience`,
        icon: 'warning'
      });
      
      recommendations.push('Reduce graphics settings to minimum');
      recommendations.push('Lower resolution to 720p or below');
      overallStatus = 'critical';
    } else if (data.fps.current < 30) {
      issues.push({
        severity: 'warning',
        category: 'FPS',
        title: 'Low FPS',
        description: `Current FPS (${data.fps.current}) is below recommended minimum for smooth gameplay`,
        icon: 'warning'
      });
      
      recommendations.push('Lower shadow and post-processing effects');
      overallStatus = overallStatus === 'normal' ? 'warning' : overallStatus;
    }
    
    // Frame time analysis
    if (data.frameTime.current > 100) {
      issues.push({
        severity: 'critical',
        category: 'Frame Time',
        title: 'Extreme Frame Time',
        description: `Frame times exceeding 100ms (${data.frameTime.current.toFixed(1)}ms) indicate severe performance issues`,
        icon: 'warning'
      });
      
      recommendations.push('Check for background processes consuming CPU/GPU resources');
      overallStatus = 'critical';
    } else if (data.frameTime.current > 33) {
      issues.push({
        severity: 'warning',
        category: 'Frame Time',
        title: 'High Frame Time',
        description: `Frame times exceeding 33ms (${data.frameTime.current.toFixed(1)}ms) result in choppy gameplay`,
        icon: 'warning'
      });
      
      overallStatus = overallStatus === 'normal' ? 'warning' : overallStatus;
    }
    
    // GPU temperature analysis
    if (data.gpu.temperature > 85) {
      issues.push({
        severity: 'critical',
        category: 'Temperature',
        title: 'GPU Overheating',
        description: `GPU temperature (${Math.round(data.gpu.temperature)}°C) is dangerously high`,
        icon: 'temperature'
      });
      
      recommendations.push('Improve system cooling');
      recommendations.push('Clean dust from GPU heatsink and fans');
      overallStatus = 'critical';
    } else if (data.gpu.temperature > 80) {
      issues.push({
        severity: 'warning',
        category: 'Temperature',
        title: 'High GPU Temperature',
        description: `GPU temperature (${Math.round(data.gpu.temperature)}°C) is approaching thermal limits`,
        icon: 'temperature'
      });
      
      recommendations.push('Consider adjusting fan curve');
      overallStatus = overallStatus === 'normal' ? 'warning' : overallStatus;
    }
    
    // Add other hardware checks
    if (data.memory && (data.memory.usage / data.memory.total) > 0.95) {
      issues.push({
        severity: 'warning',
        category: 'Memory',
        title: 'Memory Bottleneck',
        description: 'System RAM is nearly exhausted, causing potential swapping issues',
        icon: 'memory'
      });
      
      recommendations.push('Close unnecessary background applications');
      overallStatus = overallStatus === 'normal' ? 'warning' : overallStatus;
    }
    
    // Add standard recommendations if there are issues
    if (issues.length > 0) {
      if (!recommendations.includes('Update graphics drivers')) {
        recommendations.push('Update graphics drivers to latest version');
      }
      
      if (overallStatus === 'critical') {
        recommendations.push('Check system for hardware/software conflicts');
      }
    }
    
    return {
      issues,
      recommendations: [...new Set(recommendations)], // Remove duplicates
      overallStatus
    };
  };
  
  const { issues, recommendations, overallStatus } = analyzePerformance(performanceData);
  
  // If no issues, display a positive message
  if (issues.length === 0) {
    return (
      <div className="performance-issues-container healthy">
        <div className="issues-header">
          <h3>System Status</h3>
          <div className="status-badge normal">Optimal</div>
        </div>
        <div className="no-issues">
          <div className="status-icon">✓</div>
          <div className="status-message">
            <h4>All systems running optimally</h4>
            <p>No performance issues detected. Enjoy your gaming experience!</p>
          </div>
        </div>
      </div>
    );
  }
  
  const renderIcon = (iconType) => {
    switch (iconType) {
      case 'warning':
        return (
          <div className="icon-container warning">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 3v6h2V9h-2zm0 7v2h2v-2h-2z"/>
            </svg>
          </div>
        );
      case 'temperature':
        return (
          <div className="icon-container temperature">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 15.28V5c0-.55-.45-1-1-1s-1 .45-1 1v10.28c-1.16.41-2 1.51-2 2.81 0 1.66 1.34 3 3 3s3-1.34 3-3c0-1.3-.84-2.4-2-2.81z"/>
              <path d="M13 15.28V5c0-.55-.45-1-1-1s-1 .45-1 1v10.28c-1.16.41-2 1.51-2 2.81 0 1.66 1.34 3 3 3s3-1.34 3-3c0-1.3-.84-2.4-2-2.81zm-1 4.72c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
          </div>
        );
      case 'memory':
        return (
          <div className="icon-container memory">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 2v20h20V2H2zm18 18H4V4h16v16z"/>
              <path d="M6 6h4v4H6zm8 0h4v4h-4zM6 14h4v4H6zm8 0h4v4h-4z"/>
            </svg>
          </div>
        );
      default:
        return (
          <div className="icon-container warning">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 3v6h2V9h-2zm0 7v2h2v-2h-2z"/>
            </svg>
          </div>
        );
    }
  };
  
  return (
    <div className="performance-issues-container">
      <div className="issues-header">
        <h3>Performance Issues</h3>
        <div className={`status-badge ${overallStatus}`}>
          {overallStatus === 'critical' ? 'Critical' : 'Warning'}
        </div>
      </div>
      
      <div className="issues-content">
        <div className="issues-list">
          {issues.map((issue, index) => (
            <div key={index} className={`issue-item ${issue.severity}`}>
              {renderIcon(issue.icon)}
              <div className="issue-details">
                <span className="issue-title">{issue.title}</span>
                <span className="issue-description">{issue.description}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="recommendations-section">
          <div className="recommendations-header">
            <h4>Recommendations</h4>
            {recommendations.length > 0 && (
              <span className="recommendation-count">{recommendations.length}</span>
            )}
          </div>
          <ul className="recommendations-list">
            {recommendations.map((recommendation, index) => (
              <li key={index} className="recommendation-item">
                <span className="bullet">•</span>
                <span>{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PerformanceIssues;