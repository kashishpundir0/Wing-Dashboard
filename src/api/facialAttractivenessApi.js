import apiClient from './apiClient';

/**
 * Fetch photos for a specific user/session
 * URL: /api/curate-vibe/:id
 */
export const getPhotos = async (id) => {
    try {
        const response = await apiClient.get(`/api/curate-vibe/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching photos:", error);
        throw error;
    }
};

/**
 * Upload photos with gender
 * Uses form-data as per your Postman screenshot
 */
export const uploadPhotos = async (id, formData) => {
    try {
        const response = await apiClient.post(`/api/curate-vibe/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error uploading photos:", error);
        throw error;
    }
};