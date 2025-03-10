import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import './TaskStyles.css';

const initialTaskState = {
  title: '',
  description: '',
  status: false,
  priority: 'medium',
  due_date: '',
  assigned_to: ''
};

const NewTaskForm = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newTask, setNewTask] = useState(initialTaskState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { addTask, users } = useTasks();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Validate required fields first
      if (!newTask.title.trim()) {
        throw new Error('Task title is required');
      }
      
      // Format the task data to match what the backend expects
      const formattedTask = {
        title: newTask.title.trim(),
        description: newTask.description.trim(),
        priority: newTask.priority,
        status: false, // Default to false for new tasks
        // Convert assigned_to to number or null
        assigned_to: newTask.assigned_to ? parseInt(newTask.assigned_to, 10) : null
      };
      
      // Only add due_date if it's actually provided
      if (newTask.due_date) {
        formattedTask.due_date = newTask.due_date;
      }
      
      console.log('Preparing to send task:', formattedTask);
      
      // Send the task to be created
      await addTask(formattedTask);
      setNewTask(initialTaskState);
      setIsExpanded(false);
    } catch (error) {
      console.error('Error creating task:', error);
      
      // Display user-friendly error messages
      if (typeof error === 'object' && error !== null) {
        // Extract error messages from response data
        if (error.detail) {
          setError(error.detail);
        } else if (error.message) {
          setError(error.message);
        } else if (error.non_field_errors) {
          setError(error.non_field_errors.join(', '));
        } else {
          // Check for field-specific errors
          const fieldErrors = [];
          for (const key in error) {
            if (Array.isArray(error[key])) {
              fieldErrors.push(`${key}: ${error[key].join(' ')}`);
            }
          }
          
          if (fieldErrors.length > 0) {
            setError(fieldErrors.join('\n'));
          } else {
            setError('Failed to create task. Please check your input.');
          }
        }
      } else {
        setError('Failed to create task. Please check your input.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="new-task-container">
      {!isExpanded ? (
        <button 
          className="new-task-trigger" 
          onClick={() => setIsExpanded(true)}
        >
          <span className="add-icon">+</span>
          <span className="add-text">Inscribe New Task</span>
        </button>
      ) : (
        <div className="new-task-form-wrapper">
          <h3 className="form-title">
            <span className="form-icon">𓏭</span>
            Create New Scroll
          </h3>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="papyrus-form">
            <div className="form-field">
              <label htmlFor="task-title">Title:</label>
              <input
                id="task-title"
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleChange}
                className="papyrus-input"
                placeholder="Enter task title"
                required
              />
            </div>
            
            <div className="form-field">
              <label htmlFor="task-description">Description:</label>
              <textarea
                id="task-description"
                name="description"
                value={newTask.description}
                onChange={handleChange}
                className="papyrus-textarea"
                placeholder="Enter task details"
                rows={3}
              />
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="task-due-date">Due Date:</label>
                <input
                  id="task-due-date"
                  type="date"
                  name="due_date"
                  value={newTask.due_date}
                  onChange={handleChange}
                  className="papyrus-input date-input"
                />
              </div>
              
              <div className="form-field">
                <label htmlFor="task-priority">Priority:</label>
                <select
                  id="task-priority"
                  name="priority"
                  value={newTask.priority}
                  onChange={handleChange}
                  className="papyrus-select"
                >
                  <option value="high">High - By Order of Pharaoh</option>
                  <option value="medium">Medium - For the Temple</option>
                  <option value="low">Low - When Time Permits</option>
                </select>
              </div>
            </div>
            
            <div className="form-field">
              <label htmlFor="task-assigned-to">Assign To:</label>
              <select
                id="task-assigned-to"
                name="assigned_to"
                value={newTask.assigned_to}
                onChange={handleChange}
                className="papyrus-select"
              >
                <option value="">Select a scribe...</option>
                {users && users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-actions">
              <button 
                type="submit" 
                className="papyrus-button submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Inscribing...' : 'Inscribe on Papyrus'}
              </button>
              <button 
                type="button" 
                className="papyrus-button cancel"
                onClick={() => setIsExpanded(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default NewTaskForm;
