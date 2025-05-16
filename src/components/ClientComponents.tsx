'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamic imports with ssr: false option
const InteractiveBackground = dynamic(() => import('./InteractiveBackground'), { ssr: false });
const InteractiveCursor = dynamic(() => import('./InteractiveCursor'), { ssr: false });
const AudioFeedback = dynamic(() => import('./AudioFeedback'), { ssr: false });
const ScrollToTopButton = dynamic(() => import('./ScrollToTopButton'), { ssr: false });

interface ClientComponentsProps {
  backgroundOpacity?: number;
  particleDensity?: number;
  mouseForce?: number;
}

const ClientComponents: React.FC<ClientComponentsProps> = ({
  backgroundOpacity = 0.8,
  particleDensity = 12,
  mouseForce = 120
}) => {
  return (
    <>
      <InteractiveBackground 
        opacity={backgroundOpacity}
        particleDensity={particleDensity}
        mouseForce={mouseForce}
      />
      <InteractiveCursor />
      <AudioFeedback />
      <ScrollToTopButton />
    </>
  );
};

export default ClientComponents;
