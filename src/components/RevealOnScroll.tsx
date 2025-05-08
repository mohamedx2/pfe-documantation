'use client';

import React, { useEffect, useRef, ReactNode } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  threshold?: number;
  delay?: number;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ 
  children, 
  threshold = 0.1,
  delay = 0
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add delay if specified
          setTimeout(() => {
            if (ref.current) {
              ref.current.classList.add('visible');
            }
          }, delay);
          
          // Once revealed, unobserve
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold, delay]);
  
  return (
    <div ref={ref} className="reveal-section">
      {children}
    </div>
  );
};

export default RevealOnScroll;
