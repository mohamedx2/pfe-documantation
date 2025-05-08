'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({ items, className = '' }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map((item, index) => (
        <div 
          key={index} 
          className="bg-background/60 backdrop-blur-sm rounded-lg overflow-hidden border border-primary/10 shadow-sm transition-all duration-300"
          style={{
            transform: activeIndex === index ? 'scale(1.01)' : 'scale(1)',
            boxShadow: activeIndex === index ? '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' : ''
          }}
        >
          <button
            className="w-full flex items-center justify-between p-5 text-left"
            onClick={() => toggleItem(index)}
            aria-expanded={activeIndex === index}
          >
            <h3 className="text-lg font-medium">{item.question}</h3>
            <ChevronDownIcon 
              className={`w-5 h-5 transform transition-transform duration-300 ${
                activeIndex === index ? 'rotate-180' : 'rotate-0'
              }`} 
            />
          </button>
          
          <div 
            className="overflow-hidden transition-all duration-300"
            style={{ 
              maxHeight: activeIndex === index ? '500px' : '0',
              opacity: activeIndex === index ? 1 : 0
            }}
          >
            <div className="p-5 border-t border-primary/10">
              {typeof item.answer === 'string' ? (
                <p className="text-foreground/70">{item.answer}</p>
              ) : (
                item.answer
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQAccordion;
