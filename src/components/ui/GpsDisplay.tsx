import { Compass, Map } from 'lucide-react';
import { GpsData } from '../../types';

interface GpsDisplayProps {
  data: GpsData;
}

const GpsDisplay = ({ data }: GpsDisplayProps) => {
  return (
    <div className="bg-gray-900/50 rounded-md border border-blue-900 p-3 h-full">
      <h3 className="text-sm font-semibold mb-2 border-b border-blue-900 pb-1 text-blue-300 flex items-center">
        <Map size={16} className="mr-2" /> GPS Data
      </h3>
      
      <div className="space-y-2 font-mono">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-black/40 p-2 rounded border border-blue-900/30">
            <div className="text-xs text-gray-400">Latitude</div>
            <div className="text-sm">{data.latitude.toFixed(6)}°</div>
          </div>
          
          <div className="bg-black/40 p-2 rounded border border-blue-900/30">
            <div className="text-xs text-gray-400">Longitude</div>
            <div className="text-sm">{data.longitude.toFixed(6)}°</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-black/40 p-2 rounded border border-blue-900/30">
            <div className="text-xs text-gray-400">Altitude</div>
            <div className="text-sm">{data.altitude.toFixed(2)}m</div>
          </div>
          
          <div className="bg-black/40 p-2 rounded border border-blue-900/30">
            <div className="text-xs text-gray-400">Heading</div>
            <div className="text-sm flex items-center">
              <Compass size={14} className="mr-1 text-blue-400" />
              {data.heading.toFixed(1)}°
            </div>
          </div>
        </div>
        
        <div className="mt-2">
          <div className="relative w-full h-20 bg-black rounded overflow-hidden border border-blue-900/30">
            <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">
              Map view placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GpsDisplay;