'use client';

import { useEffect, useState } from 'react';

export default function CurrentTime() {
  const [time, setTime] = useState<string>('');
  
  useEffect(() => {
    // Set initial time
    updateTime();
    
    // Update time every second
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  function updateTime() {
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    setTime(currentTime);
  }
  
  return <>{time}</>;
}
