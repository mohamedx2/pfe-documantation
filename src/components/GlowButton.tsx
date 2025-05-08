'use client';

import React, { useState, useRef } from 'react';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'accent' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  disabled?: boolean;
  glowRadius?: number;
  glowColor?: string;
}

const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  href,
  disabled = false,
  glowRadius = 80,
  glowColor,
}) => {
  const [glowPosition, setGlowPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  // Use a more generic HTMLElement ref
  const elementRef = useRef<HTMLElement>(null);
  
  // Determine glow color based on variant
  const getGlowColor = () => {
    if (glowColor) return glowColor;
    
    switch (variant) {
      case 'primary': return 'rgba(14, 124, 134, 0.8)';
      case 'accent': return 'rgba(255, 158, 42, 0.8)';
      case 'subtle': return 'rgba(255, 255, 255, 0.4)';
      default: return 'rgba(14, 124, 134, 0.8)';
    }
  };
  
  // Determine styles based on variant and size
  const getVariantStyles = () => {
    const baseStyles = 'font-medium rounded-full transition-all duration-300 relative overflow-hidden';
    
    const variantStyles = {
      primary: isHovered
        ? 'bg-primary-dark text-white'
        : 'bg-primary text-white',
      accent: isHovered
        ? 'bg-accent-dark text-white'
        : 'bg-accent text-white',
      subtle: isHovered
        ? 'bg-secondary text-foreground'
        : 'bg-secondary/50 text-foreground/80'
    };
    
    const sizeStyles = {
      sm: 'text-xs px-4 py-2',
      md: 'text-sm px-6 py-2.5',
      lg: 'text-base px-8 py-3'
    };
    
    return `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]}`;
  };
  
  // Handle mouse movement to update glow effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!elementRef.current || disabled) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setGlowPosition({ x, y });
  };
  
  // Glow effect styles
  const glowStyles = {
    position: 'absolute' as const,
    left: `${glowPosition.x}px`,
    top: `${glowPosition.y}px`,
    transform: 'translate(-50%, -50%)',
    width: `${glowRadius * 2}px`,
    height: `${glowRadius * 2}px`,
    borderRadius: '50%',
    background: isHovered ? `radial-gradient(circle, ${getGlowColor()} 0%, rgba(255,255,255,0) 70%)` : 'none',
    opacity: isPressed ? 0.8 : 0.6,
    transition: 'opacity 0.3s ease, background 0.3s ease',
    pointerEvents: 'none' as const,
    mixBlendMode: 'screen' as const,
  };
  
  const rippleEffect = () => {
    // Create ripple effect on button press
    if (elementRef.current && !disabled) {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 300);
    }
  };
  
  // Create common props to be used for both button and anchor
  const commonProps = {
    className: `${getVariantStyles()} ${className}`,
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    onMouseDown: rippleEffect,
    style: { 
      transform: isPressed ? 'scale(0.98)' : isHovered ? 'scale(1.03)' : 'scale(1)',
      boxShadow: isHovered 
        ? `0 10px 20px -10px ${getGlowColor()}`
        : 'none',
    } as React.CSSProperties
  };
  
  // Render button or anchor based on href prop
  return href ? (
    <a 
      href={href}
      ref={elementRef as React.RefObject<HTMLAnchorElement>}
      {...commonProps}
    >
      {isHovered && <div style={glowStyles} />}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </a>
  ) : (
    <button 
      type="button"
      disabled={disabled}
      ref={elementRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      {...commonProps}
    >
      {isHovered && <div style={glowStyles} />}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
};

export default GlowButton;
