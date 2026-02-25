import axios from 'axios';

const apiClient = axios.create({
  baseURL: '', // Uses Vite proxy
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- REGISTER ADMIN ---
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

    // Postman shows structure: { "data": { "id": "...", "role": "...", "token": "..." } }
    if (response.data && response.data.data) {
      const loginData = response.data.data;

      const token = loginData.token;
      const userId = loginData.id; // MATCHING POSTMAN: loginData.id
      const userRole = loginData.role;
      const userName = loginData.name || 'User';

      if (!token) {
        throw new Error("No token received from server.");
      }

      // Save to LocalStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userName', userName);

      if (userId) {
        localStorage.setItem('userId', userId); // This fixes the /api/null error
      }

      return {
        success: true,
        role: userRole,
        userName: userName,
        token: token,
        userId: userId
      };
    }

    throw new Error("Invalid response format from server.");
  } catch (error) {
    const msg = error.response?.data?.message || "Authentication failed. Check your email/password.";
    throw new Error(msg);
  }
};