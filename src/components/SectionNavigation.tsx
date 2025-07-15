'use client';

import React, { useState, useEffect } from 'react';

interface Section {
  id: string;
  label: string;
}

interface SectionNavigationProps {
  className?: string;
  sections: Section[];
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({
  className = '',
  sections = []
}) => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [availableSections, setAvailableSections] = useState<Section[]>([]);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Move DOM checks to useEffect to avoid SSR issues
  useEffect(() => {
    if (!mounted || typeof document === 'undefined') return;
    
    // Filter to only show sections that exist on the DOM after component mounts
    const existingSections = sections.filter(section => 
      document.getElementById(section.id)
    );
    setAvailableSections(existingSections);

    // Set up scroll event listener to detect active section
    const handleScroll = () => {
      for (const section of existingSections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [sections, mounted]);
  
  // Function to scroll to section
  const scrollToSection = (id: string) => {
    if (typeof document === 'undefined') return;
    
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };
  
  // Don't render until mounted on client
  if (!mounted) {
    return null;
  }
  
  return (
    <div className={className}>
      {availableSections.map(section => (
        <div key={section.id} className="relative group">
          <button
            onClick={() => scrollToSection(section.id)}
            data-section={section.id}
            className={`section-dot w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-primary scale-125'
                : 'bg-foreground/20 hover:bg-foreground/40'
            }`}
            aria-label={`Scroll to ${section.label} section`}
          />
          <span className="absolute -left-24 top-1/2 -translate-y-1/2 bg-foreground/90 text-background text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {section.label}
          </span>
        </div>
      ))}
      <style jsx>{`
        .section-dot {
          margin: 0 5px;
        }
        .section-dot:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default SectionNavigation;
