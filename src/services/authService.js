const API_URL = 'http://127.0.0.1:8000';

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    throw new Error('Authentication failed');
  }
  
  const data = await response.json();
  
  // Store the token in localStorage
  localStorage.setItem('token', data.access);
  if (data.refresh) {
    localStorage.setItem('refreshToken', data.refresh);
  }
  
  return data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  
  const response = await fetch(`${API_URL}/users/me/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  if (!response.ok) {
    if (response.status === 401) {
      logout();
    }
    return null;
  }
  
  return response.json();
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    return false;
  }
  
  try {
    const response = await fetch(`${API_URL}/token/refresh/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });
    
    if (!response.ok) {
      logout();
      return false;
    }
    
    const data = await response.json();
    localStorage.setItem('token', data.access);
    return true;
  } catch (error) {
    logout();
    return false;
  }
};
