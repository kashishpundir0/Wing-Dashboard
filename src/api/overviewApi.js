// src/api/overviewApi.js
import apiClient from './apiClient';

/**
 * Fetches the summary of visits including total unique visitors
 * Endpoint: /api/visits/summary
 */
export const getVisitSummary = async () => {
    try {
        const response = await apiClient.get('/api/visits/summary');
        // We return the data directly so the component can use it
        return response.data;
    } catch (error) {
        console.error("API Error in getVisitSummary:", error);
        throw error; // Re-throw so the component can handle it if needed
    }
};