// src/components/UserList/UserList.js
import React from 'react';
import styles from './UserList.module.css';

export const UserList = ({ users, onPageChange, currentPage }) => {
  return (
    <div className={styles.userList}>
      {users.map(user => (
        <div key={user.id} className={styles.userCard}>
          <h3>{user.username}</h3>
          <p>{user.email}</p>
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

