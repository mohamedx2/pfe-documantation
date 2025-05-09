'use client';

import React, { useState } from 'react';
import { ClipboardDocumentIcon, CheckIcon } from '@heroicons/react/24/outline';

interface SyntaxHighlighterProps {
  code: string;
  language?: string;
  fileName?: string;
  lineNumbers?: boolean;
  highlightLines?: number[];
  maxHeight?: string;
  className?: string;
  copyable?: boolean;
}

const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  code,
  language = 'javascript',
  fileName,
  lineNumbers = true,
  highlightLines = [],
  maxHeight = '600px',
  className = '',
  copyable = true,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  // Generate line numbers
  const codeLines = code.split('\n');
  const lineCount = codeLines.length;
  const lineDigits = lineCount.toString().length;

  // Calculate padding for line numbers based on the number of digits
  const lineNumberWidth = Math.max(lineDigits * 14, 30);

  return (
    <div className={`syntax-highlighter relative overflow-hidden rounded-lg shadow-md border border-primary/10 ${className}`}>
      {/* Header with language label and filename */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1e1e1e] border-b border-gray-700">
        {/* Left side with file info */}
        <div className="flex items-center">
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="ml-4 flex items-center">
            <span className="text-xs font-medium text-gray-400 mr-3 uppercase">{language}</span>
            {fileName && (
              <span className="text-sm text-white opacity-70">{fileName}</span>
            )}
          </div>
        </div>
        
        {/* Right side with copy button */}
        {copyable && (
          <button 
            onClick={handleCopyCode} 
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5 text-sm py-1 px-2 rounded hover:bg-white/10"
            title="Copy code"
          >
            {copied ? (
              <>
                <CheckIcon className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <ClipboardDocumentIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>
        )}
      </div>
      
      {/* Code container */}
      <div className="overflow-auto bg-[#1e1e1e] text-white" style={{ maxHeight }}>
        <div className="flex min-w-full">
          {/* Line numbers column */}
          {lineNumbers && (
            <div 
              className="text-right py-4 select-none bg-[#2d2d2d] border-r border-gray-700"
              style={{ minWidth: `${lineNumberWidth}px` }}
            >
              {codeLines.map((_, i) => (
                <div 
                  key={i} 
                  className="px-3 text-gray-500 text-xs"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          )}
          
          {/* Code content */}
          <div className="py-4 pl-4 pr-8 overflow-visible w-full">
            <pre className="font-mono text-sm">
              <code>
                {codeLines.map((line, i) => (
                  <div 
                    key={i} 
                    className={`${
                      highlightLines.includes(i + 1) ? 'bg-primary/10 -mx-4 px-4' : ''
                    }`}
                  >
                    {line || '\n'}
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
      
      {/* Status bar */}
      <div className="px-4 py-1.5 bg-[#2d2d2d] text-gray-400 text-xs flex justify-between border-t border-gray-700">
        <span>{lineCount} lines</span>
        <span>{language.charAt(0).toUpperCase() + language.slice(1)}</span>
      </div>
    </div>
  );
};

export default SyntaxHighlighter;
