/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from "next/image";
import { useState, useEffect, useRef, useReducer, useMemo } from "react";
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
  PlayCircleIcon,
  PauseCircleIcon,
  ChevronRightIcon,
  AcademicCapIcon,
  ArrowPathRoundedSquareIcon,
  StarIcon,
  WindowIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";
import { 
  CommandLineIcon,
  DocumentTextIcon,
  BoltIcon,
  PuzzlePieceIcon,
  SparklesIcon,
  FireIcon
} from "@heroicons/react/24/solid";
import FloatingCard from "@/components/FloatingCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import AnimatedCounter from "@/components/AnimatedCounter";
import CodePlayground from "@/components/CodePlayground";
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
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hasScrolled, setHasScrolled] = useState(false);
  const sectionsRef = useRef<{ [key: string]: HTMLElement | null }>({});
  
  // Use navigation context instead of local state
  const { isInView, setIsInView } = useNavigation();
  
  // Animation state with reducer
  const [animationState, dispatchAnimation] = useReducer(animationReducer, initialAnimationState);
  
  // Code examples with RTL support
  const codeExamples = [
    {
      title: "Basic Component",
      language: "jsx",
      ltr: `import { useState, useEffect } from 'frontend-hamroun';

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

export default App;`,
      rtl: `import { useState, useEffect } from 'frontend-hamroun';

function App() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    document.title = \`العد: \${count}\`;
  }, [count]);
  
  return (
    <div className="container" dir="rtl">
      <h1>أهلا بك في فرونت اند حمرون!</h1>
      <div className="counter">
        <button onClick={() => setCount(count - 1)}>-</button>
        <span>{count}</span>
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
    </div>
  );
}`
    },
    {
      title: "Server Component",
      language: "jsx",
      ltr: `// This component runs on the server
import { fetchData } from '@/lib/data';

export default async function Dashboard() {
  // Data fetching happens on the server
  const data = await fetchData();
  
  return (
    <main className="dashboard">
      <h1>Welcome, {data.user.name}</h1>
      <div className="stats">
        {data.stats.map(stat => (
          <StatCard 
            key={stat.id}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>
    </main>
  );
}`,
      rtl: `// يتم تشغيل هذا المكون على الخادم
import { fetchData } from '@/lib/data';

export default async function Dashboard() {
  // يحدث جلب البيانات على الخادم
  const data = await fetchData();
  
  return (
    <main className="dashboard" dir="rtl">
      <h1>مرحبًا، {data.user.name}</h1>
      <div className="stats">
        {data.stats.map(stat => (
          <StatCard 
            key={stat.id}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>
    </main>
  );
}`
    }
  ];
  
  // Interactive demos with state
  const interactiveDemos = [
    { 
      title: "Virtual DOM",
      description: "See how Frontend Hamroun efficiently updates only what changes",
      icon: <CubeTransparentIcon className="w-6 h-6" />,
      link: "/docs/concepts/virtual-dom"
    },
    { 
      title: "Hooks API",
      description: "Explore the powerful hooks system for managing state and effects",
      icon: <ArrowPathRoundedSquareIcon className="w-6 h-6" />,
      link: "/docs/api/hooks"
    },
    { 
      title: "Server Components",
      description: "Experience the seamless integration of server and client rendering",
      icon: <ServerIcon className="w-6 h-6" />,
      link: "/docs/features/server-components"
    }
  ];

  // Get currently active section
  const activeSection = useMemo(() => {
    const visibleSections = Object.entries(isInView)
      .filter(([_, isVisible]) => isVisible)
      .map(([id]) => id);
    
    return visibleSections.length > 0 ? visibleSections[0] : 'hero';
  }, [isInView]);

  // Setup intersection observer to track which sections are in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          setIsInView((prev: any) => ({
            ...prev,
            [id]: entry.isIntersecting
          }));
          
          // Track first scroll
          if (entry.isIntersecting && entry.target.id !== 'hero' && !hasScrolled) {
            setHasScrolled(true);
            dispatchAnimation({ 
              type: 'INCREMENT_INTERACTION', 
              payload: 'first-scroll' 
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    
    // Observe all sections
    Object.values(sectionsRef.current).forEach(section => {
      if (section) observer.observe(section);
    });
    
    return () => observer.disconnect();
  }, [hasScrolled]);
  
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
      
      // Track first scroll
      if (window.scrollY > 50 && !hasScrolled) {
        setHasScrolled(true);
        dispatchAnimation({ 
          type: 'INCREMENT_INTERACTION', 
          payload: 'first-scroll' 
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled]);
  
  // Calculate parallax effects
  const parallaxOffset = (offset: number) => {
    return -scrollPosition * offset;
  };
  
  // Calculate mouse parallax
  const mouseParallax = (strength: number = 20) => {
    return {
      transform: `translate(${(mousePosition.x - 0.5) * strength}px, ${(mousePosition.y - 0.5) * strength}px)`,
    };
  };

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

      {/* Hero Section with enhanced interactive elements */}
      <section 
        id="hero" 
        className={`relative pt-24 pb-32 overflow-hidden transition-opacity duration-700 ${
          isInView.hero ? 'opacity-100' : 'opacity-70'
        }`}
        ref={el => { sectionsRef.current.hero = el; }}
      >
        {/* Background decoration with parallax and mouse-following */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl transition-transform duration-300" 
            style={{ 
              transform: `translateY(${parallaxOffset(0.1)}px) translate(${(mousePosition.x - 0.5) * -15}px, ${(mousePosition.y - 0.5) * -15}px)` 
            }}
          ></div>
          <div 
            className="absolute bottom-10 right-10 w-80 h-80 bg-accent/5 rounded-full blur-3xl transition-transform duration-300"
            style={{ 
              transform: `translateY(${parallaxOffset(0.15)}px) translate(${(mousePosition.x - 0.5) * -25}px, ${(mousePosition.y - 0.5) * -25}px)` 
            }}
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] globe-pattern opacity-50"></div>
          
          {/* Animated floating elements */}
          <div 
            className="absolute top-[30%] left-[20%] w-4 h-4 bg-primary rounded-full animate-float" 
            style={{ animationDelay: '0s', filter: 'blur(1px)' }}
          ></div>
          <div 
            className="absolute top-[60%] left-[80%] w-6 h-6 bg-accent rounded-full animate-float" 
            style={{ animationDelay: '1s', filter: 'blur(1px)' }}
          ></div>
          <div 
            className="absolute top-[15%] left-[70%] w-3 h-3 bg-gold rounded-full animate-float" 
            style={{ animationDelay: '2s', filter: 'blur(1px)' }}
          ></div>
          
          {/* Visual indicator to show page is interactive */}
          {!hasScrolled && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
              <span className="text-xs mb-2 text-foreground/60">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center pt-2">
                <div className="w-1 h-2 bg-foreground/60 rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <RevealOnScroll>
              <div className={`flex-1 text-center md:text-left mb-10 md:mb-0 transition-all duration-1000 ${
                isInView.hero ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
              }`}>
                <div className="flex justify-center md:justify-start mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-lg animate-pulse-glow"></div>
                    <Image 
                      src="/images/logo.png"
                      alt="Frontend Hamroun Logo"
                      width={120}
                      height={120}
                      className="object-contain animate-float-3d relative z-10"
                    />
                    <div className="absolute -right-4 top-0 bg-accent text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-lg animate-pulse">
                      <SparklesIcon className="w-3 h-3" /> v1.0
                    </div>
                    
                    {/* Interactive particle effect */}
                    {!animationState.animationPaused && (
                      <div className="absolute -inset-10 pointer-events-none">
                        {Array.from({ length: animationState.particleIntensity === 'low' ? 5 : (animationState.particleIntensity === 'medium' ? 10 : 20) }).map((_, i) => (
                          <div 
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-primary/30"
                            style={{
                              left: `${Math.random() * 100}%`,
                              top: `${Math.random() * 100}%`,
                              animation: `float ${3 + Math.random() * 4}s linear ${Math.random() * 2}s infinite`,
                              opacity: Math.random() * 0.5 + 0.2
                            }}
                          ></div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full mb-6 font-medium backdrop-blur-sm shadow-sm hover:bg-primary/15 transition-all cursor-pointer group">
                  <span className="mr-2 group-hover:underline">One Culture, One Framework</span>
                  <span className="arabic-text text-sm">ثقافة واحدة، إطار عمل واحد</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 logo-text-gradient relative inline-block">
                  Frontend Hamroun
                  {animationState.interactionCount > 0 && (
                    <span className="absolute -top-2 -right-2 flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-20"></span>
                      <span className="relative inline-flex rounded-full h-5 w-5 bg-primary/20 items-center justify-center">
                        <FireIcon className="h-3 w-3 text-primary" />
                      </span>
                    </span>
                  )}
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
                    href="https://github.com/hamroun/frontend-hamroun"
                    className="flex items-center gap-2 px-6 py-3 rounded-full border border-foreground/20 hover:bg-secondary transition-colors interactive-btn relative group"
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => dispatchAnimation({ 
                      type: 'INCREMENT_INTERACTION', 
                      payload: 'github-click' 
                    })}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    View on GitHub
                    <span className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <StarIcon className="w-5 h-5 text-yellow-500" />
                    </span>
                  </a>
                  
                  {/* Animation controls */}
                  <button
                    className="p-2 rounded-full bg-foreground/5 hover:bg-foreground/10 transition-colors"
                    onClick={() => dispatchAnimation({ type: 'TOGGLE_ANIMATION_PAUSE' })}
                    aria-label={animationState.animationPaused ? "Resume animations" : "Pause animations"}
                  >
                    {animationState.animationPaused ? (
                      <PlayCircleIcon className="w-5 h-5" />
                    ) : (
                      <PauseCircleIcon className="w-5 h-5" />
                    )}
                  </button>
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
              <div className={`flex-1 relative transition-all duration-1000 delay-300 ${
                isInView.hero ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
              }`}>
                {/* Enhanced code playground with editable options */}
                <FloatingCard className="code-block p-1 bg-secondary rounded-lg shadow-xl glass-card">
                  <div className="bg-[#1e1e1e] text-white rounded-md overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-black/30">
                      <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <div className="ml-2 text-sm opacity-70">App.jsx</div>
                      </div>
                      
                      {/* Tab navigation for code examples */}
                      <div className="flex text-xs">
                        {codeExamples.map((example, index) => (
                          <button
                            key={index}
                            className={`px-3 py-1 ${animationState.activeTab === index ? 'bg-primary/20 text-white' : 'text-white/60 hover:text-white/80'}`}
                            onClick={() => dispatchAnimation({ type: 'SET_TAB', payload: index })}
                          >
                            {example.title}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Interactive code playground */}
                    <div className="relative">
                      <pre className="p-4 text-sm overflow-x-auto">
                        <code className="language-jsx" dir={animationState.isRtl ? 'rtl' : 'ltr'}>
                          {animationState.isRtl 
                            ? codeExamples[animationState.activeTab].rtl 
                            : codeExamples[animationState.activeTab].ltr}
                        </code>
                      </pre>
                      
                      {/* Show syntax highlighting hints on hover */}
                      <div className="absolute bottom-2 right-2 text-xs bg-black/50 px-2 py-1 rounded">
                        Hover over code to see more
                      </div>
                    </div>
                  </div>
                </FloatingCard>
              
                {/* Interactive code sample toggle with enhanced UI */}
                <div className="mt-4 p-3 bg-primary/5 glass-card rounded-lg border border-primary/10 hover-3d transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary flex items-center">
                      {animationState.isRtl ? (
                        <>
                          <span className="arabic-text">عرض الكود بالعربية</span>
                          <span className="mx-1">(RTL)</span>
                        </>
                      ) : (
                        <>Show code in Arabic (RTL support)</>
                      )}
                    </span>
                    <button 
                      className="flex items-center gap-1 text-xs bg-primary text-white px-3 py-1.5 rounded-full hover:bg-primary-dark transition-colors"
                      onClick={() => {
                        dispatchAnimation({ type: 'TOGGLE_RTL' });
                        dispatchAnimation({ 
                          type: 'INCREMENT_INTERACTION', 
                          payload: 'rtl-toggle' 
                        });
                      }}
                    >
                      <ArrowPathIcon className="w-3 h-3" />
                      Toggle RTL
                    </button>
                  </div>
                  
                  {/* Interactive particle density control */}
                  <div className="flex items-center mt-3 pt-3 border-t border-primary/10">
                    <span className="text-xs text-foreground/60 mr-2">Visual Effects:</span>
                    <div className="flex bg-secondary/40 rounded-full p-0.5">
                      {(['low', 'medium', 'high'] as const).map(level => (
                        <button
                          key={level}
                          className={`px-2 py-0.5 text-xs rounded-full ${
                            animationState.particleIntensity === level 
                              ? 'bg-primary text-white' 
                              : 'text-foreground/70'
                          }`}
                          onClick={() => dispatchAnimation({ 
                            type: 'SET_PARTICLE_INTENSITY', 
                            payload: level 
                          })}
                        >
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                      ))}
                    </div>
                    
                    {/* Expand code playground button */}
                    <button
                      className="ml-auto text-xs flex items-center gap-1 text-primary"
                      onClick={() => dispatchAnimation({ type: 'TOGGLE_CODE_PLAYGROUND' })}
                    >
                      <CodeBracketIcon className="w-3 h-3" />
                      {animationState.codePlaygroundOpen ? 'Close Editor' : 'Open Editor'}
                    </button>
                  </div>
                </div>
                
                {/* Interactive code playground modal */}
                {animationState.codePlaygroundOpen && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="w-3/4 h-3/4 bg-background rounded-lg shadow-2xl overflow-hidden border border-primary/20">
                      <div className="flex items-center justify-between p-4 bg-secondary">
                        <h3 className="font-medium flex items-center gap-2">
                          <CodeBracketIcon className="w-5 h-5 text-primary" />
                          Interactive Code Playground
                        </h3>
                        <button
                          className="p-1 hover:bg-foreground/10 rounded-full"
                          onClick={() => dispatchAnimation({ type: 'TOGGLE_CODE_PLAYGROUND' })}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="p-4 h-[calc(100%-4rem)] overflow-auto">
                        <CodePlayground
                          initialCode={animationState.isRtl 
                            ? codeExamples[animationState.activeTab].rtl 
                            : codeExamples[animationState.activeTab].ltr}
                          language="jsx"
                          theme="dark"
                          readOnly={false}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Interactive demos section */}
      <section 
        id="demos"
        className={`py-16 bg-primary/5 transition-all duration-700 ${
          isInView.demos ? 'opacity-100 transform-none' : 'opacity-80 translate-y-10'
        }`}
        ref={el => { sectionsRef.current.demos = el; }}
      >
        <div className="container mx-auto px-4">
          <h2 
            className={`text-2xl font-bold mb-8 text-center transition-all duration-700 ${
              isInView.demos ? 'opacity-100 transform-none' : 'opacity-0 translate-y-5'
            }`}
          >
            Interactive Demos
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {interactiveDemos.map((demo, index) => (
              <button
                key={index}
                className={`px-4 py-3 rounded-lg ${
                  animationState.activeDemoIndex === index 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-secondary hover:bg-secondary/80'
                } transition-all`}
                onClick={() => {
                  dispatchAnimation({ type: 'SET_DEMO', payload: index });
                  // Open documentation if available
                  if (demo.link && index !== animationState.activeDemoIndex) {
                    window.open(demo.link, '_blank');
                  }
                }}
              >
                <div className="flex items-center gap-2">
                  {demo.icon}
                  {demo.title}
                </div>
              </button>
            ))}
          </div>
          
          <div className="bg-background rounded-lg shadow-lg overflow-hidden border border-primary/10">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                {interactiveDemos[animationState.activeDemoIndex].icon}
                {interactiveDemos[animationState.activeDemoIndex].title}
              </h3>
              <p className="mb-4 text-foreground/70">
                {interactiveDemos[animationState.activeDemoIndex].description}
              </p>
              
              <div className="flex items-center justify-center p-8 border-2 border-dashed border-primary/20 rounded-lg min-h-[300px] bg-secondary/30">
                {/* Interactive demo content based on selected demo */}
                {animationState.activeDemoIndex === 0 && (
                  <div className="text-center">
                    <h4 className="text-lg font-medium mb-4">Virtual DOM Visualization</h4>
                    <p className="mb-6 max-w-lg mx-auto text-sm">
                      Frontend Hamroun&apos;s Virtual DOM algorithm efficiently updates only the parts of the DOM that actually change, 
                      minimizing browser reflows and repaints.
                    </p>
                    <div className="flex flex-col items-center gap-4">
                      <div className="grid grid-cols-3 gap-2">
                        {Array.from({ length: 9 }).map((_, i) => (
                          <div 
                            key={i} 
                            className={`w-16 h-16 rounded flex items-center justify-center transition-all ${
                              Math.random() > 0.7 ? 'bg-primary/20 shadow-sm animate-pulse' : 'bg-secondary'
                            }`}
                          >
                            {i + 1}
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-foreground/60 italic mt-2">
                        Only highlighted nodes are being updated
                      </div>
                    </div>
                  </div>
                )}
                
                {animationState.activeDemoIndex === 1 && (
                  <div className="text-center">
                    <h4 className="text-lg font-medium mb-4">Hooks in Action</h4>
                    <p className="mb-6 max-w-lg mx-auto text-sm">
                      Hooks let you use state and other React features without writing classes.
                    </p>
                    
                    <Counter />
                  </div>
                )}
                
                {animationState.activeDemoIndex === 2 && (
                  <div className="text-center">
                    <h4 className="text-lg font-medium mb-4">Server Components</h4>
                    <p className="mb-6 max-w-lg mx-auto text-sm">
                      Server components render on the server, reducing bundle size and improving initial load time.
                    </p>
                    
                    <div className="flex items-center justify-center gap-8">
                      <div className="flex flex-col items-center">
                        <div className="p-3 bg-secondary rounded-lg mb-2">
                          <ServerIcon className="w-8 h-8 text-primary" />
                        </div>
                        <span className="text-sm">Server</span>
                        <div className="mt-2 h-20 w-1 bg-primary/20"></div>
                      </div>
                      
                      <div className="w-64 p-4 rounded-lg border border-primary/20 bg-background">
                        <div className="h-4 w-3/4 bg-secondary rounded mb-2"></div>
                        <div className="h-4 w-1/2 bg-secondary rounded mb-2"></div>
                        <div className="h-10 w-full bg-secondary rounded mb-2"></div>
                        <div className="h-4 w-2/3 bg-secondary rounded"></div>
                        <div className="mt-2 text-xs text-center text-foreground/60">
                          Pre-rendered HTML
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div className="p-3 bg-secondary rounded-lg mb-2">
                          <WindowIcon className="w-8 h-8 text-accent" />
                        </div>
                        <span className="text-sm">Client</span>
                        <div className="mt-2 h-20 w-1 bg-accent/20"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start Section with enhanced UI */}
      <section 
        id="getting-started" 
        className={`py-20 bg-gradient-to-b from-background/50 to-secondary/30 arabic-pattern-2 relative transition-all duration-700 ${
          isInView.gettingStarted ? 'opacity-100 transform-none' : 'opacity-80 translate-y-10'
        }`}
        ref={el => { sectionsRef.current.gettingStarted = el; }}
      >
        <RevealOnScroll threshold={0.1}>
          <div className={`container mx-auto px-4 transition-all duration-1000 ${
            isInView.gettingStarted ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
          }`}>
            <div className="flex flex-col md:flex-row gap-8 items-center mb-12">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">
                  <RocketLaunchIcon className="w-7 h-7 text-primary" />
                  Get Started in Seconds
                </h2>
                <p className="text-lg text-foreground/80">
                  Start building with Frontend Hamroun in just a few simple steps. No complex configuration required.
                </p>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4 p-3 rounded-lg hover:bg-background/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                  <div>Install the CLI</div>
                </div>
                <div className="flex items-center gap-4 mb-4 p-3 rounded-lg hover:bg-background/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                  <div>Create a new project</div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-background/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">3</div>
                  <div>Start coding</div>
                </div>
              </div>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="mb-8 code-block overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all">
                <div className="bg-black/80 text-white p-2 flex items-center">
                  <CommandLineIcon className="w-5 h-5 mr-2" />
                  <span>Terminal</span>
                  {/* Copy button */}
                  <button 
                    className="ml-auto px-2 py-1 text-xs bg-primary/20 hover:bg-primary/30 rounded text-primary"
                    onClick={() => {
                      navigator.clipboard.writeText("npx create-frontend-app my-app");
                      dispatchAnimation({ 
                        type: 'INCREMENT_INTERACTION', 
                        payload: 'copy-command' 
                      });
                    }}
                  >
                    Copy
                  </button>
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
                  <button 
                    className="ml-auto px-2 py-1 text-xs bg-primary/20 hover:bg-primary/30 rounded text-primary"
                    onClick={() => navigator.clipboard.writeText("cd my-app\nnpm install\nnpm run dev")}
                  >
                    Copy
                  </button>
                </div>
                <pre className="bg-black text-green-400 p-4 overflow-x-auto font-mono text-sm"><code>{`cd my-app
npm install
npm run dev`}</code></pre>
              </div>

              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <AcademicCapIcon className="w-6 h-6 text-primary" />
                Basic Usage
              </h3>

              <div className="code-block overflow-hidden rounded-lg shadow-lg">
                <div className="bg-black/80 text-white p-2 flex items-center">
                  <DocumentTextIcon className="w-5 h-5 mr-2" />
                  <span>App.jsx</span>
                  <button 
                    className="ml-auto px-2 py-1 text-xs bg-primary/20 hover:bg-primary/30 rounded text-primary"
                    onClick={() => {
                      const code = `import { render, useState } from 'frontend-hamroun';

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

render(<App />, document.getElementById('root'));`;
                      navigator.clipboard.writeText(code);
                    }}
                  >
                    Copy
                  </button>
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
            
            {/* Enhanced interactive stats counter with animations */}
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

      {/* Features Section with enhanced cards */}
      <section 
        id="features" 
        className={`py-24 transition-all duration-700 ${
          isInView.features ? 'opacity-100 transform-none' : 'opacity-80 translate-y-10'
        }`}
        ref={el => { sectionsRef.current.features = el; }}
      >
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <div className={`text-center mb-16 transition-all duration-1000 ${
              isInView.features ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
            }`}>
              <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-xl max-w-2xl mx-auto text-foreground/70">
                Everything you need to build modern web applications, all in one lightweight package.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Enhanced feature card styling */}
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
        className={`py-20 bg-primary/5 transition-all duration-700 ${
          isInView.community ? 'opacity-100 transform-none' : 'opacity-80 translate-y-10'
        }`}
        ref={el => { sectionsRef.current.community = el; }}
      >
        <div className="container mx-auto px-4">
          <h2 
            className={`text-3xl font-bold text-center mb-12 transition-all duration-700 ${
              isInView.community ? 'opacity-100 transform-none' : 'opacity-0 translate-y-5'
            }`}
          >
            One Culture, One Community
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Community content cards */}
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
                className={`bg-background rounded-lg p-6 shadow-md transition-all duration-1000`}
                style={{
                  opacity: isInView.community ? 1 : 0,
                  transform: isInView.community ? 'none' : 'translateY(20px)',
                  transitionDelay: `${index * 150}ms`
                }}
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-primary">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </div>
            ))}
          </div>
          
          <div 
            className={`mt-16 text-center transition-all duration-1000 delay-500 ${
              isInView.community ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
            }`}
          >
            <a 
              href="https://discord.gg/hamroun-framework" 
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
      
      {/* Call to Action with interactive elements */}
      <section 
        id="cta"
        className={`py-16 culture-gradient relative overflow-hidden transition-all duration-700 ${
          isInView.cta ? 'opacity-100' : 'opacity-80'
        }`}
        ref={el => { sectionsRef.current.cta = el; }}
      >
        <div 
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiLz48cGF0aCBkPSJNMTAgMTBoMjB2MjBIMTB6IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==')]"
          style={{ 
            backgroundPosition: `${scrollPosition * 0.05}px ${scrollPosition * 0.05}px`,
            opacity: 0.1
          }}
        ></div>
        
        <RevealOnScroll>
          <div className="container mx-auto px-4 text-center relative">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Join the Frontend Hamroun Culture?</h2>
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
            
            {/* Enhanced floating spheres with mouse parallax */}
            <div 
              className="absolute w-10 h-10 rounded-full bg-white/10 top-10 left-[20%] animate-float" 
              style={{ 
                animationDelay: '0.2s',
                transform: `translate(${(mousePosition.x - 0.5) * 15}px, ${(mousePosition.y - 0.5) * 15}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            ></div>
            <div 
              className="absolute w-16 h-16 rounded-full bg-white/10 bottom-20 right-[30%] animate-float" 
              style={{ 
                animationDelay: '1.5s',
                transform: `translate(${(mousePosition.x - 0.5) * -20}px, ${(mousePosition.y - 0.5) * -20}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            ></div>
            <div 
              className="absolute w-8 h-8 rounded-full bg-white/10 top-[40%] right-[10%] animate-float" 
              style={{ 
                animationDelay: '0.7s',
                transform: `translate(${(mousePosition.x - 0.5) * 10}px, ${(mousePosition.y - 0.5) * 10}px)`,
                transition: 'transform 0.3s ease-out'
              }}
            ></div>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}

// Interactive counter component for demos
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="inline-block">
      <div className="p-4 bg-background rounded-lg shadow-md border border-primary/10">
        <p className="text-lg mb-4">Count: <span className="font-bold">{count}</span></p>
        <div className="flex gap-2 justify-center">
          <button 
            className="px-3 py-1 bg-primary/10 hover:bg-primary/20 rounded"
            onClick={() => setCount(c => c - 1)}
          >
            -
          </button>
          <button 
            className="px-3 py-1 bg-primary text-white hover:bg-primary-dark rounded"
            onClick={() => setCount(c => c + 1)}
          >
            +
          </button>
          <button 
            className="px-3 py-1 bg-secondary hover:bg-secondary/80 rounded text-xs"
            onClick={() => setCount(0)}
          >
            Reset
          </button>
        </div>
        <div className="mt-4 text-xs text-foreground/60">
          <pre className="p-2 bg-secondary/40 rounded overflow-x-auto">
            {`const [count, setCount] = useState(${count});`}
          </pre>
        </div>
      </div>
    </div>
  );
}
