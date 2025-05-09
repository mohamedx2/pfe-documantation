'use client';

import Link from 'next/link';
import { BookmarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import React from 'react';

interface DocsCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  link: string;
  tags?: string[];
  isNew?: boolean;
  isUpdated?: boolean;
  isPopular?: boolean;
  variant?: 'default' | 'primary' | 'accent';
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void;
}

const DocsCard: React.FC<DocsCardProps> = ({
  title,
  description,
  icon,
  link,
  tags = [],
  isNew = false,
  isUpdated = false,
  isPopular = false,
  variant = 'default',
  isBookmarked = false,
  onBookmarkToggle
}) => {
  // Color variants
  const variantClasses = {
    default: 'hover:border-primary/20',
    primary: 'border-primary/20 hover:border-primary/40 bg-primary/5',
    accent: 'border-accent/20 hover:border-accent/40 bg-accent/5'
  };
  
  return (
    <div className={`docs-card p-5 ${variantClasses[variant]} transition-all`}>
      {/* Top bar with icon and actions */}
      <div className="flex justify-between items-center mb-4">
        <div className="docs-card-icon h-10 w-10 flex items-center justify-center bg-background rounded-lg border border-primary/10">
          {icon}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Bookmark button (new) */}
          {onBookmarkToggle && (
            <button 
              className="p-1.5 hover:bg-secondary rounded-full transition-colors"
              onClick={(e) => {
                e.preventDefault();
                onBookmarkToggle();
              }}
              title={isBookmarked ? "Remove bookmark" : "Bookmark component"}
            >
              {isBookmarked ? (
                <BookmarkSolidIcon className="w-4 h-4 text-primary" />
              ) : (
                <BookmarkIcon className="w-4 h-4" />
              )}
            </button>
          )}
          
          {/* External link icon */}
          <Link href={link} className="p-1.5 hover:bg-secondary rounded-full transition-colors">
            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
      
      {/* Card content */}
      <Link href={link} className="block">
        <div className="docs-card-content">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg">{title}</h3>
            {isNew && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-accent/20 text-accent-dark text-[10px] font-medium">
                NEW
              </span>
            )}
            {isUpdated && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-medium">
                UPDATED
              </span>
            )}
            {isPopular && (
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full bg-purple/20 text-purple text-[10px] font-medium">
                POPULAR
              </span>
            )}
          </div>
          <p className="text-foreground/70 text-sm mb-4">{description}</p>
          
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {tags.map(tag => (
                <span 
                  key={tag} 
                  className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary/70 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default DocsCard;
