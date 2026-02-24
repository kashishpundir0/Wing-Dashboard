import apiClient from './apiClient';

export const availabilityApi = {
    getInterviewerAvailability: (interviewerId) =>
        apiClient.get(`/api/${interviewerId}/availability`),

    setAvailability: (interviewerId, payload) =>
        apiClient.post(`/api/${interviewerId}/availability`, payload),

    bookSlot: (interviewerId, payload) =>
        apiClient.post(`/api/book-slot/${interviewerId}`, payload),

    deleteDayByDate: (interviewerId, date) =>
        apiClient.delete(`/api/${interviewerId}/availability/${date}`),
};