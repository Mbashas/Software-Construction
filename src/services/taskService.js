const API_URL = 'http://127.0.0.1:8000';

export const fetchTasks = async () => {
  const response = await fetch(`${API_URL}/tasks/`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

export async function deleteTask(taskId) {
  const response = await fetch(`${API_URL}/tasks/${taskId}/`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
  return true;
}

export const createTask = async (taskData) => {
  const response = await fetch(`${API_URL}/tasks/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return response.json();
};