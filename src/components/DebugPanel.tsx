'use client';

import React from 'react';
import { useNavigation } from './NavigationContext';
import { useTheme } from './theme-provider';

/**
 * Debug panel to help verify that the visibility detection and theme switching are working
 */
const DebugPanel: React.FC = () => {
  const { activeSection, isInView } = useNavigation();
  const { theme } = useTheme();

  return (
    <div className="fixed bottom-4 left-4 bg-background border border-primary/20 rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <h3 className="text-sm font-semibold mb-2 text-primary">Debug Panel</h3>
      
      <div className="space-y-2 text-xs">
        <div>
          <strong>Current Theme:</strong> {theme}
        </div>
        
        <div>
          <strong>Active Section:</strong> {activeSection}
        </div>
        
        <div>
          <strong>Sections in View:</strong>
          <ul className="mt-1 space-y-1">
            {Object.entries(isInView).map(([section, visible]) => (
              <li key={section} className={visible ? 'text-green-600' : 'text-red-600'}>
                {section}: {visible ? '✓' : '✗'}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DebugPanel;
