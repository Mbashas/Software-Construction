import React from 'react';
import { useTasks } from '../../context/TaskContext';
import './TaskStyles.css';

const TaskStats = () => {
  const { tasks } = useTasks();
  
  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status).length;
  const pendingTasks = totalTasks - completedTasks;
  
  // Calculate overdue tasks (tasks with due_date in the past that aren't completed)
  const overdueTasks = tasks.filter(task => {
    if (!task.due_date || task.status) return false;
    const dueDate = new Date(task.due_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Remove time component for comparison
    return dueDate < today;
  }).length;
  
  return (
    <div className="task-stats">
      <div className="stat-card total">
        <div className="stat-value">{totalTasks}</div>
        <div className="stat-label">Total Scrolls</div>
      </div>
      
      <div className="stat-card completed">
        <div className="stat-value">{completedTasks}</div>
        <div className="stat-label">Completed</div>
      </div>
      
      <div className="stat-card pending">
        <div className="stat-value">{pendingTasks}</div>
        <div className="stat-label">In Progress</div>
      </div>
      
      <div className="stat-card overdue">
        <div className="stat-value">{overdueTasks}</div>
        <div className="stat-label">Overdue</div>
      </div>
    </div>
  );
};

export default TaskStats;