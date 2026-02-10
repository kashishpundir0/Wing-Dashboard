// src/api/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  
  // NEVER attach a token for login requests
  const isLoginRequest = config.url.includes('/login');

  if (token && !isLoginRequest) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;