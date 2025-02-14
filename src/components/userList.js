/*
 * Component-Based Architecture:
 * This component demonstrates separation of concerns by:
 * 1. UI rendering
 * 2. State management
 * 3. Event handling
 * Following single responsibility principle
 */

import React, { useState } from "react";
// Modular design: Custom hook separates data fetching logic
import useFetchUsers from "../hooks/useFetchUsers";
// Dependency injection: Services are imported and used through well-defined interfaces
import { deleteUser, createUser } from "../services/userService";

function UserList() {
  // State management encapsulation
  const { users, loading, error, setUsers } = useFetchUsers();
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  // Error handling pattern: Try-catch blocks for robust error management
  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch {
      alert("Error deleting user");
    }
  };

  // Form handling with validation and error handling
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

  // Event handler encapsulation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  // Conditional rendering based on state
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // UI Component structure
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
