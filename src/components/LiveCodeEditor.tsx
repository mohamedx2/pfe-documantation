'use client';

import React, { useState, useEffect } from 'react';
import { PlayIcon, InformationCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useTheme } from './ThemeProvider';

interface LiveCodeEditorProps {
  initialCode: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scope?: Record<string, any>;
  language?: string;
  showPreview?: boolean;
  autoRun?: boolean;
  height?: string;
  className?: string;
  previewClassName?: string;
  readOnly?: boolean;
}

const LiveCodeEditor: React.FC<LiveCodeEditorProps> = ({
  initialCode,
  language = 'jsx',
  showPreview = true,
  autoRun = false,
  height = '300px',
  className = '',
  previewClassName = '',
  readOnly = false,
}) => {
  const [code, setCode] = useState<string>(initialCode);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [output, setOutput] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasModified, setHasModified] = useState<boolean>(false);
  const { theme } = useTheme();
  
  // Handle code execution
  const executeCode = () => {
    setIsRunning(true);
    setError(null);
    
    try {
      // This is just a simulation - in a real implementation, 
      // you'd use something like react-live to execute the code
      setTimeout(() => {
        setIsRunning(false);
        setOutput(<div>
          <div className="counter">
            <h2 className="text-2xl font-bold mb-4">Count: 0</h2>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded-md bg-primary/80 text-white">-</button>
              <button className="px-3 py-1 rounded-md bg-primary text-white">+</button>
            </div>
          </div>
        </div>);
      }, 500);
    } catch (err) {
      setIsRunning(false);
      setError(err instanceof Error ? err.message : String(err));
    }
  };
  
  // Auto-run on first load if enabled
  useEffect(() => {
    if (autoRun) {
      executeCode();
    }
  }, [autoRun]);
  
  // Handle code change
  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    if (!hasModified) {
      setHasModified(true);
    }
  };
  
  // Reset code to initial state
  const resetCode = () => {
    setCode(initialCode);
    setHasModified(false);
  };
  
  return (
    <div className={`live-code-editor grid grid-cols-1 ${showPreview ? 'md:grid-cols-2' : ''} border border-primary/10 rounded-lg overflow-hidden ${className}`}>
      {/* Editor panel */}
      <div className="border-r border-primary/10">
        {/* Editor header */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e1e] border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-gray-400 text-xs md:text-sm ml-2">Editor</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={executeCode}
              disabled={isRunning}
              className="flex items-center space-x-1 px-3 py-1 text-xs bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
              title="Run code"
            >
              {isRunning ? (
                <>
                  <ArrowPathIcon className="w-3 h-3 animate-spin" />
                  <span>Running</span>
                </>
              ) : (
                <>
                  <PlayIcon className="w-3 h-3" />
                  <span>Run</span>
                </>
              )}
            </button>
            
            {hasModified && (
              <button
                onClick={resetCode}
                className="flex items-center space-x-1 px-3 py-1 text-xs bg-secondary text-foreground rounded-md hover:bg-secondary/80 transition-colors"
                title="Reset to initial code"
              >
                <ArrowPathIcon className="w-3 h-3" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>
        
        {/* Editor body */}
        <div className="relative" style={{ height }}>
          <textarea
            value={code}
            onChange={handleCodeChange}
            readOnly={readOnly}
            className="w-full h-full p-4 text-sm font-mono bg-[#1e1e1e] text-white focus:outline-none overflow-auto"
            spellCheck={false}
          />
          
          {/* Language indicator */}
          <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-black/50 px-2 py-0.5 rounded">
            {language}
          </div>
        </div>
      </div>
      
      {/* Preview panel */}
      {showPreview && (
        <div className="overflow-hidden bg-background">
          {/* Preview header */}
          <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 border-b border-primary/10">
            <span className="text-foreground/70 text-xs md:text-sm">Preview</span>
            
            {error ? (
              <span className="flex items-center text-red-500 text-xs">
                <XCircleIcon className="w-4 h-4 mr-1" />
                Error
              </span>
            ) : output ? (
              <span className="flex items-center text-green-500 text-xs">
                <CheckCircleIcon className="w-4 h-4 mr-1" />
                Success
              </span>
            ) : (
              <span className="flex items-center text-foreground/50 text-xs">
                <InformationCircleIcon className="w-4 h-4 mr-1" />
                Run to see output
              </span>
            )}
          </div>
          
          {/* Preview content */}
          <div 
            className={`overflow-auto p-4 ${previewClassName}`} 
            style={{ height, backgroundColor: theme === 'dark' ? '#1a1a1a' : '#f9f9f9' }}
          >
            {error ? (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-md text-red-500 text-sm">
                {error}
              </div>
            ) : output ? (
              output
            ) : (
              <div className="flex items-center justify-center h-full text-foreground/40">
                <p>Run the code to see the result</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveCodeEditor;
