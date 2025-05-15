'use client';

import React from 'react';
import Link from 'next/link';
import { 
  CommandLineIcon, 
  DocumentTextIcon,
  AcademicCapIcon,
  BoltIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  BookOpenIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import CodePlayground from '@/components/CodePlayground';
import GlowButton from '@/components/GlowButton';

export default function GettingStartedPage() {
  return (
    <div className="docs-section">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Getting Started with Frontend Hamroun</h1>
          <p className="text-xl text-foreground/70">
            Follow these simple steps to start building your application with Frontend Hamroun - the lightweight JavaScript framework with a focus on culture and community.
          </p>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <RocketLaunchIcon className="w-6 h-6 text-primary mr-2" />
            Quick Start
          </h2>
          
          <div className="steps-container">
            <div className="step p-4 bg-background rounded-lg border border-primary/10 mb-4 hover:border-primary/30 transition-all">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-4">1</div>
                <div>
                  <h3 className="font-medium mb-2">Install the Frontend Hamroun CLI</h3>
                  <div className="code-block overflow-hidden rounded-lg mb-3">
                    <div className="bg-black/80 text-white p-2 flex items-center">
                      <CommandLineIcon className="w-5 h-5 mr-2" />
                      <span>Terminal</span>
                      <button 
                        className="ml-auto px-2 py-1 text-xs bg-primary/20 hover:bg-primary/30 rounded text-primary"
                        onClick={() => navigator.clipboard.writeText("npm install -g frontend-hamroun-cli")}
                      >
                        Copy
                      </button>
                    </div>
                    <pre className="bg-black text-green-400 p-3 overflow-x-auto font-mono text-sm">
                      <code>npm install -g frontend-hamroun-cli</code>
                    </pre>
                  </div>
                  <p className="text-sm text-foreground/70">
                    This installs the Frontend Hamroun command-line interface globally on your machine.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="step p-4 bg-background rounded-lg border border-primary/10 mb-4 hover:border-primary/30 transition-all">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-4">2</div>
                <div>
                  <h3 className="font-medium mb-2">Create a new project</h3>
                  <div className="code-block overflow-hidden rounded-lg mb-3">
                    <div className="bg-black/80 text-white p-2 flex items-center">
                      <CommandLineIcon className="w-5 h-5 mr-2" />
                      <span>Terminal</span>
                      <button 
                        className="ml-auto px-2 py-1 text-xs bg-primary/20 hover:bg-primary/30 rounded text-primary"
                        onClick={() => navigator.clipboard.writeText("npx create-frontend-app my-app")}
                      >
                        Copy
                      </button>
                    </div>
                    <pre className="bg-black text-green-400 p-3 overflow-x-auto font-mono text-sm">
                      <code>npx create-frontend-app my-app</code>
                    </pre>
                  </div>
                  <p className="text-sm text-foreground/70">
                    This creates a new Frontend Hamroun project in the <code className="text-primary">my-app</code> directory with all necessary configurations.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="step p-4 bg-background rounded-lg border border-primary/10 mb-4 hover:border-primary/30 transition-all">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-4">3</div>
                <div>
                  <h3 className="font-medium mb-2">Navigate to your project directory</h3>
                  <div className="code-block overflow-hidden rounded-lg mb-3">
                    <div className="bg-black/80 text-white p-2 flex items-center">
                      <CommandLineIcon className="w-5 h-5 mr-2" />
                      <span>Terminal</span>
                      <button 
                        className="ml-auto px-2 py-1 text-xs bg-primary/20 hover:bg-primary/30 rounded text-primary"
                        onClick={() => navigator.clipboard.writeText("cd my-app")}
                      >
                        Copy
                      </button>
                    </div>
                    <pre className="bg-black text-green-400 p-3 overflow-x-auto font-mono text-sm">
                      <code>cd my-app</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="step p-4 bg-background rounded-lg border border-primary/10 mb-4 hover:border-primary/30 transition-all">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-4">4</div>
                <div>
                  <h3 className="font-medium mb-2">Start the development server</h3>
                  <div className="code-block overflow-hidden rounded-lg mb-3">
                    <div className="bg-black/80 text-white p-2 flex items-center">
                      <CommandLineIcon className="w-5 h-5 mr-2" />
                      <span>Terminal</span>
                      <button 
                        className="ml-auto px-2 py-1 text-xs bg-primary/20 hover:bg-primary/30 rounded text-primary"
                        onClick={() => navigator.clipboard.writeText("npm run dev")}
                      >
                        Copy
                      </button>
                    </div>
                    <pre className="bg-black text-green-400 p-3 overflow-x-auto font-mono text-sm">
                      <code>npm run dev</code>
                    </pre>
                  </div>
                  <p className="text-sm text-foreground/70">
                    This starts the development server. Open <code className="text-primary">http://localhost:3000</code> in your browser to see your application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <DocumentTextIcon className="w-6 h-6 text-primary mr-2" />
            Project Structure
          </h2>
          
          <div className="bg-background rounded-lg border border-primary/10 p-4 mb-6">
            <pre className="font-mono text-sm">
{`my-app/
├── node_modules/
├── public/
│   └── assets/
├── src/
│   ├── components/
│   │   ├── App.jsx
│   │   └── ...
│   ├── hooks/
│   │   └── ...
│   ├── utils/
│   │   └── ...
│   ├── styles/
│   │   └── ...
│   └── index.js
├── package.json
├── README.md
└── hamroun.config.js`}
            </pre>
          </div>
          
          <p className="mb-4">
            The project structure is organized to provide a clean separation of concerns:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li><strong>src/components/</strong>: UI components and views</li>
            <li><strong>src/hooks/</strong>: Custom hooks for shared logic</li>
            <li><strong>src/utils/</strong>: Utility functions and helpers</li>
            <li><strong>src/styles/</strong>: CSS and styling files</li>
            <li><strong>hamroun.config.js</strong>: Configuration file for your Frontend Hamroun application</li>
          </ul>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <AcademicCapIcon className="w-6 h-6 text-primary mr-2" />
            Basic Example
          </h2>
          
          <p className="mb-4">
            Here&apos;s a simple counter example to help you understand the basics:
          </p>
          
          <div className="mb-6">
            <div className="bg-black/80 text-white p-2 flex items-center rounded-t-lg">
              <DocumentTextIcon className="w-5 h-5 mr-2" />
              <span>Counter.jsx</span>
              <button 
                className="ml-auto px-2 py-1 text-xs bg-primary/20 hover:bg-primary/30 rounded text-primary"
                onClick={() => navigator.clipboard.writeText(`import { useState } from 'frontend-hamroun';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <div className="buttons">
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  );
}

export default Counter;`)}
              >
                Copy
              </button>
            </div>
            <CodePlayground
              initialCode={`import { useState } from 'frontend-hamroun';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <div className="buttons">
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  );
}

export default Counter;`}
              language="jsx"
                theme="dark"
            />
          </div>
          
          <p className="text-sm text-foreground/70 mb-6">
            This component uses the <code className="text-primary">useState</code> hook to manage state in a functional component.
            When the buttons are clicked, the state updates, causing the component to re-render.
          </p>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <BookOpenIcon className="w-6 h-6 text-primary mr-2" />
            Next Steps
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/docs/components" className="block p-6 bg-background rounded-lg border border-primary/10 hover:border-primary/30 transition-all">
              <h3 className="font-medium mb-2 flex items-center">
                Explore Components
                <ChevronRightIcon className="w-5 h-5 ml-1 text-primary" />
              </h3>
              <p className="text-sm text-foreground/70">
                Learn about the built-in components and how to use them in your application.
              </p>
            </Link>
            
            <Link href="/docs/hooks" className="block p-6 bg-background rounded-lg border border-primary/10 hover:border-primary/30 transition-all">
              <h3 className="font-medium mb-2 flex items-center">
                Hooks API
                <ChevronRightIcon className="w-5 h-5 ml-1 text-primary" />
              </h3>
              <p className="text-sm text-foreground/70">
                Understand the hooks system and how to manage state and side effects.
              </p>
            </Link>
            
            <Link href="/docs/styling" className="block p-6 bg-background rounded-lg border border-primary/10 hover:border-primary/30 transition-all">
              <h3 className="font-medium mb-2 flex items-center">
                Styling Guide
                <ChevronRightIcon className="w-5 h-5 ml-1 text-primary" />
              </h3>
              <p className="text-sm text-foreground/70">
                Learn how to style your components using the built-in styling system.
              </p>
            </Link>
            
            <Link href="/docs/ssr" className="block p-6 bg-background rounded-lg border border-primary/10 hover:border-primary/30 transition-all">
              <h3 className="font-medium mb-2 flex items-center">
                Server-Side Rendering
                <ChevronRightIcon className="w-5 h-5 ml-1 text-primary" />
              </h3>
              <p className="text-sm text-foreground/70">
                Discover how to use server components for optimal performance.
              </p>
            </Link>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <BoltIcon className="w-6 h-6 text-primary mr-2" />
            Tips & Tricks
          </h2>
          
          <div className="bg-primary/5 rounded-lg p-6 border border-primary/10">
            <ul className="space-y-3">
              <li className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-primary mr-2 mt-0.5" />
                <span>Use the dev server&apos;s hot module replacement for faster development.</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-primary mr-2 mt-0.5" />
                <span>Structure your components with a clear separation of concerns.</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-primary mr-2 mt-0.5" />
                <span>Leverage the built-in hooks for state management before reaching for external libraries.</span>
              </li>
              <li className="flex items-start">
                <CheckCircleIcon className="w-5 h-5 text-primary mr-2 mt-0.5" />
                <span>Explore the community plugins to extend functionality.</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="text-center">
          <GlowButton href="/docs/components" className="px-6 py-3 rounded-full">Continue to Components</GlowButton>
        </div>
      </div>
    </div>
  );
}
