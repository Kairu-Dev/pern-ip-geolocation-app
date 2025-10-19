import axios from 'axios';

// Base API URL for backend server
const API_URL = 'http://localhost:8000/api';

// Helper function to create authorization header with JWT token
// @param {string} token - JWT authentication token
// @returns {Object} - axios headers configuration
const getAuthHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

// History API service - handles search history operations
export const historyAPI = {
  
  // Get all search history records for the authenticated user
  // @param {string} token & @returns {Promise} array of history objects
  getAll: async (token) => {
    const { data } = await axios.get(`${API_URL}/history`, getAuthHeader(token));
    return data.histories; // Extract histories array from response
  },

  // Create a new search history record
  // @param {string} token & {string} ipAddress & {Object} location 
  // @returns {Promise} the created history record
  create: async (token, ipAddress, location) => {
    const { data } = await axios.post(
      `${API_URL}/history`,
      { ipAddress, location }, // Request body with search data
      getAuthHeader(token)
    );
    return data;
  },

  // Delete multiple history records by their IDs
  // @param {string} token & {string[]} ids - array of history record IDs
  // @returns {Promise} deletion confirmation
  deleteMultiple: async (token, ids) => {
    const { data } = await axios.delete(
      `${API_URL}/history`,
      { 
        ...getAuthHeader(token), // Spread auth headers
        data: { ids } // Include IDs in request body for DELETE
      }
    );
    return data;
  }
};