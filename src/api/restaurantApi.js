import apiClient from './apiClient';

export const IMAGE_BASE_URL = 'https://wing-man-backend-2.onrender.com/';

// GET ALL
export const getAllRestaurants = async () => {
  const response = await apiClient.get('/api/v1/admin/restaurants/all');
  return response.data;
};

// ADD NEW (Using FormData for File Upload)
export const addRestaurant = async (formData) => {
  const response = await apiClient.post('/api/v1/admin/restaurants/add', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

// UPDATE (Using FormData in case photo is changed)
export const updateRestaurant = async (id, formData) => {
  const response = await apiClient.patch(`/api/v1/admin/restaurants/update/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

// DELETE
export const deleteRestaurant = async (id) => {
  const response = await apiClient.delete(`/api/v1/admin/restaurants/delete/${id}`);
  return response.data;
};