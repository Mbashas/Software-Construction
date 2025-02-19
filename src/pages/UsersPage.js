import React from 'react';
import UserList from '../components/UserList';  // Note the capital 'L'
import useUsers from '../hooks/useUsers';

const UsersPage = () => {
  const { users, loading } = useUsers();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Users</h1>
      <UserList users={users} />
    </div>
  );
};

export default UsersPage;