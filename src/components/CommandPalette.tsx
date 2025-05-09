'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CommandLineIcon, MagnifyingGlassIcon,  XMarkIcon } from '@heroicons/react/24/outline';

interface CommandItem {
  id: string;
  name: string;
  shortcut?: string[];
  section?: string;
  icon?: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  commands: CommandItem[];
  placeholder?: string;
  shortcut?: string;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({
  commands,
  placeholder = 'Type a command or search...',
  shortcut = 'k',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const commandListRef = useRef<HTMLDivElement>(null);
  
  // Filter commands based on search query
  const filteredCommands = commands.filter(command => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return command.name.toLowerCase().includes(lowerCaseQuery) || 
           command.section?.toLowerCase().includes(lowerCaseQuery);
  });
  
  // Group commands by section
  const groupedCommands = filteredCommands.reduce((acc, command) => {
    const section = command.section || 'General';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(command);
    return acc;
  }, {} as Record<string, CommandItem[]>);
  
  // Handle keyboard shortcuts to open command palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open command palette on Meta+K (Cmd+K on Mac, Ctrl+K on Windows)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === shortcut.toLowerCase()) {
        e.preventDefault();
        setIsOpen(true);
      }
      
      // Close command palette on Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setSearchQuery('');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, shortcut]);
  
  // Focus input when command palette opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);
  
  // Handle keyboard navigation within command list
  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    const commandCount = filteredCommands.length;
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex + 1) % commandCount);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prevIndex) => (prevIndex - 1 + commandCount) % commandCount);
    } else if (e.key === 'Enter' && filteredCommands[activeIndex]) {
      e.preventDefault();
      executeCommand(filteredCommands[activeIndex]);
    }
    
    // Scroll active item into view
    const activeItem = commandListRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest' });
    }
  };
  
  const executeCommand = (command: CommandItem) => {
    setIsOpen(false);
    setSearchQuery('');
    command.action();
  };
  
  if (!isOpen) {
    return (
      <button 
        className="fixed right-5 bottom-5 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-dark transition-colors z-50"
        onClick={() => setIsOpen(true)}
        aria-label="Open command palette"
      >
        <CommandLineIcon className="w-5 h-5" />
      </button>
    );
  }
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-200"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Command Palette Modal */}
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50">
        <div className="bg-background border border-primary/10 rounded-lg shadow-2xl overflow-hidden transform transition-all duration-200 animate-fade-in">
          {/* Search input */}
          <div className="relative border-b border-primary/10">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
            <input
              ref={inputRef}
              type="text"
              placeholder={placeholder}
              className="w-full py-4 pl-12 pr-4 bg-transparent focus:outline-none text-foreground"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveIndex(0);
              }}
              onKeyDown={handleKeyNavigation}
            />
            <kbd className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 bg-secondary px-2 py-1 rounded text-xs font-mono items-center gap-1">
              <span>⌘</span>
              <span>K</span>
            </kbd>
          </div>
          
          {/* Command list */}
          <div 
            ref={commandListRef} 
            className="max-h-80 overflow-y-auto py-2 command-scroll"
          >
            {Object.keys(groupedCommands).length > 0 ? (
              Object.entries(groupedCommands).map(([section, sectionCommands]) => (
                <div key={section} className="px-1 mb-2">
                  <h3 className="text-xs text-foreground/50 font-medium px-3 py-1">{section}</h3>
                  {sectionCommands.map((command) => {
                    const commandIndex = filteredCommands.findIndex(c => c.id === command.id);
                    const isActive = commandIndex === activeIndex;
                    
                    return (
                      <div
                        key={command.id}
                        data-index={commandIndex}
                        className={`px-3 py-2 mx-1 flex items-center justify-between rounded-md cursor-pointer transition-colors ${
                          isActive ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                        }`}
                        onClick={() => executeCommand(command)}
                        onMouseEnter={() => setActiveIndex(commandIndex)}
                      >
                        <div className="flex items-center gap-3">
                          {command.icon || <CommandLineIcon className="w-4 h-4" />}
                          <span className={isActive ? 'font-medium' : ''}>{command.name}</span>
                        </div>
                        {command.shortcut && (
                          <div className="flex items-center gap-1">
                            {command.shortcut.map((key, i) => (
                              <React.Fragment key={i}>
                                <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs font-mono">{key}</kbd>
                                {i < command.shortcut!.length - 1 && <span>+</span>}
                              </React.Fragment>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))
            ) : (
              <div className="px-3 py-10 text-center text-foreground/50">
                No commands found
              </div>
            )}
          </div>
          
          {/* Footer */}
          <div className="border-t border-primary/10 px-3 py-2 text-xs text-foreground/50 flex justify-between">
            <div className="flex gap-3">
              <span className="flex items-center gap-1">
                <span>↑</span><span>↓</span> <span>to navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <span>↵</span> <span>to select</span>
              </span>
            </div>
            <button 
              className="hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommandPalette;
