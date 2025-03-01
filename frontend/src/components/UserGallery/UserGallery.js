import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserGallery.css';

export const UserGallery = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  // Ancient-inspired roles and decorative elements
  const mythicRoles = [
    "Oracle", "Philosopher", "Scribe", 
    "Architect", "Strategist", "Guardian", 
    "Healer", "Scholar", "Artisan"
  ];
  
  // Vibrant mythic colors
  const mythicColors = [
    '#d4af37', '#be7c4d', '#7b506f', 
    '#4ecdc4', '#e0c097', '#91b7c7'
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/users/');
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setError('The papyrus scroll seems damaged. Cannot retrieve assembly members.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!users.length) return;

    const results = users.filter(user => 
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredUsers(results);
  }, [searchQuery, users]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const assignRole = (username) => {
    // Consistently assign the same role to the same user
    const charSum = username.split('').reduce(
      (sum, char) => sum + char.charCodeAt(0), 0
    );
    return mythicRoles[charSum % mythicRoles.length];
  };
  
  const getSymbol = (role) => {
    const symbols = {
      "Oracle": "🔮",
      "Philosopher": "📚",
      "Scribe": "📜",
      "Architect": "🏛️",
      "Strategist": "⚔️",
      "Guardian": "🛡️",
      "Healer": "⚕️",
      "Scholar": "🧠",
      "Artisan": "🎭"
    };
    return symbols[role] || "✨";
  };

  if (loading) {
    return (
      <div className="mythic-loader">
        <div className="loader-icon">
          <div className="sundial"></div>
        </div>
        <p>Summoning the Assembly...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mythic-error">
        <div className="error-symbol">📜❌</div>
        <h2>Scroll Damaged</h2>
        <p>{error}</p>
        <button className="mythic-button" onClick={() => window.location.reload()}>
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mythic-container">
      <div className="mythic-header greek-border">
        <div className="mythic-title-container">
          <h1 className="mythic-title">The Assembly</h1>
          <p className="mythic-subtitle">Where great minds gather for enlightened discourse</p>
        </div>
      </div>

      <div className="mythic-controls">
        <div className="search-wrapper">
          <input 
            type="text"
            className="mythic-search"
            placeholder="Search the archives..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <span className="search-icon">🔍</span>
          {searchQuery && (
            <button className="clear-search" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>

        <div className="view-options">
          <button 
            className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            aria-label="Grid view"
          >
            <span>◫</span>
          </button>
          <button 
            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            aria-label="List view"
          >
            <span>≡</span>
          </button>
        </div>
      </div>

      <div className="mythic-stats">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-details">
            <div className="stat-value">{filteredUsers.length}</div>
            <div className="stat-label">Assembly Members</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✨</div>
          <div className="stat-details">
            <div className="stat-value">{mythicRoles.length}</div>
            <div className="stat-label">Divine Roles</div>
          </div>
        </div>
      </div>

      <div className={`mythic-members ${viewMode}`}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => {
            const role = assignRole(user.username);
            return (
              <div 
                key={user.id} 
                className="member-card"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="member-emblem-container">
                  <div 
                    className="member-emblem"
                    style={{ 
                      backgroundColor: mythicColors[index % mythicColors.length]
                    }}
                  >
                    {user.username[0].toUpperCase()}
                  </div>
                  <span className="member-symbol">{getSymbol(role)}</span>
                </div>
                
                <div className="member-info">
                  <h3 className="member-name">{user.username}</h3>
                  <div className="member-role">{role}</div>
                  <p className="member-contact">{user.email || 'No messages received'}</p>
                </div>
                
                <div className="member-actions">
                  <button className="mythic-button primary">
                    <span>Send Message</span>
                  </button>
                  <button className="mythic-button secondary">
                    <span>View Profile</span>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-results">
            <div className="empty-icon">🔍</div>
            <h3>No Scrolls Found</h3>
            <p>The archives contain no records matching your query</p>
          </div>
        )}
      </div>
    </div>
  );
};
