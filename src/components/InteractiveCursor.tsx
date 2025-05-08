'use client';

import { useEffect, useState } from 'react';

interface InteractiveCursorProps {
  dotColor?: string;
  outlineColor?: string;
  dotSize?: number;
  outlineSize?: number;
  hoverScale?: number;
  clickEffects?: boolean;
}

const InteractiveCursor: React.FC<InteractiveCursorProps> = ({
  dotColor = 'var(--primary)',
  outlineColor = 'var(--primary)',
  dotSize = 8,
  outlineSize = 40,
  hoverScale = 1.5,
  clickEffects = true
}) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show cursor after user moves mouse (prevents initial flash at 0,0)
    const handleFirstMove = () => {
      setIsVisible(true);
      window.removeEventListener('mousemove', handleFirstMove);
    };

    window.addEventListener('mousemove', handleFirstMove);

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 300);
    };

    // Track interactive elements for hover state
    const handleElementHover = () => {
      setIsHovering(true);
    };

    const handleElementLeave = () => {
      setIsHovering(false);
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    
    if (clickEffects) {
      window.addEventListener('mousedown', handleMouseDown);
    }

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [role="button"], .interactive-btn, .hover-3d, .magnetic-btn'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleElementHover);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    // Hide cursor when leaving window
    const handleMouseLeave = () => {
      setPosition({ x: -100, y: -100 });
    };

    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    // Cleanup function
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleFirstMove);
      
      if (clickEffects) {
        window.removeEventListener('mousedown', handleMouseDown);
      }
      
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleElementHover);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
      
      document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    };
  }, [clickEffects]);

  // Apply dynamic styles based on state
  const dotStyle = {
    width: `${dotSize}px`,
    height: `${dotSize}px`,
    backgroundColor: dotColor,
    transform: `translate(-50%, -50%) scale(${isHovering ? '0.5' : isClicking ? '2.5' : '1'})`,
    opacity: isClicking ? 0 : isVisible ? 1 : 0,
    transition: isClicking ? 'transform 0.3s ease, opacity 0.3s ease' : 'transform 0.15s ease, width 0.2s ease, height 0.2s ease, opacity 0.3s ease',
  };

  const outlineStyle = {
    width: `${outlineSize}px`,
    height: `${outlineSize}px`,
    borderColor: outlineColor,
    transform: `translate(-50%, -50%) scale(${isHovering ? hoverScale : isClicking ? '1.5' : '1'})`,
    opacity: isHovering ? 0.3 : isClicking ? 0.1 : isVisible ? 0.5 : 0,
    transition: isClicking ? 'transform 0.3s ease, opacity 0.3s ease' : 'transform 0.15s ease, width 0.2s ease, height 0.2s ease, opacity 0.3s ease',
  };

  return (
    <>
      <div
        className="cursor-dot hidden md:block"
        style={{
          ...dotStyle,
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      <div
        className="cursor-dot-outline hidden md:block"
        style={{
          ...outlineStyle,
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
};

export default InteractiveCursor;
