import { refreshToken, logout } from '../services/authService';

const API_URL = 'http://127.0.0.1:8000';

export const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  // Set up default headers with authentication
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });
    
    // Handle 401 Unauthorized errors by attempting to refresh the token
    if (response.status === 401) {
      const refreshed = await refreshToken();
      if (refreshed) {
        // Retry the request with the new token
        return apiRequest(endpoint, options);
      } else {
        logout();
        throw new Error('Authentication expired. Please log in again.');
      }
    }
    
    // Handle other unsuccessful responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(JSON.stringify(errorData) || 'An error occurred');
    }
    
    // Return successful response data
    return response.json();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};
