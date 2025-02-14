/*
 * Service Layer Pattern:
 * This module encapsulates all API communication logic, following the principle of information hiding.
 * It provides a clean interface for user operations while hiding implementation details.
 */

import axios from "axios";

// Encapsulation: API endpoint is hidden from other components
const API_URL = "https://jsonplaceholder.typicode.com/users";

// Abstraction: Complex HTTP operations are abstracted into simple function calls
export async function fetchUsers() {
  const response = await axios.get(API_URL);
  return response.data;
}

// Encapsulation: Delete operation details are hidden behind a simple interface
export async function deleteUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), 500); // Simulate an API call delay
  });
}

// Modular design: Each function handles one specific responsibility
export const createUser = async (userData) => {
  const response = await axios.post(API_URL, {
    ...userData,
    id: Math.floor(Math.random() * 10000) // Generate temporary ID
  });
  return response.data;
};