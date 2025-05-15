'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Section = {
  id: string;
  label: string;
  url: string;
};

type NavigationContextType = {
  activeSection: string;
  setActiveSection: (id: string) => void;
  sections: Section[];
  scrollToSection: (id: string) => void;
  isInView: Record<string, boolean>;
};

const defaultSections: Section[] = [
  { id: 'hero', label: 'Home', url: '/' },
  { id: 'features', label: 'Features', url: '/#features' },
  { id: 'docs', label: 'Documentation', url: '/docs' },
  { id: 'examples', label: 'Examples', url: '/examples' },
  { id: 'getting-started', label: 'Get Started', url: '/#getting-started' },
  { id: 'demos', label: 'Demos', url: '/#demos' },
  { id: 'community', label: 'Community', url: '/#community' },
  { id: 'arabic-dev', label: 'Arabic Community', url: '/arabic' }
];

const NavigationContext = createContext<NavigationContextType>({
  activeSection: 'hero',
  setActiveSection: () => {},
  sections: defaultSections,
  scrollToSection: () => {},
  isInView: {},
});

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isInView, setIsInView] = useState<Record<string, boolean>>({});
  
  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    } else if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('hero');
    }
  };
  
  // Track section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          setIsInView(prev => ({
            ...prev,
            [id]: entry.isIntersecting
          }));
          
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(id);
            
            // Update URL hash without scrolling
            const url = new URL(window.location.href);
            if (id !== 'hero') {
              url.hash = id;
              window.history.replaceState({}, '', url.toString());
            } else if (url.hash) {
              url.hash = '';
              window.history.replaceState({}, '', url.toString());
            }
          }
        });
      },
      { threshold: [0.2, 0.5] }
    );
    
    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  // Initial section detection from URL hash
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const section = document.getElementById(hash);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(hash);
        }, 100);
      }
    }
  }, []);
  
  return (
    <NavigationContext.Provider 
      value={{ 
        activeSection, 
        setActiveSection, 
        sections: defaultSections, 
        scrollToSection,
        isInView
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
