import axios from 'axios';

// Base API URL - points to backend server
const API_URL = 'http://localhost:8000/api';

// Authentication API service - handles all auth-related API calls
export const authAPI = {
  
  // Login method - authenticates user with email and password

  // Parameters: user's email address and password
  // Must return with correct user data and token
  login: async (email, password) => {
    // Make POST request to login endpoint with credentials
    const { data } = await axios.post(`${API_URL}/login`, { email, password });
    
    // Return the response data (typically includes user info and auth token)
    return data;
  }
  
};