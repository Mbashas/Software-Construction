import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import './TaskStyles.css';

const TaskCard = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });
  const { updateTask, deleteTask, users } = useTasks();
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Undetermined';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const getPriorityClass = () => {
    switch(task.priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };
  
  const handleToggleComplete = async () => {
    await updateTask(task.id, { status: !task.status });
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTask(task.id, editedTask);
    setIsEditing(false);
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you certain you wish to remove this scroll from the archives?')) {
      await deleteTask(task.id);
    }
  };
  
  if (isEditing) {
    return (
      <div className={`papyrus-task-card editing ${task.status ? 'completed' : ''}`}>
        <form onSubmit={handleSubmit}>
          <div className="papyrus-edit-form">
            <div className="edit-field">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={editedTask.title}
                onChange={handleChange}
                className="papyrus-input"
                required
              />
            </div>
            
            <div className="edit-field">
              <label>Description:</label>
              <textarea
                name="description"
                value={editedTask.description || ''}
                onChange={handleChange}
                className="papyrus-textarea"
                rows={3}
              />
            </div>
            
            <div className="edit-row">
              <div className="edit-field">
                <label>Due Date:</label>
                <input
                  type="date"
                  name="due_date"
                  value={editedTask.due_date ? editedTask.due_date.split('T')[0] : ''}
                  onChange={handleChange}
                  className="papyrus-input"
                />
              </div>
              
              <div className="edit-field">
                <label>Priority:</label>
                <select
                  name="priority"
                  value={editedTask.priority}
                  onChange={handleChange}
                  className="papyrus-select"
                >
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
            
            <div className="edit-field">
              <label>Assigned To:</label>
              <select
                name="assigned_to"
                value={editedTask.assigned_to || ''}
                onChange={handleChange}
                className="papyrus-select"
              >
                <option value="">Select a scribe...</option>
                {users && users.map(user => (
                  <option key={user.id} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="papyrus-card-actions edit-actions">
            <button type="submit" className="papyrus-button save">
              Save Scroll
            </button>
            <button 
              type="button" 
              className="papyrus-button cancel"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
  
  return (
    <div className={`papyrus-task-card ${task.status ? 'completed' : ''} ${getPriorityClass()}`}>
      <div className="papyrus-card-header">
        <div className="task-checkbox-container">
          <input 
            type="checkbox" 
            checked={task.status} 
            onChange={handleToggleComplete}
            id={`task-${task.id}`}
            className="papyrus-checkbox"
          />
          <label htmlFor={`task-${task.id}`} className="custom-checkbox">
            <span className="check-symbol">✓</span>
          </label>
        </div>
        
        <h3 className="task-title">{task.title}</h3>
        
        <div className="task-priority-badge">
          {task.priority}
        </div>
      </div>
      
      {task.description && (
        <div className="task-description">
          {task.description}
        </div>
      )}
      
      <div className="task-meta">
        <div className="task-dates">
          <span className="task-due-date">
            <span className="meta-label">Due:</span> {formatDate(task.due_date)}
          </span>
          <span className="task-creation-date">
            <span className="meta-label">Created:</span> {formatDate(task.created_at)}
          </span>
        </div>
        
        {task.assigned_to && (
          <div className="task-assigned">
            <span className="meta-label">Scribe:</span> {task.assigned_to}
          </div>
        )}
      </div>
      
      <div className="papyrus-card-actions">
        <button 
          onClick={() => setIsEditing(true)} 
          className="papyrus-button edit"
        >
          Edit
        </button>
        <button 
          onClick={handleDelete} 
          className="papyrus-button delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
