import React from 'react';
import styles from './UserCard.module.css';

export const UserCard = ({ user, viewStyle }) => {
  // Create avatar background based on username
  const getAvatarColor = (username) => {
    const colors = [
      'linear-gradient(45deg, #ff9a9e, #fad0c4)',
      'linear-gradient(45deg, #a1c4fd, #c2e9fb)',
      'linear-gradient(45deg, #ffecd2, #fcb69f)',
      'linear-gradient(45deg, #84fab0, #8fd3f4)',
      'linear-gradient(45deg, #d4fc79, #96e6a1)'
    ];
    
    // Simple hash function to get consistent color for each username
    const hash = username.split('').reduce(
      (acc, char) => acc + char.charCodeAt(0), 0
    );
    
    return colors[hash % colors.length];
  };

  const getInitials = (username) => {
    return username ? username.charAt(0).toUpperCase() : '?';
  };

  return (
    <div className={`${styles.card} ${viewStyle === 'list' ? styles.listCard : ''}`}>
      <div 
        className={styles.avatar}
        style={{ background: getAvatarColor(user.username || '') }}
      >
        {getInitials(user.username)}
      </div>
      
      <div className={styles.info}>
        <h3 className={styles.username}>{user.username}</h3>
        <p className={styles.email}>{user.email}</p>
      </div>
      
      <div className={styles.actions}>
        <button className={styles.actionButton}>View Profile</button>
        <button className={`${styles.actionButton} ${styles.messageButton}`}>Message</button>
      </div>
    </div>
  );
};
