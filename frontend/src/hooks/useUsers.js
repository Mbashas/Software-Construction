// src/hooks/useUsers.js
import { useState, useEffect } from 'react';
import { fetchUsers } from '../services/userService';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers(page);
        setUsers(data);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [page]);

  return { users, loading, page, setPage };
};