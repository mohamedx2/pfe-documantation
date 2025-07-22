'use client';

import React, { useEffect, useState, useRef } from 'react';

interface InteractiveSlideContentProps {
  children: React.ReactNode;
  isActive: boolean;
  animationType?: 'fade' | 'slide' | 'zoom' | 'rotate' | 'flip';
  delay?: number;
  className?: string;
}

const InteractiveSlideContent: React.FC<InteractiveSlideContentProps> = ({
  children,
  isActive,
  animationType = 'fade',
  delay = 0,
  className = ''
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Mount guard for SSR
  useEffect(() => {
    setMounted(true);
  }, []);

  // Trigger animation when slide becomes active
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        setShouldAnimate(true);
        setIsVisible(true);
      }, delay);
      
      return () => clearTimeout(timer);
    } else {
      setShouldAnimate(false);
      setIsVisible(false);
    }
  }, [isActive, delay]);

  // Intersection Observer for scroll-based animations
  useEffect(() => {
    if (!contentRef.current || !mounted) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isActive) {
          setShouldAnimate(true);
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    observerRef.current.observe(contentRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isActive, mounted]);

  const getAnimationClass = () => {
    if (!shouldAnimate) {
      switch (animationType) {
        case 'slide':
          return 'translate-y-8 opacity-0';
        case 'zoom':
          return 'scale-95 opacity-0';
        case 'rotate':
          return 'rotate-3 opacity-0';
        case 'flip':
          return 'rotateY-90 opacity-0';
        default:
          return 'opacity-0';
      }
    }
    
    return 'translate-y-0 opacity-100 scale-100 rotate-0';
  };

  const getTransitionClass = () => {
    const baseDuration = 'duration-700';
    const easing = 'ease-out';
    
    switch (animationType) {
      case 'slide':
        return `transition-all ${baseDuration} ${easing}`;
      case 'zoom':
        return `transition-all ${baseDuration} ${easing}`;
      case 'rotate':
        return `transition-all ${baseDuration} ${easing}`;
      case 'flip':
        return `transition-all ${baseDuration} ${easing}`;
      default:
        return `transition-opacity ${baseDuration} ${easing}`;
    }
  };

  return (
    <div
      ref={contentRef}
      className={`${getTransitionClass()} ${getAnimationClass()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
      
      {/* Add subtle entrance effects for child elements */}
      {isVisible && (
        <style jsx>{`
          @keyframes slideInChildren {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-children > * {
            animation: slideInChildren 0.6s ease-out forwards;
          }
          
          .animate-children > *:nth-child(2) {
            animation-delay: 0.1s;
          }
          
          .animate-children > *:nth-child(3) {
            animation-delay: 0.2s;
          }
          
          .animate-children > *:nth-child(4) {
            animation-delay: 0.3s;
          }
          
          .animate-children > *:nth-child(5) {
            animation-delay: 0.4s;
          }
        `}</style>
      )}
    </div>
  );
};

export default InteractiveSlideContent;
