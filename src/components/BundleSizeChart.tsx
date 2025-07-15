'use client';

import React from 'react';

interface BundleSizeData {
  framework: string;
  size: number;
  color: string;
}

const BundleSizeChart: React.FC = () => {
  const data: BundleSizeData[] = [
    { framework: 'Baraqex', size: 5, color: '#3b82f6' },
    { framework: 'React', size: 42, color: '#ef4444' },
    { framework: 'Vue', size: 35, color: '#f59e0b' },
    { framework: 'Angular', size: 130, color: '#dc2626' },
    { framework: 'Svelte', size: 10, color: '#10b981' }
  ];

  const maxSize = Math.max(...data.map(d => d.size));

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-4">
          <div className="w-20 text-sm font-medium text-right">{item.framework}</div>
          <div className="flex-1 bg-gray-200 rounded-full h-6 relative overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-1000 flex items-center justify-end pr-2"
              style={{
                width: `${(item.size / maxSize) * 100}%`,
                backgroundColor: item.color
              }}
            >
              <span className="text-white text-xs font-medium">{item.size}KB</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BundleSizeChart;