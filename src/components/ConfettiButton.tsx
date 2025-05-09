'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ConfettiPiece {
  x: number;
  y: number;
  rotation: number;
  size: number;
  color: string;
  speedX: number;
  speedY: number;
  speedRotation: number;
  shape: 'circle' | 'square' | 'triangle';
}

interface ConfettiButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  confettiCount?: number;
  duration?: number;
  colors?: string[];
  className?: string;
  variant?: 'primary' | 'accent' | 'subtle';
}

const ConfettiButton: React.FC<ConfettiButtonProps> = ({
  children,
  onClick,
  confettiCount = 50,
  duration = 3000,
  colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'],
  className = '',
  variant = 'primary'
}) => {
  const [isExploding, setIsExploding] = useState(false);
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const animationRef = useRef<number | null>(null);
  
  // Generate confetti pieces
  const generateConfetti = () => {
    if (!buttonRef.current) return;
    
    const buttonRect = buttonRef.current.getBoundingClientRect();
    const centerX = buttonRect.width / 2;
    const centerY = buttonRect.height / 2;
    
    const newPieces: ConfettiPiece[] = [];
    
    for (let i = 0; i < confettiCount; i++) {
      // Random angle in radians
      const angle = Math.random() * Math.PI * 2;
      // Random speed between 3 and 8
      const speed = 3 + Math.random() * 5;
      // Random shape
      const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      
      newPieces.push({
        x: centerX,
        y: centerY,
        rotation: Math.random() * 360,
        size: 5 + Math.random() * 7, // between 5 and 12
        color: colors[Math.floor(Math.random() * colors.length)],
        speedX: Math.cos(angle) * speed,
        speedY: Math.sin(angle) * speed,
        speedRotation: -5 + Math.random() * 10, // between -5 and 5
        shape
      });
    }
    
    setPieces(newPieces);
  };
  
  // Handle click and explosion
  const handleClick = () => {
    setIsExploding(true);
    generateConfetti();
    
    // Call the original onClick handler
    if (onClick) onClick();
    
    // Reset after animation
    setTimeout(() => {
      setIsExploding(false);
      setPieces([]);
    }, duration);
  };
  
  // Draw a confetti piece based on its shape
  const drawPiece = (
    ctx: CanvasRenderingContext2D, 
    piece: ConfettiPiece
  ) => {
    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate((piece.rotation * Math.PI) / 180);
    
    ctx.fillStyle = piece.color;
    
    switch (piece.shape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, piece.size / 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'square':
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
        break;
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(-piece.size / 2, piece.size / 2);
        ctx.lineTo(0, -piece.size / 2);
        ctx.lineTo(piece.size / 2, piece.size / 2);
        ctx.closePath();
        ctx.fill();
        break;
    }
    
    ctx.restore();
  };
  
  // Animation loop for confetti
  useEffect(() => {
    if (!isExploding || pieces.length === 0 || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const startTime = Date.now();
    const buttonRect = buttonRef.current?.getBoundingClientRect();
    if (!buttonRect) return;
    
    // Ensure canvas size matches button
    canvas.width = buttonRect.width;
    canvas.height = buttonRect.height;
    
    const animate = () => {
      if (!ctx || !canvas) return;
      
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;
      
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (progress >= 1) {
        // Animation complete
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        return;
      }
      
      // Update and draw each piece
      pieces.forEach((piece, index) => {
        // Apply gravity and update position
        piece.speedY += 0.1; // gravity
        piece.x += piece.speedX;
        piece.y += piece.speedY;
        piece.rotation += piece.speedRotation;
        
        // Add some resistance
        piece.speedX *= 0.99;
        piece.speedY *= 0.99;
        
        // Fade out based on progress
        const opacity = 1 - progress;
        ctx.globalAlpha = opacity;
        
        // Draw the piece
        drawPiece(ctx, piece);
        
        // Update the piece in the array
        const newPieces = [...pieces];
        newPieces[index] = piece;
        setPieces(newPieces);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isExploding, pieces, duration]);
  
  // Button style based on variant
  const getButtonStyle = () => {
    const baseStyle = 'relative overflow-hidden font-medium rounded-full transition-all duration-300';
    
    switch(variant) {
      case 'primary':
        return `${baseStyle} bg-primary hover:bg-primary-dark text-white px-6 py-2.5`;
      case 'accent':
        return `${baseStyle} bg-accent hover:bg-accent-dark text-white px-6 py-2.5`;
      case 'subtle':
        return `${baseStyle} bg-secondary hover:bg-secondary/80 text-foreground px-6 py-2.5`;
      default:
        return `${baseStyle} bg-primary hover:bg-primary-dark text-white px-6 py-2.5`;
    }
  };
  
  return (
    <div className="confetti-button-wrapper relative inline-block">
      <button
        ref={buttonRef}
        onClick={handleClick}
        className={`${getButtonStyle()} ${className} ${isExploding ? 'animate-bounce' : ''}`}
      >
        {children}
      </button>
      
      {/* Canvas for confetti animation */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 pointer-events-none"
        style={{ zIndex: 10 }}
      />
    </div>
  );
};

export default ConfettiButton;
