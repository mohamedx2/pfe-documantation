// filepath: c:\Users\hamro\Documents\work\pfe-documantation\src\components\VisibilityDebugger.tsx
'use client';

import { useNavigation } from './NavigationContext';

export default function VisibilityDebugger() {
  const { isInView, activeSection } = useNavigation();

  return (
    <div className="fixed top-4 right-4 bg-background/90 backdrop-blur border rounded-lg p-4 text-xs z-50 max-w-xs">
      <h3 className="font-bold mb-2">Section Visibility Debug</h3>
      <div className="space-y-1">
        <div>Active: <span className="text-green-500">{activeSection}</span></div>
        {Object.entries(isInView).map(([section, visible]) => (
          <div key={section} className="flex justify-between">
            <span>{section}:</span>
            <span className={visible ? 'text-green-500' : 'text-red-500'}>
              {visible ? '✓' : '✗'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
