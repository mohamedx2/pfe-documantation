'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Slide {
  id: string;
  title: string;
  subtitle?: string;
}

interface SlidePreviewNavigationProps {
  slides: Slide[];
  currentSlide: number;
  onSlideChange: (index: number) => void;
  className?: string;
}

const SlidePreviewNavigation: React.FC<SlidePreviewNavigationProps> = ({
  slides,
  currentSlide,
  onSlideChange,
  className = ''
}) => {
  const [showPreviews, setShowPreviews] = useState(false);
  const [previewStartIndex, setPreviewStartIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const previewsPerPage = 5;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className={className}>
        <button className="mb-4 px-4 py-2 bg-primary/50 text-white rounded-lg opacity-50 cursor-not-allowed">
          <div className="grid grid-cols-3 gap-1">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-white rounded-full opacity-70"></div>
            ))}
          </div>
        </button>
      </div>
    );
  }

  const visiblePreviews = slides.slice(previewStartIndex, previewStartIndex + previewsPerPage);

  const nextPreviews = () => {
    if (previewStartIndex + previewsPerPage < slides.length) {
      setPreviewStartIndex(previewStartIndex + previewsPerPage);
    }
  };

  const prevPreviews = () => {
    if (previewStartIndex > 0) {
      setPreviewStartIndex(Math.max(0, previewStartIndex - previewsPerPage));
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Toggle Preview Button */}
      <button
        onClick={() => setShowPreviews(!showPreviews)}
        className="mb-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
      >
        <div className="grid grid-cols-3 gap-1">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-white rounded-full opacity-70"></div>
          ))}
        </div>
        <span className="text-sm">Slide Overview</span>
      </button>

      {/* Slide Previews */}
      {showPreviews && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-6xl w-full mx-4 max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Slide Overview</h3>
              <button
                onClick={() => setShowPreviews(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevPreviews}
                disabled={previewStartIndex === 0}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Showing {previewStartIndex + 1}-{Math.min(previewStartIndex + previewsPerPage, slides.length)} of {slides.length}
              </span>
              
              <button
                onClick={nextPreviews}
                disabled={previewStartIndex + previewsPerPage >= slides.length}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Preview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 overflow-y-auto max-h-96">
              {visiblePreviews.map((slide, index) => {
                const actualIndex = previewStartIndex + index;
                const isActive = actualIndex === currentSlide;
                
                return (
                  <button
                    key={slide.id}
                    onClick={() => {
                      onSlideChange(actualIndex);
                      setShowPreviews(false);
                    }}
                    className={`group relative p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      isActive 
                        ? 'border-primary bg-primary/5 shadow-lg shadow-primary/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-primary/50 hover:shadow-md'
                    }`}
                  >
                    {/* Slide Number */}
                    <div className={`absolute top-2 right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                      isActive 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {actualIndex + 1}
                    </div>

                    {/* Slide Preview Content */}
                    <div className="pr-8">
                      <h4 className={`font-semibold text-sm mb-2 line-clamp-2 ${
                        isActive ? 'text-primary' : 'text-gray-900 dark:text-gray-100'
                      }`}>
                        {slide.title}
                      </h4>
                      {slide.subtitle && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                          {slide.subtitle}
                        </p>
                      )}
                    </div>

                    {/* Visual Indicator */}
                    <div className={`absolute bottom-2 left-4 right-8 h-1 rounded-full ${
                      isActive 
                        ? 'bg-primary' 
                        : 'bg-gray-200 dark:bg-gray-700 group-hover:bg-primary/30'
                    }`}></div>

                    {/* Hover Effect */}
                    {!isActive && (
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 rounded-lg transition-colors"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Navigation */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {Array.from({ length: Math.ceil(slides.length / previewsPerPage) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPreviewStartIndex(i * previewsPerPage)}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                    Math.floor(previewStartIndex / previewsPerPage) === i
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-primary/20'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SlidePreviewNavigation;
