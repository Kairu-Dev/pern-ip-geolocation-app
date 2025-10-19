import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ipInfoAPI } from '../api/ipinfo';
import { historyAPI } from '../api/history';
import { isValidIp, parseLocation } from '../utils/validation';
import SearchBar from '../components/SearchBar';
import IpInfoCard from '../components/IpInfoCard';
import MapView from '../components/MapView';
import HistoryList from '../components/HistoryList';

const Home = () => {
  const { user, logout, token } = useContext(AuthContext);
  
  // IP Search State
  const [ipData, setIpData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // History State
  const [history, setHistory] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch user's IP on mount
  useEffect(() => {
    fetchUserIp();
    fetchHistory();
  }, []);

  const fetchUserIp = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await ipInfoAPI.getUserIp();
      setIpData(data);
    } catch (err) {
      setError('Failed to fetch your IP information.');
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    if (!token) return;
    try {
      const data = await historyAPI.getAll(token);
      setHistory(data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  const handleSearch = async (ip) => {
    if (!ip.trim()) {
      setError('Please enter an IP address.');
      return;
    }

    if (!isValidIp(ip)) {
      setError('Invalid IP address format.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await ipInfoAPI.lookupIp(ip);
      setIpData(data);
      
      await historyAPI.create(token, ip, data);
      fetchHistory();
    } catch (err) {
      setError('Failed to fetch IP information.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setError('');
    setSelectedIds([]);
    fetchUserIp();
  };

  const handleHistoryClick = (item) => {
    const location = parseLocation(item.location);
    if (location) {
      setIpData(location);
      setError('');
    }
  };

  const toggleSelection = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedIds(prev =>
      prev.length === history.length ? [] : history.map(item => item.id)
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) {
      setError('Please select at least one history item.');
      return;
    }

    setDeleteLoading(true);
    try {
      await historyAPI.deleteMultiple(token, selectedIds);
      setSelectedIds([]);
      fetchHistory();
    } catch (err) {
      setError('Failed to delete history.');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-lg border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-white">IP Tracker</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-blue-200 text-sm hidden sm:block">{user?.email}</span>
            <button
              onClick={logout}
              className="bg-red-500/20 hover:bg-red-500/30 text-red-200 px-4 py-2 rounded-lg transition border border-red-500/30"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col xl:flex-row gap-6">
          {/* Main Content */}
            <div className="flex-1 space-y-6">
            {/* Search */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Search IP Address</h2>
              <SearchBar onSearch={handleSearch} onClear={handleClear} loading={loading} />
              {error && (
                <div className="mt-4 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
            </div>

            {/* IP Info */}
            {ipData && !loading && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Location Information</h2>
                <IpInfoCard ipData={ipData} />
                {ipData.loc && (
                  <div className="mt-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Location on Map</h3>
                    <MapView ipData={ipData} />
                  </div>
                )}
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-12">
                <div className="flex flex-col items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4" />
                  <p className="text-blue-200">Loading IP information...</p>
                </div>
              </div>
            )}
          </div>

          {/* History Sidebar */}
          <div className="w-full xl:w-96 flex-shrink-0">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 xl:sticky xl:top-24">
              {selectedIds.length > 0 && (
                <button
                  onClick={handleDeleteSelected}
                  disabled={deleteLoading}
                  className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-200 px-4 py-2 rounded-lg transition border border-red-500/30 mb-4 disabled:opacity-50"
                >
                  {deleteLoading ? 'Deleting...' : `Delete Selected (${selectedIds.length})`}
                </button>
              )}
              <HistoryList
                history={history}
                selectedIds={selectedIds}
                onToggleSelection={toggleSelection}
                onToggleSelectAll={toggleSelectAll}
                onItemClick={handleHistoryClick}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(59, 130, 246, 0.5); border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(59, 130, 246, 0.7); }
      `}</style>
    </div>
  );
};

export default Home;