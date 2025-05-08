'use client';

import { useState, useEffect } from 'react';
import { CheckIcon, PlayIcon, ArrowPathIcon } from '@heroicons/react/24/solid';

interface CodePlaygroundProps {
  initialCode?: string;
  language?: string;
  theme?: 'dark' | 'light';
  readOnly?: boolean;
}

const CodePlayground: React.FC<CodePlaygroundProps> = ({
  initialCode = `import { useState } from 'frontend-hamroun';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}`,
  theme = 'dark',
  readOnly = false,
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Mock code execution
  const runCode = () => {
    setIsRunning(true);
    setOutput(null);
    
    // Simulate code execution with a delay
    setTimeout(() => {
      setOutput("✅ Component rendered successfully!\n\nPreview:\n<Counter />\n\n[Interactive counter with increment/decrement buttons]");
      setIsRunning(false);
    }, 1200);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput(null);
  };

  useEffect(() => {
    // Add syntax highlighting when the component mounts
    // This is a placeholder - in a real implementation, you'd use a library like Prism.js
    // Here we're just simulating the initial code execution
    runCode();
  }, []);

  const bgColor = theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-gray-50';
  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-800';

  return (
    <div className="rounded-lg overflow-hidden border border-primary/10 shadow-lg">
      {/* Header with controls */}
      <div className="bg-black/80 text-white p-2 flex items-center justify-between">
        <div className="flex items-center space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-2 text-sm opacity-70">playground.jsx</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={copyCode}
            className="p-1 rounded hover:bg-gray-700 text-xs flex items-center gap-1"
            title="Copy code"
          >
            {isCopied ? (
              <>
                <CheckIcon className="w-4 h-4" />
                <span>Copied!</span>
              </>
            ) : (
              <span>Copy</span>
            )}
          </button>
          
          <button
            onClick={resetCode}
            className="p-1 rounded hover:bg-gray-700 text-xs flex items-center gap-1"
            title="Reset code"
            disabled={isRunning}
          >
            <ArrowPathIcon className="w-4 h-4" />
            <span>Reset</span>
          </button>
          
          <button
            onClick={runCode}
            className={`p-1 rounded ${isRunning ? 'bg-primary/50' : 'bg-primary hover:bg-primary/90'} text-xs flex items-center gap-1`}
            disabled={isRunning}
          >
            <PlayIcon className="w-4 h-4" />
            <span>{isRunning ? 'Running...' : 'Run'}</span>
          </button>
        </div>
      </div>
      
      {/* Code editor */}
      <div className={`${bgColor} ${textColor}`}>
        <textarea
          className={`w-full p-4 font-mono text-sm ${bgColor} ${textColor} focus:outline-none`}
          value={code}
          onChange={e => setCode(e.target.value)}
          rows={10}
          readOnly={readOnly}
        />
      </div>
      
      {/* Output section */}
      {output && (
        <div className="border-t border-gray-700">
          <div className="bg-black/90 text-white p-2 text-xs">
            Output
          </div>
          <pre className="p-4 text-green-400 bg-black font-mono text-sm whitespace-pre-wrap">
            {output}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CodePlayground;
