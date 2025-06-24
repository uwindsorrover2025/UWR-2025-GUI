export const ROS_CONFIG = {
  WEBSOCKET_URL: 'ws://172.20.10.2:9090',
  TOPICS: {
    GPS: {
      name: '/fix',
      messageType: 'sensor_msgs/msg/NavSatFix'
    },
    CAMERAS: {
      FRONT: {
        name: '/hp_cam/image_raw/compressed',
        messageType: 'sensor_msgs/msg/CompressedImage'
      },
      REAR: {
        name: '/sb_cam/image_raw/compressed',
        messageType: 'sensor_msgs/msg/CompressedImage'
      }
    }
  }
};

export const CAMERA_FEEDS = {
  FRONT: {
    id: 'front-camera',
    name: 'Front Camera',
    status: 'online'
  },
  REAR: {
    id: 'rear-camera',
    name: 'Rear Camera',
    status: 'online'
  }
} as const;