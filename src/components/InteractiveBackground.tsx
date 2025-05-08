'use client';

import { useEffect, useRef, useState } from 'react';

interface InteractiveBackgroundProps {
  opacity?: number;
  particleDensity?: number;
  mouseForce?: number;
  particleColor?: string;
  backgroundColor?: string;
}

const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  opacity = 1,
  particleDensity = 15, // Particles per 100,000 pixels
  mouseForce = 100, // Force radius around mouse
  particleColor = 'var(--primary)',
  backgroundColor = 'transparent'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Store mouse position
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isMouseMoving = useRef<boolean>(false);
  const mouseMovementTimeout = useRef<NodeJS.Timeout | null>(null);
  
  // Animation frame reference for cleanup
  const animationFrameId = useRef<number>(0);
  
  // Store particles
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const particles = useRef<any[]>([]);
  
  useEffect(() => {
    // Check for dark mode
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    
    // Listen for theme changes
    const handleColorSchemeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };
    
    darkModeMediaQuery.addEventListener('change', handleColorSchemeChange);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Setup canvas size
    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };
    
    window.addEventListener('resize', setupCanvas);
    setupCanvas();
    
    // Initialize particles
    const initParticles = () => {
      const totalArea = window.innerWidth * window.innerHeight;
      const particleCount = Math.round((totalArea / 100000) * particleDensity);
      
      particles.current = [];
      
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          lastX: 0,
          lastY: 0,
          hue: Math.random() * 30 - 15, // Color variation
          connection: [] // For storing connections
        });
      }
    };
    
    initParticles();
    
    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX,
        y: e.clientY
      };
      
      isMouseMoving.current = true;
      
      // Reset timeout
      if (mouseMovementTimeout.current) {
        clearTimeout(mouseMovementTimeout.current);
      }
      
      // Set a timeout to mark mouse as not moving
      mouseMovementTimeout.current = setTimeout(() => {
        isMouseMoving.current = false;
      }, 100);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      for (let i = 0; i < particles.current.length; i++) {
        const particle = particles.current[i];
        
        // Save previous position for connection drawing
        particle.lastX = particle.x;
        particle.lastY = particle.y;
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x - particle.radius < 0) {
          particle.x = particle.radius;
          particle.speedX *= -1;
        } else if (particle.x + particle.radius > canvas.width) {
          particle.x = canvas.width - particle.radius;
          particle.speedX *= -1;
        }
        
        if (particle.y - particle.radius < 0) {
          particle.y = particle.radius;
          particle.speedY *= -1;
        } else if (particle.y + particle.radius > canvas.height) {
          particle.y = canvas.height - particle.radius;
          particle.speedY *= -1;
        }
        
        // Mouse interaction - follow mouse if it's moving, otherwise return to normal movement
        if (isMouseMoving.current) {
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseForce) {
            // Calculate force (stronger as particle gets closer to mouse)
            const force = (mouseForce - distance) / mouseForce;
            
            // Move towards mouse with force proportional to distance
            particle.speedX += (dx / distance) * force * 0.02;
            particle.speedY += (dy / distance) * force * 0.02;
          }
        }
        
        // Apply max speed limit
        const maxSpeed = 1.5;
        const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
        if (currentSpeed > maxSpeed) {
          particle.speedX = (particle.speedX / currentSpeed) * maxSpeed;
          particle.speedY = (particle.speedY / currentSpeed) * maxSpeed;
        }
        
        // Apply friction to gradually slow down
        particle.speedX *= 0.99;
        particle.speedY *= 0.99;
        
        // Clear previous connections
        particle.connection = [];
        
        // Draw particle
        ctx.beginPath();
        
        const baseColor = isDarkMode ? '88, 166, 255' : '14, 124, 134'; // RGB for primary color
        
        ctx.fillStyle = `rgba(${baseColor}, ${0.4 * opacity})`;
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw connections between nearby particles
      for (let i = 0; i < particles.current.length; i++) {
        const particleA = particles.current[i];
        
        for (let j = i + 1; j < particles.current.length; j++) {
          const particleB = particles.current[j];
          
          const dx = particleA.x - particleB.x;
          const dy = particleA.y - particleB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 100; // Maximum distance for drawing connections
          
          if (distance < maxDistance) {
            // Store connection for reference
            particleA.connection.push(j);
            particleB.connection.push(i);
            
            // Opacity based on distance
            const opacity = 1 - (distance / maxDistance);
            
            const baseColor = isDarkMode ? '88, 166, 255' : '14, 124, 134';
            ctx.strokeStyle = `rgba(${baseColor}, ${opacity * 0.15 * opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particleA.x, particleA.y);
            ctx.lineTo(particleB.x, particleB.y);
            ctx.stroke();
          }
        }
      }
      
      // Continue animation loop
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setupCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      darkModeMediaQuery.removeEventListener('change', handleColorSchemeChange);
      cancelAnimationFrame(animationFrameId.current);
      
      if (mouseMovementTimeout.current) {
        clearTimeout(mouseMovementTimeout.current);
      }
    };
  }, [opacity, particleDensity, mouseForce, particleColor]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{
        backgroundColor,
        opacity,
      }}
    />
  );
};

export default InteractiveBackground;
