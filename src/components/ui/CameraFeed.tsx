import { useEffect, useState, useRef } from 'react';
import { CameraFeed as CameraFeedType } from '../../types';
import { ROS_CONFIG } from '../../config';
import ROSLIB from 'roslib';

interface CameraFeedProps {
  camera: CameraFeedType;
  isFullscreen?: boolean;
}

const CameraFeed = ({ camera, isFullscreen = false }: CameraFeedProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rosRef = useRef<ROSLIB.Ros | null>(null);
  
  useEffect(() => {
    const ros = new ROSLIB.Ros({
      url: ROS_CONFIG.WEBSOCKET_URL
    });

    ros.on('connection', () => {
      console.log('Connected to ROS websocket server');
      setIsLoading(false);
      setError(null);
    });

    ros.on('error', (error: Error) => {
      console.error('Error connecting to ROS:', error);
      setError('Connection error');
      setIsLoading(false);
    });

    ros.on('close', () => {
      console.log('Connection to ROS websocket server closed');
      setError('Connection closed');
    });

    const topic = new ROSLIB.Topic({
      ros: ros,
      name: camera.id === 'front-camera'
        ? ROS_CONFIG.TOPICS.CAMERAS.FRONT.name
        : ROS_CONFIG.TOPICS.CAMERAS.REAR.name,
      messageType: ROS_CONFIG.TOPICS.CAMERAS.FRONT.messageType
    });

    topic.subscribe((message: any) => {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          const image = new Image();
          image.onload = () => {
            ctx.drawImage(image, 0, 0, canvasRef.current!.width, canvasRef.current!.height);
          };
          image.src = `data:image/jpeg;base64,${message.data}`;
        }
      }
    });

    rosRef.current = ros;
    
    return () => {
      topic.unsubscribe();
      ros.close();
    };
  }, [camera.id]);

  return (
    <div 
      className={`relative rounded-md overflow-hidden border border-blue-900 ${
        isFullscreen ? 'col-span-full row-span-2' : ''
      }`}
    >
      <div className="bg-black aspect-video flex items-center justify-center">
        {isLoading ? (
          <div className="animate-pulse text-blue-500">Connecting to camera feed...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain"
            width="640"
            height="480"
          />
        )}
      </div>
      
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-2 bg-gradient-to-b from-black/80 to-transparent text-xs">
        <div className="font-semibold">{camera.name}</div>
        <div className={`px-1.5 py-0.5 rounded-sm ${
          camera.status === 'online' ? 'bg-green-900/50 text-green-400' :
          camera.status === 'error' ? 'bg-red-900/50 text-red-400' :
          'bg-gray-800/50 text-gray-400'
        }`}>
          {camera.status.toUpperCase()}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center p-2 bg-gradient-to-t from-black/80 to-transparent text-xs">
        <div className="font-mono">RES: 720p</div>
        <div className="font-mono">FPS: 24</div>
      </div>
    </div>
  );
};

export default CameraFeed;