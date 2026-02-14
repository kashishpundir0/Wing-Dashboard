// src/api/usersApi.js
import apiClient from './apiClient';

/**
 * Fetch paginated user data with optional search
 * @param {number} page - Current page number
 * @param {number} limit - Items per page
 * @param {string} search - Search query string
 */
export const fetchUsers = async (page = 1, limit = 10, search = '') => {
    try {
        const response = await apiClient.get(`/api/userData/user-summary`, {
            // Add search to the params object so it's sent as a query string (?search=...)
            params: {
                page,
                limit,
                search
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};