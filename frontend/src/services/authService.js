import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

// Set authentication token for all future requests
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Check if user is authenticated based on token existence
export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// Log in a user
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login/`, {
      username,
      password
    });
    
    if (response.data && response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify({
        id: response.data.user_id,
        username: response.data.username,
        token: response.data.token
      }));
      
      setAuthToken(response.data.token);
      return response.data;
    }
    
    throw new Error('Invalid response');
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Log out a user
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  setAuthToken(null);
};

// Register a new user
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register/`, userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};