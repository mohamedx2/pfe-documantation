'use client';

import { useTheme } from 'next-themes';
import { useNavigation } from './NavigationContext';
import { useEffect, useState } from 'react';

export default function SimpleDebugPanel() {
  const { theme } = useTheme();
  const { isInView, activeSection } = useNavigation();
  const [mounted, setMounted] = useState(false);
  const [sectionsFound, setSectionsFound] = useState(0);

  useEffect(() => {
    setMounted(true);
    
    // Count sections for debugging
    const sections = document.querySelectorAll('section[id]');
    setSectionsFound(sections.length);
  }, []);

  if (!mounted) return null;

  const visibleCount = Object.values(isInView).filter(Boolean).length;
  const totalSections = Object.keys(isInView).length;

  return (
    <div className="fixed bottom-4 right-4 bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 text-xs font-mono shadow-lg z-50 max-w-xs">
      <div className="mb-2 font-semibold text-foreground">🐛 Debug Panel</div>
      
      <div className="space-y-1 text-foreground/80">
        <div>
          <span className="text-foreground/60">Theme:</span> <span className="text-blue-500">{theme}</span>
        </div>
        
        <div>
          <span className="text-foreground/60">Active:</span> <span className="text-green-500">{activeSection}</span>
        </div>
        
        <div>
          <span className="text-foreground/60">DOM Sections:</span> {sectionsFound}
        </div>
        
        <div>
          <span className="text-foreground/60">Visibility:</span> {visibleCount}/{totalSections}
        </div>
        
        <div className="mt-2 max-h-24 overflow-y-auto">
          <div className="text-foreground/60 text-[10px]">Section Status:</div>
          {Object.entries(isInView).map(([section, visible]) => (
            <div key={section} className="ml-2 text-[10px]">
              <span className={visible ? 'text-green-500' : 'text-red-500'}>
                {visible ? '✓' : '✗'}
              </span> 
              <span className={visible ? 'text-green-400' : 'text-foreground/50'}>
                {section}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
