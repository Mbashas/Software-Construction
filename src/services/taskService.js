const API_URL = 'http://127.0.0.1:8000';

// Add a function to get authentication token
const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const fetchTasks = async () => {
  const response = await fetch(`${API_URL}/tasks/`, {
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

export async function deleteTask(taskId) {
  const response = await fetch(`${API_URL}/tasks/${taskId}/`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getAuthToken()}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
  return true;
}

export const createTask = async (taskData) => {
  // Ensure the data is properly formatted according to the backend requirements
  const formattedTaskData = {
    title: taskData.title,
    description: taskData.description || '',
    priority: taskData.priority || 'medium',
    due_date: taskData.due_date || null,
    assigned_to: taskData.assigned_to || null,
    status: taskData.status || false
  };

  const response = await fetch(`${API_URL}/tasks/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify(formattedTaskData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Task creation error:', errorData);
    throw new Error(`Failed to create task: ${JSON.stringify(errorData)}`);
  }
  return response.json();
};

// Add function to update a task
export const updateTask = async (taskId, taskData) => {
  const response = await fetch(`${API_URL}/tasks/${taskId}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getAuthToken()}`
    },
    body: JSON.stringify(taskData),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Failed to update task: ${JSON.stringify(errorData)}`);
  }
  return response.json();
};