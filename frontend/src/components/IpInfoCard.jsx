// Display component for IP address geolocation information
// @param {Object} ipData - IP information object from API
const IpInfoCard = ({ ipData }) => {
  if (!ipData) return null; // Don't render if no data

  // Reusable component for labeled data items
  const InfoItem = ({ label, value }) => (
    <div>
      <p className="text-blue-300 text-sm mb-1">{label}</p>
      <p className="text-white font-semibold text-lg">{value || 'N/A'}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Core IP information */}
      <InfoItem label="IP Address" value={ipData.ip} />
      <InfoItem label="City" value={ipData.city} />
      <InfoItem label="Region" value={ipData.region} />
      <InfoItem label="Country" value={ipData.country} />
      <InfoItem label="Coordinates" value={ipData.loc} />
      <InfoItem label="Timezone" value={ipData.timezone} />
      
      {/* Optional fields - only show if data exists */}
      {ipData.postal && <InfoItem label="Postal Code" value={ipData.postal} />}
      
      {/* Organization spans full width when present */}
      {ipData.org && (
        <div className="sm:col-span-2">
          <p className="text-blue-300 text-sm mb-1">Organization</p>
          <p className="text-white font-semibold">{ipData.org}</p>
        </div>
      )}
    </div>
  );
};

export default IpInfoCard;