import apiClient from './apiClient';

export const interviewApi = {
    /**
     * Fetch bookings based on role.
     * Admin gets everything, Interviewer gets only theirs.
     */
    getBookings: async () => {
        const role = localStorage.getItem('userRole');
        const userId = localStorage.getItem('userId'); // Assuming you store the logged-in user's ID

        if (role === 'admin') {
            // Admin endpoint for all bookings
            const response = await apiClient.get('/api/bookings');
            return response.data;
        } else {
            // Interviewer specific endpoint
            // The ID passed here should be the interviewer's specific ID
            const response = await apiClient.get(`/api/user-bookings/${userId}`);
            return response.data;
        }
    },

    // Optional: Add methods for approval/rejection if you have those endpoints
    updateBookingStatus: async (id, status, comment) => {
        return await apiClient.patch(`/api/bookings/${id}`, { status, comment });
    }
};