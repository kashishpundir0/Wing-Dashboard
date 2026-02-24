// src/api/loginApi.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: '', // Uses Vite proxy
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- REGISTER ADMIN ---
// Ensure this has the "export" keyword
export const registerAdmin = async (userData) => {
  try {
    const res = await apiClient.post('/api/register/admin', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: "admin"
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Admin registration failed.");
  }
};

// --- REGISTER INTERVIEWER ---
export const registerInterviewer = async (userData) => {
  try {
    const res = await apiClient.post('/api/register/interviewer', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: "interviewer"
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Interviewer registration failed.");
  }
};

// --- UNIFIED LOGIN ---
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/api/login', {
      email: credentials.email,
      password: credentials.password
    });

    // Check if the request was successful
    if (response.data.success || response.data.token) {
      const resData = response.data;

      // 1. Extract Token
      const token = resData.token || resData.data?.token;

      // 2. Extract Role
      const userRole = resData.role || resData.data?.role || resData.user?.role;

      // 3. Extract Name
      const userName = resData.userName || resData.data?.name || resData.user?.name || 'User';

      // 4. Extract User ID (CRITICAL for fixing the /api/null error)
      const userId = resData._id || resData.data?._id || resData.user?._id || resData.data?.user?._id;

      if (!token) {
        throw new Error("Login successful but no token received.");
      }

      // 5. Save everything to LocalStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userName', userName);

      if (userId) {
        localStorage.setItem('userId', userId);
      }

      return {
        success: true,
        role: userRole,
        userName: userName,
        token: token,
        userId: userId
      };
    }

    throw new Error("Invalid credentials");
  } catch (error) {
    const msg = error.response?.data?.message || "Authentication failed. Check your email/password.";
    throw new Error(msg);
  }
};