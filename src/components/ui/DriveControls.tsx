import { useState } from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, X } from 'lucide-react';

const DriveControls = () => {
  const [activeKeys, setActiveKeys] = useState<string[]>([]);
  
  const handleKeyDown = (key: string) => {
    if (!activeKeys.includes(key)) {
      setActiveKeys([...activeKeys, key]);
    }
  };
  
  const handleKeyUp = (key: string) => {
    setActiveKeys(activeKeys.filter(k => k !== key));
  };
  
  return (
    <div className="bg-gray-900/50 rounded-md border border-blue-900 p-3 h-full">
      <h3 className="text-sm font-semibold mb-3 border-b border-blue-900 pb-1 text-blue-300">
        Drive Controls
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-gray-400 mb-2">Direction Control</div>
          <div className="grid grid-cols-3 gap-2 w-min mx-auto">
            <div className="col-start-2">
              <button 
                className={`w-12 h-12 flex items-center justify-center rounded-md border transition-all ${
                  activeKeys.includes('up') 
                    ? 'bg-blue-600 border-blue-400 shadow-glow' 
                    : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                }`}
                onMouseDown={() => handleKeyDown('up')}
                onMouseUp={() => handleKeyUp('up')}
                onMouseLeave={() => activeKeys.includes('up') && handleKeyUp('up')}
              >
                <ArrowUp size={20} />
              </button>
            </div>
            
            <div>
              <button 
                className={`w-12 h-12 flex items-center justify-center rounded-md border transition-all ${
                  activeKeys.includes('left') 
                    ? 'bg-blue-600 border-blue-400 shadow-glow' 
                    : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                }`}
                onMouseDown={() => handleKeyDown('left')}
                onMouseUp={() => handleKeyUp('left')}
                onMouseLeave={() => activeKeys.includes('left') && handleKeyUp('left')}
              >
                <ArrowLeft size={20} />
              </button>
            </div>
            
            <div>
              <button 
                className={`w-12 h-12 flex items-center justify-center rounded-md border transition-all ${
                  activeKeys.includes('right') 
                    ? 'bg-blue-600 border-blue-400 shadow-glow' 
                    : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                }`}
                onMouseDown={() => handleKeyDown('right')}
                onMouseUp={() => handleKeyUp('right')}
                onMouseLeave={() => activeKeys.includes('right') && handleKeyUp('right')}
              >
                <ArrowRight size={20} />
              </button>
            </div>
            
            <div className="col-start-2">
              <button 
                className={`w-12 h-12 flex items-center justify-center rounded-md border transition-all ${
                  activeKeys.includes('down') 
                    ? 'bg-blue-600 border-blue-400 shadow-glow' 
                    : 'bg-gray-800 border-gray-700 hover:bg-gray-700'
                }`}
                onMouseDown={() => handleKeyDown('down')}
                onMouseUp={() => handleKeyUp('down')}
                onMouseLeave={() => activeKeys.includes('down') && handleKeyUp('down')}
              >
                <ArrowDown size={20} />
              </button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="text-xs text-gray-400 mb-2">Speed Control</div>
          <div className="bg-black/40 p-3 rounded border border-blue-900/30">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs">Speed</span>
              <span className="text-xs font-mono">50%</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              defaultValue="50"
              className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            
            <div className="mt-4">
              <button className="w-full py-2 bg-red-900/50 border border-red-800 rounded text-red-300 font-semibold hover:bg-red-800/50 transition-colors flex items-center justify-center">
                <X size={16} className="mr-1" /> Emergency Stop
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        <div className="bg-black/40 p-2 rounded border border-blue-900/30">
          <div>Active keys: {activeKeys.length > 0 ? activeKeys.join(', ') : 'None'}</div>
          <div className="mt-1">
            You can also use keyboard arrow keys to control the rover
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriveControls;