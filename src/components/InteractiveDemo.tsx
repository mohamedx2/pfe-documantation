'use client';

import React, { useState, useEffect } from 'react';
import CodePlayground from './CodePlayground';
import HoverCard from './HoverCard';
import GlowButton from './GlowButton';
import { CheckCircleIcon, ArrowPathIcon, CodeBracketIcon, ServerIcon, BeakerIcon, CubeTransparentIcon } from '@heroicons/react/24/outline';
import { useTheme } from './ThemeProvider';

// Demo code examples for different features
const CODE_EXAMPLES = {
  basic: `import { useState } from 'frontend-hamroun';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count - 1)}>-</button>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}

export default Counter;`,
  hooks: `import { useState, useEffect, useMemo } from 'frontend-hamroun';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Effect hook for data fetching
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const response = await fetch(\`/api/users/\${userId}\`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    }
    
    fetchUser();
    return () => console.log('Cleanup');
  }, [userId]);
  
  // Memoized computed value
  const fullName = useMemo(() => {
    if (!user) return '';
    return \`\${user.firstName} \${user.lastName}\`;
  }, [user]);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div className="user-profile">
      <h2>{fullName}</h2>
      <p>{user.email}</p>
      <p>Member since: {new Date(user.joinDate).toLocaleDateString()}</p>
    </div>
  );
}`,
  context: `import { createContext, useContext, useState } from 'frontend-hamroun';

// Create theme context
const ThemeContext = createContext('light');

// Theme provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Component that consumes the context
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      onClick={toggleTheme}
      className={\`btn \${theme === 'dark' ? 'btn-dark' : 'btn-light'}\`}
    >
      Toggle Theme ({theme})
    </button>
  );
}`,
  ssr: `// server.js
import { renderToString } from 'frontend-hamroun/server';
import App from './App';

app.get('*', async (req, res) => {
  // Server-side rendering
  const html = await renderToString(<App url={req.url} />);
  
  res.send(\`
    <!DOCTYPE html>
    <html>
      <head>
        <title>SSR App</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <div id="root">\${html}</div>
        <script src="/client.js"></script>
      </body>
    </html>
  \`);
});

// client.js
import { hydrate } from 'frontend-hamroun';
import App from './App';

// Client-side hydration
hydrate(<App url={window.location.pathname} />, 
  document.getElementById('root')
);`,
  api: `// api/users.js
export async function get(req, res) {
  // Get all users
  const users = await req.db.collection('users').find().toArray();
  res.json(users);
}

export async function post(req, res) {
  // Validate request body
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ 
      error: 'Name and email are required' 
    });
  }
  
  // Create new user
  const result = await req.db.collection('users').insertOne({
    name,
    email,
    createdAt: new Date()
  });
  
  res.status(201).json(result);
}`,
  typescript: `// User.tsx
import { useState, useEffect } from 'frontend-hamroun';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

interface UserProfileProps {
  userId: number;
  showEmail?: boolean;
  onUpdate?: (user: User) => void;
}

function UserProfile({ 
  userId, 
  showEmail = true,
  onUpdate 
}: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    // Fetch user data
    async function fetchUser() {
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const data: User = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user", error);
        setLoading(false);
      }
    }
    
    fetchUser();
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
  
  return (
    <div className="user-profile">
      <h2>{user.name}</h2>
      {showEmail && <p>{user.email}</p>}
      <p>Role: {user.role}</p>
      {onUpdate && (
        <button onClick={() => onUpdate(user)}>
          Update Profile
        </button>
      )}
    </div>
  );
}`
};

