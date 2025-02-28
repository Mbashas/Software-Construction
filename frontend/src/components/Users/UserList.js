import React, { useState, useEffect } from 'react';
import { getUsers } from '../../services/userService';
import { UserCard } from './UserCard';
import styles from './UserList.module.css';

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('username');
  const [viewStyle, setViewStyle] = useState('grid'); // grid or list

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getUsers();
        setUsers(response);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter and sort users
  const filteredUsers = users
    ? users.filter(user => 
        user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortBy] && b[sortBy]) {
          return a[sortBy].localeCompare(b[sortBy]);
        }
        return 0;
      })
    : [];

  if (loading) return <div className={styles.loader}><div className={styles.spinner}></div> Loading users...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Team Members</h1>
        <p className={styles.subtitle}>{users?.length || 0} users registered</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>🔍</span>
        </div>
        
        <div className={styles.filters}>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.select}
          >
            <option value="username">Sort by Username</option>
            <option value="email">Sort by Email</option>
          </select>
          
          <div className={styles.viewToggle}>
            <button 
              className={`${styles.viewButton} ${viewStyle === 'grid' ? styles.active : ''}`}
              onClick={() => setViewStyle('grid')}
              aria-label="Grid view"
            >
              ■
            </button>
            <button 
              className={`${styles.viewButton} ${viewStyle === 'list' ? styles.active : ''}`}
              onClick={() => setViewStyle('list')}
              aria-label="List view"
            >
              ≡
            </button>
          </div>
        </div>
      </div>

      <div className={`${styles.userGrid} ${viewStyle === 'list' ? styles.listView : ''}`}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <UserCard key={user.id} user={user} viewStyle={viewStyle} />
          ))
        ) : (
          <div className={styles.noResults}>
            <p>No users match your search</p>
          </div>
        )}
      </div>
    </div>
  );
};
