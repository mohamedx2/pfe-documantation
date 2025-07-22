'use client';

import React, { useEffect, useState } from 'react';

interface EnhancedProgressProps {
  currentSlide: number;
  totalSlides: number;
  isPlaying?: boolean;
  autoPlayDuration?: number;
  onProgressComplete?: () => void;
  className?: string;
}

const EnhancedProgress: React.FC<EnhancedProgressProps> = ({
  currentSlide,
  totalSlides,
  isPlaying = false,
  autoPlayDuration = 10000,
  onProgressComplete,
  className = ''
}) => {
  const [slideProgress, setSlideProgress] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);

  // Overall progress calculation
  useEffect(() => {
    const progress = ((currentSlide + 1) / totalSlides) * 100;
    setOverallProgress(progress);
  }, [currentSlide, totalSlides]);

  // Individual slide progress for auto-play
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      setSlideProgress(0);
      const increment = 100 / (autoPlayDuration / 50); // Update every 50ms
      
      interval = setInterval(() => {
        setSlideProgress((prev) => {
          const newProgress = prev + increment;
          if (newProgress >= 100) {
            onProgressComplete?.();
            return 0;
          }
          return newProgress;
        });
      }, 50);
    } else {
      setSlideProgress(0);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, autoPlayDuration, onProgressComplete]);

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Overall Progress */}
      <div className="relative">
        <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
          <span>Overall Progress</span>
          <span>{currentSlide + 1} / {totalSlides}</span>
        </div>
        
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out relative"
            style={{ width: `${overallProgress}%` }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-50 blur-sm"></div>
          </div>
        </div>
      </div>

      {/* Current Slide Progress (only when auto-playing) */}
      {isPlaying && (
        <div className="relative">
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
            <span>Current Slide</span>
            <span>{Math.round(slideProgress)}%</span>
          </div>
          
          <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-75 ease-linear relative"
              style={{ width: `${slideProgress}%` }}
            >
              {/* Animated pulse */}
              <div className="absolute right-0 top-0 bottom-0 w-1 bg-white opacity-75 animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {/* Slide Indicators */}
      <div className="flex items-center justify-center gap-1">
        {Array.from({ length: totalSlides }, (_, index) => (
          <div
            key={index}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 h-2 bg-primary rounded-full'
                : index < currentSlide
                ? 'w-2 h-2 bg-primary/60 rounded-full'
                : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default EnhancedProgress;
