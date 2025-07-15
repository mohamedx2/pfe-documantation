'use client';

import { useState, useEffect } from 'react';

export default function CopyrightYear() {
  const [year, setYear] = useState<number>(2024); // Default fallback year
  
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  
  return <span>{year}</span>;
}
