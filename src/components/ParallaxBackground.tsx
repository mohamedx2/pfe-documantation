'use client';

import React, { useEffect, useState, useRef } from 'react';

interface ParallaxBackgroundProps {
  children?: React.ReactNode;
  speed?: number;
  className?: string;
  type?: 'gradient' | 'particles' | 'geometric' | 'waves';
  intensity?: 'low' | 'medium' | 'high';
}

const ParallaxBackground: React.FC<ParallaxBackgroundProps> = ({
  children,
  speed = 0.5,
  className = '',
  type = 'gradient',
  intensity = 'medium'
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  const getTransform = () => {
    if (!mounted) return 'translateY(0px)'; // SSR safe default
    const translateY = scrollY * speed;
    const intensityMultiplier = intensity === 'low' ? 0.5 : intensity === 'high' ? 1.5 : 1;
    return `translateY(${translateY * intensityMultiplier}px)`;
  };

  const renderBackground = () => {
    switch (type) {
      case 'particles':
        if (!mounted) {
          // Return static content during SSR
          return (
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 50 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                  style={{
                    left: `${(i * 7) % 100}%`,
                    top: `${(i * 13) % 100}%`,
                    animationDelay: `${(i * 0.1) % 3}s`,
                    animationDuration: `${2 + (i * 0.1) % 3}s`
                  }}
                />
              ))}
            </div>
          );
        }
        
        return (
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 50 }, (_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        );
      
      case 'geometric':
        return (
          <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Geometric shapes */}
              <circle cx="200" cy="200" r="3" fill="rgba(14, 124, 134, 0.3)" />
              <circle cx="800" cy="300" r="2" fill="rgba(255, 158, 42, 0.3)" />
              <circle cx="400" cy="700" r="4" fill="rgba(14, 124, 134, 0.2)" />
              <circle cx="600" cy="150" r="2" fill="rgba(255, 158, 42, 0.4)" />
              
              <rect x="100" y="500" width="8" height="8" fill="rgba(14, 124, 134, 0.2)" transform="rotate(45 104 504)" />
              <rect x="700" y="600" width="6" height="6" fill="rgba(255, 158, 42, 0.3)" transform="rotate(45 703 603)" />
            </svg>
          </div>
        );
      
      case 'waves':
        return (
          <div className="absolute inset-0 overflow-hidden">
            <svg className="absolute bottom-0 w-full h-64" viewBox="0 0 1200 300" preserveAspectRatio="none">
              <path d="M0,300 C300,200 600,100 1200,200 L1200,300 Z" fill="rgba(14, 124, 134, 0.1)" />
              <path d="M0,300 C400,150 800,250 1200,150 L1200,300 Z" fill="rgba(255, 158, 42, 0.1)" />
            </svg>
          </div>
        );
      
      default: // gradient
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        );
    }
  };

  if (!mounted) {
    return (
      <div className={`relative ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        ref={backgroundRef}
        className="absolute inset-0 will-change-transform"
        style={{ transform: getTransform() }}
      >
        {renderBackground()}
      </div>
      
      {/* Content overlay */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default ParallaxBackground;
