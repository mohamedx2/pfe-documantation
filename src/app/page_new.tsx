'use client';

import HydrationSafeImage from "@/components/HydrationSafeImage";
import { useState, useEffect, useRef, useReducer } from "react";
import { 
  CodeBracketIcon, 
  ServerIcon, 
  CpuChipIcon,
  RocketLaunchIcon,
  CubeTransparentIcon,
  ArrowPathIcon,
  GlobeAltIcon,
  CursorArrowRippleIcon,
  ArrowTrendingUpIcon,
  
  ChevronRightIcon,
  AcademicCapIcon,
  StarIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";
import { 
  CommandLineIcon,
  DocumentTextIcon,
  BoltIcon,
  PuzzlePieceIcon,
  SparklesIcon
} from "@heroicons/react/24/solid";
import FloatingCard from "@/components/FloatingCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import AnimatedCounter from "@/components/AnimatedCounter";
import GlowButton from "@/components/GlowButton";
import { useNavigation } from "@/components/NavigationContext";

// Animation state reducer
type AnimationState = {
  isRtl: boolean;
  activeTab: number;
  animationPaused: boolean;
  codePlaygroundOpen: boolean;
  activeDemoIndex: number;
  particleIntensity: 'low' | 'medium' | 'high';
  interactionCount: number;
  lastInteraction: string;
};

type AnimationAction = 
  | { type: 'TOGGLE_RTL' }
  | { type: 'SET_TAB'; payload: number }
  | { type: 'TOGGLE_ANIMATION_PAUSE' }
  | { type: 'TOGGLE_CODE_PLAYGROUND' }
  | { type: 'SET_DEMO'; payload: number }
  | { type: 'SET_PARTICLE_INTENSITY'; payload: 'low' | 'medium' | 'high' }
  | { type: 'INCREMENT_INTERACTION'; payload: string };

const initialAnimationState: AnimationState = {
  isRtl: false,
  activeTab: 0,
  animationPaused: false,
  codePlaygroundOpen: false,
  activeDemoIndex: 0,
  particleIntensity: 'medium',
  interactionCount: 0,
  lastInteraction: '',
};

function animationReducer(state: AnimationState, action: AnimationAction): AnimationState {
  switch (action.type) {
    case 'TOGGLE_RTL':
      return { ...state, isRtl: !state.isRtl };
    case 'SET_TAB':
      return { ...state, activeTab: action.payload };
    case 'TOGGLE_ANIMATION_PAUSE':
      return { ...state, animationPaused: !state.animationPaused };
    case 'TOGGLE_CODE_PLAYGROUND':
      return { ...state, codePlaygroundOpen: !state.codePlaygroundOpen };
    case 'SET_DEMO':
      return { ...state, activeDemoIndex: action.payload };
    case 'SET_PARTICLE_INTENSITY':
      return { ...state, particleIntensity: action.payload };
    case 'INCREMENT_INTERACTION':
      return { 
        ...state, 
        interactionCount: state.interactionCount + 1,
        lastInteraction: action.payload
      };
    default:
      return state;
  }
}

export default function Home() {
  // Enhanced state for interactive elements
  const [, setScrollPosition] = useState(0);
  const [, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasScrolled, setHasScrolled] = useState(false);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  
  // Use navigation context instead of local state
  const { isInView, setActiveSection } = useNavigation();
  
  // Animation state with reducer
  const [animationState, dispatchAnimation] = useReducer(animationReducer, initialAnimationState);
  
  // Code examples with RTL support
  const codeExamples = [
    {
      title: "Basic Component",
      language: "jsx",
      ltr: `import { render, useState, useEffect } from 'baraqex';

function App() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <div className="container">
      <h1>Hello Baraqex!</h1>
      <div className="counter">
        <button onClick={() => setCount(count - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
}

render(<App />, document.getElementById('root'));`,
      rtl: `import { render, useState, useEffect } from 'baraqex';

function App() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`العد: \${count}\`;
  }, [count]);
  
  return (
    <div className="container" dir="rtl">
      <h1>أهلا بك في باراكس!</h1>
      <div className="counter">
        <button onClick={() => setCount(count - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
}

render(<App />, document.getElementById('root'));`
    },
    {
      title: "Server Setup",
      language: "jsx",
      ltr: `import { createServer } from 'baraqex';

const server = createServer({
  port: 3000,
  apiDir: './src/api',
  pagesDir: './src/pages',
  staticDir: './public',
  enableCors: true,
  db: {
    url: process.env.DATABASE_URL,
    type: 'mongodb'
  }
});

server.start().then(() => {
  console.log('🚀 Server running on http://localhost:3000');
});`,
      rtl: `import { createServer } from 'baraqex';

const server = createServer({
  port: 3000,
  apiDir: './src/api',
  pagesDir: './src/pages',
  staticDir: './public',
  enableCors: true,
  db: {
    url: process.env.DATABASE_URL,
    type: 'mongodb'
  }
});

server.start().then(() => {
  console.log('🚀 الخادم يعمل على http://localhost:3000');
});`
    },
    {
      title: "WebAssembly Integration",
      language: "jsx",
      ltr: `import { loadGoWasm, callWasmFunction } from 'baraqex';

async function runWasmDemo() {
  // Load Go WebAssembly module
  const wasmInstance = await loadGoWasm('./math.wasm');
  
  // Call Go function from JavaScript
  const result = callWasmFunction('fastCalculation', [1000, 2000]);
  
  console.log('WASM Result:', result);
  return result;
}

runWasmDemo();`,
      rtl: `import { loadGoWasm, callWasmFunction } from 'baraqex';

async function runWasmDemo() {
  // تحميل وحدة Go WebAssembly
  const wasmInstance = await loadGoWasm('./math.wasm');
  
  // استدعاء دالة Go من JavaScript
  const result = callWasmFunction('fastCalculation', [1000, 2000]);
  
  console.log('نتيجة WASM:', result);
  return result;
}

runWasmDemo();`
    }
  ];
  
  // Interactive demos with state

  // Setup intersection observer to track which sections are in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          
          if (entry.isIntersecting) {
            setActiveSection(id);
            
            if (id !== 'hero' && !hasScrolled) {
              setHasScrolled(true);
              dispatchAnimation({ 
                type: 'INCREMENT_INTERACTION', 
                payload: 'first-scroll' 
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );
    
    Object.values(sectionsRef.current).forEach(section => {
      if (section) observer.observe(section);
    });
    
    return () => observer.disconnect();
  }, [hasScrolled, setActiveSection]);
  
  // Track mouse position for parallax and interactive effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Update scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      if (window.scrollY > 50 && !hasScrolled) {
        setHasScrolled(true);
        dispatchAnimation({ 
          type: 'INCREMENT_INTERACTION', 
          payload: 'first-scroll' 
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);
  
  // Calculate parallax effects
  
  // Calculate mouse parallax effects

  return (
    <div className="min-h-screen">
      {/* Progress tracker */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent overflow-hidden">
        {Object.entries(isInView).map(([section, visible]) => 
          visible && (
            <div 
              key={section}
              className="absolute top-0 left-0 h-full bg-primary animate-pulse-glow transition-all duration-300"
              style={{
                width: section === 'hero' ? '25%' : 
                       section === 'demos' ? '50%' :
                       section === 'getting-started' ? '75%' :
                       section === 'features' ? '100%' : '0%'
              }}
            />
          )
        )}
      </div>

      {/* Hero Section */}
      <section 
        id="hero" 
        className={`relative pt-24 pb-32 overflow-hidden transition-opacity duration-700 ${
          isInView.hero ? 'opacity-100' : 'opacity-70'
        }`}
        ref={el => { sectionsRef.current.hero = el; }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <RevealOnScroll>
              <div className={`flex-1 text-center md:text-left mb-10 md:mb-0 transition-all duration-1000 ${
                isInView.hero ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
              }`}>
                <div className="flex justify-center md:justify-start mb-8">
                  <div className="relative">
                    <HydrationSafeImage 
                      src="/images/logo.png"
                      alt="Baraqex Logo"
                      width={120}
                      height={120}
                      className="object-contain animate-float-3d relative z-10"
                    />
                    <div className="absolute -right-4 top-0 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg animate-pulse z-10">
                      <SparklesIcon className="w-3 h-3" /> v1.0
                    </div>
                  </div>
                </div>

                <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mb-6 font-medium backdrop-blur-sm shadow-sm hover:bg-primary/15 transition-all cursor-pointer group">
                  <span className="mr-2 group-hover:underline">Modern Full-Stack Framework</span>
                  <span className="arabic-text text-sm">إطار عمل حديث شامل</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 logo-text-gradient relative inline-block">
                  Baraqex
                </h1>

                <div className="flex items-center justify-center md:justify-start mb-6">
                  <h2 className="text-xl md:text-2xl max-w-2xl text-foreground/80">
                    A powerful full-stack JavaScript/TypeScript framework with Virtual DOM, hooks, WebAssembly integration, and server-side rendering
                  </h2>
                </div>
              
                <p className="arabic-text text-lg md:text-xl mb-10 max-w-2xl mx-auto md:mx-0 text-foreground/70">
                  إطار جافاسكريبت عربي خفيف الوزن مع تنفيذ DOM افتراضي وخطافات
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
                  <GlowButton
                    href="/docs/getting-started"
                    className="flex items-center gap-2 px-6 py-3 rounded-full"
                    onClick={() => dispatchAnimation({ 
                      type: 'INCREMENT_INTERACTION', 
                      payload: 'get-started-click' 
                    })}
                  >
                    <RocketLaunchIcon className="w-5 h-5" />
                    Get Started
                  </GlowButton>
                  
                  <a
                    href="https://github.com/mohamedx2/baraqex"
                    className="flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/20 hover:bg-secondary transition-colors interactive-btn relative group"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    View on GitHub
                    <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <StarIcon className="w-5 h-5 text-yellow-500" />
                    </span>
                  </a>
                </div>

                <div className="flex justify-center md:justify-start gap-4 flex-wrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary hover-3d">
                    <BoltIcon className="w-4 h-4 mr-1" /> &lt;5KB gzipped
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary hover-3d">
                    <RocketLaunchIcon className="w-4 h-4 mr-1" /> Blazing Fast
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary hover-3d">
                    <CubeTransparentIcon className="w-4 h-4 mr-1" /> Virtual DOM
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary hover-3d">
                    <PuzzlePieceIcon className="w-4 h-4 mr-1" /> Hooks API
                  </span>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={300}>
              <div className="flex-1 relative">
                <FloatingCard className="code-block p-1 bg-secondary rounded-lg shadow-xl glass-card">
                  <div className="bg-[#1e1e1e] text-white rounded-md overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-black/30">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="ml-2 text-sm opacity-70">App.jsx</div>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <pre className="p-4 text-sm overflow-x-auto">
                        <code className="language-jsx">
                          {codeExamples[animationState.activeTab].ltr}
                        </code>
                      </pre>
                    </div>
                  </div>
                </FloatingCard>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section 
        id="getting-started" 
        className="py-20 bg-gradient-to-b from-background/50 to-secondary/30"
        ref={el => { sectionsRef.current['getting-started'] = el; }}
      >
        <RevealOnScroll threshold={0.1}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                  <RocketLaunchIcon className="w-7 h-7 text-primary" />
                  Get Started in Seconds
                </h2>
                <p className="text-lg text-foreground/80">
                  Start building with Baraqex in just a few simple steps. No complex configuration required.
                </p>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="mb-8 code-block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all">
                <div className="bg-black/80 text-white p-2 flex items-center">
                  <CommandLineIcon className="w-5 h-5 mr-2" />
                  <span>Terminal</span>
                </div>
                <pre className="bg-black text-green-400 p-4 overflow-x-auto font-mono text-sm">
                  <code>{`# Create a new Baraqex project
npx baraqex create my-app

# Choose your template (basic-app, ssr-template, fullstack-app)
# Select: fullstack-app for complete solution`}</code>
                </pre>
              </div>

              <p className="text-lg mb-4 font-medium">Then:</p>

              <div className="mb-8 code-block overflow-hidden rounded-lg shadow-lg">
                <div className="bg-black/80 text-white p-2 flex items-center">
                  <CommandLineIcon className="w-5 h-5 mr-2" />
                  <span>Terminal</span>
                </div>
                <pre className="bg-black text-green-400 p-4 overflow-x-auto font-mono text-sm">
                  <code>{`cd my-app
npm install
npm run dev

# Your server will start at http://localhost:3000
# API endpoints at http://localhost:3000/api/*`}</code>
                </pre>
              </div>

              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <AcademicCapIcon className="w-6 h-6 text-primary" />
                Basic Usage
              </h3>

              <div className="code-block overflow-hidden rounded-lg shadow-lg">
                <div className="bg-black/80 text-white p-2 flex items-center">
                  <DocumentTextIcon className="w-5 h-5 mr-2" />
                  <span>App.jsx</span>
                </div>
                <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 overflow-x-auto font-mono text-sm">
                  <code className="language-jsx">{`import { render, useState } from 'baraqex';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

render(<App />, document.getElementById('root'));`}</code>
                </pre>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 mt-12 p-6 bg-background/40 backdrop-blur-sm rounded-lg border border-primary/10">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <ArrowTrendingUpIcon className="w-5 h-5 text-primary mr-2" />
                  <div className="text-4xl font-bold text-primary">
                    <AnimatedCounter end={92} suffix="ms" duration={2000} />
                  </div>
                </div>
                <p className="text-foreground/70">Render Time</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CursorArrowRippleIcon className="w-5 h-5 text-primary mr-2" />
                  <div className="text-4xl font-bold text-primary">
                    <AnimatedCounter end={100} suffix="%" duration={1500} />
                  </div>
                </div>
                <p className="text-foreground/70">Interactive</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <GlobeAltIcon className="w-5 h-5 text-primary mr-2" />
                  <div className="text-4xl font-bold text-primary">RTL</div>
                </div>
                <p className="text-foreground/70">Full Support</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Features Section */}
      <section 
        id="features" 
        className="py-24"
        ref={el => { sectionsRef.current.features = el; }}
      >
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-xl max-w-2xl mx-auto text-foreground/70">
                Everything you need to build modern full-stack web applications, from simple SPAs to complex enterprise solutions.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <CpuChipIcon className="w-6 h-6" />,
                title: "Full-Stack Framework",
                description: "Built on Frontend Hamroun with additional server-side capabilities for complete web application development."
              },
              {
                icon: <CubeTransparentIcon className="w-6 h-6" />,
                title: "Virtual DOM & Hooks",
                description: "Efficient Virtual DOM rendering with complete hooks system (useState, useEffect, useMemo, useRef, useContext)."
              },
              {
                icon: <ServerIcon className="w-6 h-6" />,
                title: "Server-Side Rendering",
                description: "Optimized SSR with client hydration, file-based routing, and Express.js integration for production-ready applications."
              },
              {
                icon: <PuzzlePieceIcon className="w-6 h-6" />,
                title: "Database Integration",
                description: "Built-in support for MongoDB, MySQL, and PostgreSQL with connection pooling and query optimization."
              },
              {
                icon: <ShieldCheckIcon className="w-6 h-6" />,
                title: "Authentication System",
                description: "JWT-based authentication with built-in middleware for secure user management and session handling."
              },
              {
                icon: <CpuChipIcon className="w-6 h-6" />,
                title: "WebAssembly Integration",
                description: "Seamless Go WebAssembly integration for high-performance computing in both browser and Node.js environments."
              },
              {
                icon: <CodeBracketIcon className="w-6 h-6" />,
                title: "File-Based API Routes",
                description: "Express-based API routing system with automatic endpoint generation based on file structure."
              },
              {
                icon: <ArrowPathIcon className="w-6 h-6" />,
                title: "TypeScript Support",
                description: "Full TypeScript support with comprehensive type definitions for enhanced developer experience."
              },
              {
                icon: <CommandLineIcon className="w-6 h-6" />,
                title: "Interactive CLI",
                description: "Powerful command-line tools for project scaffolding, component generation, and development workflow automation."
              }
            ].map((feature, index) => (
              <RevealOnScroll key={feature.title} delay={index * 100}>
                <FloatingCard className="feature-card-3d p-6 h-full">
                  <div className="icon-wrapper">
                    {feature.icon}
                  </div>
                  <h3 className="title">{feature.title}</h3>
                  <p className="description">{feature.description}</p>
                  
                  <div className="mt-4 flex justify-end">
                    <button className="text-primary flex items-center text-sm hover:underline">
                      Learn more <ChevronRightIcon className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </FloatingCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
      
      {/* Community Section */}
      <section 
        id="community" 
        className="py-20 bg-primary/5"
        ref={el => { sectionsRef.current.community = el; }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            One Culture, One Community
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Global Developers",
                description: "Join developers from around the world building with the same framework and conventions.",
                icon: <GlobeAltIcon className="w-8 h-8" />
              },
              {
                title: "Arabic Dev Community",
                description: "A dedicated space for Arabic-speaking developers with localized resources.",
                icon: <ChatBubbleLeftRightIcon className="w-8 h-8" />
              },
              {
                title: "Open Source Contribution",
                description: "Contribute to the framework's growth with a welcoming community of maintainers.",
                icon: <CodeBracketIcon className="w-8 h-8" />
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-background rounded-lg p-6 shadow-md"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-primary">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <a 
              href="https://discord.gg/baraqex-framework" 
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full hover:bg-primary-dark transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ChatBubbleLeftRightIcon className="w-5 h-5" />
              Join Our Discord
            </a>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section 
        id="cta"
        className="py-16 culture-gradient relative overflow-hidden"
        ref={el => { sectionsRef.current.cta = el; }}
      >
        <RevealOnScroll>
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Build with Baraqex?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-white/80">
              Experience the power of one unified framework that brings developers together.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <GlowButton
                href="/docs/getting-started"
                variant="primary"
                className="px-8 py-3 rounded-full font-medium"
              >
                Get Started
              </GlowButton>
              
              <a 
                href="/community" 
                className="bg-transparent border border-white text-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors group relative overflow-hidden"
              >
                <span className="relative z-10">Join Our Community</span>
                <span className="absolute inset-0 w-full h-full bg-white/0 group-hover:bg-white/10 transition-all duration-300"></span>
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}

// Interactive counter component for demos

