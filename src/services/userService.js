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
  const response = await axios.post(API_URL, {
    ...userData,
    id: Math.floor(Math.random() * 10000) // Generate temporary ID
  });
  return response.data;
};