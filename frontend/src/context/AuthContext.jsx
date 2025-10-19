import { createContext, useState, useEffect } from 'react';

// Create authentication context for sharing auth state across components
export const AuthContext = createContext();

// Authentication provider component - manages user authentication state
// @param {ReactNode} children - Child components that need auth access
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);        // Current user data
  const [token, setToken] = useState(null);      // JWT authentication token
  const [loading, setLoading] = useState(true);  // Initial auth check loading state

  // Check for existing authentication on app startup
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    // Restore auth state from localStorage if exists
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Auth check complete
  }, []);

  // Login user and persist auth data to localStorage
  // @param {Object} userData & {string} authToken
  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout user and clear all auth data
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  // Provide auth state and methods to all child components
  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};