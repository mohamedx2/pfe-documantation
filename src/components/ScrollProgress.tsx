'use client';

import React, { useState, useEffect, ReactNode } from 'react';

interface ScrollProgressProps {
  children: (progress: number) => ReactNode;
  containerRef?: React.RefObject<HTMLElement>;
  onProgressChange?: (progress: number) => void;
  debounceMs?: number;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({
  children,
  containerRef,
  onProgressChange,
  debounceMs = 10,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [prevScrollY, setPrevScrollY] = useState(0);
  
  // Debounce implementation for better performance
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let lastScrollTime = 0;
    
    const calculateScrollProgress = () => {
      const currentTime = Date.now();
      
      // Check if we need to debounce
      if (currentTime - lastScrollTime < debounceMs) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(calculateScrollProgress, debounceMs);
        return;
      }
      
      lastScrollTime = currentTime;
      
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > prevScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < prevScrollY) {
        setScrollDirection('up');
      }
      
      setPrevScrollY(currentScrollY);
      
      // If a container reference is provided, calculate progress relative to that container
      if (containerRef && containerRef.current) {
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        
        // Calculate how much of the container is visible
        const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
        
        // Only report progress when the element is in view
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          // If element is taller than viewport, use scroll position relative to element
          if (container.offsetHeight > window.innerHeight) {
            const totalScroll = container.offsetHeight - window.innerHeight;
            const currentScroll = -rect.top;
            const progress = Math.max(0, Math.min(100, (currentScroll / totalScroll) * 100));
            setScrollProgress(progress);
          } else {
            // For smaller elements, use percentage of element visible in viewport
            const progress = Math.max(0, Math.min(100, (visibleHeight / container.offsetHeight) * 100));
            setScrollProgress(progress);
          }
        }
      } else {
        // Calculate overall page scroll progress
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = currentScrollY / (docHeight - winHeight);
        setScrollProgress(Math.round(scrollPercent * 100 * 100) / 100);
      }
    };
    
    // Initial calculation
    calculateScrollProgress();
    
    // Add scroll event listener
    window.addEventListener('scroll', calculateScrollProgress, { passive: true });
    
    // Notify on progress change
    if (onProgressChange) {
      onProgressChange(scrollProgress);
    }
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
      clearTimeout(timeoutId);
    };
  }, [containerRef, debounceMs, onProgressChange, prevScrollY, scrollProgress]);
  
  // Pass scroll metadata to children


  return <>{children(scrollProgress)}</>;
};

// Hook version for simpler usage in functional components
export const useScrollProgress = (
  options: {
    containerRef?: React.RefObject<HTMLElement>;
    debounceMs?: number;
  } = {}
): { progress: number; direction: 'up' | 'down' | null } => {
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [prevScrollY, setPrevScrollY] = useState(0);
  const { containerRef, debounceMs = 10 } = options;
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let lastScrollTime = 0;
    
    const calculateScrollProgress = () => {
      const currentTime = Date.now();
      
      // Check if we need to debounce
      if (currentTime - lastScrollTime < debounceMs) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(calculateScrollProgress, debounceMs);
        return;
      }
      
      lastScrollTime = currentTime;
      
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > prevScrollY) {
        setDirection('down');
      } else if (currentScrollY < prevScrollY) {
        setDirection('up');
      }
      
      setPrevScrollY(currentScrollY);
      
      // Calculate progress
      if (containerRef && containerRef.current) {
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        
        // Calculate visibility progress for the container
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          if (container.offsetHeight > window.innerHeight) {
            const totalScroll = container.offsetHeight - window.innerHeight;
            const currentScroll = -rect.top;
            setProgress(Math.max(0, Math.min(100, (currentScroll / totalScroll) * 100)));
          } else {
            const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
            setProgress(Math.max(0, Math.min(100, (visibleHeight / container.offsetHeight) * 100)));
          }
        }
      } else {
        // Overall page scroll progress
        const docHeight = document.documentElement.scrollHeight;
        const winHeight = window.innerHeight;
        const scrollPercent = currentScrollY / (docHeight - winHeight);
        setProgress(Math.min(100, Math.max(0, scrollPercent * 100)));
      }
    };
    
    // Initial calculation
    calculateScrollProgress();
    
    // Add scroll event listener
    window.addEventListener('scroll', calculateScrollProgress, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
      clearTimeout(timeoutId);
    };
  }, [containerRef, debounceMs, prevScrollY]);
  
  return { progress, direction };
};

export default ScrollProgress;
