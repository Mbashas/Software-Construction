// src/components/Login/Login.js
import React, { useState } from 'react';
import { login } from '../../services/authService';
import styles from './Login.module.css';

export const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await login(username, password);
            onLogin(userData);
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <div className={styles.error}>{error}</div>}
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};