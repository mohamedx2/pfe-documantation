'use client';

import React, { useState, useRef } from 'react';

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // Controls tilt intensity
  shine?: boolean; // Add shine effect
  border?: boolean; // Add animated border
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  shadow?: boolean; // Enable drop shadow
  onClick?: () => void;
}

const HoverCard: React.FC<HoverCardProps> = ({
  children,
  className = '',
  intensity = 15,
  shine = true,
  border = false,
  rounded = 'lg',
  shadow = true,
  onClick
}) => {
  const [transform, setTransform] = useState('');
  const [glare, setGlare] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Map rounded values to CSS classes
  const roundedMap = {
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const cardWidth = rect.width;
    const cardHeight = rect.height;
    
    // Calculate position relative to card center
    const centerX = rect.left + cardWidth / 2;
    const centerY = rect.top + cardHeight / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation based on mouse position
    // Normalize by card dimensions and apply intensity
    const rotateX = (-mouseY / (cardHeight / 2)) * intensity;
    const rotateY = (mouseX / (cardWidth / 2)) * intensity;
    
    // Apply perspective transform
    setTransform(
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    );
    
    // Update glare effect position if enabled
    if (shine) {
      // Calculate position percentage for glare effect
      const glareX = ((e.clientX - rect.left) / cardWidth) * 100;
      const glareY = ((e.clientY - rect.top) / cardHeight) * 100;
      setGlare(`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.2), transparent)`);
    }
  };
  
  // Reset state on mouse leave
  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlare('');
  };
  
  return (
    <div
      ref={cardRef}
      className={`transition-transform duration-200 transform-gpu relative overflow-hidden ${roundedMap[rounded]} ${shadow ? 'shadow-lg' : ''} ${border ? 'gradient-border' : ''} ${className}`}
      style={{
        transform,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Shine effect overlay */}
      {shine && glare && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: glare,
            mixBlendMode: 'overlay',
            zIndex: 2,
          }}
        />
      )}
      
      {/* Content with subtle 3D elevation */}
      <div style={{ transform: 'translateZ(20px)' }} className="relative z-1">
        {children}
      </div>
    </div>
  );
};

export default HoverCard;
