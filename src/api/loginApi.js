import axios from 'axios';

const apiClient = axios.create({
  baseURL: '', // Using proxy from vite.config
  headers: {
    'Content-Type': 'application/json',
  },
});

export const loginUser = async (credentials) => {
  try {
    // 1. Try Admin Login first
    try {
      const adminRes = await apiClient.post('/api/admin/login-admin', {
        email: credentials.email,
        password: credentials.password
      });

      if (adminRes.data.success) {
        const { token, admin } = adminRes.data;
        const name = admin.name || 'Admin'; // Fallback to 'Admin' if name is missing

        localStorage.setItem('token', token);
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('userName', name);

        // Return name directly so the component can use it immediately
        return { role: 'admin', userName: name, ...adminRes.data };
      }
    } catch (adminError) {
      console.log("Not an admin, trying interviewer...");
    }

    // 2. Try Interviewer Login
    const intRes = await apiClient.post('/api/interviewer/login', {
      email: credentials.email,
      password: credentials.password
    });

    if (intRes.data.success) {
      const { token, data } = intRes.data;
      const name = data.interviewer.name || 'Interviewer';

      localStorage.setItem('token', token);
      localStorage.setItem('userRole', 'interviewer');
      localStorage.setItem('userName', name);

      return { role: 'interviewer', userName: name, ...intRes.data };
    }

    throw new Error("Invalid credentials");
  } catch (error) {
    const msg = error.response?.data?.message || "Authentication failed. Please check your credentials.";
    throw new Error(msg);
  }
};