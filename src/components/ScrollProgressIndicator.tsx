'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

interface ScrollProgressIndicatorProps {
  color?: string;
  height?: number;
  showOnlyAfterScroll?: boolean;
  zIndex?: number;
  className?: string;
}

const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
  color,
  height = 3,
  showOnlyAfterScroll = true,
  zIndex = 50,
  className = '',
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(!showOnlyAfterScroll);
  const { theme } = useTheme();
  
  // Calculate and update scroll progress
  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const scrollPercentRounded = Math.round(scrollPercent * 100 * 100) / 100;
      
      setScrollProgress(scrollPercentRounded);
      
      if (showOnlyAfterScroll) {
        setIsVisible(scrollTop > 50);
      }
    };
    
    // Initial calculation
    calculateScrollProgress();
    
    // Add scroll event listener
    window.addEventListener('scroll', calculateScrollProgress);
    
    // Cleanup
    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, [showOnlyAfterScroll]);
  
  // Determine the indicator color based on theme or custom color
  const indicatorColor = color || (theme === 'dark' ? 'var(--primary-light)' : 'var(--primary)');
  
  // Set up gradient for more visually appealing effect
  const gradientColor = theme === 'dark' ? 'rgba(88, 166, 255, 0.7)' : 'rgba(14, 124, 134, 0.7)';
  
  return (
    <div 
      className={`fixed top-0 left-0 right-0 pointer-events-none transition-opacity duration-300 ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        zIndex,
        height: `${height}px`,
        background: theme === 'dark' ? 'rgba(33, 38, 45, 0.5)' : 'rgba(244, 247, 251, 0.5)',
      }}
    >
      <div
        className="h-full transition-transform duration-100 ease-out transform-gpu"
        style={{
          width: '100%',
          transform: `scaleX(${scrollProgress / 100})`,
          transformOrigin: '0% 0%',
          background: `linear-gradient(90deg, ${indicatorColor}, ${gradientColor})`,
        }}
      />
    </div>
  );
};

export default ScrollProgressIndicator;
