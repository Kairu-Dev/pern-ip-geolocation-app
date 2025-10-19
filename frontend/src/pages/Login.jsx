import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { authAPI } from '../api/auth';
import eyeLogo from '../assets/bill-cipher-eye.png'; 

// Login page component - handles user authentication
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext); // Auth context for global state
  const navigate = useNavigate(); // Navigation hook for redirects

  // Handle login form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Attempt login with provided credentials
      const data = await authAPI.login(email, password);
      login(data.user, data.token); // Update global auth state
      navigate('/'); // Redirect to home page on success
    } catch (err) {
      // Display error message from API or generic failure
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Login card with glassmorphism effect */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          {/* Header section with logo and title */}
          <div className="text-center mb-8">
            {/* Image Logo*/}
           <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src={eyeLogo} 
              alt="Eye Logo" 
              className="w-full h-full object-cover"
            />
          </div>
            <h1 className="text-3xl font-bold text-white mb-2">I Can See You</h1>
            <p className="text-blue-200">Sign in to continue</p>
          </div>

          {/* Error message display */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {/* Login form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email input field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-2">
                Email Address
              </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="test@example.com"
                />
            </div>

            {/* Password input field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-blue-200 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Test credentials for demo purposes */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-sm text-blue-200 text-center">
              Test Credentials:<br />
              <span className="font-mono text-white">test@example.com</span> / <span className="font-mono text-white">password123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;