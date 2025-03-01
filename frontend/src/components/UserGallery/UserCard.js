import React from 'react';
import './UserCard.css';

export const UserCard = ({ user, viewMode }) => {
  const getInitials = (name) => {
    return name.charAt(0).toUpperCase();
  };
  
  const getRandomRole = () => {
    const roles = [
      'Project Manager', 'Developer', 'Designer', 
      'Product Owner', 'QA Engineer', 'DevOps',
      'UX Researcher', 'Data Analyst', 'Marketing Specialist'
    ];
    
    // Use consistent role based on username
    const hash = user.username.split('').reduce(
      (sum, char) => sum + char.charCodeAt(0), 0
    );
    
    return roles[hash % roles.length];
  };
  
  const getRandomAvailability = () => {
    const statuses = ['Available', 'In a meeting', 'Away', 'Do not disturb'];
    const hash = user.username.split('').reduce(
      (sum, char) => sum + char.charCodeAt(0), 0
    );
    
    return statuses[hash % statuses.length];
  };
  
  const getRandomMetric = () => {
    const hash = user.username.split('').reduce(
      (sum, char) => sum + char.charCodeAt(0), 0
    );
    
    return {
      tasks: 5 + (hash % 20),
      completion: 65 + (hash % 30)
    };
  };
  
  const getAvatarColor = () => {
    const colors = [
      'linear-gradient(135deg, #3a86ff, #00b4d8)',
      'linear-gradient(135deg, #8338ec, #3a86ff)',
      'linear-gradient(135deg, #ff006e, #fb5607)',
      'linear-gradient(135deg, #06d6a0, #22577a)',
      'linear-gradient(135deg, #ffbe0b, #fb5607)'
    ];
    
    const hash = user.username.split('').reduce(
      (sum, char) => sum + char.charCodeAt(0), 0
    );
    
    return colors[hash % colors.length];
  };

  const role = getRandomRole();
  const availability = getRandomAvailability();
  const metrics = getRandomMetric();
  
  return (
    <div className={`kazi-card kazi-user-card ${viewMode === 'list' ? 'list-view' : ''}`}>
      <div 
        className="kazi-user-avatar" 
        style={{ background: getAvatarColor() }}
      >
        {getInitials(user.username)}
      </div>
      
      <div className="kazi-user-info">
        <h3 className="kazi-user-name">{user.username}</h3>
        <div className="kazi-user-role">{role}</div>
        <div className="kazi-user-email">{user.email || 'No email provided'}</div>
        
        <div className="kazi-user-metrics">
          <div className="kazi-metric">
            <span className="kazi-metric-value">{metrics.tasks}</span>
            <span className="kazi-metric-label">Tasks</span>
          </div>
          <div className="kazi-metric">
            <span className="kazi-metric-value">{metrics.completion}%</span>
            <span className="kazi-metric-label">Completion</span>
          </div>
        </div>
      </div>
      
      <div className="kazi-user-status">
        <div className={`kazi-status-indicator ${availability.replace(/\s+/g, '-').toLowerCase()}`}>
          <span className="kazi-status-dot"></span>
          {availability}
        </div>
      </div>
      
      <div className="kazi-user-actions">
        <button className="kazi-button kazi-button-primary">
          <i className="kazi-icon">✉</i>
          Message
        </button>
        <button className="kazi-button kazi-button-secondary">
          <i className="kazi-icon">👤</i>
          Profile
        </button>
      </div>
    </div>
  );
};
