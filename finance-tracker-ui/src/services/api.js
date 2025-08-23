import axios from 'axios';

// Set the base URL for your backend API
const API_URL = 'http://localhost:5000/api'; // Change this to your actual backend URL

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor to add the auth token to every request if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth Service
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginUser = (userData) => api.post('/auth/login', userData);

// Transaction Service
export const getTransactions = () => api.get('/transactions');
export const addTransaction = (transactionData) => api.post('/transactions', transactionData);
export const updateTransaction = (id, transactionData) => api.put(`/transactions/${id}`, transactionData);
export const deleteTransaction = (id) => api.delete(`/transactions/${id}`);

export default api;