import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/users";

export async function fetchUsers() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function deleteUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500); // Simulate an API call delay
  });
}

export const createUser = async (userData) => {
  const response = await fetch('https://api.example.com/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
};