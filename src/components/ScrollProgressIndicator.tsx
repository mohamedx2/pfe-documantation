'use client';

import { useState, useEffect } from 'react';

const ScrollProgressIndicator = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const updateScrollIndicator = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = Math.min((scrollY / maxScroll) * 100, 100);
      setScrollPercentage(percentage);
    };
    
    // Initial update
    updateScrollIndicator();
    
    // Add event listener
    window.addEventListener('scroll', updateScrollIndicator);
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', updateScrollIndicator);
  }, []);

  return (
    <div className="scroll-indicator-container">
      <div 
        className="scroll-indicator" 
        style={{ width: `${scrollPercentage}%` }}
      />
    </div>
  );
};

export default ScrollProgressIndicator;
