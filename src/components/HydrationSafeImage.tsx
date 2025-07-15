'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

type HydrationSafeImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export default function HydrationSafeImage({ 
  src, 
  alt, 
  width, 
  height, 
  className, 
  priority = false 
}: HydrationSafeImageProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // On server render, use a simple div placeholder
  if (!isClient) {
    return (
      <div 
        className={`${className} bg-gray-200 dark:bg-gray-700 animate-pulse`}
        style={{ width, height }}
        aria-label={alt}
      />
    );
  }

  // On client render, use the actual Image component
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      suppressHydrationWarning
    />
  );
}
