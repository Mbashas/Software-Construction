import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MemberCard } from './MemberCard';
import { AetherSearch } from './AetherSearch';
import { AetherToggle } from './AetherToggle';
import { AetherStarfield } from './AetherStarfield';
import './AetherHub.css';

export const AetherHub = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('username');
  const [filterActive, setFilterActive] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:8000/users/');
        setMembers(response.data);
        setFilteredMembers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError('Failed to connect. Please try again later.');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (!members) return;
    
    let results = [...members];
    
    if (searchQuery.trim()) {
      results = results.filter(member => 
        member.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.email && member.email.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilterActive(true);
    } else {
      setFilterActive(false);
    }
    
    results.sort((a, b) => {
      if (!a[sortBy] || !b[sortBy]) return 0;
      return a[sortBy].localeCompare(b[sortBy]);
    });
    
    setFilteredMembers(results);
  }, [searchQuery, sortBy, members]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (loading) {
    return (
      <div className="aether-container aether-loading-container">
        <div className="aether-cosmic-loader">
          <div className="aether-orbit"></div>
          <div className="aether-core"></div>
        </div>
        <p className="aether-loading-text">Connecting to Aether Hub...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="aether-container">
        <div className="aether-error">
          <div className="aether-error-symbol">!</div>
          <h3>Connection Failed</h3>
          <p>{error}</p>
          <button 
            className="aether-button aether-button-primary"
            onClick={() => window.location.reload()}
          >
            Reconnect
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="aether-container">
      <AetherStarfield />
      
      <header className="aether-header aether-animate-fade">
        <h1 className="aether-title aether-gradient-text">Aether Hub</h1>
        <p className="aether-subtitle">
          <span className="aether-badge">{filteredMembers.length}</span> 
          connections in your network
        </p>
      </header>

      <div className="aether-control-panel aether-glass aether-animate-fade">
        <AetherSearch 
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name or email..."
        />

        <div className="aether-panel-actions">
          <div className="aether-sort">
            <select 
              className="aether-select" 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="username">Sort by Name</option>
              <option value="email">Sort by Email</option>
            </select>
          </div>
          
          <AetherToggle 
            options={[
              { value: 'grid', icon: '▦' },
              { value: 'list', icon: '☰' }
            ]}
            value={viewMode}
            onChange={setViewMode}
          />
        </div>
      </div>

      <div className="aether-network-info">
        <div className={`aether-status ${filterActive ? 'active' : ''}`}>
          {filterActive 
            ? `Found ${filteredMembers.length} results` 
            : 'Showing all connections'}
        </div>
      </div>

      <div className={`aether-members-grid ${viewMode}`}>
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member, index) => (
            <MemberCard 
              key={member.id} 
              member={member} 
              viewMode={viewMode}
              delay={(index % 10) * 0.05}
            />
          ))
        ) : (
          <div className="aether-empty-state aether-animate-fade">
            <div className="aether-empty-symbol">⚠</div>
            <h3>No connections found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};
