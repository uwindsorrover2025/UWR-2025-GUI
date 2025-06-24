import { Battery, Thermometer, Signal } from 'lucide-react';
import { TelemetryData } from '../../types';

interface TelemetryDisplayProps {
  data: TelemetryData;
}

const TelemetryDisplay = ({ data }: TelemetryDisplayProps) => {
  return (
    <div className="bg-gray-900/50 rounded-md border border-blue-900 p-3 h-full">
      <h3 className="text-sm font-semibold mb-2 border-b border-blue-900 pb-1 text-blue-300">
        Telemetry Data
      </h3>
      
      <div className="space-y-3 font-mono">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Battery size={16} className="mr-2 text-green-400" />
            <span className="text-sm">Battery</span>
          </div>
          <div className="text-right">
            <div className="relative w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full ${
                  data.batteryLevel > 60 ? 'bg-green-500' :
                  data.batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${data.batteryLevel}%` }}
              />
            </div>
            <span className="text-xs">{data.batteryLevel}%</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Thermometer size={16} className="mr-2 text-red-400" />
            <span className="text-sm">Motors</span>
          </div>
          <div className="text-right">
            <div className="relative w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full ${
                  data.motorTemperature < 50 ? 'bg-green-500' :
                  data.motorTemperature < 75 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${data.motorTemperature}%` }}
              />
            </div>
            <span className="text-xs">{data.motorTemperature}°C</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Signal size={16} className="mr-2 text-blue-400" />
            <span className="text-sm">Signal</span>
          </div>
          <div className="text-right">
            <div className="relative w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full ${
                  data.signalStrength > 60 ? 'bg-green-500' :
                  data.signalStrength > 30 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${data.signalStrength}%` }}
              />
            </div>
            <span className="text-xs">{data.signalStrength}%</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Thermometer size={16} className="mr-2 text-orange-400" />
            <span className="text-sm">Internal</span>
          </div>
          <div className="text-right">
            <div className="relative w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className={`absolute top-0 left-0 h-full ${
                  data.internalTemperature < 40 ? 'bg-green-500' :
                  data.internalTemperature < 65 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${(data.internalTemperature / 100) * 100}%` }}
              />
            </div>
            <span className="text-xs">{data.internalTemperature}°C</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelemetryDisplay;