'use client';

import React, { useState, useEffect } from 'react';
import { useNavigation } from './NavigationContext';

interface SectionNavigationProps {
  className?: string;
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({
  className = ''
}) => {
  const { activeSection, sections, scrollToSection } = useNavigation();
  const [availableSections, setAvailableSections] = useState(sections);
  
  // Move DOM checks to useEffect to avoid SSR issues
  useEffect(() => {
    // Filter to only show sections that exist on the DOM after component mounts
    const existingSections = sections.filter(section => 
      document.getElementById(section.id)
    );
    setAvailableSections(existingSections);
  }, [sections]);
  
  return (
    <div className={className}>
      {availableSections.map(section => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          data-section={section.id}
          className={`section-dot w-3 h-3 rounded-full transition-all duration-300 group relative ${
            activeSection === section.id
              ? 'bg-primary scale-125'
              : 'bg-foreground/20 hover:bg-foreground/40'
          }`}
          aria-label={`Scroll to ${section.label} section`}
        >
          <span className="absolute -left-24 top-1/2 -translate-y-1/2 bg-foreground/90 text-background text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            {section.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SectionNavigation;
