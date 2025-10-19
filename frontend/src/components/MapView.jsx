import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

//Update 2.1 - When user clicks on a history item, map recenters to that location
// Component to handle map view updates
const MapUpdater = ({ coordinates }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(coordinates, 13);
  }, [coordinates, map]);
  
  return null;
};

const MapView = ({ ipData }) => {
  const coordinates = [
    parseFloat(ipData?.loc?.split(',')[0]) || 0,
    parseFloat(ipData?.loc?.split(',')[1]) || 0
  ];

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <MapContainer
        center={coordinates}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={coordinates}>
          <Popup>
            <strong>{ipData.ip}</strong><br />
            {ipData.city}, {ipData.country}
          </Popup>
        </Marker>
        <MapUpdater coordinates={coordinates} />
      </MapContainer>
    </div>
  );
};

export default MapView;