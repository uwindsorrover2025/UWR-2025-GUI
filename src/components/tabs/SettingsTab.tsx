import { useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';

const SettingsTab = () => {
  const [settings, setSettings] = useState({
    cameraQuality: 'medium',
    telemetryUpdateRate: 'normal',
    controlSensitivity: 50,
    darkMode: true,
    notifications: true,
    emergencyContactEmail: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  return (
    <div className="space-y-4 animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>
      
      <div className="bg-gray-900/50 rounded-md border border-blue-900 p-6 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">System Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Camera Quality
                </label>
                <select 
                  name="cameraQuality"
                  value={settings.cameraQuality}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-700 rounded py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="low">Low (240p)</option>
                  <option value="medium">Medium (480p)</option>
                  <option value="high">High (720p)</option>
                  <option value="ultra">Ultra (1080p)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Telemetry Update Rate
                </label>
                <select 
                  name="telemetryUpdateRate"
                  value={settings.telemetryUpdateRate}
                  onChange={handleChange}
                  className="w-full bg-black border border-gray-700 rounded py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="slow">Slow (2s)</option>
                  <option value="normal">Normal (1s)</option>
                  <option value="fast">Fast (500ms)</option>
                  <option value="realtime">Realtime (100ms)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Control Sensitivity ({settings.controlSensitivity}%)
                </label>
                <input 
                  type="range" 
                  name="controlSensitivity"
                  min="10" 
                  max="100" 
                  value={settings.controlSensitivity}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-blue-300">Interface Settings</h3>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="darkMode"
                  name="darkMode"
                  checked={settings.darkMode}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-300">
                  Dark Mode
                </label>
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="notifications"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="notifications" className="ml-2 block text-sm text-gray-300">
                  Enable Notifications
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Emergency Contact Email
                </label>
                <input 
                  type="email"
                  name="emergencyContactEmail"
                  value={settings.emergencyContactEmail}
                  onChange={handleChange}
                  placeholder="team@uwr2025.com"
                  className="w-full bg-black border border-gray-700 rounded py-2 px-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end space-x-3">
          <button className="flex items-center px-4 py-2 bg-gray-800 text-gray-300 rounded border border-gray-700 hover:bg-gray-700 transition-colors">
            <RotateCcw size={16} className="mr-2" /> Reset
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-900 text-blue-200 rounded border border-blue-800 hover:bg-blue-800 transition-colors">
            <Save size={16} className="mr-2" /> Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;