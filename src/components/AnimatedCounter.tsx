'use client';

import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimalPlaces?: number;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  duration = 2000,
  prefix = '',
  suffix = '',
  decimalPlaces = 0,
  className = '',
}) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  // Format the number with commas and decimal places
  const formatNumber = (num: number) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });
  };

  const animateCount = (timestamp: number) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const progress = timestamp - startTimeRef.current;
    const percentage = Math.min(progress / duration, 1);
    
    // Easing function for smoother animation
    const easeOutQuad = (t: number): number => t * (2 - t);
    const easedPercentage = easeOutQuad(percentage);
    
    countRef.current = easedPercentage * end;
    setCount(countRef.current);

    if (percentage < 1) {
      rafRef.current = requestAnimationFrame(animateCount);
    }
  };

  const startAnimation = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    startTimeRef.current = null;
    rafRef.current = requestAnimationFrame(animateCount);
  };

  useEffect(() => {
    // Set up intersection observer to start animation when in view
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isVisibleRef.current) {
          isVisibleRef.current = true;
          startAnimation();
        }
      });
    }, { threshold: 0.1 });

    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (observerRef.current && elementRef.current) {
        observerRef.current.unobserve(elementRef.current);
        observerRef.current.disconnect();
      }
    };
  }, [end, duration]);

  return (
    <div ref={elementRef} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </div>
  );
};

export default AnimatedCounter;
