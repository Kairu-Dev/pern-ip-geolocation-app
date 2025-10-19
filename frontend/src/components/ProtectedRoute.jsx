import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Route protection component - ensures user is authenticated before accessing content
// @param {ReactNode} children - Protected content to render if user is logged in
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // Show loading spinner while checking authentication status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Redirect to login page if user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render protected content if user is authenticated
  return children;
};

export default ProtectedRoute;