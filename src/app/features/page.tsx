'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  CodeBracketIcon, 
  CpuChipIcon,
  RocketLaunchIcon,
  CubeTransparentIcon,
  ArrowPathIcon,
  GlobeAltIcon,
  ServerIcon,
  PuzzlePieceIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
  ComputerDesktopIcon,
  CursorArrowRaysIcon,
  BeakerIcon
} from '@heroicons/react/24/outline';
import { 
  FireIcon,
  BoltIcon,
  SparklesIcon
} from '@heroicons/react/24/solid';
import RevealOnScroll from '@/components/RevealOnScroll';
import FloatingCard from '@/components/FloatingCard';
import CodePlayground from '@/components/CodePlayground';
import GlowButton from '@/components/GlowButton';

type Feature = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  code?: string;
  benefits: string[];
  learnMoreUrl: string;
};

export default function FeaturesPage() {
  const [activeFeature, setActiveFeature] = useState<string>('virtual-dom');
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'comparison'>('overview');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  // Core features data
  const features: Feature[] = [
    {
      id: 'virtual-dom',
      title: 'Virtual DOM',
      description: 'Frontend Hamroun uses a lightweight Virtual DOM implementation that efficiently updates only what has changed in your UI. This minimizes expensive DOM manipulations and keeps your application fast even with complex UIs.',
      icon: <CubeTransparentIcon className="w-6 h-6" />,
      code: `// How Virtual DOM works in Frontend Hamroun
const vdom = createElement('div', { className: 'container' }, [
  createElement('h1', {}, ['Hello, World']),
  createElement('p', {}, ['Using Virtual DOM for efficient updates'])
]);

// When state changes, only affected nodes are updated
function updateUI(newState) {
  const newVdom = renderComponent(App, newState);
  const patches = diff(previousVdom, newVdom);
  patch(domNode, patches);
  previousVdom = newVdom;
}`,
      benefits: [
        'Optimized rendering performance',
        'Efficient DOM updates',
        'Reduced browser reflows and repaints',
        'Automatic batching of updates'
      ],
      learnMoreUrl: '/docs/concepts/virtual-dom'
    },
    {
      id: 'hooks',
      title: 'Hooks API',
      description: 'Write reusable, stateful logic with our intuitive Hooks API. Manage component state, side effects, context, and more with simple function calls that work seamlessly with the component lifecycle.',
      icon: <ArrowPathIcon className="w-6 h-6" />,
      code: `import { useState, useEffect, useMemo } from 'frontend-hamroun';

function UserProfile({ userId }) {
  // State management with useState
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Side effects with useEffect
  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const data = await api.getUser(userId);
      setUser(data);
      setLoading(false);
    }
    fetchUser();
  }, [userId]);
  
  // Computed values with useMemo
  const fullName = useMemo(() => {
    return user ? \`\${user.firstName} \${user.lastName}\` : '';
  }, [user]);
  
  return loading ? <Loading /> : <Profile name={fullName} />;
}`,
      benefits: [
        'Simple state management',
        'Predictable side-effect handling',
        'Reusable logic across components',
        'Improved code organization'
      ],
      learnMoreUrl: '/docs/api/hooks'
    },
    {
      id: 'server-components',
      title: 'Server Components',
      description: 'Build faster applications with server-side rendering that seamlessly integrates with client interactivity. Server components reduce bundle size and improve initial load performance.',
      icon: <ServerIcon className="w-6 h-6" />,
      code: `// Server component that fetches data
// This code runs on the server, not the client
export default async function Dashboard() {
  // Data fetching happens on the server
  const data = await fetchDashboardData();
  
  return (
    <main>
      <h1>Welcome, {data.user.name}</h1>
      <div className="stats-grid">
        <StatCard title="Revenue" value={data.stats.revenue} />
        <StatCard title="Users" value={data.stats.users} />
        
        {/* Client component for interactive features */}
        <ClientOnly>
          <InteractiveChart data={data.chartData} />
        </ClientOnly>
      </div>
    </main>
  );
}`,
      benefits: [
        'Reduced client-side JavaScript',
        'Faster initial page loads',
        'SEO-friendly rendering',
        'Progressive enhancement'
      ],
      learnMoreUrl: '/docs/features/server-components'
    },
    {
      id: 'rtl-support',
      title: 'RTL Support',
      description: 'First-class support for right-to-left languages like Arabic, Hebrew, and Persian. Build truly international applications with proper bidirectional text handling and layout mirroring.',
      icon: <GlobeAltIcon className="w-6 h-6" />,
      code: `// RTL support is built-in and easy to use
function App({ lang }) {
  // Automatically handle RTL direction based on language
  const isRTL = ['ar', 'he', 'fa'].includes(lang);
  
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="app">
      <header>
        {/* Layout is automatically mirrored in RTL mode */}
        <Logo className="logo" />
        <Navigation items={navItems} />
      </header>
      
      <main>
        {/* Text alignment is automatically handled */}
        <Content language={lang} />
      </main>
    </div>
  );
}`,
      benefits: [
        'Automatic text alignment',
        'Mirrored layouts and components',
        'Bidirectional text handling',
        'Cultural adaptation support'
      ],
      learnMoreUrl: '/docs/features/internationalization'
    },
    {
      id: 'lightweight',
      title: 'Lightweight Core',
      description: 'Frontend Hamroun has been engineered with performance in mind, weighing in at less than 5KB gzipped for the core library. Deliver fast experiences even on slow connections and lower-end devices.',
      icon: <CpuChipIcon className="w-6 h-6" />,
      code: `// Import only what you need
import { render } from 'frontend-hamroun/core';
import { useState } from 'frontend-hamroun/hooks';

// Tree-shaking ensures unused code is eliminated
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

// Minimal runtime footprint
render(<Counter />, document.getElementById('root'));`,
      benefits: [
        'Under 5KB gzipped core size',
        'Optimal for mobile applications',
        'Fast startup times',
        'Reduced bandwidth consumption'
      ],
      learnMoreUrl: '/docs/concepts/performance'
    },
    {
      id: 'typescript',
      title: 'TypeScript Support',
      description: 'Enjoy first-class TypeScript integration with complete type definitions. Catch errors at compile time, improve developer experience, and make refactoring safer with advanced type checking.',
      icon: <CodeBracketIcon className="w-6 h-6" />,
      code: `// TypeScript integration is seamless
import { useState, useEffect } from 'frontend-hamroun';

// Type definitions for props
interface UserProfileProps {
  userId: string;
  showDetails: boolean;
  onUserUpdate?: (user: User) => void;
}

// Type definitions for state
interface User {
  id: string;
  name: string;
  email: string;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: boolean;
  }
}

export function UserProfile({ userId, showDetails, onUserUpdate }: UserProfileProps) {
  const [user, setUser] = useState<User | null>(null);
  
  // TypeScript catches errors like using user.preferences when user might be null
  const theme = user?.preferences?.theme || 'system';
  
  return (/* ... */);
}`,
      benefits: [
        'Complete type definitions',
        'Enhanced code completion',
        'Early error detection',
        'Safer refactoring'
      ],
      learnMoreUrl: '/docs/typescript'
    }
  ];
  
  // Filter the active feature
  const activeFeatureData = features.find(f => f.id === activeFeature) || features[0];
  
  // Framework comparison data
  const frameworkComparison = [
    { 
      feature: 'Bundle Size (Core)', 
      'Frontend Hamroun': '< 5KB', 
      'React': '~40KB', 
      'Vue': '~30KB', 
      'Angular': '~150KB'
    },
    { 
      feature: 'Virtual DOM', 
      'Frontend Hamroun': 'Yes', 
      'React': 'Yes', 
      'Vue': 'Yes', 
      'Angular': 'No (Uses Incremental DOM)'
    },
    { 
      feature: 'Server Components', 
      'Frontend Hamroun': 'Yes - Built-in', 
      'React': 'Yes (with Next.js)', 
      'Vue': 'Yes (with Nuxt)', 
      'Angular': 'Limited'
    },
    { 
      feature: 'RTL Support', 
      'Frontend Hamroun': 'First-Class', 
      'React': 'Via Libraries', 
      'Vue': 'Via Libraries', 
      'Angular': 'Via Libraries'
    },
    { 
      feature: 'API Learning Curve', 
      'Frontend Hamroun': 'Low', 
      'React': 'Medium', 
      'Vue': 'Low', 
      'Angular': 'High'
    },
    { 
      feature: 'TypeScript Support', 
      'Frontend Hamroun': 'Built-in', 
      'React': 'Good', 
      'Vue': 'Good', 
      'Angular': 'Excellent'
    },
    { 
      feature: 'Rendering Performance', 
      'Frontend Hamroun': 'Excellent', 
      'React': 'Good', 
      'Vue': 'Very Good', 
      'Angular': 'Good'
    }
  ];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
            <SparklesIcon className="w-5 h-5" />
            <span>Powerful features, tiny footprint</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Features</h1>
          
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Frontend Hamroun combines powerful capabilities with an ultra-lightweight core,
            giving you everything you need to build modern web applications without the bloat.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <GlowButton
              href="/docs/getting-started"
              className="px-6 py-3 rounded-full"
            >
              Get Started
            </GlowButton>
            
            <Link 
              href="https://github.com/hamroun/frontend-hamroun"
              className="btn-secondary px-6 py-3 rounded-full flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              GitHub
            </Link>
          </div>
          
          {/* Feature stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-background/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-primary/10">
              <div className="flex items-center justify-center mb-2">
                <CpuChipIcon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold">5KB</div>
              <div className="text-sm text-foreground/70">Core Bundle Size</div>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-primary/10">
              <div className="flex items-center justify-center mb-2">
                <BoltIcon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold">92ms</div>
              <div className="text-sm text-foreground/70">Avg Render Time</div>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-primary/10">
              <div className="flex items-center justify-center mb-2">
                <CodeBracketIcon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold">100%</div>
              <div className="text-sm text-foreground/70">TypeScript Coverage</div>
            </div>
            
            <div className="bg-background/70 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-primary/10">
              <div className="flex items-center justify-center mb-2">
                <GlobeAltIcon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-3xl font-bold">RTL</div>
              <div className="text-sm text-foreground/70">First-Class Support</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Tab Navigation */}
      <section className="bg-secondary/20 backdrop-blur-sm sticky top-16 z-10 py-4">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex bg-background/70 rounded-lg p-1 shadow-sm">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'overview' ? 'bg-primary text-white' : 'hover:bg-primary/5'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'features' ? 'bg-primary text-white' : 'hover:bg-primary/5'
                }`}
                onClick={() => setActiveTab('features')}
              >
                Core Features
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'comparison' ? 'bg-primary text-white' : 'hover:bg-primary/5'
                }`}
                onClick={() => setActiveTab('comparison')}
              >
                Framework Comparison
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Overview Tab Content */}
      {activeTab === 'overview' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <RevealOnScroll>
                <h2 className="text-3xl font-bold text-center mb-12">Why Frontend Hamroun?</h2>
              </RevealOnScroll>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                <RevealOnScroll>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                      <CpuChipIcon className="w-6 h-6 text-primary" /> 
                      Lightweight Performance
                    </h3>
                    <p className="mb-4 text-foreground/80 leading-relaxed">
                      Frontend Hamroun is engineered for exceptional performance without sacrificing developer experience. 
                      At less than 5KB gzipped, the core library delivers all the essential features of a modern framework 
                      with minimal overhead.
                    </p>
                    <p className="text-foreground/80 leading-relaxed">
                      The framework&apos;s optimized Virtual DOM implementation ensures that UI updates are fast and efficient, 
                      minimizing browser reflows and keeping your application responsive even on lower-end devices.
                    </p>
                  </div>
                </RevealOnScroll>
                
                <RevealOnScroll delay={100}>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                      <GlobeAltIcon className="w-6 h-6 text-primary" />
                      Cultural Integration
                    </h3>
                    <p className="mb-4 text-foreground/80 leading-relaxed">
                      Built with cross-cultural development in mind, Frontend Hamroun offers first-class support for 
                      right-to-left languages and internationalization features out of the box.
                    </p>
                    <p className="text-foreground/80 leading-relaxed">
                      Develop applications that seamlessly serve global audiences with proper bidirectional text handling, 
                      cultural adaptations, and localized components. Design once and deploy everywhere with confidence.
                    </p>
                  </div>
                </RevealOnScroll>
                
                <RevealOnScroll delay={200}>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                      <PuzzlePieceIcon className="w-6 h-6 text-primary" />
                      Modern Developer Experience
                    </h3>
                    <p className="mb-4 text-foreground/80 leading-relaxed">
                      Enjoy an intuitive developer experience with a familiar component model and hooks API that makes 
                      building complex applications straightforward and maintainable.
                    </p>
                    <p className="text-foreground/80 leading-relaxed">
                      Complete TypeScript integration, comprehensive documentation, and developer tools help you 
                      work efficiently and confidently while reducing errors and improving code quality.
                    </p>
                  </div>
                </RevealOnScroll>
                
                <RevealOnScroll delay={300}>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                      <ServerIcon className="w-6 h-6 text-primary" />
                      Full-Stack Integration
                    </h3>
                    <p className="mb-4 text-foreground/80 leading-relaxed">
                      Seamlessly integrate server and client components for optimal performance and user experience. 
                      Server components reduce client-side JavaScript while maintaining rich interactivity where needed.
                    </p>
                    <p className="text-foreground/80 leading-relaxed">
                      Progressive enhancement and hybrid rendering strategies let you build applications that are 
                      fast, SEO-friendly, and accessible to users on all connection speeds.
                    </p>
                  </div>
                </RevealOnScroll>
              </div>
              
              {/* Key principles */}
              <RevealOnScroll>
                <h2 className="text-3xl font-bold text-center mb-8">Core Principles</h2>
              </RevealOnScroll>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {[
                  {
                    title: 'Performance First',
                    description: 'Optimized rendering, minimal overhead, and efficient updates are central to the framework design.',
                    icon: <RocketLaunchIcon className="w-6 h-6" />,
                  },
                  {
                    title: 'Cultural Inclusivity',
                    description: 'Built for global audiences with RTL support, localization, and cultural adaptations as core features.',
                    icon: <GlobeAltIcon className="w-6 h-6" />,
                  },
                  {
                    title: 'Developer Joy',
                    description: 'Intuitive APIs, complete TypeScript support, and excellent documentation make development enjoyable.',
                    icon: <SparklesIcon className="w-6 h-6" />,
                  },
                ].map((principle, index) => (
                  <RevealOnScroll key={index} delay={index * 100}>
                    <div className="bg-background/60 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary/10">
                      <div className="bg-primary/10 text-primary w-12 h-12 rounded-full flex items-center justify-center mb-4">
                        {principle.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{principle.title}</h3>
                      <p className="text-foreground/70">{principle.description}</p>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
              
              {/* Use cases */}
              <RevealOnScroll>
                <h2 className="text-3xl font-bold text-center mb-8">Perfect For</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      title: 'Web Applications',
                      icon: <ComputerDesktopIcon className="w-8 h-8" />,
                      description: 'Complex, interactive web apps'
                    },
                    {
                      title: 'Global Products',
                      icon: <GlobeAltIcon className="w-8 h-8" />,
                      description: 'Multi-language, cross-cultural sites'
                    },
                    {
                      title: 'Performance-Critical',
                      icon: <BoltIcon className="w-8 h-8" />,
                      description: 'Speed-sensitive applications'
                    },
                    {
                      title: 'Full-Stack Projects',
                      icon: <ServerIcon className="w-8 h-8" />,
                      description: 'Integrated front and back-end'
                    }
                  ].map((useCase, index) => (
                    <RevealOnScroll key={index} delay={index * 100}>
                      <div className="bg-background/60 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary/10 text-center">
                        <div className="bg-primary/10 text-primary w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                          {useCase.icon}
                        </div>
                        <h3 className="font-semibold mb-2">{useCase.title}</h3>
                        <p className="text-sm text-foreground/70">{useCase.description}</p>
                      </div>
                    </RevealOnScroll>
                  ))}
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      )}
      
      {/* Core Features Tab Content */}
      {activeTab === 'features' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
              {/* Feature navigation sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-background/60 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-primary/10 sticky top-32">
                  <h3 className="font-semibold mb-4 text-primary">Core Features</h3>
                  <nav>
                    <ul className="space-y-1">
                      {features.map(feature => (
                        <li key={feature.id}>
                          <button
                            className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-2 text-sm ${
                              activeFeature === feature.id 
                                ? 'bg-primary text-white' 
                                : 'hover:bg-secondary/60'
                            }`}
                            onClick={() => setActiveFeature(feature.id)}
                          >
                            {feature.icon}
                            <span>{feature.title}</span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
              
              {/* Feature detail content */}
              <div className="lg:col-span-4">
                <RevealOnScroll>
                  <FloatingCard className="p-6">
                    <div className="bg-primary/10 text-primary w-14 h-14 rounded-full flex items-center justify-center mb-6">
                      {activeFeatureData.icon}
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-4">{activeFeatureData.title}</h2>
                    
                    <p className="text-lg mb-8 text-foreground/80 leading-relaxed">
                      {activeFeatureData.description}
                    </p>
                    
                    {/* Code example */}
                    {activeFeatureData.code && (
                      <div className="mb-8 overflow-hidden rounded-lg">
                        <div className="bg-black/80 text-white p-2 flex items-center">
                          <CodeBracketIcon className="w-5 h-5 mr-2" />
                          <span>Code Example</span>
                        </div>
                        <pre className="bg-[#1e1e1e] text-white p-4 overflow-x-auto font-mono text-sm leading-6">
                          <code>{activeFeatureData.code}</code>
                        </pre>
                      </div>
                    )}
                    
                    {/* Benefits */}
                    <div className="mb-8">
                      <h3 className="font-semibold text-xl mb-4">Key Benefits</h3>
                      <ul className="space-y-3">
                        {activeFeatureData.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircleIcon className="w-6 h-6 text-primary flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex justify-end">
                      <Link 
                        href={activeFeatureData.learnMoreUrl}
                        className="inline-flex items-center gap-2 text-primary hover:underline"
                      >
                        Learn more about {activeFeatureData.title}
                        <ChevronRightIcon className="w-5 h-5" />
                      </Link>
                    </div>
                  </FloatingCard>
                </RevealOnScroll>
                
                {/* Interactive demo section */}
                <RevealOnScroll delay={200}>
                  <div className="mt-8 bg-secondary/10 rounded-xl p-8 border border-primary/10">
                    <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                      <CursorArrowRaysIcon className="w-6 h-6 text-primary" />
                      Interactive Demo
                    </h3>
                    
                    <div className="h-64 flex items-center justify-center bg-background/40 rounded-lg border border-primary/10">
                      <div className="text-foreground/50">
                        {activeFeature === 'virtual-dom' && (
                          <div className="text-center">
                            <h4 className="font-medium mb-2">Virtual DOM Demo</h4>
                            <p className="max-w-md mx-auto text-sm mb-4">
                              Interactive visualization showing how Virtual DOM efficiently updates only changed elements
                            </p>
                            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                              {Array.from({ length: 9 }).map((_, i) => (
                                <div 
                                  key={i} 
                                  className={`w-16 h-16 rounded flex items-center justify-center transition-all ${
                                    Math.random() > 0.7 ? 'bg-primary/20 shadow-sm animate-pulse' : 'bg-background/70'
                                  }`}
                                >
                                  {i + 1}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {activeFeature === 'hooks' && (
                          <div className="text-center">
                            <h4 className="font-medium mb-2">Hooks API Demo</h4>
                            {/* Demo component would go here */}
                            <p className="text-sm">Interactive hooks example coming soon</p>
                          </div>
                        )}
                        
                        {activeFeature === 'server-components' && (
                          <div className="text-center">
                            <h4 className="font-medium mb-2">Server Components Demo</h4>
                            {/* Demo component would go here */}
                            <p className="text-sm">Server component visualization coming soon</p>
                          </div>
                        )}
                        
                        {activeFeature === 'rtl-support' && (
                          <div className="text-center">
                            <h4 className="font-medium mb-2">RTL Support Demo</h4>
                            <div className="flex justify-center gap-8">
                              <div className="border border-primary/20 p-4 rounded-lg">
                                <div className="text-left mb-2 font-mono text-xs">dir="ltr"</div>
                                <div className="flex justify-between border-b pb-2 mb-2">
                                  <div>Logo</div>
                                  <div>Menu</div>
                                </div>
                                <div className="text-left">Left-to-right content</div>
                              </div>
                              
                              <div className="border border-primary/20 p-4 rounded-lg">
                                <div className="text-left mb-2 font-mono text-xs">dir="rtl"</div>
                                <div className="flex justify-between border-b pb-2 mb-2">
                                  <div>Menu</div>
                                  <div>Logo</div>
                                </div>
                                <div className="text-right">Right-to-left content</div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {activeFeature === 'lightweight' && (
                          <div className="text-center">
                            <h4 className="font-medium mb-2">Size Comparison</h4>
                            <div className="flex items-end h-48 gap-4 justify-center">
                              <div className="flex flex-col items-center">
                                <div className="bg-primary h-16 w-12 rounded-t"></div>
                                <div className="mt-2 text-xs">Hamroun</div>
                                <div className="text-xs font-semibold">5KB</div>
                              </div>
                              
                              <div className="flex flex-col items-center">
                                <div className="bg-secondary h-40 w-12 rounded-t"></div>
                                <div className="mt-2 text-xs">React</div>
                                <div className="text-xs font-semibold">40KB</div>
                              </div>
                              
                              <div className="flex flex-col items-center">
                                <div className="bg-secondary h-32 w-12 rounded-t"></div>
                                <div className="mt-2 text-xs">Vue</div>
                                <div className="text-xs font-semibold">30KB</div>
                              </div>
                              
                              <div className="flex flex-col items-center">
                                <div className="bg-secondary h-96 w-12 rounded-t"></div>
                                <div className="mt-2 text-xs">Angular</div>
                                <div className="text-xs font-semibold">150KB</div>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {activeFeature === 'typescript' && (
                          <div className="text-center">
                            <h4 className="font-medium mb-2">TypeScript Integration</h4>
                            <div className="bg-black/80 rounded p-4 text-left">
                              <pre className="text-sm font-mono text-green-400">
                                <code>


</code>
                              </pre>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Framework Comparison Tab Content */}
      {activeTab === 'comparison' && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <RevealOnScroll>
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-4">Framework Comparison</h2>
                <p className="text-center text-lg text-foreground/70 max-w-3xl mx-auto mb-12">
                  See how Frontend Hamroun compares to other popular JavaScript frameworks across key metrics
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="text-left p-4 bg-secondary/30 border-b border-primary/10">Feature</th>
                        <th className="p-4 bg-primary/10 border-b border-primary/10 text-primary">Frontend Hamroun</th>
                        <th className="p-4 bg-secondary/30 border-b border-primary/10">React</th>
                        <th className="p-4 bg-secondary/30 border-b border-primary/10">Vue</th>
                        <th className="p-4 bg-secondary/30 border-b border-primary/10">Angular</th>
                      </tr>
                    </thead>
                    <tbody>
                      {frameworkComparison.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-background/50' : 'bg-background/20'}>
                          <td className="p-4 border-b border-primary/5 font-medium">{row.feature}</td>
                          <td className="p-4 border-b border-primary/5 bg-primary/5 text-center">{row['Frontend Hamroun']}</td>
                          <td className="p-4 border-b border-primary/5 text-center">{row['React']}</td>
                          <td className="p-4 border-b border-primary/5 text-center">{row['Vue']}</td>
                          <td className="p-4 border-b border-primary/5 text-center">{row['Angular']}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-2xl font-semibold mb-6 text-center">Why Choose Frontend Hamroun?</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-background/60 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary/10">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <ArrowDownTrayIcon className="w-5 h-5 text-primary" />
                        Smaller Bundle Size
                      </h4>
                      <p className="text-foreground/70 mb-4">
                        Frontend Hamroun delivers essential features with a fraction of the code. A smaller footprint means 
                        faster loading times, especially on mobile networks and lower-end devices.
                      </p>
                      <div className="text-sm text-primary">
                        Up to 87% smaller than Angular, 88% smaller than React
                      </div>
                    </div>
                    
                    <div className="bg-background/60 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary/10">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <ClockIcon className="w-5 h-5 text-primary" />
                        Better Performance
                      </h4>
                      <p className="text-foreground/70 mb-4">
                        Optimized rendering pipeline and efficient update mechanisms make Frontend Hamroun exceptionally 
                        fast for complex UIs with frequent updates.
                      </p>
                      <div className="text-sm text-primary">
                        Benchmark results show 15-30% faster rendering than alternatives
                      </div>
                    </div>
                    
                    <div className="bg-background/60 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary/10">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <GlobeAltIcon className="w-5 h-5 text-primary" />
                        First-Class RTL Support
                      </h4>
                      <p className="text-foreground/70 mb-4">
                        Build truly international applications with built-in RTL support. No additional libraries required for 
                        properly handling bidirectional text and mirrored layouts.
                      </p>
                      <div className="text-sm text-primary">
                        The only framework with RTL support in its core
                      </div>
                    </div>
                    
                    <div className="bg-background/60 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-primary/10">
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <ChatBubbleLeftRightIcon className="w-5 h-5 text-primary" />
                        Cultural Integration
                      </h4>
                      <p className="text-foreground/70 mb-4">
                        Designed from the beginning with cross-cultural applications in mind, making it the perfect choice for 
                        applications that need to work seamlessly across different languages and cultural contexts.
                      </p>
                      <div className="text-sm text-primary">
                        Deeply integrated cultural awareness in core components
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 text-center">
                  <p className="text-foreground/70 mb-8">
                    Ready to experience the difference for yourself?
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <GlowButton
                      href="/docs/getting-started"
                      className="px-6 py-3 rounded-full"
                    >
                      <RocketLaunchIcon className="w-5 h-5 mr-2" />
                      Get Started
                    </GlowButton>
                    
                    <Link 
                      href="/examples"
                      className="bg-secondary hover:bg-secondary/80 px-6 py-3 rounded-full flex items-center gap-2 transition-colors"
                    >
                      <BeakerIcon className="w-5 h-5" />
                      See Examples
                    </Link>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      )}
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/30 to-accent/30 text-white">
        <div className="container mx-auto px-4 text-center">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold mb-6">Ready to Try Frontend Hamroun?</h2>
            <p className="text-xl max-w-3xl mx-auto mb-8">
              Experience the perfect balance of performance, simplicity, and cultural awareness in a modern web framework.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/docs/getting-started"
                className="bg-white text-primary hover:bg-white/90 px-8 py-3 rounded-full flex items-center gap-2 transition-colors font-medium"
              >
                <RocketLaunchIcon className="w-5 h-5" />
                Get Started
              </Link>
              
              <Link 
                href="https://github.com/hamroun/frontend-hamroun"
                className="bg-transparent border border-white hover:bg-white/10 px-8 py-3 rounded-full flex items-center gap-2 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CodeBracketIcon className="w-5 h-5" />
                View Source
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
