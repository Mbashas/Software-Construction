import React from 'react';
import { useTasks } from '../../context/TaskContext';
import './TaskStyles.css';

const TaskHeader = () => {
  const { filters, setFilter, sorting, setSort } = useTasks();
  
  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(name, value);
  };
  
  // Handle search input
  const handleSearchChange = (e) => {
    setFilter('search', e.target.value);
  };
  
  return (
    <div className="papyrus-task-header">
      <div className="papyrus-title-section">
        <div className="papyrus-symbols">
          <span className="papyrus-symbol">𓂀</span> {/* Eye of Horus */}
        </div>
        <h1>The Scrolls of Tasks</h1>
        <div className="papyrus-symbols">
          <span className="papyrus-symbol">𓇯</span> {/* Ankh */}
        </div>
      </div>
      
      <p className="papyrus-subtitle">
        "As written by the scribes, so shall it be accomplished"
      </p>
      
      <div className="task-controls">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search the papyri..." 
            value={filters.search}
            onChange={handleSearchChange}
            className="papyrus-search"
          />
          <span className="search-icon">𓁿</span> {/* Egyptian search symbol */}
        </div>
        
        <div className="filters">
          <div className="filter-group">
            <label>By Status:</label>
            <select 
              name="status" 
              value={filters.status}
              onChange={handleFilterChange}
              className="papyrus-select"
            >
              <option value="all">All Scrolls</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>By Priority:</label>
            <select 
              name="priority" 
              value={filters.priority}
              onChange={handleFilterChange}
              className="papyrus-select"
            >
              <option value="all">All Levels</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="sort-controls">
        <div className="sort-label">Order By:</div>
        <button 
          onClick={() => setSort('title')} 
          className={`sort-button ${sorting.field === 'title' ? 'active' : ''}`}
        >
          Title
          {sorting.field === 'title' && (
            <span className="sort-direction">
              {sorting.direction === 'asc' ? ' 𓏜' : ' 𓏝'}
            </span>
          )}
        </button>
        
        <button 
          onClick={() => setSort('due_date')} 
          className={`sort-button ${sorting.field === 'due_date' ? 'active' : ''}`}
        >
          Due Date
          {sorting.field === 'due_date' && (
            <span className="sort-direction">
              {sorting.direction === 'asc' ? ' 𓏜' : ' 𓏝'}
            </span>
          )}
        </button>
        
        <button 
          onClick={() => setSort('priority')} 
          className={`sort-button ${sorting.field === 'priority' ? 'active' : ''}`}
        >
          Priority
          {sorting.field === 'priority' && (
            <span className="sort-direction">
              {sorting.direction === 'asc' ? ' 𓏜' : ' 𓏝'}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default TaskHeader;
