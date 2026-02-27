import apiClient from './apiClient';

export const interviewApi = {
    /**
     * Fetch bookings based on role.
     */
    getBookings: async () => {
        const role = localStorage.getItem('userRole');
        const userId = localStorage.getItem('userId');

        if (role === 'admin') {
            const response = await apiClient.get('/api/bookings');
            return response.data;
        } else {
            const response = await apiClient.get(`/api/user-bookings/${userId}`);
            return response.data;
        }
    },

    /**
     * Update Booking Status (Accept/Reject)
     * @param {string} id - Booking ID
     * @param {string} status - 'accepted' or 'rejected'
     * @param {string} rejectionReason - Mandatory if status is 'rejected'
     */
    updateBookingStatus: async (id, status, rejectionReason = "") => {
        const payload = { status };
        if (status === 'rejected') {
            payload.rejectionReason = rejectionReason;
        }

        // Using the endpoint from your screenshot: PUT /api/interview-change-status/:id
        const response = await apiClient.put(`/api/interview-change-status/${id}`, payload);
        return response.data;
    }
};