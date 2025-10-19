export const isValidIp = (ip) => {
  if (!ip || typeof ip !== 'string') return false;
  
  // Remove whitespace
  ip = ip.trim();
  
  // Check for valid IPv4 format
  const parts = ip.split('.');
  
  if (parts.length !== 4) return false;
  
  return parts.every(part => {
    const num = parseInt(part, 10);
    // Allow 0-255, including leading zeros (like 103.25.220.18 or 008.008.008.008)
    return !isNaN(num) && num >= 0 && num <= 255 && part.length > 0;
  });
};

export const parseLocation = (locationString) => {
  try {
    return JSON.parse(locationString);
  } catch {
    return null;
  }
};

export const getCoordinates = (loc) => {
  if (!loc) return [0, 0];
  const [lat, lng] = loc.split(',').map(Number);
  return [lat, lng];
};