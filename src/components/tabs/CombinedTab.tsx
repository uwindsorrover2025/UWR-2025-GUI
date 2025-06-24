import { useState, useEffect } from 'react';
import CameraFeed from '../ui/CameraFeed';
import TelemetryDisplay from '../ui/TelemetryDisplay';
import GpsDisplay from '../ui/GpsDisplay';
import { CameraFeed as CameraFeedType, TelemetryData, GpsData } from '../../types';
import { CAMERA_FEEDS } from '../../config';

const CombinedTab = () => {
  const [cameras] = useState<CameraFeedType[]>([
    CAMERA_FEEDS.FRONT,
    CAMERA_FEEDS.REAR
  ]);
  
  const [telemetryData, setTelemetryData] = useState<TelemetryData>({
    batteryLevel: 78,
    motorTemperature: 42,
    signalStrength: 86,
    internalTemperature: 36,
  });
  
  const [gpsData, setGpsData] = useState<GpsData>({
    latitude: 48.7162,
    longitude: -118.0187,
    altitude: 142.8,
    heading: 287.5,
  });
  
  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryData(prev => ({
        ...prev,
        batteryLevel: Math.max(0, Math.min(100, prev.batteryLevel + (Math.random() * 2 - 1))),
        motorTemperature: Math.max(30, Math.min(90, prev.motorTemperature + (Math.random() * 2 - 1))),
        signalStrength: Math.max(0, Math.min(100, prev.signalStrength + (Math.random() * 4 - 2))),
        internalTemperature: Math.max(20, Math.min(70, prev.internalTemperature + (Math.random() * 1 - 0.5))),
      }));
      
      setGpsData(prev => ({
        ...prev,
        latitude: prev.latitude + (Math.random() * 0.0001 - 0.00005),
        longitude: prev.longitude + (Math.random() * 0.0001 - 0.00005),
        altitude: Math.max(0, prev.altitude + (Math.random() * 0.2 - 0.1)),
        heading: (prev.heading + (Math.random() * 2 - 1)) % 360,
      }));
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="space-y-4 animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">Combined View</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cameras.map(camera => (
              <CameraFeed
                key={camera.id}
                camera={camera}
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <TelemetryDisplay data={telemetryData} />
          <GpsDisplay data={gpsData} />
        </div>
      </div>
    </div>
  );
};

export default CombinedTab;