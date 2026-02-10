import apiClient from './apiClient';
import axios from 'axios';

export const loginUser = async (credentials) => {
  try {
    const data = new FormData();
    data.append('email', credentials.email);
    data.append('password', credentials.password);

    const response = await apiClient.post('/api/auth/login', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    if (response.data) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.role); 
    }
    
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login failed.";
    throw new Error(errorMessage);
  }
};

export const loginInterviewer = async (credentials) => {
  try {
    // USE STANDARD AXIOS HERE - Bypass the apiClient interceptors completely
    // We point directly to the /api/interviewer/login path
    const response = await axios.post('/api/interviewer/login', {
      email: credentials.email,
      password: credentials.password
    }, {
      // Ensure no headers are inherited
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.data && response.data.success) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', 'interviewer');
      const name = response.data.data?.interviewer?.name || 'Interviewer';
      localStorage.setItem('userName', name);
      return response.data;
    }
    return response.data;
  } catch (error) {
    // If it still says "Token Missing", it is 100% a backend route protection error
    const errorMessage = error.response?.data?.message || "Interviewer Login failed.";
    throw new Error(errorMessage);
  }
};

// IMPLEMENTED: Register Admin API
export const registerAdmin = async (credentials) => {
  try {
    const data = new FormData();
    data.append('email', credentials.email);
    data.append('password', credentials.password);
    data.append('role', 'admin'); // Fixed role for this endpoint

    const response = await apiClient.post('/api/auth/register-admin', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Registration failed.";
    throw new Error(errorMessage);
  }
};

export const forgotPassword = async (email) => {
  const response = await fetch('/api/forgot-password', { // Replace with your actual endpoint
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to send reset link');
  }
  return response.json();
};