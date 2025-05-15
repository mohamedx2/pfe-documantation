'use client';

import React from 'react';
import Link from 'next/link';
import { useNavigation } from './NavigationContext';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface MobileNavigationProps {
  items: NavItem[];
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ items }) => {
  const { activeSection } = useNavigation();

  return (
    <div 
      id="mobile-menu"
      className="fixed inset-y-0 right-0 z-50 w-64 bg-background shadow-xl transform translate-x-full transition-transform duration-300"
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-primary/10 flex justify-between items-center">
          <h3 className="font-semibold text-lg">Menu</h3>
          <label 
            htmlFor="mobile-menu-toggle"
            className="p-2 rounded-md hover:bg-secondary/80 transition-colors cursor-pointer"
            id="mobile-menu-close"
          >
            <XMarkIcon className="w-5 h-5" />
          </label>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-3">
            {items.map((item, index) => {
              // Determine if the link is external
              const isExternal = item.href.startsWith('http');
              
              // Extract the section ID from the href
              const sectionId = item.href.startsWith('#') ? 
                item.href.substring(1) : 
                item.href.split('#')[1] || '';
                
              // Check if this section is active
              const isActive = activeSection === sectionId;
              
              return (
                <li key={index}>
                  {isExternal ? (
                    <a
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                        isActive ? 'bg-primary text-white' : 'hover:bg-secondary/60'
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => document.getElementById('mobile-menu-toggle')?.click()}
                    >
                      <span className="text-primary">{item.icon}</span>
                      {item.label}
                    </a>
                  ) : (
                    <Link 
                      href={item.href}
                      className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                        isActive ? 'bg-primary text-white' : 'hover:bg-secondary/60'
                      }`}
                      onClick={() => document.getElementById('mobile-menu-toggle')?.click()}
                    >
                      <span className={isActive ? 'text-white' : 'text-primary'}>{item.icon}</span>
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        
        <div className="p-4 border-t border-primary/10 text-center">
          <Link 
            href="/docs/getting-started"
            className="btn-primary w-full py-2 px-4 rounded-full text-sm"
            onClick={() => document.getElementById('mobile-menu-toggle')?.click()}
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
