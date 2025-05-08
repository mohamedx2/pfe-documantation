'use client';

import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface MobileNavigationProps {
  items: {
    label: string;
    href: string;
    icon: React.ReactNode;
  }[];
  checkboxId?: string;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ 
  items,
  checkboxId = 'mobile-menu-toggle'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Monitor the checkbox state
  useEffect(() => {
    const checkbox = document.getElementById(checkboxId) as HTMLInputElement;
    if (!checkbox) return;
    
    const updateMenuState = () => {
      setIsOpen(checkbox.checked);
      document.body.style.overflow = checkbox.checked ? 'hidden' : '';
    };
    
    // Initial state check
    updateMenuState();
    
    // Listen for changes
    checkbox.addEventListener('change', updateMenuState);
    
    return () => {
      checkbox.removeEventListener('change', updateMenuState);
      document.body.style.overflow = '';
    };
  }, [checkboxId]);
  
  // Close menu on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const checkbox = document.getElementById(checkboxId) as HTMLInputElement;
        if (checkbox && checkbox.checked) {
          checkbox.checked = false;
          setIsOpen(false);
          document.body.style.overflow = '';
        }
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [checkboxId]);
  
  // Handle menu close (updates checkbox)
  const handleClose = () => {
    const checkbox = document.getElementById(checkboxId) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
      setIsOpen(false);
      document.body.style.overflow = '';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            onClick={handleClose}
          />

          {/* Menu panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-xs glass-morphism shadow-xl"
          >
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                  <Image 
                    src="/images/logo.png"
                    alt="Frontend Hamroun Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                  />
                  <span className="font-semibold text-base logo-text-gradient">Frontend Hamroun</span>
                </div>
                <button 
                  className="p-2 rounded-full hover:bg-secondary/80 transition-colors btn-ripple"
                  aria-label="Close menu"
                  onClick={handleClose}
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              
              <nav className="flex-1 overflow-y-auto">
                <ul className="space-y-1">
                  {items.map((item, index) => (
                    <motion.li 
                      key={item.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <a 
                        href={item.href}
                        className="flex items-center py-3 px-4 rounded-lg hover:bg-primary/5 transition-colors"
                        onClick={handleClose}
                      >
                        <span className="w-5 h-5 mr-3 text-primary">{item.icon}</span>
                        <span>{item.label}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              
              <motion.div 
                className="mt-auto pt-4 border-t border-primary/10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <a 
                  href="#getting-started"
                  className="block text-center w-full py-3 btn-interactive rounded-lg"
                  onClick={handleClose}
                >
                  Get Started
                </a>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileNavigation;
