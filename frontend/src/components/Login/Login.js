import React, { useState } from 'react';
import { login } from '../../services/authService';
import './Login.css';

export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      // Use the actual login function from authService
      const userData = await login(username, password);
      onLogin(userData);
      
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.error || 'Invalid username or password');
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-papyrus"></div>
      
      <div className="login-decorations">
        <div className="login-column column-left"></div>
        <div className="login-column column-right"></div>
        <div className="login-symbol symbol-eye"></div>
        <div className="login-symbol symbol-ankh"></div>
      </div>
      
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <div className="login-logo-bg"></div>
            <span className="login-logo-icon">🏛️</span>
          </div>
          <h1 className="login-title">Agora Hub</h1>
          <p className="login-subtitle">Enter the Assembly of Knowledge</p>
        </div>
        
        {error && <div className="login-error">{error}</div>}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your scholarly name"
              className="form-input"
              autoComplete="username"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your secret passage"
              className="form-input"
              autoComplete="current-password"
            />
          </div>
          
          <div className="form-actions">
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Opening Gates...' : 'Enter the Agora'}
            </button>
          </div>
        </form>
        
        <div className="mythic-scroll">
  <div className="scroll-contents">
    <h4>Ancient Knowledge</h4>
    <p>The gatekeepers whisper that "admin" serves as both name and key for those yet to be granted their own passage.</p>
  </div>
</div>
      </div>
    </div>
  );
};