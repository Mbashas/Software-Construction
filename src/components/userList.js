import React, { useState } from "react";
import useFetchUsers from "../hooks/useFetchUsers";
import { deleteUser, createUser } from "../services/userService";

function UserList() {
  const { users, loading, error, setUsers } = useFetchUsers();
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch {
      alert("Error deleting user");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!newUser.name || !newUser.email) {
        throw new Error('Please fill in all fields');
      }
      const createdUser = await createUser(newUser);
      setUsers(prevUsers => [...prevUsers, createdUser]);
      setNewUser({ name: '', email: '' });
    } catch (error) {
      alert(error.message || "Error creating user");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>User List</h2>
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newUser.name}
          onChange={handleInputChange}
          placeholder="Enter name"
          required
        />
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleInputChange}
          placeholder="Enter email"
          required
        />
        <button type="submit">Add User</button>
      </form>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
