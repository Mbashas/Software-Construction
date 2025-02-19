// src/components/TaskList/TaskList.js
import React from 'react';
import styles from './TaskList.module.css';

export const TaskList = ({ tasks, onPageChange, currentPage }) => {
  return (
    <div className={styles.taskList}>
      {tasks.map(task => (
        <div key={task.id} className={styles.taskCard}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>
        </div>
      ))}
      <div className={styles.pagination}>
        <button 
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button 
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};