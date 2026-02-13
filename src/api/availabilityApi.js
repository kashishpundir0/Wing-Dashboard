import apiClient from './apiClient';

export const availabilityApi = {
    getInterviewerAvailability: (interviewerId) =>
        apiClient.get(`/api/interviewer-availability/${interviewerId}`),

    setAvailability: (payload) =>
        apiClient.post('/api/interviewer-availability/set', payload),

    // Matches: POST https://wingmann.onrender.com/api/interviewer-availability/delete-day
    deleteDayByDate: (payload) =>
        apiClient.post('/api/interviewer-availability/delete-day', payload),

    // Matches: POST https://wingmann.onrender.com/api/interviewer-availability/delete-slot-by-date
    deleteSlotByDate: (payload) =>
        apiClient.post('/api/interviewer-availability/delete-slot-by-date', payload)
};