'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Interactive3DIconProps {
  icon: React.ReactNode;
  size?: number;
  bgColor?: string;
  tiltIntensity?: number;
  hoverScale?: number;
  shadow?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  onClick?: () => void;
  pulseEffect?: boolean;
  floatEffect?: boolean;
  rotateOnLoad?: boolean;
  glowEffect?: boolean;
  tooltip?: string;
}

const Interactive3DIcon: React.FC<Interactive3DIconProps> = ({
  icon,
  size = 60,
  bgColor = 'var(--primary)',
  tiltIntensity = 15,
  hoverScale = 1.1,
  shadow = true,
  rounded = 'lg',
  onClick,
  pulseEffect = false,
  floatEffect = false,
  rotateOnLoad = false,
  glowEffect = false,
  tooltip
}) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Map rounded values to CSS classes
  const roundedMap = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full'
  };
  
  useEffect(() => {
    const iconElement = iconRef.current;
    if (!iconElement) return;
    
    // Initial rotation animation if enabled
    if (rotateOnLoad) {
      iconElement.style.transform = 'perspective(300px) rotateX(0deg) rotateY(0deg) rotateZ(360deg) scale3d(1, 1, 1)';
      iconElement.style.transition = 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
      
      // Reset transition after initial animation
      setTimeout(() => {
        iconElement.style.transform = 'perspective(300px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale3d(1, 1, 1)';
        iconElement.style.transition = 'transform 0.2s ease-out';
      }, 1000);
    }
    
    // Handle mouse movement for 3D tilt effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = iconElement.getBoundingClientRect();
      
      // Calculate mouse position relative to the center of the icon
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate rotation angle based on mouse position and intensity
      const rotateY = -x * (tiltIntensity / 100);
      const rotateX = y * (tiltIntensity / 100);
      
      // Apply the 3D transformation
      iconElement.style.transform = `
        perspective(300px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(${hoverScale}, ${hoverScale}, ${hoverScale})
      `;
    };
    
    // Reset on mouse leave
    const handleMouseLeave = () => {
      iconElement.style.transform = 'perspective(300px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      setIsHovered(false);
    };
    
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
    
    // Add click ripple effect
    const handleClick = (e: MouseEvent) => {
      if (!onClick) return;
      
      // Create ripple element
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      iconElement.appendChild(ripple);
      
      // Position ripple at the click position
      const rect = iconElement.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = `${size * 2}px`;
      ripple.style.left = `${e.clientX - rect.left - size}px`;
      ripple.style.top = `${e.clientY - rect.top - size}px`;
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
      
      // Call the click handler
      onClick();
    };
    
    iconElement.addEventListener('mousemove', handleMouseMove);
    iconElement.addEventListener('mouseleave', handleMouseLeave);
    iconElement.addEventListener('mouseenter', handleMouseEnter);
    
    if (onClick) {
      iconElement.addEventListener('click', handleClick);
      iconElement.style.cursor = 'pointer';
    }
    
    // Cleanup event listeners
    return () => {
      iconElement.removeEventListener('mousemove', handleMouseMove);
      iconElement.removeEventListener('mouseleave', handleMouseLeave);
      iconElement.removeEventListener('mouseenter', handleMouseEnter);
      if (onClick) {
        iconElement.removeEventListener('click', handleClick);
      }
    };
  }, [tiltIntensity, hoverScale, onClick, rotateOnLoad]);

  // Combine animation classes
  const animationClasses = [
    pulseEffect ? 'animate-pulse-glow' : '',
    floatEffect ? 'animate-float' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      ref={iconRef}
      className={`inline-flex items-center justify-center overflow-hidden ${roundedMap[rounded]} btn-ripple ${animationClasses} relative`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: bgColor,
        color: 'white',
        transition: 'transform 0.2s ease-out',
        transform: 'perspective(300px) rotateX(0deg) rotateY(0deg)',
        boxShadow: shadow ? '0 4px 15px rgba(0, 0, 0, 0.15)' : 'none',
        position: 'relative',
      }}
      aria-label={tooltip}
      {...(tooltip && { 'data-tooltip': tooltip })}
    >
      {/* Glow effect */}
      {glowEffect && isHovered && (
        <div
          className="absolute inset-0 rounded-inherit z-0 animate-pulse"
          style={{
            background: `radial-gradient(circle at center, ${bgColor}99, transparent 70%)`,
            filter: 'blur(10px)',
            opacity: 0.8,
            transform: 'scale(1.2)',
          }}
        />
      )}
      
      {/* Icon container */}
      <div className="icon-container relative z-10" style={{ transform: 'translateZ(10px)' }}>
        {
          React.isValidElement(icon) 
            ? React.cloneElement(icon, {
                className: `w-full h-full transition-transform duration-200 ${isHovered ? 'scale-110' : ''}`,
                style: { ...((icon.props as React.HTMLAttributes<HTMLElement>)?.style || {}), transform: isHovered ? `scale(${hoverScale})` : 'none' },
              } as React.HTMLAttributes<HTMLElement>)
            : icon
        }
      </div>
      
      {/* Tooltip */}
      {tooltip && (
        <div className="tooltip-content absolute bottom-full left-1/2 -translate-x-1/2 mb-2 py-1 px-2 bg-foreground/90 text-background text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {tooltip}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-foreground/90 border-r-transparent border-b-transparent border-l-transparent"></div>
        </div>
      )}
    </div>
  );
};

export default Interactive3DIcon;
