import { useState, useEffect, useRef } from 'react';
import { MapPin, Save, Wifi, WifiOff } from 'lucide-react';
import { ROS_CONFIG } from '../../config';

declare global {
  interface Window {
    ROSLIB: any;
    L: any;
  }
}

interface GpsCoordinates {
  latitude: number;
  longitude: number;
  altitude: number;
  status?: number;
}

interface ConnectionStatus {
  connected: boolean;
  error: string | null;
}

const GpsTab = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    connected: false,
    error: null
  });
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const rosRef = useRef<any>(null);
  const [currentCoordinates, setCurrentCoordinates] = useState<GpsCoordinates>({
    latitude: 0,
    longitude: 0,
    altitude: 0,
    status: -1
  });

  useEffect(() => {
    // Initialize Leaflet map
    if (!mapRef.current) {
      mapRef.current = window.L.map('map').setView([0, 0], 15);
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapRef.current);
      markerRef.current = window.L.marker([currentCoordinates.latitude, currentCoordinates.longitude]).addTo(mapRef.current);
    }

    // Initialize ROS connection
    rosRef.current = new window.ROSLIB.Ros({
      url: ROS_CONFIG.WEBSOCKET_URL
    });

    rosRef.current.on('connection', () => {
      console.log('Connected to websocket server.');
      setConnectionStatus({ connected: true, error: null });
    });

    rosRef.current.on('error', (error: any) => {
      console.error('Error connecting to websocket server:', error);
      setConnectionStatus({ connected: false, error: error.message || 'Connection error' });
    });

    rosRef.current.on('close', () => {
      console.log('Connection to websocket server closed.');
      setConnectionStatus({ connected: false, error: 'Connection closed' });
    });

    // Subscribe to /fix topic
    const fixTopic = new window.ROSLIB.Topic({
      ros: rosRef.current,
      name: ROS_CONFIG.TOPICS.GPS.name,
      messageType: ROS_CONFIG.TOPICS.GPS.messageType
    });

    fixTopic.subscribe((message: any) => {
      if (message.status.status >= 0 && message.latitude !== 0 && message.longitude !== 0) {
        const newCoords = {
          latitude: message.latitude,
          longitude: message.longitude,
          altitude: message.altitude,
          status: message.status.status
        };
        setCurrentCoordinates(newCoords);
        
        // Update map marker and view
        if (markerRef.current && mapRef.current) {
          const pos = [message.latitude, message.longitude];
          markerRef.current.setLatLng(pos);
          mapRef.current.setView(pos, mapRef.current.getZoom());
        }
      }
    });

    return () => {
      if (rosRef.current) {
        rosRef.current.close();
      }
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const [savedCoordinates, setSavedCoordinates] = useState<GpsCoordinates[]>([]);

  const handleSaveCoordinate = () => {
    setSavedCoordinates(prev => [...prev, currentCoordinates]);
    // In a real app, you might want to simulate new coordinates or clear current ones
    // For now, we'll just keep the current ones displayed
    alert('Coordinates saved!');
  };

  return (
    <div className="p-4 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-cyan-400 flex items-center">
          <MapPin size={28} className="mr-3" />
          GPS & Navigation
        </h2>
        <div className="flex items-center">
          {connectionStatus.connected ? (
            <div className="flex items-center text-green-400">
              <Wifi size={20} className="mr-2" />
              Connected
            </div>
          ) : (
            <div className="flex items-center text-red-400">
              <WifiOff size={20} className="mr-2" />
              {connectionStatus.error || 'Disconnected'}
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Leaflet Map */}
        <div className="md:col-span-2 bg-gray-800/50 rounded-lg shadow-xl h-[400px] md:h-[500px] border border-blue-700/50">
          <div id="map" className="w-full h-full rounded-lg" />
        </div>

        {/* Coordinates and Controls */}
        <div className="bg-gray-800/50 p-6 rounded-lg shadow-xl border border-blue-700/50">
          <h3 className="text-xl font-semibold mb-4 text-blue-300">Current Coordinates</h3>
          <div className="space-y-3 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-400">Latitude</label>
              <p className="text-lg text-gray-200 tabular-nums">{currentCoordinates.latitude.toFixed(4)}°</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Longitude</label>
              <p className="text-lg text-gray-200 tabular-nums">{currentCoordinates.longitude.toFixed(4)}°</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400">Altitude</label>
              <p className="text-lg text-gray-200 tabular-nums">{currentCoordinates.altitude.toFixed(1)} m</p>
            </div>
          </div>

          <button
            onClick={handleSaveCoordinate}
            className="w-full flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            <Save size={18} className="mr-2" />
            Save Current Coordinate
          </button>

          {savedCoordinates.length > 0 && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-3 text-blue-300">Saved Coordinates</h4>
              <ul className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {savedCoordinates.map((coord, index) => (
                  <li key={index} className="bg-gray-700/50 p-3 rounded-md text-sm">
                    <p className="text-gray-300">
                      Lat: <span className="font-medium text-gray-100">{coord.latitude.toFixed(4)}°</span>, 
                      Lon: <span className="font-medium text-gray-100">{coord.longitude.toFixed(4)}°</span>
                    </p>
                    <p className="text-gray-400 text-xs">Alt: {coord.altitude.toFixed(1)} m</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GpsTab;