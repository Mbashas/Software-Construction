import React, { useState } from 'react';
import { useTasks } from '../../context/TaskContext';
import './TaskStyles.css';

const TaskCard = ({ task }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const [isDeleting, setIsDeleting] = useState(false);
  const { updateTask, deleteTask, users } = useTasks();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(task.id, editedTask);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task.id);
      } catch (error) {
        console.error('Failed to delete task:', error);
      }
    }
  };

  const handleToggleStatus = async () => {
    try {
      await updateTask(task.id, { ...task, status: !task.status });
    } catch (error) {
      console.error('Failed to toggle task status:', error);
    }
  };

  if (isEditing) {
    return (
      <div className={`papyrus-task-card priority-${task.priority}`}>
        <form onSubmit={handleSubmit} className="papyrus-edit-form">
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
              value={editedTask.description}
              onChange={handleChange}
              className="papyrus-textarea"
            />
          </div>

          <div className="edit-row">
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

            <div className="edit-field">
              <label>Assigned To:</label>
              <select
                name="assigned_to"
                value={editedTask.assigned_to || ''}
                onChange={handleChange}
                className="papyrus-select"
              >
                <option value="">Unassigned</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>

            <div className="edit-field">
              <label>Due Date:</label>
              <input
                type="date"
                name="due_date"
                value={editedTask.due_date?.split('T')[0] || ''}
                onChange={handleChange}
                className="papyrus-input"
              />
            </div>
          </div>

          <div className="edit-actions">
            <button type="submit" className="papyrus-button save">
              Save Changes
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
    <div className={`papyrus-task-card priority-${task.priority} ${task.status ? 'completed' : ''}`}>
      <div className="papyrus-card-header">
        <div className="task-checkbox-container">
          <input
            type="checkbox"
            checked={task.status}
            onChange={handleToggleStatus}
            className="papyrus-checkbox"
            id={`task-${task.id}`}
          />
          <label className="custom-checkbox" htmlFor={`task-${task.id}`}>
            <span className="check-symbol">✓</span>
          </label>
        </div>
        <h3 className="task-title">{task.title}</h3>
        <span className="task-priority-badge">{task.priority}</span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <div className="task-dates">
          <span>
            <span className="meta-label">Created: </span>
            {new Date(task.created_at).toLocaleDateString()}
          </span>
          {task.due_date && (
            <span>
              <span className="meta-label">Due: </span>
              {new Date(task.due_date).toLocaleDateString()}
            </span>
          )}
          {task.completed_at && (
            <span>
              <span className="meta-label">Completed: </span>
              {new Date(task.completed_at).toLocaleDateString()}
            </span>
          )}
        </div>
        {task.assigned_to_username && (
          <span>
            <span className="meta-label">Assigned to: </span>
            {task.assigned_to_username}
          </span>
        )}
      </div>

      <div className="papyrus-card-actions">
        <button
          className="papyrus-button edit"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
        <button
          className="papyrus-button delete"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
