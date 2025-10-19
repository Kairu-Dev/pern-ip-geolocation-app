import { useState } from 'react';

// Search input component for IP address lookup
// @param {Function} onSearch - Called when user submits search
// @param {Function} onClear - Called when user clears search
// @param {boolean} loading - Loading state to disable buttons
const SearchBar = ({ onSearch, onClear, loading }) => {
  const [searchIp, setSearchIp] = useState(''); // Local state for input value

  // Handle form submission - trigger IP search
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchIp);
  };

  // Clear input field and trigger parent clear action
  const handleClear = () => {
    setSearchIp('');
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      {/* IP address input field */}
      <input
        type="text"
        value={searchIp}
        onChange={(e) => setSearchIp(e.target.value)}
        placeholder="Enter IP address (e.g., 8.8.8.8)"
        className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {/* Search button - disabled during loading */}
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition disabled:opacity-50"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
      
      {/* Clear button - resets search state */}
      <button
        type="button"
        onClick={handleClear}
        className="bg-slate-600 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold transition"
      >
        Clear
      </button>
    </form>
  );
};

export default SearchBar;