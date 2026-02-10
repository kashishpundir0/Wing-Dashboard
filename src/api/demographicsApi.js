import apiClient from './apiClient';

export const getDemographics = async () => {
  try {
    const response = await apiClient.get('/api/v1/demographics');
    // If successful, returns the data object
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to fetch demographics";
    throw new Error(errorMessage);
  }
};