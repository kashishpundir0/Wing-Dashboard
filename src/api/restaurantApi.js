import apiClient from './apiClient';

// Change this in your API files:
export const IMAGE_BASE_URL = 'https://wingmann.online/api/';

export const getAllRestaurants = async () => {
  const response = await apiClient.get('/api/restaurants/all');
  return response.data;
};

export const addRestaurant = async (formData) => {
  const response = await apiClient.post('/api/restaurants/add', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

// CRITICAL: Uses PUT as required by your server for updates
export const updateRestaurant = async (id, formData) => {
  const response = await apiClient.put(`/api/restaurants/update/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const deleteRestaurant = async (id) => {
  const response = await apiClient.delete(`/api/restaurants/delete/${id}`);
  return response.data;
};