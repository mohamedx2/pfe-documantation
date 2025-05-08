'use client';

import { useEffect } from 'react';

interface AudioFeedbackProps {
  enabled?: boolean;
}

const AudioFeedback: React.FC<AudioFeedbackProps> = ({ enabled = true }) => {
  useEffect(() => {
    if (!enabled) return;
    
    // Create audio context when needed
    let audioContext: AudioContext | null = null;
    
    const createContext = () => {
      if (audioContext === null) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      return audioContext;
    };
    
    // Play subtle hover sound
    const playHoverSound = () => {
      const ctx = createContext();
      
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(1800, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.1);
    };
    
    // Play click sound
    const playClickSound = () => {
      const ctx = createContext();
      
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(300, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.start();
      oscillator.stop(ctx.currentTime + 0.1);
    };
    
    // Attach event listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input[type="button"], input[type="submit"], .interactive-btn, .btn-interactive'
    );
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', playHoverSound);
      el.addEventListener('click', playClickSound);
    });
    
    // Clean up
    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', playHoverSound);
        el.removeEventListener('click', playClickSound);
      });
      
      if (audioContext) {
        audioContext.close();
      }
    };
  }, [enabled]);
  
  // This component doesn't render anything
  return null;
};

export default AudioFeedback;
