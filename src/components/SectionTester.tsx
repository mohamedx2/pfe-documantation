'use client';

import { useNavigation } from './NavigationContext';
import { useEffect } from 'react';

const SectionTester = () => {
  const { isInView } = useNavigation();

  useEffect(() => {
    // Log current section visibility every 2 seconds for debugging
    const interval = setInterval(() => {
      console.log('Current section visibility:', isInView);
      
      // Also check DOM elements
      const sections = document.querySelectorAll('section[id]');
      console.log('DOM sections found:', sections.length);
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        console.log(`Section ${section.id}: DOM visible=${isVisible}, isInView=${isInView[section.id]}`);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isInView]);

  return null; // This component doesn't render anything visible
};

export default SectionTester;
