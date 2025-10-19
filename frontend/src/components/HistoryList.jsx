import { parseLocation } from '../utils/validation';

// Component for displaying and managing IP search history with selection capabilities
// @param {Array} history - Array of history items to display
// @param {Array} selectedIds - Array of currently selected item IDs
// @param {Function} onToggleSelection - Toggles selection of individual items
// @param {Function} onToggleSelectAll - Toggles select all/deselect all
// @param {Function} onItemClick - Handles clicking on history items to reload data
const HistoryList = ({ 
  history, 
  selectedIds, 
  onToggleSelection, 
  onToggleSelectAll, 
  onItemClick 
}) => {
  // Display empty state if no history exists
  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 text-blue-300/50 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-blue-300">No search history yet</p>
        <p className="text-blue-400 text-sm mt-1">Search for an IP to get started</p>
      </div>
    );
  }

  return (
    <>
      {/* Header with select all/deselect all controls */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Search History</h2>
        <button
          onClick={onToggleSelectAll}
          className="text-blue-300 hover:text-blue-200 text-sm transition"
        >
          {selectedIds.length === history.length ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      {/* Scrollable history list with custom scrollbar */}
      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {history.map((item) => {
          const location = parseLocation(item.location); // Parse stored location data
          const isSelected = selectedIds.includes(item.id); // Check if item is selected

          return (
            <div
              key={item.id}
              className={`bg-white/5 border rounded-lg p-3 transition group ${
                isSelected
                  ? 'border-blue-500 bg-blue-500/10' // Selected state styling
                  : 'border-white/10 hover:bg-white/10 hover:border-white/20' // Default/hover state
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Checkbox for selection */}
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggleSelection(item.id)}
                  className="mt-1 w-4 h-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                
                {/* Clickable history item content */}
                <div
                  onClick={() => onItemClick(item)}
                  className="flex-1 cursor-pointer"
                >
                  <p className="text-white font-semibold group-hover:text-blue-300 transition">
                    {item.ipAddress} {/* Display the searched IP address */}
                  </p>
                  <p className="text-blue-200 text-sm">
                    {location?.city}, {location?.country} {/* Location summary */}
                  </p>
                  <p className="text-blue-300 text-xs mt-1">
                    {new Date(item.createdAt).toLocaleString()} {/* Search timestamp */}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default HistoryList;