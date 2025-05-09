'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ResizablePanelsProps {
  children: React.ReactNode;
  direction?: 'horizontal' | 'vertical';
  initialSizes?: number[];
  minSizes?: number[];
  maxSizes?: number[];
  collapsible?: boolean;
  className?: string;
  resizerClassName?: string;
}

const ResizablePanels: React.FC<ResizablePanelsProps> = ({
  children,
  direction = 'horizontal',
  initialSizes,
  minSizes,
  maxSizes,
  collapsible = false,
  className = '',
  resizerClassName = '',
}) => {
  const childrenArray = React.Children.toArray(children);
  const panelCount = childrenArray.length;
  
  // Default sizes divided equally among panels
  const defaultSizes = Array(panelCount).fill(100 / panelCount);
  
  const [sizes, setSizes] = useState<number[]>(initialSizes || defaultSizes);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activeResizer, setActiveResizer] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // Determine if we're in horizontal or vertical mode
  const isHorizontal = direction === 'horizontal';
  
  // Ensure we have a min size for each panel
  const panelMinSizes = minSizes || Array(panelCount).fill(10);
  // Ensure we have a max size for each panel
  const panelMaxSizes = maxSizes || Array(panelCount).fill(90);
  
  // Handle resize start
  const handleResizeStart = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    e.preventDefault();
    setIsDragging(true);
    setActiveResizer(index);
    initialPos.current = { x: e.clientX, y: e.clientY };
    
    // Add cursor styling to the body
    document.body.style.cursor = isHorizontal ? 'col-resize' : 'row-resize';
    document.body.style.userSelect = 'none';
  };
  
  // Handle resizing
  useEffect(() => {
    if (!isDragging || activeResizer === null) return;
    
    const handleResize = (e: MouseEvent) => {
      if (!containerRef.current || activeResizer === null) return;
      
      // Calculate how far the mouse has moved
      const delta = isHorizontal
        ? e.clientX - initialPos.current.x
        : e.clientY - initialPos.current.y;
      
      // Get container dimensions
      const containerSize = isHorizontal
        ? containerRef.current.offsetWidth
        : containerRef.current.offsetHeight;
      
      // Calculate percentage change
      const percentageDelta = (delta / containerSize) * 100;
      
      setSizes(prevSizes => {
        const newSizes = [...prevSizes];
        
        // Ensure we respect minimum and maximum sizes
        let leftNewSize = newSizes[activeResizer] + percentageDelta;
        let rightNewSize = newSizes[activeResizer + 1] - percentageDelta;
        
        // Respect min/max constraints
        leftNewSize = Math.max(panelMinSizes[activeResizer], Math.min(panelMaxSizes[activeResizer], leftNewSize));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        rightNewSize = Math.max(panelMinSizes[activeResizer + 1], Math.min(panelMaxSizes[activeResizer + 1], rightNewSize));
        
        // Recalculate delta after constraints
        const actualDelta = leftNewSize - newSizes[activeResizer];
        
        // Apply the changes
        newSizes[activeResizer] = leftNewSize;
        newSizes[activeResizer + 1] = newSizes[activeResizer + 1] - actualDelta;
        
        return newSizes;
      });
      
      // Update initial position
      initialPos.current = { x: e.clientX, y: e.clientY };
    };
    
    const handleResizeEnd = () => {
      setIsDragging(false);
      setActiveResizer(null);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', handleResizeEnd);
    
    return () => {
      document.removeEventListener('mousemove', handleResize);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, [isDragging, activeResizer, isHorizontal, panelMinSizes, panelMaxSizes]);
  
  // Double-click to collapse/expand panel
  const handleDoubleClick = (index: number) => {
    if (!collapsible) return;
    
    setSizes(prevSizes => {
      const newSizes = [...prevSizes];
      
      // Check if panel is already at minimum size (collapsed)
      if (Math.abs(newSizes[index] - panelMinSizes[index]) < 0.1) {
        // Expand panel to its original size
        const expandedSize = initialSizes?.[index] || defaultSizes[index];
        const sizeDiff = expandedSize - newSizes[index];
        
        // Take space from the next panel
        newSizes[index] = expandedSize;
        newSizes[index + 1] -= sizeDiff;
      } else {
        // Collapse this panel
        const sizeDiff = newSizes[index] - panelMinSizes[index];
        
        // Give space to the next panel
        newSizes[index] = panelMinSizes[index];
        newSizes[index + 1] += sizeDiff;
      }
      
      return newSizes;
    });
  };
  
  return (
    <div 
      ref={containerRef}
      className={`resizable-container flex ${isHorizontal ? 'flex-row' : 'flex-col'} ${className}`}
    >
      {childrenArray.map((child, index) => (
        <React.Fragment key={index}>
          <div 
            className="resizable-panel"
            style={{
              [isHorizontal ? 'width' : 'height']: `${sizes[index]}%`,
              minWidth: isHorizontal ? `${panelMinSizes[index]}%` : undefined,
              minHeight: !isHorizontal ? `${panelMinSizes[index]}%` : undefined,
              maxWidth: isHorizontal ? `${panelMaxSizes[index]}%` : undefined,
              maxHeight: !isHorizontal ? `${panelMaxSizes[index]}%` : undefined,
              overflow: 'auto',
            }}
          >
            {child}
          </div>
          
          {/* Add resizer between panels */}
          {index < childrenArray.length - 1 && (
            <div 
              className={`resizable-handle ${isHorizontal ? 'w-1 cursor-col-resize' : 'h-1 cursor-row-resize'} bg-primary/10 hover:bg-primary/30 active:bg-primary/50 transition-colors ${resizerClassName}`}
              onMouseDown={(e) => handleResizeStart(e, index)}
              onDoubleClick={() => handleDoubleClick(index)}
              aria-hidden="true"
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ResizablePanels;
