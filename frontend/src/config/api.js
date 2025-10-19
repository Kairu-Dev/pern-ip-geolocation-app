// Auto-detect environment
const isDevelopment = import.meta.env.DEV;

export const API_BASE_URL = isDevelopment
  ? 'http://localhost:8000/api'
  : 'https://pern-ip-geolocation-app.vercel.app/';