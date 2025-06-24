const Footer = () => {
  return (
    <footer className="bg-black py-2 px-4 border-t border-blue-900 text-center text-sm text-gray-500">
      <div className="flex justify-between items-center">
        <span>© UWR 2025 - University of Windsor Mars Rover Team</span>
        <span className="font-mono text-xs">
          System Status: <span className="text-green-500">Online</span> | 
          Latency: <span className="text-yellow-500">154ms</span>
        </span>
      </div>
    </footer>
  );
};

export default Footer;