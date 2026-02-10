import apiClient from './apiClient';

export const getInterviewers = async () => {
  const response = await apiClient.get('/api/auth/interviewers');
  // The API returns { data: [...] }, so we return response.data.data
  return response.data.data; 
};

export const registerInterviewer = async (interviewerData) => {
  const response = await apiClient.post('/api/auth/register-interviewer', interviewerData);
  return response.data;
};

export const updateInterviewer = async (id, interviewerData) => {
  const response = await apiClient.patch(`/api/auth/update-interviewer/${id}`, interviewerData);
  return response.data;
};

export const deleteInterviewer = async (id) => {
  const response = await apiClient.delete(`/api/auth/delete-interviewer/${id}`);
  return response.data;
};