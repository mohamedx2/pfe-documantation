'use client';

import Link from 'next/link';
import { useState } from 'react';
import { 
  BookmarkIcon, 
  ArrowTopRightOnSquareIcon,
  EyeIcon,
  CodeBracketIcon,
  HeartIcon,
  StarIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { 
  BookmarkIcon as BookmarkSolidIcon,
  HeartIcon as HeartSolidIcon
} from '@heroicons/react/24/solid';
import React from 'react';
import Image from 'next/image';
interface DocsCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  link: string;
  tags?: string[];
  isNew?: boolean;
  isUpdated?: boolean;
  isPopular?: boolean;
  variant?: 'default' | 'primary' | 'accent' | 'showcase' | 'interactive' | 'minimal';
  isBookmarked?: boolean;
  onBookmarkToggle?: () => void;
  previewImage?: string;
  codePreview?: string;
  usageCount?: number;
  rating?: number;
  contributors?: number;
  lastUpdated?: string;
  size?: 'sm' | 'md' | 'lg';
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
  onBookmarkToggle,
  previewImage,
  codePreview,
  usageCount,
  rating,
  contributors,
  lastUpdated,
  size = 'md'
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Color variants
  const variantClasses = {
    default: 'hover:border-primary/20',
    primary: 'border-primary/20 hover:border-primary/40 bg-primary/5',
    accent: 'border-accent/20 hover:border-accent/40 bg-accent/5',
    showcase: 'border-primary/10 hover:border-primary/30 bg-gradient-to-br from-background to-secondary/30',
    interactive: 'border-primary/10 hover:border-primary/30 bg-background hover:bg-primary/5 transition-all duration-300',
    minimal: 'border-transparent hover:border-primary/10 bg-transparent hover:bg-secondary/30'
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6'
  };
  
  const cardClass = `docs-card ${variantClasses[variant]} ${sizeClasses[size]} ${variant === 'interactive' ? 'transform hover:-translate-y-1' : ''}`;
  
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };
  
  const handlePreviewToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPreviewVisible(!isPreviewVisible);
    if (isPreviewVisible) {
      setIsCodeVisible(false);
    }
  };
  
  const handleCodeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsCodeVisible(!isCodeVisible);
    if (isCodeVisible) {
      setIsPreviewVisible(false);
    }
  };

  // Generate dynamic card style based on variant
  const getCardStyle = () => {
    if (variant === 'showcase') {
      return {
        backgroundImage: isHovered ? 
          'linear-gradient(135deg, rgba(14,124,134,0.1) 0%, rgba(14,124,134,0.05) 100%)' : 
          'linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(14,124,134,0.03) 100%)',
      };
    }
    return {};
  };
  
  return (
    <div 
      className={cardClass}
      style={getCardStyle()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top bar with icon and actions */}
      <div className="flex justify-between items-center mb-4">
        <div className={`docs-card-icon ${size === 'lg' ? 'h-12 w-12' : 'h-10 w-10'} flex items-center justify-center bg-background rounded-lg border border-primary/10`}>
          {icon}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Usage statistic - show only when provided */}
          {usageCount !== undefined && (
            <div className="text-xs text-foreground/60 flex items-center gap-1">
              <EyeIcon className="w-3 h-3" />
              <span>{usageCount}k</span>
            </div>
          )}
          
          {/* Rating - show only when provided */}
          {rating !== undefined && (
            <div className="text-xs text-accent flex items-center gap-1">
              <StarIcon className="w-3 h-3" />
              <span>{rating}</span>
            </div>
          )}
          
          {/* Preview toggle - only if previewImage exists */}
          {previewImage && (
            <button 
              className={`p-1.5 hover:bg-secondary rounded-full transition-colors ${isPreviewVisible ? 'text-primary' : ''}`}
              onClick={handlePreviewToggle}
              title="Toggle preview"
            >
              <EyeIcon className="w-4 h-4" />
            </button>
          )}
          
          {/* Code toggle - only if codePreview exists */}
          {codePreview && (
            <button 
              className={`p-1.5 hover:bg-secondary rounded-full transition-colors ${isCodeVisible ? 'text-primary' : ''}`}
              onClick={handleCodeToggle}
              title="Toggle code"
            >
              <CodeBracketIcon className="w-4 h-4" />
            </button>
          )}
          
          {/* Favorite button */}
          <button 
            className="p-1.5 hover:bg-secondary rounded-full transition-colors"
            onClick={handleFavoriteToggle}
            title={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <HeartSolidIcon className="w-4 h-4 text-ruby" />
            ) : (
              <HeartIcon className="w-4 h-4" />
            )}
          </button>
          
          {/* Bookmark button (if provided) */}
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
            <h3 className={`font-semibold ${size === 'lg' ? 'text-xl' : 'text-lg'}`}>{title}</h3>
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
          
          <p className={`text-foreground/70 ${size === 'sm' ? 'text-xs' : 'text-sm'} mb-4`}>{description}</p>
          
          {/* Preview image/code section - conditionally rendered */}
          {isPreviewVisible && previewImage && (
            <div className="mb-4 rounded-md overflow-hidden border border-primary/10">
              <Image
                src={previewImage} 
                alt={`${title} preview`} 
                className="w-full h-auto"
              />
            </div>
          )}
          
          {isCodeVisible && codePreview && (
            <div className="mb-4 text-xs font-mono bg-secondary/50 p-3 rounded-md overflow-auto max-h-32">
              <pre>{codePreview}</pre>
            </div>
          )}
          
          {/* Meta info - only show when any of these props are provided */}
          {(contributors !== undefined || lastUpdated) && (
            <div className="flex items-center justify-between text-xs text-foreground/50 mt-2 mb-3">
              {contributors !== undefined && (
                <div className="flex items-center gap-1">
                  <SparklesIcon className="w-3 h-3" />
                  <span>{contributors} contributors</span>
                </div>
              )}
              {lastUpdated && (
                <div>Updated {lastUpdated}</div>
              )}
            </div>
          )}
          
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
