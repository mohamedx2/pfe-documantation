'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
  orientation?: 'horizontal' | 'vertical';
  animated?: boolean;
  onChange?: (tabId: string) => void;
}

const AnimatedTabs: React.FC<AnimatedTabsProps> = ({
  tabs,
  defaultTab,
  className = '',
  tabClassName = '',
  contentClassName = '',
  orientation = 'horizontal',
  animated = true,
  onChange,
}) => {
  const [activeTab, setActiveTab] = useState<string>(defaultTab || (tabs.length > 0 ? tabs[0].id : ''));
  const [indicatorStyle, setIndicatorStyle] = useState({ 
    top: 0, 
    left: 0, 
    width: 0, 
    height: 0 
  });
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tabsContainerRef = useRef<HTMLDivElement>(null);
  
  const isVertical = orientation === 'vertical';
  
  // Use useCallback to memoize the updateIndicator function
  const updateIndicator = useCallback(() => {
    const activeTabElement = tabRefs.current[activeTab];
    
    if (activeTabElement) {
      // Get the tab container for scroll positioning
      const container = tabsContainerRef.current;
      
      if (isVertical) {
        // Vertical indicator positioning
        setIndicatorStyle({
          top: activeTabElement.offsetTop,
          left: 0,
          width: 3, // thin line
          height: activeTabElement.offsetHeight,
        });
        
        // Scroll active tab into view if needed (vertical)
        if (container) {
          if (activeTabElement.offsetTop < container.scrollTop || 
              activeTabElement.offsetTop + activeTabElement.offsetHeight > container.scrollTop + container.clientHeight) {
            container.scrollTop = activeTabElement.offsetTop - container.clientHeight/2 + activeTabElement.offsetHeight/2;
          }
        }
      } else {
        // Horizontal indicator positioning
        setIndicatorStyle({
          top: activeTabElement.offsetTop + activeTabElement.offsetHeight - 2,
          left: activeTabElement.offsetLeft,
          width: activeTabElement.offsetWidth,
          height: 2, // thin line
        });
        
        // Scroll active tab into view if needed (horizontal)
        if (container) {
          if (activeTabElement.offsetLeft < container.scrollLeft || 
              activeTabElement.offsetLeft + activeTabElement.offsetWidth > container.scrollLeft + container.clientWidth) {
            container.scrollLeft = activeTabElement.offsetLeft - container.clientWidth/2 + activeTabElement.offsetWidth/2;
          }
        }
      }
    }
  }, [activeTab, isVertical]);
  
  // Update indicator position when tab changes or on component mount
  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(updateIndicator, 10);
    
    // Also update on window resize for responsiveness
    window.addEventListener('resize', updateIndicator);
    return () => {
      window.removeEventListener('resize', updateIndicator);
      clearTimeout(timer);
    };
  }, [activeTab, updateIndicator]);
  
  const changeTab = (tabId: string) => {
    if (tabId !== activeTab) {
      setActiveTab(tabId);
      if (onChange) onChange(tabId);
    }
  };
  
  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, tabIndex: number) => {
    let nextIndex: number | null = null;
    
    // Handle arrow keys differently based on orientation
    if (isVertical) {
      if (e.key === 'ArrowUp') {
        nextIndex = tabIndex > 0 ? tabIndex - 1 : tabs.length - 1;
      } else if (e.key === 'ArrowDown') {
        nextIndex = tabIndex < tabs.length - 1 ? tabIndex + 1 : 0;
      }
    } else {
      if (e.key === 'ArrowLeft') {
        nextIndex = tabIndex > 0 ? tabIndex - 1 : tabs.length - 1;
      } else if (e.key === 'ArrowRight') {
        nextIndex = tabIndex < tabs.length - 1 ? tabIndex + 1 : 0;
      }
    }
    
    // Handle Home and End keys
    if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = tabs.length - 1;
    }
    
    // Focus and activate the next tab if determined
    if (nextIndex !== null) {
      e.preventDefault();
      
      // Skip disabled tabs
      while (tabs[nextIndex].disabled && nextIndex !== tabIndex) {
        nextIndex = (nextIndex + 1) % tabs.length;
      }
      
      const nextTabId = tabs[nextIndex].id;
      changeTab(nextTabId);
      tabRefs.current[nextTabId]?.focus();
    }
  };
  

  const getTabsContainerClasses = () => {
    return isVertical 
      ? 'flex flex-col border-r border-primary/10 overflow-y-auto' 
      : 'flex border-b border-primary/10 relative overflow-x-auto scrollbar-thin';
  };

  return (
    <div className={`tabs-container ${className} ${isVertical ? 'flex flex-row' : ''}`}>
      {/* Tabs navigation */}
      <div 
        className={getTabsContainerClasses()}
        ref={tabsContainerRef}
        role="tablist"
        aria-orientation={isVertical ? 'vertical' : 'horizontal'}
      >
        {/* Tab indicator */}
        <div
          className="absolute bg-primary transition-all duration-300 z-10"
          style={{
            top: `${indicatorStyle.top}px`,
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
            height: `${indicatorStyle.height}px`,
          }}
          aria-hidden="true"
        ></div>
        
        {/* Tabs */}
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            ref={(el) => { tabRefs.current[tab.id] = el; }}
            onClick={() => !tab.disabled && changeTab(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            disabled={tab.disabled}
            className={`
              px-4 py-3 relative z-20
              ${activeTab === tab.id ? 'text-primary font-medium' : 'text-foreground/70 hover:text-primary/80'} 
              transition-colors duration-200
              ${isVertical ? 'text-left' : ''}
              flex items-center gap-2
              ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              ${tabClassName}
            `}
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      
      {/* Tab content */}
      <div className={`tab-content p-4 flex-grow ${contentClassName}`}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tab.id}`}
            className={`${animated ? 'transition-all duration-300' : ''}`}
            style={{
              display: activeTab === tab.id ? 'block' : 'none',
              opacity: activeTab === tab.id ? 1 : 0,
              transform: activeTab === tab.id ? 'translateY(0)' : 'translateY(10px)',
            }}
          >
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTabs;
