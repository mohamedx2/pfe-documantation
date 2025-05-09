'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface DisclosureProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  disableAnimation?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  className?: string;
}

const Disclosure: React.FC<DisclosureProps> = ({
  title,
  children,
  defaultOpen = false,
  icon,
  disableAnimation = false,
  onOpen,
  onClose,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(defaultOpen ? undefined : 0);

  // Update height when content changes
  useEffect(() => {
    if (!contentRef.current) return;
    
    if (isOpen) {
      // Set to auto after animation completes to allow for dynamic content changes
      const timer = setTimeout(() => {
        setHeight(undefined);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setHeight(0);
    }
  }, [isOpen]);
  
  const handleToggle = () => {
    // Get the current height before collapsing for smooth animation
    if (isOpen && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
      setTimeout(() => setHeight(0), 0);
    }

    const newOpenState = !isOpen;
    setIsOpen(newOpenState);
    
    // Call callback
    if (newOpenState) {
      onOpen?.();
    } else {
      onClose?.();
    }
    
    // Set height for animation
    if (newOpenState && contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  };

  return (
    <div className={`disclosure-container border border-primary/10 rounded-lg overflow-hidden transition-shadow duration-300 ${isOpen ? 'shadow-md' : 'shadow-sm'} ${className}`}>
      <button
        type="button"
        className={`flex justify-between items-center w-full px-5 py-4 text-left border-b border-transparent transition-colors ${isOpen ? 'border-primary/10' : ''}`}
        onClick={handleToggle}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {icon && <div className="text-primary">{icon}</div>}
          <span className="font-medium">{title}</span>
        </div>
        <ChevronDownIcon
          className={`w-5 h-5 text-primary/70 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-height"
        style={{ 
          height: disableAnimation ? (isOpen ? undefined : 0) : height,
          transitionDuration: disableAnimation ? '0ms' : '300ms',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}
        aria-hidden={!isOpen}
      >
        <div className="p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

interface DisclosureGroupProps {
  items: Array<{
    id: string;
    title: React.ReactNode;
    content: React.ReactNode;
    icon?: React.ReactNode;
  }>;
  defaultOpenId?: string | null;
  accordion?: boolean;
  className?: string;
  itemClassName?: string;
}

const DisclosureGroup: React.FC<DisclosureGroupProps> = ({
  items,
  defaultOpenId = null,
  accordion = true,
  className = '',
  itemClassName = '',
}) => {
  const [openItems, setOpenItems] = useState<Set<string>>(
    new Set(defaultOpenId ? [defaultOpenId] : [])
  );

  const handleOpenItem = (itemId: string) => {
    setOpenItems(prev => {
      const newOpenItems = new Set(prev);
      
      if (accordion) {
        // In accordion mode, only one item can be open at a time
        newOpenItems.clear();
      }
      
      newOpenItems.add(itemId);
      return newOpenItems;
    });
  };

  const handleCloseItem = (itemId: string) => {
    setOpenItems(prev => {
      const newOpenItems = new Set(prev);
      newOpenItems.delete(itemId);
      return newOpenItems;
    });
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map(item => (
        <Disclosure
          key={item.id}
          title={item.title}
          icon={item.icon}
          defaultOpen={openItems.has(item.id)}
          onOpen={() => handleOpenItem(item.id)}
          onClose={() => handleCloseItem(item.id)}
          className={itemClassName}
        >
          {item.content}
        </Disclosure>
      ))}
    </div>
  );
};

export default DisclosureGroup;
export { Disclosure };
