import React, { useState } from 'react';
import './MemberCard.css';

export const MemberCard = ({ member, viewMode, delay = 0 }) => {
  const [expanded, setExpanded] = useState(false);
  
  // Generate unique, deterministic data for this user
  const generateUniqueData = () => {
    // Create a simple hash from username
    const hash = member.username.split('').reduce(
      (acc, char, i) => acc + char.charCodeAt(0) * (i + 1), 0
    );
    
    const roles = [
      'Quantum Architect', 'Neural Engineer', 
      'Void Explorer', 'Data Alchemist',
      'Stellar Cartographer', 'Chrono Physicist',
      'Gravity Weaver', 'Entropy Specialist'
    ];
    
    const tiers = ['Nova', 'Pulsar', 'Quasar', 'Nebula', 'Supernova'];
    const planets = ['Terra', 'Avalon', 'Elysium', 'Lumina', 'Chronos'];
    
    return {
      role: roles[hash % roles.length],
      tier: tiers[hash % tiers.length],
      planet: planets[hash % planets.length],
      activity: 70 + (hash % 30),
      connections: 3 + (hash % 18),
      projects: 1 + (hash % 5)
    };
  };

  const userData = generateUniqueData();
  
  // Determine visual elements
  const getAvatarGradient = () => {
    const hue = member.username.split('').reduce(
      (acc, char) => acc + char.charCodeAt(0), 0
    ) % 360;
    
    return `linear-gradient(135deg, 
      hsl(${hue}, 80%, 60%), 
      hsl(${(hue + 60) % 360}, 80%, 60%)
    )`;
  };
  
  const getInitials = () => {
    return member.username.charAt(0).toUpperCase();
  };
  
  const getBadgeColor = (tier) => {
    const colors = {
      'Nova': 'var(--aether-primary)',
      'Pulsar': 'var(--aether-secondary)',
      'Quasar': 'var(--aether-tertiary)',
      'Nebula': 'var(--aether-accent-2)',
      'Supernova': 'var(--aether-accent-3)'
    };
    return colors[tier] || 'var(--aether-primary)';
  };

  return (
    <div 
      className={`aether-member-card ${viewMode} aether-animate-fade`} 
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="aether-card-content">
        <div 
          className="aether-member-avatar"
          style={{ background: getAvatarGradient() }}
        >
          {getInitials()}
        </div>
        
        <div className="aether-member-info">
          <h3 className="aether-member-name">{member.username}</h3>
          <div className="aether-member-role">{userData.role}</div>
          <div className="aether-member-email">{member.email}</div>
          
          <div className="aether-member-location">
            <span className="aether-planet-icon" aria-hidden="true">◎</span>
            {userData.planet} Network
          </div>
        </div>
        
        <div className="aether-member-metrics">
          <div 
            className="aether-member-tier" 
            style={{ backgroundColor: getBadgeColor(userData.tier) }}
          >
            {userData.tier}
          </div>
          
          <div className="aether-stats-grid">
            <div className="aether-stat">
              <div className="aether-stat-value">{userData.activity}%</div>
              <div className="aether-stat-label">Activity</div>
            </div>
            <div className="aether-stat">
              <div className="aether-stat-value">{userData.connections}</div>
              <div className="aether-stat-label">Connections</div>
            </div>
            <div className="aether-stat">
              <div className="aether-stat-value">{userData.projects}</div>
              <div className="aether-stat-label">Projects</div>
            </div>
          </div>
        </div>
        
        <div className="aether-member-actions">
          <button className="aether-button aether-button-primary">
            <span className="aether-icon">↑</span>
            Connect
          </button>
          <button className="aether-button aether-button-secondary">
            <span className="aether-icon">≡</span>
            Details
          </button>
        </div>
        
        <div className="aether-orbit-indicator">
          <span className="aether-orbit-dot"></span>
        </div>
      </div>
    </div>
  );
};
