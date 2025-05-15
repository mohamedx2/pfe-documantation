'use client';

import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  start?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimalPlaces?: number;
  className?: string;
  animationFunction?: 'linear' | 'easeOut' | 'easeInOut' | 'spring';
  animateOnView?: boolean;
  viewThreshold?: number;
  separator?: string;
  highlightDigits?: boolean;
  highlightColor?: string;
  digitsOnly?: boolean;
  onComplete?: () => void;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  start = 0,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimalPlaces = 0,
  className = '',
  animationFunction = 'easeOut',
  animateOnView = true,
  viewThreshold = 0.1,
  separator = ',',
  highlightDigits = false,
  highlightColor = 'text-primary',
  digitsOnly = false,
  onComplete,
}) => {
  const [count, setCount] = useState(start);
  const countRef = useRef<number>(start);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  // Format the number with separator and decimal places
  const formatNumber = (num: number, withHighlight = false) => {
    // Split the number into integer and decimal parts
    const numStr = num.toFixed(decimalPlaces);
    const [intPart, decPart] = numStr.split('.');
    
    // Insert separators in the integer part
    const formattedIntPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    
    const formattedNumber = decimalPlaces > 0 ? `${formattedIntPart}.${decPart}` : formattedIntPart;
    
    // Apply highlighting to each digit if enabled
    if (withHighlight && highlightDigits) {
      return (
        <>
          {formattedNumber.split('').map((char, i) => (
            char.match(/\d/) ? (
              <span 
                key={i} 
                className={`${highlightColor} inline-block transition-transform`}
                style={{ 
                  opacity: Math.random() * 0.5 + 0.5,
                  transform: `translateY(${Math.random() * 4 - 2}px)` 
                }}
              >
                {char}
              </span>
            ) : (
              <span key={i}>{char}</span>
            )
          ))}
        </>
      );
    }
    
    return formattedNumber;
  };

  // Different animation functions for variety
  const getAnimationProgress = (elapsed: number, totalDuration: number) => {
    const progress = Math.min(elapsed / totalDuration, 1);
    
    switch (animationFunction) {
      case 'linear':
        return progress;
      case 'easeOut':
        return 1 - Math.pow(1 - progress, 2);
      case 'easeInOut':
        return progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      case 'spring':
        const dampener = 0.7;
        // Add a spring effect near the end
        if (progress > 0.9) {
          const overshootProgress = (progress - 0.9) * 10; // Scale to 0-1 range
          return 0.9 + (1 + Math.sin(overshootProgress * Math.PI * 2) * dampener * (1 - overshootProgress)) * 0.1;
        }
        return progress;
      default:
        return progress;
    }
  };

  const animateCount = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = getAnimationProgress(elapsed, duration);
    
    countRef.current = start + (end - start) * progress;
    setCount(countRef.current);

    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animateCount);
    } else {
      // Ensure we end exactly at the target number
      setCount(end);
      if (onComplete) onComplete();
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const startAnimation = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    // Skip animation if start and end are the same
    if (start === end) {
      setCount(end);
      if (onComplete) onComplete();
      return;
    }
    
    startTimeRef.current = null;
    rafRef.current = requestAnimationFrame(animateCount);
  };

  useEffect(() => {
    if (!animateOnView) {
      startAnimation();
      return;
    }
    
    // Set up intersection observer to start animation when in view
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisibleRef.current && !hasAnimatedRef.current) {
          isVisibleRef.current = true;
          hasAnimatedRef.current = true;
          startAnimation();
        }
      });
    }, { threshold: viewThreshold });

    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (observerRef.current && elementRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observerRef.current.unobserve(elementRef.current);
        observerRef.current.disconnect();
      }
    };
  }, [animateOnView, end, duration, start, viewThreshold, startAnimation]);

  // Reset animation when end value changes
  useEffect(() => {
    // Only restart if we've already animated once
    if (hasAnimatedRef.current) {
      startAnimation();
    }
  }, [end, startAnimation]);

  return (
    <div ref={elementRef} className={`animated-counter ${className}`}>
      {!digitsOnly && prefix}
      {formatNumber(count, highlightDigits)}
      {!digitsOnly && suffix}
    </div>
  );
};

export default AnimatedCounter;
