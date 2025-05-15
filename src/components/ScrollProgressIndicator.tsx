'use client';

import React, { useState, useEffect } from 'react';

interface ScrollProgressIndicatorProps {
  color?: string;
  height?: number;
  zIndex?: number;
  showLabels?: boolean;
  showPercentage?: boolean;
}

const ScrollProgressIndicator: React.FC<ScrollProgressIndicatorProps> = ({
  color = 'var(--primary)',
  height = 4,
  zIndex = 50,
  showLabels = false,
  showPercentage = false,
}) => {
  const [progress, setProgress] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [activeSections, setActiveSections] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    const calculateProgress = () => {
      const scrollDistance = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / scrollDistance) * 100;
      setProgress(currentProgress);
    };
    
    window.addEventListener('scroll', calculateProgress);
    calculateProgress(); // Initial calculation
    
    return () => window.removeEventListener('scroll', calculateProgress);
  }, []);
  
  useEffect(() => {
    const handleSectionInView = (event: CustomEvent<{ id: string, visible: boolean }>) => {
      const { id, visible } = event.detail;
      setActiveSections(prev => ({ ...prev, [id]: visible }));
    };
    
    document.addEventListener('sectionInView', handleSectionInView as EventListener);
    
    return () => {
      document.removeEventListener('sectionInView', handleSectionInView as EventListener);
    };
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ 
        height: `${height}px`, 
        zIndex: zIndex,
        transform: `translateY(${hovering ? '0' : '-50%'})`,
        opacity: hovering ? 1 : 0.7
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div 
        className="h-full bg-primary transition-all duration-300"
        style={{ 
          width: `${progress}%`, 
          backgroundColor: color,
          boxShadow: hovering ? '0 0 10px rgba(var(--primary-rgb), 0.5)' : 'none'
        }}
      />
      
      {/* Section markers */}
      {showLabels && (
        <div className="absolute top-full left-0 right-0 flex items-center">
          {Object.entries(activeSections).map(([section, visible]) => 
            visible && (
              <div 
                key={section}
                className="text-xs bg-primary text-white px-2 py-0.5 rounded-b-md"
                style={{ 
                  position: 'absolute',
                  left: `${progress}%`,
                  transform: 'translateX(-50%)',
                  opacity: hovering ? 1 : 0,
                  transition: 'opacity 0.3s ease'
                }}
              >
                {section}
              </div>
            )
          )}
        </div>
      )}
      
      {/* Percentage indicator */}
      {showPercentage && (
        <div 
          className="absolute top-full right-0 px-2 py-1 bg-background text-xs text-foreground rounded-b shadow-md"
          style={{ 
            opacity: hovering ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        >
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

export default ScrollProgressIndicator;
