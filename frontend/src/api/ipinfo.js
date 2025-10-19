import axios from 'axios';

const IPINFO_URL = 'https://ipinfo.io';

// External IP geolocation API service
export const ipInfoAPI = {
  // Get current user's IP address and location
  // @returns {Promise} with user's IP geolocation data
  getUserIp: async () => {
    const { data } = await axios.get(`${IPINFO_URL}/geo`);
    return data; // Returns {ip, city, region, country, loc, etc.}
  },

  // Look up geolocation for a specific IP address
  // @param {string} ip & @returns {Promise} with IP geolocation data
  lookupIp: async (ip) => {
    const { data } = await axios.get(`${IPINFO_URL}/${ip}/geo`);
    return data; // Returns location info for the searched IP
  }
};