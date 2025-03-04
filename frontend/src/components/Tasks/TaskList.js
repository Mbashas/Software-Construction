import React from 'react';
import { useTasks } from '../../context/TaskContext';
import TaskCard from './TaskCard';
import './TaskStyles.css';

const TaskList = () => {
  const { filteredSortedTasks, loading, error } = useTasks();

  if (loading) {
    return (
      <div className="papyrus-loading">
        <div className="papyrus-loading-icon">
          <span className="loading-symbol">𓋹</span>
        </div>
        <p>Loading the ancient scrolls...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="papyrus-error">
        <div className="error-symbol">𓆣</div>
        <h3>By the Wrath of Ra!</h3>
        <p>{error}</p>
        <p>The scrolls cannot be retrieved at this time.</p>
      </div>
    );
  }

  if (filteredSortedTasks.length === 0) {
    return (
      <div className="papyrus-empty">
        <div className="empty-symbol">𓁢</div>
        <h3>The Papyrus is Blank</h3>
        <p>No tasks have been inscribed yet. Begin your writings to fill the scrolls.</p>
      </div>
    );
  }

  return (
    <div className="papyrus-task-list">
      {filteredSortedTasks.map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
