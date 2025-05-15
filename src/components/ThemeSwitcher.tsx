'use client';

import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from './ThemeProvider';

/**
 * Theme switcher component that allows users to toggle between light and dark themes.
 * 
 * @param {Object} props - Component props
 * @param {string} [props.size='md'] - Size of the theme switcher (sm, md, lg)
 * @param {boolean} [props.showLabels=false] - Whether to show text labels
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.asToggle=false] - Whether to display as a toggle switch
 */
const ThemeSwitcher: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  showLabels?: boolean;
  className?: string;
  asToggle?: boolean;
}> = ({
  size = 'md',
  showLabels = false,
  className = '',
  asToggle = false,
}) => {
  const { theme, setTheme } = useTheme();

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

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (asToggle) {
    // Toggle switch style
    return (
      <div className={`flex items-center ${className}`}>
        {showLabels && <span className="mr-2 text-sm">Light</span>}
        <button
          onClick={toggleTheme}
          className={`relative inline-flex items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
            theme === 'dark' ? 'bg-primary' : 'bg-gray-200'
          }`}
          style={{ width: size === 'sm' ? '36px' : size === 'md' ? '44px' : '52px', height: size === 'sm' ? '20px' : size === 'md' ? '24px' : '28px' }}
          aria-label="Toggle theme"
        >
          <span
            className={`${
              theme === 'dark' ? 'translate-x-full border-primary' : 'translate-x-0 border-gray-200'
            } inline-block transform rounded-full bg-white transition-transform`}
            style={{ width: size === 'sm' ? '16px' : size === 'md' ? '20px' : '24px', height: size === 'sm' ? '16px' : size === 'md' ? '20px' : '24px', margin: '2px' }}
          />
        </button>
        {showLabels && <span className="ml-2 text-sm">Dark</span>}
      </div>
    );
  }

  // Default button style
  return (
    <button
      onClick={toggleTheme}
      className={`${containerSizeMap[size]} rounded-full hover:bg-foreground/10 text-foreground/80 hover:text-foreground transition-colors ${className}`}
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <div className="flex items-center">
          <SunIcon className={iconSizeMap[size]} />
          {showLabels && <span className="ml-2">Light Mode</span>}
        </div>
      ) : (
        <div className="flex items-center">
          <MoonIcon className={iconSizeMap[size]} />
          {showLabels && <span className="ml-2">Dark Mode</span>}
        </div>
      )}
    </button>
  );
};

export default ThemeSwitcher;
