'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TypewriterEffectProps {
  text: string | string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayAfterType?: number;
  delayAfterDelete?: number;
  className?: string;
  cursor?: boolean;
  cursorStyle?: string;
  cursorBlinkSpeed?: number;
  startDelay?: number;
  infinite?: boolean;
  onComplete?: () => void;
  as?: React.ElementType;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  text,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayAfterType = 2000,
  delayAfterDelete = 500,
  className = '',
  cursor = true,
  cursorStyle = '|',
  cursorBlinkSpeed = 500,
  startDelay = 0,
  infinite = true,
  onComplete,
  as: Component = 'span'
}) => {
  const [displayText, setDisplayText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  
  const textArray = typeof text === 'string' ? [text] : text;
  const textIndex = useRef(0);
  const charIndex = useRef(0);
  const isDeleting = useRef(false);
  const completedCycles = useRef(0);
  
  const cursorElement = cursor ? (
    <span 
      className="typewriter-cursor"
      style={{
        opacity: cursorVisible ? 1 : 0,
        transition: `opacity ${cursorBlinkSpeed / 1000}s`
      }}
    >
      {cursorStyle}
    </span>
  ) : null;
  
  // Handle cursor blinking
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, cursorBlinkSpeed);
    
    return () => clearInterval(blinkInterval);
  }, [cursorBlinkSpeed]);
  
  // Handle typewriter effect
  useEffect(() => {
    if (textArray.length === 0) return;
    
    let timeout: NodeJS.Timeout;
    
    const type = () => {
      const currentText = textArray[textIndex.current];
      
      if (isDeleting.current) {
        // Deleting text
        setDisplayText(currentText.substring(0, charIndex.current - 1));
        charIndex.current -= 1;
        
        if (charIndex.current === 0) {
          isDeleting.current = false;
          textIndex.current = (textIndex.current + 1) % textArray.length;
          
          // Check if a full cycle has been completed
          if (textIndex.current === 0) {
            completedCycles.current += 1;
            
            // If not infinite and we've gone through all texts once, stop
            if (!infinite && completedCycles.current >= 1) {
              if (onComplete) onComplete();
              return;
            }
          }
          
          // Pause after deleting before starting the next word
          timeout = setTimeout(type, delayAfterDelete);
          return;
        }
      } else {
        // Typing text
        setDisplayText(currentText.substring(0, charIndex.current + 1));
        charIndex.current += 1;
        
        if (charIndex.current === currentText.length) {
          // If this is the last text and not infinite, don't delete
          if (textIndex.current === textArray.length - 1 && !infinite) {
            if (onComplete) onComplete();
            return;
          }
          
          isDeleting.current = true;
          // Pause at the end of typing before starting delete
          timeout = setTimeout(type, delayAfterType);
          return;
        }
      }
      
      // Set the next timeout based on whether we're typing or deleting
      timeout = setTimeout(
        type, 
        isDeleting.current ? deletingSpeed : typingSpeed
      );
    };
    
    // Initial start with delay
    timeout = setTimeout(type, startDelay);
    
    return () => clearTimeout(timeout);
  }, [text, typingSpeed, deletingSpeed, delayAfterType, delayAfterDelete, infinite, startDelay, onComplete]);
  
  return (
    <Component className={`typewriter-text ${className}`}>
      {displayText}
      {cursorElement}
    </Component>
  );
};

export default TypewriterEffect;
