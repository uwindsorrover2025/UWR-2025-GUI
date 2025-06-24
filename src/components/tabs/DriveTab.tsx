import { useState, useEffect } from 'react';
import CameraFeed from '../ui/CameraFeed';
import DriveControls from '../ui/DriveControls';
import GpsDisplay from '../ui/GpsDisplay';
import { CameraFeed as CameraFeedType, GpsData } from '../../types';

const DriveTab = () => {
  const [cameras, setCameras] = useState<CameraFeedType[]>([
    { id: 'cam1', name: 'Front Camera', status: 'online' },
    { id: 'cam2', name: 'Rear Camera', status: 'online' },
    { id: 'cam4', name: 'Navigation Camera', status: 'error' },
  ]);
  
  const [gpsData, setGpsData] = useState<GpsData>({
    latitude: 48.7162,
    longitude: -118.0187,
    altitude: 142.8,
    heading: 287.5,
  });
  
  // Simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
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
      <h2 className="text-xl font-semibold mb-4">Drive Control</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cameras.map((camera, index) => (
              <CameraFeed 
                key={camera.id} 
                camera={camera} 
                isFullscreen={index === 0}
              />
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <DriveControls />
          <GpsDisplay data={gpsData} />
        </div>
      </div>
    </div>
  );
};

export default DriveTab;