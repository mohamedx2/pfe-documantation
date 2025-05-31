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
  { id: 'demos', label: 'Demos', url: '/#demos' },
  { id: 'getting-started', label: 'Get Started', url: '/#getting-started' },
  { id: 'features', label: 'Features', url: '/#features' },
  { id: 'community', label: 'Community', url: '/#community' },
  { id: 'cta', label: 'Get Started', url: '/#cta' },
  { id: 'docs', label: 'Documentation', url: '/docs' },
  { id: 'examples', label: 'Examples', url: '/examples' },
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
  const [isInView, setIsInView] = useState<Record<string, boolean>>({
    hero: true, // Initialize hero as visible
  });
  
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
  };  // Track section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          const isIntersecting = entry.isIntersecting;
          
          setIsInView(prev => ({
            ...prev,
            [id]: isIntersecting
          }));
          
          if (isIntersecting && entry.intersectionRatio > 0.3) {
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
      { 
        threshold: [0, 0.1, 0.3, 0.5], // Multiple thresholds for better detection
        rootMargin: '-10% 0px -10% 0px' // Trigger when element is 10% into viewport
      }
    );
    
    // Function to observe sections with retry logic
    const observeSections = () => {
      const sections = document.querySelectorAll('section[id]');
      console.log('Found sections:', sections.length);
      
      if (sections.length === 0) {
        // Retry after a short delay if no sections found
        setTimeout(observeSections, 500);
        return;
      }
      
      sections.forEach(section => {
        console.log('Observing section:', section.id);
        observer.observe(section);
      });
      
      // Initial visibility check for all sections
      setTimeout(() => {
        sections.forEach(section => {
          const rect = section.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          setIsInView(prev => ({
            ...prev,
            [section.id]: isVisible
          }));
        });
      }, 100);
    };
    
    // Start observing
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', observeSections);
    } else {
      observeSections();
    }
    
    return () => {
      observer.disconnect();
      document.removeEventListener('DOMContentLoaded', observeSections);
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
