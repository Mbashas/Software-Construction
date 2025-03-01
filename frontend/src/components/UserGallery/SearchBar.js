import React from 'react';
import './SearchBar.css';

export const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div className="kazi-search">
      <input
        type="text"
        className="kazi-search-input"
        placeholder={placeholder || "Search..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="kazi-search-icon">🔍</span>
      {value && (
        <button 
          className="kazi-search-clear" 
          onClick={() => onChange('')}
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};
