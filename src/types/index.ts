// Tab types
export type TabType = 'combined' | 'drive' | 'arm' | 'settings' | 'gps';

// Camera feed types
export interface CameraFeed {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'error';
}

// Telemetry data types
export interface TelemetryData {
  batteryLevel: number;
  motorTemperature: number;
  signalStrength: number;
  internalTemperature: number;
}

// GPS data types
export interface GpsData {
  latitude: number;
  longitude: number;
  altitude: number;
  heading: number;
}

// Rover arm joint types
export interface ArmJoint {
  id: string;
  name: string;
  currentAngle: number;
  minAngle: number;
  maxAngle: number;
}