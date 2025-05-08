'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface InteractiveLogoProps {
  src: string;
  alt: string;
  size?: number;
  badge?: React.ReactNode;
}

const InteractiveLogo: React.FC<InteractiveLogoProps> = ({ 
  src, 
  alt,
  size = 120,
  badge
}) => {
  const logoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const logo = logoRef.current;
    const container = containerRef.current;
    
    if (!logo || !container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate rotation based on mouse position
      const maxRotation = 15;
      const xRotation = (y / rect.height) * maxRotation;
      const yRotation = -(x / rect.width) * maxRotation;
      
      // Apply rotation and slight movement
      logo.style.transform = `
        rotateX(${xRotation}deg) 
        rotateY(${yRotation}deg) 
        translateZ(10px)
      `;
      
      // Add shadow based on rotation
      const shadowX = yRotation * 0.5;
      const shadowY = -xRotation * 0.5;
      logo.style.boxShadow = `
        ${shadowX}px ${shadowY}px 10px rgba(0, 0, 0, 0.2),
        0 4px 20px rgba(31, 122, 140, 0.3)
      `;
    };
    
    const handleMouseLeave = () => {
      // Reset to default position with smooth transition
      logo.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
      logo.style.boxShadow = '0 4px 20px rgba(31, 122, 140, 0.2)';
    };

    // Apply perspective to container for 3D effect
    container.style.perspective = '1000px';
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="inline-block cursor-pointer"
      style={{ width: size, height: size }}
    >
      <div 
        ref={logoRef} 
        className="relative bg-background rounded-2xl p-3 transition-transform duration-200 ease-out"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Image 
          src={src}
          alt={alt}
          width={size}
          height={size}
          className="object-contain"
          style={{ transform: 'translateZ(20px)' }}
        />
        {badge && (
          <div className="absolute -right-4 top-0" style={{ transform: 'translateZ(30px)' }}>
            {badge}
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveLogo;
