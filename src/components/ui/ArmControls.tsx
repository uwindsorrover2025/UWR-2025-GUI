import { useState } from 'react';
import { ArmJoint } from '../../types';
import { PlusCircle, MinusCircle } from 'lucide-react';

interface ArmControlsProps {
  joints: ArmJoint[];
}

const ArmControls = ({ joints }: ArmControlsProps) => {
  const [selectedJoint, setSelectedJoint] = useState<string>(joints[0]?.id || '');
  
  return (
    <div className="bg-gray-900/50 rounded-md border border-blue-900 p-3 h-full">
      <h3 className="text-sm font-semibold mb-3 border-b border-blue-900 pb-1 text-blue-300">
        Arm Controls
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-400 mb-2">Joint Selection</div>
          <div className="bg-black/40 p-2 rounded border border-blue-900/30 space-y-2">
            {joints.map(joint => (
              <button
                key={joint.id}
                onClick={() => setSelectedJoint(joint.id)}
                className={`w-full text-left px-2 py-1.5 rounded transition-colors ${
                  selectedJoint === joint.id
                    ? 'bg-blue-900/60 text-blue-200'
                    : 'hover:bg-gray-800/60'
                }`}
              >
                <div className="flex justify-between">
                  <span>{joint.name}</span>
                  <span className="text-xs font-mono">
                    {joint.currentAngle}°
                  </span>
                </div>
                <div className="w-full bg-gray-800 h-1 mt-1 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-500 h-full"
                    style={{ 
                      width: `${((joint.currentAngle - joint.minAngle) / (joint.maxAngle - joint.minAngle)) * 100}%` 
                    }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <div className="text-xs text-gray-400 mb-2">Joint Control</div>
          <div className="bg-black/40 p-3 rounded border border-blue-900/30">
            {selectedJoint ? (
              <>
                <div className="font-semibold mb-2">
                  {joints.find(j => j.id === selectedJoint)?.name}
                </div>
                
                <div className="flex items-center justify-between">
                  <button 
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700 hover:bg-gray-700 transition-colors"
                  >
                    <MinusCircle size={20} />
                  </button>
                  
                  <div className="text-center">
                    <div className="text-2xl font-mono">
                      {joints.find(j => j.id === selectedJoint)?.currentAngle}°
                    </div>
                    <div className="text-xs text-gray-500">
                      Range: {joints.find(j => j.id === selectedJoint)?.minAngle}° to {joints.find(j => j.id === selectedJoint)?.maxAngle}°
                    </div>
                  </div>
                  
                  <button 
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center border border-gray-700 hover:bg-gray-700 transition-colors"
                  >
                    <PlusCircle size={20} />
                  </button>
                </div>
                
                <div className="mt-3">
                  <input 
                    type="range" 
                    min={joints.find(j => j.id === selectedJoint)?.minAngle} 
                    max={joints.find(j => j.id === selectedJoint)?.maxAngle}
                    value={joints.find(j => j.id === selectedJoint)?.currentAngle}
                    onChange={() => {}} // Would update joint angle in a real implementation
                    className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              </>
            ) : (
              <div className="text-gray-500 text-center py-4">
                Select a joint to control
              </div>
            )}
          </div>
          
          <div className="mt-4">
            <div className="grid grid-cols-2 gap-2">
              <button className="py-2 bg-blue-900/50 border border-blue-800 rounded text-blue-300 font-semibold hover:bg-blue-800/50 transition-colors">
                Home Position
              </button>
              <button className="py-2 bg-green-900/50 border border-green-800 rounded text-green-300 font-semibold hover:bg-green-800/50 transition-colors">
                Save Position
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArmControls;