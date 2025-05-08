'use client';

import React, { useEffect, useRef } from 'react';

interface AnimatedGradientTextProps {
  text: string;
  className?: string;
  gradientColors?: string[];
  animationDuration?: number;
  fontSize?: string;
  fontWeight?: string;
}

const AnimatedGradientText: React.FC<AnimatedGradientTextProps> = ({
  text,
  className = '',
  gradientColors = ['var(--primary)', 'var(--accent)', 'var(--turquoise)', 'var(--purple)'],
  animationDuration = 8,
  fontSize = '2rem',
  fontWeight = '700',
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    // Create gradient string from colors
    const gradient = `linear-gradient(90deg, ${gradientColors.join(', ')})`;
    
    // Apply gradient as background to text
    textRef.current.style.background = gradient;
    textRef.current.style.backgroundSize = '300% 100%';
    textRef.current.style.animation = `gradient-move ${animationDuration}s ease infinite`;
    
    // Make text display the gradient
    textRef.current.style.webkitBackgroundClip = 'text';
    textRef.current.style.webkitTextFillColor = 'transparent';
    textRef.current.style.backgroundClip = 'text';
    
    // Animation will be handled by CSS keyframes defined in globals.css
  }, [gradientColors, animationDuration]);

  return (
    <div 
      ref={textRef}
      className={`inline-block ${className}`}
      style={{ 
        fontSize, 
        fontWeight,
        lineHeight: '1.2',
      }}
    >
      {text}
    </div>
  );
};

export default AnimatedGradientText;
