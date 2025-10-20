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
        placeholder="Enter IP address (e.g., 8.8.8.8 or 103.25.220.18)"
        className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {/* Search button - disabled during loading */}
      <button
        type="submit"
        disabled={loading}
        className="search-btn"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
      
      {/* Clear button - resets search state */}
      <button
        type="button"
        onClick={handleClear}
        className="clear-btn"
      >
        Clear
      </button>
    </form>
  );
};

export default SearchBar;