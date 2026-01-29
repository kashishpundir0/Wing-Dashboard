import apiClient from './apiClient';

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