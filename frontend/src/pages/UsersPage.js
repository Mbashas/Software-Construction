// src/pages/UsersPage.js
import React from 'react';
import { UserList } from '../components/UserList/UserList';
import { useUsers } from '../hooks/useUsers';

export const UsersPage = () => {
  const { users, loading, page, setPage } = useUsers();

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div>
      <h1>Users</h1>
      <UserList 
        users={users} 
        onPageChange={setPage}
        currentPage={page}
      />
    </div>
  );
};