'use client';

import React, { useState, useRef, ReactNode } from 'react';

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
}

const FloatingCard: React.FC<FloatingCardProps> = ({ children, className = "" }) => {
  const [transform, setTransform] = useState('');
  const [glow, setGlow] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    // Update card rotation
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
    
    // Add glow effect based on mouse position
    const glowX = (x / rect.width) * 100;
    const glowY = (y / rect.height) * 100;
    setGlow(`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(255,255,255,0.1), transparent)`);
  };
  
  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
    setGlow('');
  };
  
  return (
    <div 
      ref={cardRef}
      className={`transition-all duration-200 ${className}`}
      style={{ 
        transform, 
        background: glow ? `${glow}, var(--background)` : '', 
        backgroundBlendMode: 'overlay'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export default FloatingCard;
