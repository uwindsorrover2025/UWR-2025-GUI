import { useState, useEffect } from 'react';
import CameraFeed from '../ui/CameraFeed';
import ArmControls from '../ui/ArmControls';
import { CameraFeed as CameraFeedType, ArmJoint } from '../../types';

const ArmTab = () => {
  const [cameras, setCameras] = useState<CameraFeedType[]>([
    { id: 'cam3', name: 'Arm Camera', status: 'online' },
    { id: 'cam5', name: 'Science Camera', status: 'offline' },
  ]);
  
  const [joints, setJoints] = useState<ArmJoint[]>([
    { id: 'joint1', name: 'Base Rotation', currentAngle: 45, minAngle: 0, maxAngle: 180 },
    { id: 'joint2', name: 'Shoulder', currentAngle: 90, minAngle: 0, maxAngle: 180 },
    { id: 'joint3', name: 'Elbow', currentAngle: 30, minAngle: -90, maxAngle: 90 },
    { id: 'joint4', name: 'Wrist Pitch', currentAngle: 0, minAngle: -90, maxAngle: 90 },
    { id: 'joint5', name: 'Wrist Roll', currentAngle: 0, minAngle: -180, maxAngle: 180 },
    { id: 'joint6', name: 'Gripper', currentAngle: 50, minAngle: 0, maxAngle: 100 },
  ]);
  
  // Simulate small joint movements
  useEffect(() => {
    const interval = setInterval(() => {
      setJoints(prev => prev.map(joint => ({
        ...joint,
        currentAngle: Math.max(
          joint.minAngle, 
          Math.min(
            joint.maxAngle, 
            joint.currentAngle + (Math.random() * 0.6 - 0.3)
          )
        )
      })));
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="space-y-4 animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">Arm Control</h2>
      
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
            
            <div className="md:col-span-2 bg-gray-900/50 rounded-md border border-blue-900 p-3">
              <h3 className="text-sm font-semibold mb-3 border-b border-blue-900 pb-1 text-blue-300">
                Arm Position Visualization
              </h3>
              <div className="aspect-video bg-black/60 rounded flex items-center justify-center">
                <div className="text-gray-500">
                  Arm visualization placeholder
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <ArmControls joints={joints} />
        </div>
      </div>
    </div>
  );
};

export default ArmTab;