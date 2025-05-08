'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { 
  CodeBracketIcon, 
  ServerIcon, 
  CpuChipIcon,
  RocketLaunchIcon,
  CubeTransparentIcon,
  ArrowPathIcon,
  BookOpenIcon,
  GlobeAltIcon,
  UsersIcon,
  HeartIcon,
  BuildingLibraryIcon,
  CalendarIcon,
  MapPinIcon,
  CursorArrowRippleIcon,
  ArrowTrendingUpIcon
} from "@heroicons/react/24/outline";
import { 
  CommandLineIcon,
  DocumentTextIcon,
  BoltIcon,
  PuzzlePieceIcon,
  CloudArrowUpIcon,
  LightBulbIcon,
  SparklesIcon,
  StarIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/solid";
import FloatingCard from "@/components/FloatingCard";
import RevealOnScroll from "@/components/RevealOnScroll";

export default function Home() {
  // State for interactive elements
  const [activeTab, setActiveTab] = useState('hooks');
  const [scrollPosition, setScrollPosition] = useState(0);
  const [particleCount, setParticleCount] = useState(0);
  
  // Update scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    // Counter animation
    const counterInterval = setInterval(() => {
      setParticleCount(prev => {
        if (prev < 100) return prev + 1;
        return prev;
      });
    }, 30);
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(counterInterval);
    };
  }, []);
  
  // Parallax effect calculation
  const parallaxOffset = (offset: number) => {
    return -scrollPosition * offset;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with floating elements */}
      <section className="relative py-24 overflow-hidden">
        {/* Background decoration with parallax */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" 
            style={{ transform: `translateY(${parallaxOffset(0.1)}px)` }}
          ></div>
          <div 
            className="absolute bottom-10 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
            style={{ transform: `translateY(${parallaxOffset(0.15)}px)` }}
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] globe-pattern"></div>
          
          {/* Floating elements */}
          <div 
            className="absolute top-[30%] left-[20%] w-4 h-4 bg-primary rounded-full animate-float" 
            style={{ animationDelay: '0s' }}
          ></div>
          <div 
            className="absolute top-[60%] left-[80%] w-6 h-6 bg-accent rounded-full animate-float" 
            style={{ animationDelay: '1s' }}
          ></div>
          <div 
            className="absolute top-[15%] left-[70%] w-3 h-3 bg-gold rounded-full animate-float" 
            style={{ animationDelay: '2s' }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <RevealOnScroll>
              <div className="flex-1 text-center md:text-left mb-10 md:mb-0">
                <div className="flex justify-center md:justify-start mb-8">
                  <div className="relative">
                    <Image 
                      src="/images/logo.png"
                      alt="Frontend Hamroun Logo"
                      width={120}
                      height={120}
                      className="object-contain animate-float"
                    />
                    <div className="absolute -right-4 top-0 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                      v1.0
                    </div>
                  </div>
                </div>

                <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mb-6 font-medium">
                  <span className="mr-2">One Culture, One Framework</span>
                  <span className="arabic-text text-sm">ثقافة واحدة، إطار عمل واحد</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 logo-text-gradient">
                  Frontend Hamroun
                </h1>

                <div className="flex items-center justify-center md:justify-start mb-6">
                  <h2 className="text-xl md:text-2xl max-w-2xl text-foreground/80">
                    A lightweight full-stack JavaScript framework with Virtual DOM and hooks implementation
                  </h2>
                </div>
              
                <p className="arabic-text text-lg md:text-xl mb-10 max-w-2xl mx-auto md:mx-0 text-foreground/70">
                  إطار جافاسكريبت عربي خفيف الوزن مع تنفيذ DOM افتراضي وخطافات
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
                  <a
                    href="#getting-started"
                    className="flex items-center gap-2 culture-gradient text-white px-6 py-3 rounded-full transition-all shadow-lg hover:shadow-primary/20 interactive-btn"
                  >
                    <RocketLaunchIcon className="w-5 h-5" />
                    Get Started
                  </a>
                  <a
                    href="https://github.com/hamroun/frontend-hamroun"
                    className="flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/20 hover:bg-secondary transition-colors interactive-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    View on GitHub
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
                    <div className="flex items-center gap-1.5 px-4 py-2 bg-black/30">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="ml-2 text-sm opacity-70">App.jsx</div>
                    </div>
                    <pre className="p-4 text-sm overflow-x-auto"><code className="language-jsx">{`import { useState, useEffect } from 'frontend-hamroun';

function App() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);
  
  return (
    <div className="container">
      <h1>Hello Frontend Hamroun!</h1>
      <div className="counter">
        <button onClick={() => setCount(count - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
}

export default App;`}</code></pre>
                  </div>
                </FloatingCard>
              
                {/* Interactive code sample toggle */}
                <div className="mt-4 p-2 bg-primary/5 glass-card rounded-lg border border-primary/10 flex items-center justify-between hover-3d">
                  <span className="text-sm text-primary">Show code in Arabic (RTL support)</span>
                  <button className="text-xs bg-primary text-white px-3 py-1 rounded-full interactive-btn">
                    Toggle RTL
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section id="getting-started" className="py-20 bg-gradient-to-b from-background/50 to-secondary/30 arabic-pattern-2 relative">
        <RevealOnScroll>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">Get Started in Seconds</h2>
                <p className="text-lg text-foreground/80">
                  Start building with Frontend Hamroun in just a few simple steps. No complex configuration required.
                </p>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                  <div>Install the CLI</div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                  <div>Create a new project</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
                  <div>Start coding</div>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="mb-8 code-block overflow-hidden rounded-lg shadow-lg">
                <div className="bg-black/80 text-white p-2 flex items-center">
                  <CommandLineIcon className="w-5 h-5 mr-2" />
                  <span>Terminal</span>
                </div>
                <pre className="bg-black text-green-400 p-4 overflow-x-auto font-mono text-sm"><code>{`# Using the create-frontend-app command
npx create-frontend-app my-app

# Or using the frontend-hamroun CLI
npx frontend-hamroun create my-app`}</code></pre>
              </div>

              <p className="text-lg mb-4 font-medium">Then:</p>

              <div className="mb-8 code-block overflow-hidden rounded-lg shadow-lg">
                <div className="bg-black/80 text-white p-2 flex items-center">
                  <CommandLineIcon className="w-5 h-5 mr-2" />
                  <span>Terminal</span>
                </div>
                <pre className="bg-black text-green-400 p-4 overflow-x-auto font-mono text-sm"><code>{`cd my-app
npm install
npm run dev`}</code></pre>
              </div>

              <h3 className="text-2xl font-semibold mb-4">Basic Usage</h3>

              <div className="code-block overflow-hidden rounded-lg shadow-lg">
                <div className="bg-black/80 text-white p-2 flex items-center">
                  <DocumentTextIcon className="w-5 h-5 mr-2" />
                  <span>App.jsx</span>
                </div>
                <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 overflow-x-auto font-mono text-sm"><code className="language-jsx">{`import { render, useState } from 'frontend-hamroun';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

render(<App />, document.getElementById('root'));`}</code></pre>
              </div>
            </div>

            <div className="animate-float absolute -right-10 top-20 w-32 h-32 rounded-full bg-primary/5 blur-xl"></div>
            <div className="animate-float absolute -left-10 bottom-20 w-40 h-40 rounded-full bg-accent/5 blur-xl" 
                style={{ animationDelay: "1.5s" }}></div>
            
            {/* Add interactive stats counter */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <ArrowTrendingUpIcon className="w-5 h-5 text-primary mr-2" />
                  <div className="text-4xl font-bold text-primary">{particleCount}ms</div>
                </div>
                <p className="text-foreground/70">Render Time</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CursorArrowRippleIcon className="w-5 h-5 text-primary mr-2" />
                  <div className="text-4xl font-bold text-primary">100%</div>
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
            
            {/* ...existing code with FloatingCard enhancements... */}
          </div>
        </RevealOnScroll>
      </section>

      {/* Features Section - Using RevealOnScroll for each feature card */}
      <section id="features" className="py-24">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-xl max-w-2xl mx-auto text-foreground/70">
                Everything you need to build modern web applications, all in one lightweight package.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* For each feature card, wrap with RevealOnScroll with increasing delays */}
            {[
              {
                icon: <CpuChipIcon className="w-6 h-6" />,
                title: "Lightweight Core",
                description: "Less than 5KB gzipped for the essential runtime, keeping your application fast and efficient."
              },
              {
                icon: <CubeTransparentIcon className="w-6 h-6" />,
                title: "Virtual DOM",
                description: "Efficient rendering and diffing algorithm that minimizes actual DOM operations for optimal performance."
              },
              {
                icon: <PuzzlePieceIcon className="w-6 h-6" />,
                title: "Hooks API",
                description: "Complete hooks system including useState, useEffect, useMemo, and useRef for stateful logic."
              },
              {
                icon: <ArrowPathIcon className="w-6 h-6" />,
                title: "Context API",
                description: "Simple state management across components without prop drilling, making data flow seamless."
              },
              {
                icon: <ServerIcon className="w-6 h-6" />,
                title: "Server-Side Rendering",
                description: "Optimized SSR with hydration for improved performance, SEO, and user experience."
              },
              {
                icon: <CodeBracketIcon className="w-6 h-6" />,
                title: "TypeScript Support",
                description: "Full type definitions included for an enhanced development experience with type safety."
              }
            ].map((feature, index) => (
              <RevealOnScroll key={feature.title} delay={index * 100}>
                <FloatingCard className="feature-card backdrop-blur-sm bg-background/50 border border-primary/10 shadow-lg hover:shadow-xl glass-card">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4 animate-pulse-glow">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </FloatingCard>
              </RevealOnScroll>
            ))}
          </div>

          {/* ...remaining sections with similar enhancements... */}
        </div>
      </section>
      
      {/* ...add similar RevealOnScroll and FloatingCard enhancements to other sections... */}

      {/* Call to Action - Interactive version */}
      <section className="py-16 culture-gradient relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNMTAgMTBoMjB2MjBIMTB6IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')]"
          style={{ 
            backgroundPosition: `${scrollPosition * 0.05}px ${scrollPosition * 0.05}px`,
            opacity: 0.1
          }}
        ></div>
        
        <RevealOnScroll>
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-3xl font-bold mb-6 text-white animate-float">Ready to Join the Frontend Hamroun Culture?</h2>
            <p className="text-xl mb-10 max-w-2xl mx-auto text-white/80">
              Experience the power of one unified framework that brings developers together.
            </p>
            
            <div className="flex justify-center gap-4">
              <a 
                href="#getting-started" 
                className="bg-white text-primary px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors shadow-lg font-medium interactive-btn"
              >
                Get Started
              </a>
              <a 
                href="#community" 
                className="bg-transparent border border-white text-white px-8 py-3 rounded-full hover:bg-white/10 transition-colors interactive-btn"
              >
                Join Our Community
              </a>
            </div>
            
            {/* Floating spheres */}
            <div className="absolute w-10 h-10 rounded-full bg-white/10 top-10 left-[20%] animate-float" style={{ animationDelay: '0.2s' }}></div>
            <div className="absolute w-16 h-16 rounded-full bg-white/10 bottom-20 right-[30%] animate-float" style={{ animationDelay: '1.5s' }}></div>
            <div className="absolute w-8 h-8 rounded-full bg-white/10 top-[40%] right-[10%] animate-float" style={{ animationDelay: '0.7s' }}></div>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}
