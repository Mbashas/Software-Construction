
// src/services/taskService.js
const API_BASE_URL = 'http://127.0.0.1:8000';

export const fetchTasks = async () => {
    const response = await fetch(`${API_BASE_URL}/tasks/`);
    if (!response.ok) {
        throw new Error('Failed to fetch tasks');
    }
    return response.json();
};