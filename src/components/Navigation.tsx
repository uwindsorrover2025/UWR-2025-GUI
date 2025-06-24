import { useState, useEffect } from 'react';
import { TabType } from '../types';
import { Monitor, Truck, Bot, Settings, MapPin } from 'lucide-react';

interface NavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const tabs = [
    { id: 'combined', label: 'Combined', icon: <Monitor size={18} /> },
    { id: 'drive', label: 'Drive', icon: <Truck size={18} /> },
    { id: 'arm', label: 'Arm', icon: <Bot size={18} /> },
    { id: 'gps', label: 'GPS', icon: <MapPin size={18} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={18} /> },
  ];

  return (
    <nav className="bg-black/50 backdrop-blur-sm px-4 py-2">
      <ul className="flex space-x-1 md:space-x-2">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <button
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex items-center px-3 py-2 rounded-md transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-900/70 text-blue-300 shadow-md shadow-blue-500/20'
                  : 'hover:bg-gray-800/70 text-gray-400 hover:text-gray-200'
              } ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
              style={{ 
                transitionDelay: mounted ? `${tabs.indexOf(tab) * 100}ms` : '0ms'
              }}
            >
              <span className="mr-2">{tab.icon}</span>
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <span className="ml-2 text-xs px-1.5 py-0.5 bg-blue-500/20 rounded-sm">
                  Alt+{tabs.indexOf(tab) + 1}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;