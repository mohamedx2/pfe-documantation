'use client';

import { useEffect, useState } from 'react';

interface ScrollProgressProps {
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
  showPercentage?: boolean;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  color = 'var(--primary)',
  height = 4,
  position = 'top',
  showPercentage = false,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollY / (docHeight - winHeight);
      setScrollProgress(scrollPercent * 100);
    };

    // Initial calculation
    calculateScrollProgress();

    // Add event listener
    window.addEventListener('scroll', calculateScrollProgress);

    // Cleanup
    return () => window.removeEventListener('scroll', calculateScrollProgress);
  }, []);

  return (
    <>
      <div 
        className="fixed left-0 z-50"
        style={{
          top: position === 'top' ? 0 : 'auto',
          bottom: position === 'bottom' ? 0 : 'auto',
          height: `${height}px`,
          width: `${scrollProgress}%`,
          backgroundColor: color,
          transition: 'width 0.1s',
        }}
      />
      
      {showPercentage && (
        <div 
          className="fixed right-4 bg-background/80 backdrop-blur-sm rounded-full border border-primary/20 shadow-md px-3 py-1 text-xs font-semibold"
          style={{
            bottom: position === 'bottom' ? height + 10 : 'auto',
            top: position === 'top' ? height + 10 : 'auto',
          }}
        >
          {Math.round(scrollProgress)}%
        </div>
      )}
    </>
  );
};

export default ScrollProgress;
