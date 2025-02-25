import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

// Function to login a user
export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/users/login/`, {
        username,
        password
    });
    return response.data;
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

// Function to logout a user
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

// Set auth token for all requests
export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Token ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const register = async (userData) => {
    const response = await fetch(`${API_URL}/users/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
        throw new Error('Registration failed');
    }
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data;
};