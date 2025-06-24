import { useState, useEffect } from 'react';
import { TabType } from './types';
import Header from './components/Header';
import Navigation from './components/Navigation';
import CombinedTab from './components/tabs/CombinedTab';
import DriveTab from './components/tabs/DriveTab';
import ArmTab from './components/tabs/ArmTab';
import SettingsTab from './components/tabs/SettingsTab';
import GpsTab from './components/tabs/GpsTab';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('combined');

  const handleKeyboardShortcut = (e: KeyboardEvent) => {
    if (e.altKey) {
      switch (e.key) {
        case '1':
          setActiveTab('combined');
          break;
        case '2':
          setActiveTab('drive');
          break;
        case '3':
          setActiveTab('arm');
          break;
        case '4':
          setActiveTab('settings');
          break;
        case '5':
          setActiveTab('gps');
          break;
      }
    }
  };

  // Set up keyboard shortcuts
  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardShortcut);
    return () => {
      window.removeEventListener('keydown', handleKeyboardShortcut);
    };
  }, []); // Added empty dependency array to run only on mount and unmount

  return (
    <div className="flex flex-col min-h-screen bg-[#0a192f] text-gray-100">
      <Header />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-grow p-4">
        {activeTab === 'combined' && <CombinedTab />}
        {activeTab === 'drive' && <DriveTab />}
        {activeTab === 'arm' && <ArmTab />}
        {activeTab === 'settings' && <SettingsTab />}
        {activeTab === 'gps' && <GpsTab />}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;