import apiClient from './apiClient';

// GET: Fetch all interviewers
export const getInterviewers = async () => {
  const response = await apiClient.get('/api/interviewer/');
  return response.data.data;
};

// POST: Create (Requires Multipart/Form-Data for files/images)
export const registerInterviewer = async (formData) => {
  const response = await apiClient.post('/api/interviewer/create-interviewer', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// PUT: Update (Your snippet shows Raw JSON passing)
export const updateInterviewer = async (id, payload) => {
  // payload is a simple object: { name: "Kashish" }
  const response = await apiClient.put(`/api/interviewer/${id}`, payload);
  return response.data;
};

// DELETE: Remove interviewer by ID
export const deleteInterviewer = async (id) => {
  try {
    const response = await apiClient.delete(`/api/interviewer/${id}`);
    return response.data;  // Assuming the server returns a success message or the deleted object.
  } catch (error) {
    //  Handle errors:  Important!
    console.error("Delete failed:", error);

    // Provide a useful error message.  Check the server response for details.
    throw new Error(error.response?.data?.message || "Failed to delete interviewer.  Please check the ID and try again.");
  }
};