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
  const { addTask, users } = useTasks();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addTask(newTask);
      setNewTask(initialTaskState);
      setIsExpanded(false);
    } catch (error) {
      console.error('Failed to add task:', error);
      // Could add error feedback here
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
            <span className="form-icon">𓏭</span> {/* Egyptian papyrus roll symbol */}
            Create New Scroll
          </h3>
          
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
                  <option key={user.id} value={user.username}>
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