// Demo feature tabs configuration
const FEATURE_TABS = [
  { id: 'basic', label: 'Basic Usage', icon: <CodeBracketIcon className="w-5 h-5" /> },
  { id: 'hooks', label: 'Hooks API', icon: <CubeTransparentIcon className="w-5 h-5" /> },
  { id: 'context', label: 'Context API', icon: <ArrowPathIcon className="w-5 h-5" /> },
  { id: 'ssr', label: 'Server-Side Rendering', icon: <ServerIcon className="w-5 h-5" /> },
  { id: 'api', label: 'API Routes', icon: <ServerIcon className="w-5 h-5" /> },
  { id: 'typescript', label: 'TypeScript', icon: <BeakerIcon className="w-5 h-5" /> }
];

interface InteractiveDemoProps {
  initialTab?: string;
  showEditor?: boolean;
  height?: number | string;
  className?: string;
}

const InteractiveDemo: React.FC<InteractiveDemoProps> = ({
  initialTab = 'basic',
  showEditor = true,
  height = 'auto',
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [codeEdited, setCodeEdited] = useState<boolean>(false);
  const { theme } = useTheme();

  // Get the current code example based on active tab
  const currentCode = CODE_EXAMPLES[activeTab as keyof typeof CODE_EXAMPLES] || CODE_EXAMPLES.basic;

  // Update the tab indicator position when tab changes
  useEffect(() => {
    // Delay to ensure the component is rendered
    const timeout = setTimeout(() => {
      const activeElement = document.getElementById(`tab-${activeTab}`);
      if (activeElement) {
        setIndicatorStyle({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth
        });
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [activeTab]);

  // Handle running the demo code
  const handleRunDemo = () => {
    setIsRunning(true);
    
    // Simulate code execution
    setTimeout(() => {
      setIsRunning(false);
      setShowResult(true);
    }, 1200);
  };

  // Reset demo code
  const handleResetDemo = () => {
    setCodeEdited(false);
    setShowResult(false);
  };

  return (
    <div className={`interactive-demo ${className}`} style={{ height }}>
      {/* Tab navigation */}
      <div className="relative border-b border-primary/10 mb-4 overflow-x-auto">
        <div className="flex items-center">
          {FEATURE_TABS.map(tab => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              className={`tab-button px-4 py-3 flex items-center gap-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id ? 'text-primary font-medium' : 'text-foreground/70 hover:text-primary/70'
              }`}
              onClick={() => {
                setActiveTab(tab.id);
                setCodeEdited(false);
                setShowResult(false);
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Active tab indicator */}
        <div 
          className="tab-indicator bg-primary h-0.5 absolute bottom-0 transition-all duration-300"
          style={{ left: `${indicatorStyle.left}px`, width: `${indicatorStyle.width}px` }}
        />
      </div>
      
      {/* Feature description */}
      <div className="mb-6">
        <HoverCard className="p-4 bg-background/50">
          {activeTab === 'basic' && (
            <div>
              <h3 className="text-lg font-bold mb-2">Basic Component Usage</h3>
              <p className="text-foreground/70">
                Create reactive UI components with state that automatically updates the DOM when data changes.
                This example shows a simple counter component using the useState hook.
              </p>
            </div>
          )}
          
          {activeTab === 'hooks' && (
            <div>
              <h3 className="text-lg font-bold mb-2">Hooks API</h3>
              <p className="text-foreground/70">
                Hooks let you use state and other Frontend Hamroun features without writing classes.
                This example demonstrates useState, useEffect, and useMemo hooks working together.
              </p>
            </div>
          )}
          
          {activeTab === 'context' && (
            <div>
              <h3 className="text-lg font-bold mb-2">Context API</h3>
              <p className="text-foreground/70">
                Context provides a way to pass data through the component tree without having to pass props down manually at every level.
                This example shows a theme provider and consumer.
              </p>
            </div>
          )}
          
          {activeTab === 'ssr' && (
            <div>
              <h3 className="text-lg font-bold mb-2">Server-Side Rendering</h3>
              <p className="text-foreground/70">
                Render your components on the server for improved performance, SEO, and user experience.
                Client-side hydration takes over to make the page fully interactive.
              </p>
            </div>
          )}
          
          {activeTab === 'api' && (
            <div>
              <h3 className="text-lg font-bold mb-2">API Routes</h3>
              <p className="text-foreground/70">
                Create API endpoints with simple exports for each HTTP method.
                Frontend Hamroun provides automatic routing based on your file structure.
              </p>
            </div>
          )}
          
          {activeTab === 'typescript' && (
            <div>
              <h3 className="text-lg font-bold mb-2">TypeScript Support</h3>
              <p className="text-foreground/70">
                Full type definitions for all APIs, including components, hooks, and server-side features.
                This example shows a typed component with props interface.
              </p>
            </div>
          )}
        </HoverCard>
      </div>
      
      {/* Code editor and preview */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <CodeBracketIcon className="w-5 h-5 mr-2 text-primary" />
            Code Example
          </h3>
          
          <CodePlayground
            initialCode={currentCode}
            theme={theme}
            readOnly={!showEditor}
          />
          
          <div className="mt-4 flex gap-4">
            <GlowButton
              onClick={handleRunDemo}
              disabled={isRunning}
              className="flex-1"
              glowRadius={60}
            >
              {isRunning ? (
                <>
                  <ArrowPathIcon className="w-5 h-5 animate-spin" />
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <CodeBracketIcon className="w-5 h-5" />
                  <span>Run Example</span>
                </>
              )}
            </GlowButton>
            
            {codeEdited && (
              <GlowButton
                onClick={handleResetDemo}
                variant="subtle"
              >
                <ArrowPathIcon className="w-5 h-5" />
                <span>Reset</span>
              </GlowButton>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <CheckCircleIcon className="w-5 h-5 mr-2 text-primary" />
            Result Preview
          </h3>
          
          <div className={`preview-container p-6 border border-primary/10 rounded-lg min-h-[300px] bg-background/50 ${
            showResult ? 'relative' : 'flex items-center justify-center text-foreground/50'
          }`}>
            {showResult ? (
              <div className="preview-content animate-fade-in">
                {activeTab === 'basic' && (
                  <div className="demo-counter">
                    <h2 className="text-2xl font-bold mb-4">Count: 0</h2>
                    <div className="flex items-center gap-4">
                      <button 
                        className="w-10 h-10 rounded-full bg-primary text-white font-bold"
                        onClick={() => {/* Interactive demo logic would go here */}}
                      >-</button>
                      <button 
                        className="w-10 h-10 rounded-full bg-primary text-white font-bold"
                        onClick={() => {/* Interactive demo logic would go here */}}
                      >+</button>
                    </div>
                  </div>
                )}
                
                {activeTab === 'hooks' && (
                  <div className="demo-user-profile">
                    <h2 className="text-2xl font-bold mb-2">John Doe</h2>
                    <p className="text-foreground/70 mb-2">john.doe@example.com</p>
                    <p className="text-foreground/70">Member since: 10/15/2022</p>
                  </div>
                )}
                
                {activeTab === 'context' && (
                  <div className="demo-theme-context">
                    <div className={`p-4 rounded-lg mb-4 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
                      <p>Current theme: <strong>{theme}</strong></p>
                    </div>
                    <button 
                      className="px-4 py-2 rounded-md bg-primary text-white"
                      onClick={() => {/* Would toggle theme in a real implementation */}}
                    >
                      Toggle Theme
                    </button>
                  </div>
                )}
                
                {activeTab === 'ssr' && (
                  <div className="demo-ssr">
                    <div className="space-y-2">
                      <div className="p-3 border border-primary/10 rounded-md">
                        <h3 className="font-bold mb-1">Server Render</h3>
                        <p className="text-sm text-foreground/70">Initial HTML with data</p>
                      </div>
                      <div className="flex items-center">
                        <ArrowPathIcon className="w-5 h-5 mx-2 text-primary" />
                      </div>
                      <div className="p-3 border border-primary/10 rounded-md">
                        <h3 className="font-bold mb-1">Client Hydration</h3>
                        <p className="text-sm text-foreground/70">JavaScript takes over</p>
                      </div>
                      <div className="flex items-center">
                        <ArrowPathIcon className="w-5 h-5 mx-2 text-primary" />
                      </div>
                      <div className="p-3 border border-primary/10 rounded-md bg-primary/10">
                        <h3 className="font-bold mb-1">Interactive App</h3>
                        <p className="text-sm text-foreground/70">Fully functional</p>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'api' && (
                  <div className="demo-api">
                    <div className="space-y-3">
                      <div className="flex gap-2 items-center">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-md text-xs font-bold">GET</span>
                        <span>/api/users</span>
                      </div>
                      <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-xs overflow-x-auto">
                        {JSON.stringify([
                          { id: 1, name: "John Doe", email: "john@example.com" },
                          { id: 2, name: "Jane Smith", email: "jane@example.com" }
                        ], null, 2)}
                      </pre>
                      
                      <div className="flex gap-2 items-center mt-4">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-bold">POST</span>
                        <span>/api/users</span>
                      </div>
                      <pre className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-xs overflow-x-auto">
                        {JSON.stringify({ 
                          success: true, 
                          id: 3,
                          message: "User created successfully" 
                        }, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}
                
                {activeTab === 'typescript' && (
                  <div className="demo-typescript">
                    <div className="p-4 border border-primary/10 rounded-lg">
                      <h2 className="text-xl font-bold mb-2">Alice Johnson</h2>
                      <p className="text-foreground/70 mb-2">alice@example.com</p>
                      <p className="text-foreground/70 mb-4">Role: admin</p>
                      <button className="px-3 py-1 bg-primary text-white rounded-md text-sm">
                        Update Profile
                      </button>
                    </div>
                    <div className="mt-4 p-3 bg-primary/10 rounded-md">
                      <p className="text-xs font-mono">✓ Type checked successfully</p>
                      <p className="text-xs font-mono text-green-600">No errors found</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <p>Run the example to see the result</p>
                <p className="text-sm mt-1 text-foreground/50">(Preview will appear here)</p>
              </div>
            )}
          </div>
          
          {activeTab !== 'basic' && showResult && (
            <div className="mt-4 p-4 bg-secondary/50 rounded-lg border border-primary/5">
              <h4 className="font-medium mb-2">Pro Tips:</h4>
              {activeTab === 'hooks' && (
                <ul className="text-sm space-y-2 text-foreground/70">
                  <li>• Use dependency arrays in useEffect to control when effects run</li>
                  <li>• useMemo optimizes expensive calculations</li>
                  <li>• Custom hooks can share stateful logic between components</li>
                </ul>
              )}
              {activeTab === 'context' && (
                <ul className="text-sm space-y-2 text-foreground/70">
                  <li>• Context is great for global state like themes and user data</li>
                  <li>• Use multiple contexts for different concerns</li>
                  <li>• Combine with useReducer for complex state management</li>
                </ul>
              )}
              {activeTab === 'ssr' && (
                <ul className="text-sm space-y-2 text-foreground/70">
                  <li>• SSR improves SEO and initial page load performance</li>
                  <li>• Use data fetching during the server render phase</li>
                  <li>• Client hydration makes the page interactive</li>
                </ul>
              )}
              {activeTab === 'api' && (
                <ul className="text-sm space-y-2 text-foreground/70">
                  <li>• Each export corresponds to an HTTP method (get, post, etc.)</li>
                  <li>• Folder structure creates the API routes</li>
                  <li>• Access database via req.db in your handlers</li>
                </ul>
              )}
              {activeTab === 'typescript' && (
                <ul className="text-sm space-y-2 text-foreground/70">
                  <li>• Use interfaces to define component props</li>
                  <li>• Generic type parameters enhance hooks: useState&lt;string&gt;(&apos;&apos;)</li>
                  <li>• The compiler catches errors before runtime</li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;
