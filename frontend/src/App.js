import React, { useState, useEffect } from 'react';
import { Login } from './components/Login/Login';
import { UserList } from './components/Users/UserList'; // Updated import path
import { TaskList } from './components/TaskList/TaskList';
import { isAuthenticated, setAuthToken, logout } from './services/authService';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [activeView, setActiveView] = useState('users'); // Default to users view
  
  // Initialize authentication state
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token) {
      setAuthToken(token);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setAuthenticated(true);
    
    if (userData.token) {
      localStorage.setItem('token', userData.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setAuthToken(userData.token);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setAuthenticated(false);
  };

  if (!authenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="App">
      <header className="app-header">
        <div className="app-title">
          <h1>Task Management System</h1>
          {user && <p className="welcome">Welcome, {user.username}!</p>}
        </div>
        <nav className="app-nav">
          <button 
            className={`nav-btn ${activeView === 'users' ? 'active' : ''}`}
            onClick={() => setActiveView('users')}
          >
            Users
          </button>
          <button 
            className={`nav-btn ${activeView === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveView('tasks')}
          >
            Tasks
          </button>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
      </header>
      <main className="app-main">
        {activeView === 'users' && <UserList />}
        {activeView === 'tasks' && <TaskList />}
      </main>
    </div>
  );
}

export default App;