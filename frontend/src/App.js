import React, { useState, useEffect } from 'react';
import { Login } from './components/Login/Login';
import { TaskList } from './components/TaskList/TaskList';
import { UserGallery } from './components/UserGallery/UserGallery';
import { isAuthenticated, logout, setAuthToken } from './services/authService';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [activeView, setActiveView] = useState('users');
  const [loginError, setLoginError] = useState(null);
  
  // Initialize authentication state from localStorage
  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
        setAuthToken(token);
        setAuthenticated(true);
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
      // If there's an error parsing stored data, clear it
      logout();
      setAuthenticated(false);
    }
  }, []);

  const handleLogin = (userData) => {
    try {
      if (!userData || !userData.token) {
        throw new Error('Invalid login data');
      }
      
      setUser(userData);
      setAuthenticated(true);
      setLoginError(null);
      
    } catch (error) {
      console.error('Login handler error:', error);
      setLoginError('Failed to process login. Please try again.');
      setAuthenticated(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setAuthenticated(false);
  };

  return (
    <div className="app-container">
      {!authenticated ? (
        <Login onLogin={handleLogin} error={loginError} />
      ) : (
        <>
          <header className="app-header">
            <div className="app-brand">
              <div className="logo-icon">🏛️</div>
              <h1>Agora Hub</h1>
            </div>
            
            <nav className="app-nav">
              <button 
                className={`nav-btn ${activeView === 'users' ? 'active' : ''}`}
                onClick={() => setActiveView('users')}
              >
                <span className="nav-icon">👥</span>
                <span className="nav-text">The Assembly</span>
              </button>
              <button 
                className={`nav-btn ${activeView === 'tasks' ? 'active' : ''}`}
                onClick={() => setActiveView('tasks')}
              >
                <span className="nav-icon">📜</span>
                <span className="nav-text">Scrolls</span>
              </button>
              
              <div className="user-profile">
                <div className="user-avatar">
                  {user?.username ? user.username[0].toUpperCase() : '?'}
                </div>
                <span className="username">{user?.username || 'Scholar'}</span>
              </div>
              
              <button onClick={handleLogout} className="logout-button">
                <span className="logout-icon">🚶</span>
              </button>
            </nav>
          </header>
          
          <main className="app-content">
            {activeView === 'users' && <UserGallery />}
            {activeView === 'tasks' && <TaskList />}
          </main>
        </>
      )}
    </div>
  );
}

export default App;