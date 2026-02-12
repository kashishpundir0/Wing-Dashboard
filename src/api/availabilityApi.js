import apiClient from './apiClient';

export const availabilityApi = {
    // GET: Fetch all records
    getInterviewerAvailability: (interviewerId) =>
        apiClient.get(`/api/interviewer-availability/${interviewerId}`),

    // POST: Used to Update the array of slots (Add/Remove items)
    setAvailability: (payload) =>
        apiClient.post('/api/interviewer-availability/set', payload),

    // DELETE: Removes the entire record (All slots for that day)
    deleteEntireDay: (availabilityId) =>
        apiClient.delete(`/api/interviewer-availability/delete/${availabilityId}`)
};