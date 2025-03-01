import React from 'react';
import './ViewToggle.css';

export const ViewToggle = ({ activeView, onViewChange }) => {
  return (
    <div className="kazi-view-toggle">
      <button 
        className={`kazi-view-btn ${activeView === 'grid' ? 'active' : ''}`}
        onClick={() => onViewChange('grid')}
        aria-label="Grid view"
      >
        <span className="kazi-view-icon">⊞</span>
      </button>
      <button 
        className={`kazi-view-btn ${activeView === 'list' ? 'active' : ''}`}
        onClick={() => onViewChange('list')}
        aria-label="List view"
      >
        <span className="kazi-view-icon">☰</span>
      </button>
    </div>
  );
};
