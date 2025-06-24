import { AlertCircle, Satellite, Wifi } from 'lucide-react';
import logo from '../assets/images/logo.png';

const Header = () => {
  return (
    <header className="bg-black py-3 px-4 border-b border-blue-900 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="UWR Logo" className="h-10 w-auto" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            UWR 2025 Mars Rover Control
          </h1>
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Wifi size={16} className="text-green-400" />
            <span>Connected</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Satellite size={16} className="text-yellow-400" />
            <span>GPS: Active</span>
          </div>
          
          <div className="flex items-center space-x-1 bg-black px-2 py-1 rounded-md border border-red-800">
            <AlertCircle size={16} className="text-red-500 animate-pulse" />
            <span className="text-red-400">System: Nominal</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;