// src/App.js
import React, { useState, useEffect } from 'react';
import { Login } from './components/Login/Login';
import { UserList } from './components/UserList/UserList';
import { TaskList } from './components/TaskList/TaskList';
import { isAuthenticated, setAuthToken, logout } from './services/authService';
import './App.css';

function App() {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(isAuthenticated());
    
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
            <header className="App-header">
                <h1>Task Management System</h1>
                {user && <p>Welcome, {user.username}!</p>}
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </header>
            <main>
                <div className="content-container">
                    <UserList />
                    <TaskList />
                </div>
            </main>
        </div>
    );
}

export default App;