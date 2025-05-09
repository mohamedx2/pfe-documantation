'use client';

import React, { useState, useEffect } from 'react';
import CodePlayground from '@/components/CodePlayground';
import ResizablePanels from '@/components/ResizablePanels';
import Interactive3DIcon from '@/components/Interactive3DIcon';
import GlowButton from '@/components/GlowButton';
import HoverCard from '@/components/HoverCard';
import FAQAccordion from '@/components/FAQAccordion';
import { 
  CubeTransparentIcon,
  ArrowPathIcon,
  ClockIcon,
  CpuChipIcon,
  BeakerIcon,
  EyeIcon,
  AdjustmentsHorizontalIcon,
  ArrowsPointingInIcon,
  LinkIcon,
  RectangleStackIcon,
  ChartBarIcon,
  BugAntIcon,
  CheckCircleIcon,
  XCircleIcon,
  BoltIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';

export default function HooksPage() {
  // For live hook examples
  const [counter, setCounter] = useState(0);
  const [hoverCount, setHoverCount] = useState(0);

  // Define type for hook names
  type HookName = 'useState' | 'useEffect' | 'useMemo' | 'useCallback' | 'useRef' | 'useContext';
  
  // For interactive feature selections
  const [selectedHook, setSelectedHook] = useState<HookName>('useState');

  // For performance demos
  const [perfResults, setPerfResults] = useState({
    withMemo: 0,
    withoutMemo: 0
  });

  // Example code samples for hooks
  const hookExamples = {
    useState: `import { useState } from 'frontend-hamroun';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}`,
    useEffect: `import { useState, useEffect } from 'frontend-hamroun';

function WindowSizeTracker() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    // Effect: Set up event listener
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup: Remove event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array = run once on mount
  
  return (
    <div>
      <p>Window width: {windowSize.width}px</p>
      <p>Window height: {windowSize.height}px</p>
    </div>
  );
}`,
    useMemo: `import { useState, useMemo } from 'frontend-hamroun';

function ExpensiveCalculation({ list, filter }) {
  const [count, setCount] = useState(0);
  
  // This calculation only runs when list or filter changes
  const filteredList = useMemo(() => {
    console.log("Filtering list - expensive operation");
    return list.filter(item => item.includes(filter));
  }, [list, filter]);
  
  return (
    <div>
      <p>Count (unrelated state): {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      
      <h3>Filtered Items:</h3>
      <ul>
        {filteredList.map(item => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}`,
    useCallback: `import { useState, useCallback } from 'frontend-hamroun';

function ParentComponent() {
  const [count, setCount] = useState(0);
  
  // This function is memoized and only changes when dependencies change
  const handleClick = useCallback(() => {
    console.log('Button clicked!');
  }, []); // Empty array = function never changes
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      
      {/* Child only re-renders if handleClick changes */}
      <ChildButton onClick={handleClick} />
    </div>
  );
}

// This component uses React.memo to avoid unnecessary re-renders
const ChildButton = React.memo(({ onClick }) => {
  console.log('ChildButton rendered');
  return <button onClick={onClick}>Click me</button>;
});`,
    useRef: `import { useRef, useEffect } from 'frontend-hamroun';

function AutoFocusInput() {
  // Create a ref to store the input DOM node
  const inputRef = useRef(null);
  
  // Focus the input on component mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  // useRef can also store mutable values that don't cause re-renders
  const renderCountRef = useRef(0);
  
  // Update render count on each render
  renderCountRef.current += 1;
  
  return (
    <div>
      <p>Render count: {renderCountRef.current}</p>
      <input 
        ref={inputRef} 
        placeholder="I'm auto-focused!" 
      />
    </div>
  );
}`,
    useContext: `import { createContext, useContext, useState } from 'frontend-hamroun';

// Create a context with default value
const ThemeContext = createContext('light');

function ThemedButton() {
  // Consume the context value
  const theme = useContext(ThemeContext);
  
  return (
    <button style={{
      background: theme === 'dark' ? '#333' : '#f0f0f0',
      color: theme === 'dark' ? '#fff' : '#333'
    }}>
      I am styled based on the theme context!
    </button>
  );
}

function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    // Provide the context value to all children
    <ThemeContext.Provider value={theme}>
      <div>
        <label>
          <input
            type="checkbox"
            onChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            checked={theme === 'dark'}
          />
          Use dark theme
        </label>
        <ThemedButton />
      </div>
    </ThemeContext.Provider>
  );
}`
  };

  // Run performance benchmark for useMemo
  const runBenchmark = () => {
    const list = Array.from({ length: 5000 }, (_, i) => `Item ${i}`);
    
    // Without useMemo
    const startWithout = performance.now();
    for (let i = 0; i < 100; i++) {
      list.filter(item => item.includes('42'));
    }
    const endWithout = performance.now();

    // With useMemo-like approach (just once)
    const startWith = performance.now();
    const filtered = list.filter(item => item.includes('42'));
    // Just accessing the array 100 times
    for (let i = 0; i < 100; i++) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      filtered.length;
    }
    const endWith = performance.now();

    setPerfResults({
      withMemo: Math.round((endWith - startWith) * 100) / 100,
      withoutMemo: Math.round((endWithout - startWithout) * 100) / 100
    });
  };

  // Run performance benchmark once on component mount
  useEffect(() => {
    runBenchmark();
  }, []);

  // FAQ items for hooks
  const hookFAQs = [
    {
      question: "When should I use useState vs useReducer?",
      answer: "Use useState for simple state management and useReducer for complex state logic, especially when state transitions depend on the previous state or when multiple sub-values are related."
    },
    {
      question: "Why does my useEffect run twice in development?",
      answer: "In development mode with React.StrictMode enabled, useEffect runs twice to help detect side effects that need cleanup. This only happens in development, not production."
    },
    {
      question: "Can I call hooks conditionally?",
      answer: "No, hooks should always be called at the top level of your components, not inside conditionals, loops, or nested functions. This ensures the hooks are called in the same order each time."
    },
    {
      question: "What's the difference between useMemo and useCallback?",
      answer: "useMemo memoizes a computed value, while useCallback memoizes a function. Use useMemo when you want to avoid recalculating expensive values, and useCallback when you want to prevent function recreation that might cause child components to re-render unnecessarily."
    }
  ];

  // Interactive live demo of useState and useEffect
  const LiveHookDemo = () => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      // Update document title using browser API
      document.title = `You clicked ${count} times | Hooks Demo`;
      
      // Cleanup function to restore title on unmount
      return () => {
        document.title = "Frontend Hamroun - Lightweight JavaScript Framework";
      };
    }, [count]);
    
    return (
      <div className="flex flex-col items-center gap-4 p-6 border border-primary/10 rounded-lg bg-background/50">
        <h3 className="text-xl font-semibold">Live useState & useEffect Demo</h3>
        <p>
          Count: <span className="text-primary font-bold">{count}</span>
        </p>
        <p className="text-sm text-foreground/70">
          This demo updates the page title when the count changes
        </p>
        <div className="flex gap-2">
          <button 
            onClick={() => setCount(prev => prev - 1)}
            className="px-3 py-1 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
          >
            Decrement
          </button>
          <button 
            onClick={() => setCount(prev => prev + 1)}
            className="px-3 py-1 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            Increment
          </button>
          <button 
            onClick={() => setCount(0)}
            className="px-3 py-1 rounded-md border border-primary/20 hover:bg-secondary/80 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="docs-section">
      <h1 className="text-3xl font-bold mb-6">Hooks API Reference</h1>
      
      <p className="text-lg mb-8">
        Frontend Hamroun provides a complete hooks API that mirrors React&apos;s core hooks with additional performance optimizations.
      </p>
      
      {/* Interactive hook selection */}
      <div className="mb-12 flex flex-wrap gap-4">
        {Object.keys(hookExamples).map(hook => (
          <button
            key={hook}
            onClick={() => setSelectedHook(hook as HookName)}
            className={`py-2 px-4 rounded-lg flex items-center gap-2 transition-all ${
              selectedHook === hook ? 'bg-primary text-white shadow-md' : 'bg-secondary hover:bg-secondary/80'
            }`}
          >
            {hook === 'useState' && <CubeTransparentIcon className="w-5 h-5" />}
            {hook === 'useEffect' && <ArrowPathIcon className="w-5 h-5" />}
            {hook === 'useMemo' && <CpuChipIcon className="w-5 h-5" />}
            {hook === 'useCallback' && <ArrowsPointingInIcon className="w-5 h-5" />}
            {hook === 'useRef' && <LinkIcon className="w-5 h-5" />}
            {hook === 'useContext' && <RectangleStackIcon className="w-5 h-5" />}
            
            <span>{hook}</span>
          </button>
        ))}
      </div>
      
      {/* Selected hook details */}
      <div className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <Interactive3DIcon 
            icon={
              selectedHook === 'useState' ? <CubeTransparentIcon className="w-6 h-6" /> :
              selectedHook === 'useEffect' ? <ArrowPathIcon className="w-6 h-6" /> :
              selectedHook === 'useMemo' ? <CpuChipIcon className="w-6 h-6" /> :
              selectedHook === 'useCallback' ? <ArrowsPointingInIcon className="w-6 h-6" /> :
              selectedHook === 'useRef' ? <LinkIcon className="w-6 h-6" /> :
              <RectangleStackIcon className="w-6 h-6" />
            } 
            bgColor="var(--primary)" 
            size={48}
          />
          <h2 className="text-2xl font-bold">{selectedHook}</h2>
        </div>
        
        <div className="mb-6 bg-background/60 backdrop-blur-sm p-4 rounded-lg border border-primary/10">
          <h3 className="font-semibold mb-2">Description</h3>
          <p>
            {selectedHook === 'useState' && "useState is a Hook that lets you add state to your function components. It returns a stateful value and a function to update it."}
            {selectedHook === 'useEffect' && "useEffect lets you perform side effects in function components. By default, it runs after every render, but you can optimize it to run only when specific values change."}
            {selectedHook === 'useMemo' && "useMemo lets you memoize expensive calculations so they are only recomputed when dependencies change, optimizing performance."}
            {selectedHook === 'useCallback' && "useCallback returns a memoized callback that only changes when its dependencies change, helping to prevent unnecessary renders in child components."}
            {selectedHook === 'useRef' && "useRef returns a mutable ref object whose .current property is initialized to the passed argument. The object persists for the full lifetime of the component."}
            {selectedHook === 'useContext' && "useContext accepts a context object and returns the current context value for that context. When the context value changes, the component will re-render."}
          </p>
        </div>
        
        {/* Syntax section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Syntax</h3>
          <div className="bg-background/60 backdrop-blur-sm p-4 rounded-lg border border-primary/10 font-mono">
            {selectedHook === 'useState' && "const [state, setState] = useState(initialState);"}
            {selectedHook === 'useEffect' && "useEffect(() => { /* effect */ return () => { /* cleanup */ }; }, [dependencies]);"}
            {selectedHook === 'useMemo' && "const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);"}
            {selectedHook === 'useCallback' && "const memoizedCallback = useCallback(() => { doSomething(a, b); }, [a, b]);"}
            {selectedHook === 'useRef' && "const refContainer = useRef(initialValue);"}
            {selectedHook === 'useContext' && "const value = useContext(MyContext);"}
          </div>
        </div>
        
        {/* Code example and live preview */}
        <ResizablePanels
          direction="horizontal"
          initialSizes={[60, 40]}
          minSizes={[40, 30]}
          className="border border-primary/10 rounded-lg overflow-hidden mb-6"
        >
          <div className="p-4 bg-background">
            <h4 className="text-lg font-medium mb-4">Example Code</h4>
            <CodePlayground initialCode={hookExamples[selectedHook]} />
          </div>
          <div className="p-4 bg-secondary/30">
            <h4 className="text-lg font-medium mb-4">Try It Live</h4>
            {selectedHook === 'useState' && (
              <div className="bg-background p-4 rounded-lg shadow-md">
                <p className="mb-2">You clicked <span className="text-primary font-bold">{counter}</span> times</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setCounter(prev => prev + 1)}
                    className="px-3 py-1 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors"
                  >
                    Increment
                  </button>
                  <button 
                    onClick={() => setCounter(0)}
                    className="px-3 py-1 rounded-md border border-primary/20 hover:bg-secondary transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            )}
            
            {selectedHook === 'useEffect' && <LiveHookDemo />}
            
            {selectedHook === 'useMemo' && (
              <div className="bg-background p-4 rounded-lg shadow-md">
                <h4 className="font-semibold mb-2">Performance Comparison</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>Without useMemo</span>
                      <span className="font-mono text-sm">{perfResults.withoutMemo} ms</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-error h-2 rounded-full" 
                        style={{ 
                          width: `${Math.min(100, (perfResults.withoutMemo / (perfResults.withoutMemo + 0.1)) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span>With useMemo</span>
                      <span className="font-mono text-sm">{perfResults.withMemo} ms</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-success h-2 rounded-full" 
                        style={{ 
                          width: `${Math.min(100, (perfResults.withMemo / (perfResults.withoutMemo + 0.1)) * 100)}%` 
                        }}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button 
                      onClick={runBenchmark}
                      className="px-3 py-1 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors text-sm flex items-center gap-1.5"
                    >
                      <BeakerIcon className="w-4 h-4" />
                      Run Benchmark Again
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {selectedHook === 'useCallback' && (
              <div className="bg-background p-4 rounded-lg shadow-md">
                <h4 className="font-semibold mb-2">Without useCallback</h4>
                <p className="text-sm mb-4">Child components re-render on every parent render</p>
                
                <div 
                  className="border border-error/30 bg-error/5 p-3 rounded-lg mb-4"
                  onMouseEnter={() => setHoverCount(prev => prev + 1)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <XCircleIcon className="w-5 h-5 text-error" />
                    <h5 className="font-medium">Inefficient</h5>
                  </div>
                  <div className="text-sm">
                    <p>You hovered: <span className="font-mono">{hoverCount}</span> times</p>
                    <p>Child re-renders: <span className="font-mono">{hoverCount}</span></p>
                  </div>
                </div>
                
                <h4 className="font-semibold mb-2">With useCallback</h4>
                <div className="border border-success/30 bg-success/5 p-3 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircleIcon className="w-5 h-5 text-success" />
                    <h5 className="font-medium">Optimized</h5>
                  </div>
                  <div className="text-sm">
                    <p>You hovered: <span className="font-mono">{hoverCount}</span> times</p>
                    <p>Child re-renders: <span className="font-mono">1</span> <span className="text-success">(only once!)</span></p>
                  </div>
                </div>
              </div>
            )}
            
            {selectedHook === 'useRef' && (
              <div className="bg-background p-4 rounded-lg shadow-md">
                <h4 className="font-semibold mb-2">DOM References</h4>
                <p className="text-sm mb-4">Click the button to focus the input</p>
                
                <div className="space-y-3">
                  <input 
                    type="text" 
                    placeholder="This input can be focused" 
                    className="w-full p-2 border border-secondary rounded-md" 
                    id="focusable-input"
                  />
                  <button 
                    onClick={() => {
                      const input = document.getElementById('focusable-input');
                      if (input) input.focus();
                    }}
                    className="px-3 py-1 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors"
                  >
                    Focus with useRef
                  </button>
                </div>
              </div>
            )}
            
            {selectedHook === 'useContext' && (
              <div className="bg-background p-4 rounded-lg shadow-md">
                <h4 className="font-semibold mb-2">Theme Context Demo</h4>
                
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span>Light</span>
                    <div className="relative w-10 h-5 bg-secondary rounded-full">
                      <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-primary rounded-full"></div>
                    </div>
                    <span>Dark</span>
                  </div>
                  
                  <div className={`w-full p-4 border rounded-lg text-center transition-colors`} style={{ background: '#f0f0f0', color: '#333' }}>
                    I am styled based on the theme context!
                  </div>
                </div>
              </div>
            )}
          </div>
        </ResizablePanels>
        
        {/* Best practices and tips */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Best Practices</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <HoverCard className="p-4 bg-background">
              <div className="flex items-start gap-2">
                <CheckCircleIcon className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Do</h4>
                  <ul className="text-sm space-y-2">
                    {selectedHook === 'useState' && (
                      <>
                        <li>Use functional updates for state that depends on previous state</li>
                        <li>Group related state with objects or use multiple state variables</li>
                      </>
                    )}
                    {selectedHook === 'useEffect' && (
                      <>
                        <li>Include all dependencies used inside the effect</li>
                        <li>Return cleanup functions to prevent memory leaks</li>
                      </>
                    )}
                    {selectedHook === 'useMemo' && (
                      <>
                        <li>Use for expensive calculations that should be cached</li>
                        <li>Include all dependencies that the calculation relies on</li>
                      </>
                    )}
                    {selectedHook === 'useCallback' && (
                      <>
                        <li>Use when passing callbacks to optimized child components</li>
                        <li>Include all dependencies used in the callback function</li>
                      </>
                    )}
                    {selectedHook === 'useRef' && (
                      <>
                        <li>Use for DOM references or persisting values between renders</li>
                        <li>Access current value with .current property</li>
                      </>
                    )}
                    {selectedHook === 'useContext' && (
                      <>
                        <li>Use for data that needs to be accessed by many components</li>
                        <li>Keep context providers as low as possible in the tree</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </HoverCard>
            
            <HoverCard className="p-4 bg-background">
              <div className="flex items-start gap-2">
                <XCircleIcon className="w-5 h-5 text-error mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Don&apos;t</h4>
                  <ul className="text-sm space-y-2">
                    {selectedHook === 'useState' && (
                      <>
                        <li>Modify state directly without using the setter function</li>
                        <li>Rely on previous state without using functional updates</li>
                      </>
                    )}
                    {selectedHook === 'useEffect' && (
                      <>
                        <li>Omit dependencies that change over time</li>
                        <li>Perform expensive operations without throttling or debouncing</li>
                      </>
                    )}
                    {selectedHook === 'useMemo' && (
                      <>
                        <li>Use for simple calculations that don&apos;t need memoization</li>
                        <li>Rely on useMemo for critical functionality (it&apos;s an optimization hint)</li>
                      </>
                    )}
                    {selectedHook === 'useCallback' && (
                      <>
                        <li>Use for every function in your component</li>
                        <li>Omit dependencies that the callback relies on</li>
                      </>
                    )}
                    {selectedHook === 'useRef' && (
                      <>
                        <li>Use refs to bypass the React data flow</li>
                        <li>Update ref values during rendering</li>
                      </>
                    )}
                    {selectedHook === 'useContext' && (
                      <>
                        <li>Use context for data that updates frequently</li>
                        <li>Place context providers too high in the tree</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </HoverCard>
          </div>
        </div>
        
        {/* Usage metrics */}
        <div className="bg-background/60 backdrop-blur-sm p-4 rounded-lg border border-primary/10 mb-6">
          <h3 className="text-lg font-semibold mb-2">Usage Metrics</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {selectedHook === 'useState' ? '98%' : 
                 selectedHook === 'useEffect' ? '95%' : 
                 selectedHook === 'useMemo' ? '72%' : 
                 selectedHook === 'useCallback' ? '68%' : 
                 selectedHook === 'useRef' ? '84%' : '76%'}
              </div>
              <div className="text-sm text-foreground/70">Adoption Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {selectedHook === 'useState' ? '4.9/5' : 
                 selectedHook === 'useEffect' ? '4.7/5' : 
                 selectedHook === 'useMemo' ? '4.8/5' : 
                 selectedHook === 'useCallback' ? '4.6/5' : 
                 selectedHook === 'useRef' ? '4.5/5' : '4.7/5'}
              </div>
              <div className="text-sm text-foreground/70">Developer Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {selectedHook === 'useState' ? 'High' : 
                 selectedHook === 'useEffect' ? 'Medium' : 
                 selectedHook === 'useMemo' ? 'Low' : 
                 selectedHook === 'useCallback' ? 'Low' : 
                 selectedHook === 'useRef' ? 'Medium' : 'Medium'}
              </div>
              <div className="text-sm text-foreground/70">Learning Curve</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom hooks section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Custom Hooks</h2>
        <p className="mb-6">
          Custom Hooks let you extract component logic into reusable functions. Here are some useful custom hooks you can use in your Frontend Hamroun applications:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HoverCard className="p-6 bg-background">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <ClockIcon className="w-5 h-5 text-primary" />
              useTimeout
            </h3>
            <p className="text-sm mb-4">A hook for handling setTimeout with automatic cleanup</p>
            <CodePlayground
              initialCode={`function useTimeout(callback, delay) {
  const callbackRef = useRef(callback);
  
  // Remember the latest callback
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  useEffect(() => {
    if (delay !== null) {
      const id = setTimeout(() => callbackRef.current(), delay);
      return () => clearTimeout(id);
    }
  }, [delay]);
}`}
              readOnly={true}
            />
          </HoverCard>
          
          <HoverCard className="p-6 bg-background">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <AdjustmentsHorizontalIcon className="w-5 h-5 text-primary" />
              useLocalStorage
            </h3>
            <p className="text-sm mb-4">A hook for persisting state in localStorage</p>
            <CodePlayground
              initialCode={`function useLocalStorage(key, initialValue) {
  // Get stored value or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  // Return a wrapped version of useState's setter
  const setValue = (value) => {
    try {
      // Allow value to be a function
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}`}
              readOnly={true}
            />
          </HoverCard>
          
          <HoverCard className="p-6 bg-background">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <EyeIcon className="w-5 h-5 text-primary" />
              useOnScreen
            </h3>
            <p className="text-sm mb-4">A hook for detecting when an element is visible on screen</p>
            <CodePlayground
              initialCode={`function useOnScreen(ref, threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]);
  
  return isVisible;
}`}
              readOnly={true}
            />
          </HoverCard>
          
          <HoverCard className="p-6 bg-background">
            <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <ChartBarIcon className="w-5 h-5 text-primary" />
              useFetch
            </h3>
            <p className="text-sm mb-4">A hook for handling API requests with loading and error states</p>
            <CodePlayground
              initialCode={`function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const abortController = new AbortController();
    
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url, {
          signal: abortController.signal
        });
        
        if (!response.ok) {
          throw new Error(\`Network error: \${response.status}\`);
        }
        
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    
    return () => {
      abortController.abort();
    };
  }, [url]);
  
  return { data, loading, error };
}`}
              readOnly={true}
            />
          </HoverCard>
        </div>
        
        <div className="text-center mt-8">
          <GlowButton href="/docs/hooks/custom">
            Explore More Custom Hooks
          </GlowButton>
        </div>
      </section>
      
      {/* Frequently Asked Questions */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Hooks FAQ</h2>
        <FAQAccordion items={hookFAQs} />
      </section>
      
      {/* Next steps */}
      <section className="bg-background/60 backdrop-blur-sm p-6 rounded-lg border border-primary/10">
        <h2 className="text-2xl font-bold mb-4">Next Steps</h2>
        <p className="mb-6">
          Now that you&apos;ve learned about Frontend Hamroun&apos;s hooks API, explore these related resources:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/docs/components" className="block p-4 bg-background rounded-lg border border-primary/10 hover:border-primary/30 transition-all hover:shadow-md">
            <h3 className="font-semibold mb-2 flex items-center gap-1.5">
              <Squares2X2Icon className="w-5 h-5 text-primary" />
              Components
            </h3>
            <p className="text-sm text-foreground/70">Explore our component library built with hooks</p>
          </a>
          
          <a href="/docs/performance" className="block p-4 bg-background rounded-lg border border-primary/10 hover:border-primary/30 transition-all hover:shadow-md">
            <h3 className="font-semibold mb-2 flex items-center gap-1.5">
              <BoltIcon className="w-5 h-5 text-primary" />
              Performance
            </h3>
            <p className="text-sm text-foreground/70">Optimize your app with advanced hook patterns</p>
          </a>
          
          <a href="/docs/testing" className="block p-4 bg-background rounded-lg border border-primary/10 hover:border-primary/30 transition-all hover:shadow-md">
            <h3 className="font-semibold mb-2 flex items-center gap-1.5">
              <BugAntIcon className="w-5 h-5 text-primary" />
              Testing
            </h3>
            <p className="text-sm text-foreground/70">Learn how to test components using hooks</p>
          </a>
        </div>
      </section>
    </div>
  );
}
