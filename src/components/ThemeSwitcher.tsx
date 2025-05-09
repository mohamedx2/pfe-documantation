'use client';

import React, { useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';

interface ThemeSwitcherProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  asToggle?: boolean;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  className = '',
  size = 'md',
  showLabel = false,
  asToggle = false,
}) => {
  const { theme, toggleTheme } = useTheme();
  
  // Control icon and container sizes based on size prop
  const iconSizeMap = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  
  const containerSizeMap = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
  };
  
  const toggleSizeMap = {
    sm: 'w-10 h-5',
    md: 'w-12 h-6',
    lg: 'w-14 h-7',
  };
  
  const iconSize = iconSizeMap[size];
  const containerSize = containerSizeMap[size];

  // Handle keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  };
  
  // Animation for theme icon transition
  useEffect(() => {
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      themeIcon.classList.add('animate-spin-once');
      const timer = setTimeout(() => {
        themeIcon.classList.remove('animate-spin-once');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [theme]);
  
  if (asToggle) {
    return (
      <div className={`theme-toggle ${className}`}>
        <label 
          htmlFor="theme-toggle" 
          className="flex items-center cursor-pointer"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {showLabel && (
            <span className="mr-2 text-sm font-medium">
              {theme === 'light' ? 'Light' : 'Dark'}
            </span>
          )}
          
          <div className={`relative ${toggleSizeMap[size]}`}>
            <input 
              type="checkbox" 
              id="theme-toggle" 
              className="sr-only"
              checked={theme === 'dark'}
              onChange={toggleTheme}
              aria-label="Theme toggle"
            />
            <div className={`
              block bg-secondary/80 rounded-full transition-colors duration-300
              ${theme === 'dark' ? 'bg-primary/30' : ''}
              ${toggleSizeMap[size]}
            `}></div>
            <div className={`
              absolute left-1 top-1 bg-white dark:bg-primary rounded-full transition-transform duration-300 flex items-center justify-center
              ${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'}
              ${theme === 'dark' ? 'transform translate-x-full' : ''}
            `}>
              <span className="sr-only">Theme icon</span>
              <span id="theme-icon" className="scale-50 opacity-70">
                {theme === 'light' ? '☀️' : '🌙'}
              </span>
            </div>
          </div>
        </label>
      </div>
    );
  }
  
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-switcher rounded-full hover:bg-secondary/80 transition-colors ${containerSize} ${className}`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      onKeyDown={handleKeyDown}
    >
      <span id="theme-icon" className="block transition-transform duration-300">
        {theme === 'light' ? (
          <MoonIcon className={iconSize} />
        ) : (
          <SunIcon className={iconSize} />
        )}
      </span>
      
      {showLabel && (
        <span className="ml-2 text-sm">
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </span>
      )}
    </button>
  );
};

export default ThemeSwitcher;
