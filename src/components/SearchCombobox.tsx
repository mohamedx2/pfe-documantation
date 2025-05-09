'use client';

import { useState, useRef, useEffect } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  category?: string;
  url?: string;
  icon?: React.ReactNode;
  keywords?: string[];
}

interface SearchComboboxProps {
  placeholder?: string;
  results?: SearchResult[];
  onSearch?: (query: string) => Promise<SearchResult[]>;
  onChange?: (value: string) => void;
  onResultClick?: (result: SearchResult) => void;
  className?: string;
  debounce?: number;
  autoFocus?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

const SearchCombobox: React.FC<SearchComboboxProps> = ({
  placeholder = 'Search documentation...',
  results: initialResults = [],
  onSearch,
  onChange,
  onResultClick,
  className = '',
  debounce = 300,
  autoFocus = false,
  rounded = 'full'
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>(initialResults);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Apply debounce to search queries
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    if (onChange) {
      onChange(query);
    }

    if (onSearch) {
      const timer = setTimeout(async () => {
        setLoading(true);
        try {
          const searchResults = await onSearch(query);
          setResults(searchResults);
        } catch (error) {
          console.error('Search error:', error);
          setResults([]);
        } finally {
          setLoading(false);
        }
      }, debounce);

      return () => clearTimeout(timer);
    }
  }, [query, onChange, onSearch, debounce]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        resultsRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-focus on mount
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  // Handle arrow key navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : 0));
      
      // Scroll active item into view
      const activeItem = resultsRef.current?.querySelector(`[data-index="${activeIndex + 1}"]`);
      if (activeItem) {
        activeItem.scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(prev => (prev > 0 ? prev - 1 : results.length - 1));
      
      // Scroll active item into view
      const activeItem = resultsRef.current?.querySelector(`[data-index="${activeIndex - 1}"]`);
      if (activeItem) {
        activeItem.scrollIntoView({ block: 'nearest' });
      }
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      if (results[activeIndex]) {
        handleResultClick(results[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      setFocused(false);
      inputRef.current?.blur();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (onResultClick) {
      onResultClick(result);
    }
    setQuery('');
    setFocused(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    inputRef.current?.focus();
  };

  const roundedClasses = {
    'sm': 'rounded-sm',
    'md': 'rounded-md',
    'lg': 'rounded-lg',
    'full': 'rounded-full',
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search input */}
      <div className={`relative flex items-center ${roundedClasses[rounded]} ring-1 ring-primary/20 focus-within:ring-2 focus-within:ring-primary bg-background transition duration-200 p-0.5`}>
        <MagnifyingGlassIcon className="w-5 h-5 ml-3 text-foreground/50" />
        
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={handleKeyDown}
          className={`w-full py-2 px-3 bg-transparent border-none focus:outline-none focus:ring-0 text-foreground/90 placeholder:text-foreground/40`}
        />
        
        {query && (
          <button 
            onClick={clearSearch}
            className="mr-2 p-1 rounded-full hover:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <XMarkIcon className="w-4 h-4 text-foreground/50" />
          </button>
        )}
      </div>
      
      {/* Results dropdown */}
      {focused && (query || results.length > 0) && (
        <div 
          ref={resultsRef}
          className="absolute z-50 top-full mt-2 w-full max-h-96 overflow-y-auto border border-primary/10 rounded-lg bg-background shadow-lg animate-fade-in scrollbar-thin"
        >
          {loading ? (
            <div className="p-4 text-center">
              <div className="inline-block w-5 h-5 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
              <p className="mt-2 text-sm text-foreground/50">Searching...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-4 text-center text-foreground/50">
              {query ? 'No results found' : 'Type to search'}
            </div>
          ) : (
            <div className="py-2">
              {/* Group results by category */}
              {Object.entries(results.reduce<Record<string, SearchResult[]>>((acc, result) => {
                const category = result.category || 'General';
                if (!acc[category]) acc[category] = [];
                acc[category].push(result);
                return acc;
              }, {})).map(([category, categoryResults]) => (
                <div key={category} className="mb-2">
                  <div className="px-4 py-1.5 text-xs font-medium text-foreground/50">{category}</div>
                  {categoryResults.map((result) => {
                    const resultIndex = results.findIndex(r => r.id === result.id);
                    return (
                      <div
                        key={result.id}
                        data-index={resultIndex}
                        className={`px-4 py-2 cursor-pointer flex items-center gap-3 transition-colors ${
                          resultIndex === activeIndex ? 'bg-primary/10' : 'hover:bg-secondary'
                        }`}
                        onClick={() => handleResultClick(result)}
                        onMouseEnter={() => setActiveIndex(resultIndex)}
                      >
                        {result.icon && (
                          <div className="flex-shrink-0">
                            {result.icon}
                          </div>
                        )}
                        <div className="flex-grow min-w-0">
                          <div className="font-medium truncate">
                            {/* Highlight matching text */}
                            {highlightText(result.title, query)}
                          </div>
                          {result.description && (
                            <div className="text-sm text-foreground/60 truncate">
                              {highlightText(result.description, query)}
                            </div>
                          )}
                        </div>
                        {result.url && (
                          <div className="flex-shrink-0 text-primary text-xs">→</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
          
          <div className="border-t border-primary/10 p-2 text-xs text-center text-foreground/40">
            <span>Press <kbd className="px-1.5 py-0.5 bg-secondary rounded font-mono">↑</kbd> <kbd className="px-1.5 py-0.5 bg-secondary rounded font-mono">↓</kbd> to navigate, <kbd className="px-1.5 py-0.5 bg-secondary rounded font-mono">Enter</kbd> to select</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper to highlight matching text in search results
function highlightText(text: string, query: string) {
  if (!query.trim()) return text;
  
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'));
  
  return (
    <>
      {parts.map((part, index) => 
        part.toLowerCase() === query.toLowerCase() ? (
          <span key={index} className="bg-primary/20 text-primary font-medium rounded px-0.5">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  );
}

export default SearchCombobox;
