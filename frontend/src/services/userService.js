// src/services/userService.js
const API_BASE_URL = 'http://127.0.0.1:8000';

export const fetchUsers = async () => {
    const response = await fetch(`${API_BASE_URL}/users/`);
    if (!response.ok) {
        throw new Error('Failed to fetch users');
    }
    return response.json();
};
