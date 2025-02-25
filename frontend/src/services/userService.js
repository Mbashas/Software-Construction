import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const getUsers = async () => {
    const response = await axios.get(`${API_URL}/users/`);
    return response.data;
};

export const createUser = async (userData) => {
    const response = await axios.post(`${API_URL}/users/`, userData);
    return response.data;
};
