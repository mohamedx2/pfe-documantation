'use client';

import React, { useState, useEffect, useRef } from 'react';

interface SlideTransitionProps {
  children: React.ReactNode;
  currentSlide: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  className?: string;
}

const SlideTransition: React.FC<SlideTransitionProps> = ({
  children,
  currentSlide,
  direction = 'right',
  duration = 800,
  className = ''
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displaySlide, setDisplaySlide] = useState(currentSlide);
  const prevSlideRef = useRef(currentSlide);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentSlide !== prevSlideRef.current) {
      setIsTransitioning(true);
      
      // Determine transition direction based on slide movement
  
      // Update the display slide after half the transition
      setTimeout(() => {
        setDisplaySlide(currentSlide);
      }, duration / 2);
      
      // Complete transition
      setTimeout(() => {
        setIsTransitioning(false);
        prevSlideRef.current = currentSlide;
      }, duration);
    }
  }, [currentSlide, duration]);

  const getTransitionStyles = () => {
    if (!isTransitioning) return {};
    
    const translateValue = direction === 'left' || direction === 'right' ? '100%' : '100%';
    const axis = direction === 'left' || direction === 'right' ? 'X' : 'Y';
    const sign = direction === 'left' || direction === 'up' ? '-' : '';
    
    return {
      transform: `translate${axis}(${sign}${translateValue})`,
      opacity: 0.7
    };
  };

  return (
    <div 
      ref={containerRef}
      className={`transition-all ease-out ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        ...getTransitionStyles()
      }}
    >
      {React.cloneElement(children as React.ReactElement, { 
        key: displaySlide,
        'data-slide': displaySlide 
      })}
    </div>
  );
};

export default SlideTransition;
