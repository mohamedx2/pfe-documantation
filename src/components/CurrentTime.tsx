'use client';

import { useEffect, useState } from 'react';

export default function CurrentTime() {
  // Initialize with the same static time used as fallback to prevent hydration mismatch
  const [time, setTime] = useState<string>('12:00 PM');
  
  useEffect(() => {
    // Set actual time after component mounts (client-side only)
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
