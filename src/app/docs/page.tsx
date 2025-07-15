'use client';

import React from 'react';
import { 
  CodeBracketIcon, 
  ServerIcon, 
  BookOpenIcon,
  CpuChipIcon,
  ArrowPathIcon,
  CubeTransparentIcon,
  CloudArrowDownIcon,
  PuzzlePieceIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

import RevealOnScroll from '@/components/RevealOnScroll';
import InteractiveDemo from '@/components/InteractiveDemo';
import FAQAccordion from '@/components/FAQAccordion';
import GlowButton from '@/components/GlowButton';
import AnimatedGradientText from '@/components/AnimatedGradientText';
import Interactive3DIcon from '@/components/Interactive3DIcon';
import HoverCard from '@/components/HoverCard';
import AnimatedCounter from '@/components/AnimatedCounter';

export default function DocsPage() {
  // FAQ items for the documentation
  const faqItems = [
    {
      question: "How does Baraqex compare to React and other frameworks?",
      answer: (
        <div className="space-y-2">
          <p>Baraqex is built on Frontend Hamroun but provides a complete full-stack solution:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Complete full-stack framework vs frontend-only libraries</li>
            <li>Built-in server-side rendering and API routing</li>
            <li>Integrated database support and authentication</li>
            <li>WebAssembly integration for high-performance computing</li>
            <li>Simplified API with React-like paradigms</li>
            <li>Built-in support for TypeScript and modern tooling</li>
          </ul>
        </div>
      )
    },
    {
      question: "Can I use npm packages with Baraqex?",
      answer: "Yes, Baraqex is fully compatible with the npm ecosystem. You can use any utility libraries, UI components, and tools. The framework provides browser and server builds, so package compatibility is automatic based on your environment."
    },
    {
      question: "Is Baraqex production-ready?",
      answer: "Baraqex is built on the stable Frontend Hamroun foundation and adds production-grade server capabilities. It includes features like database connections, authentication, API routing, and WebAssembly support that are essential for modern web applications."
    },
    {
      question: "How do I handle data fetching and API calls?",
      answer: "Baraqex provides multiple data fetching approaches: client-side with useEffect and fetch, server-side rendering with automatic data fetching, built-in API routing system, and database integration with connection pooling for optimal performance."
    },
    {
      question: "What databases does Baraqex support?",
      answer: "Baraqex has built-in support for MongoDB, MySQL, and PostgreSQL. The framework provides connection pooling, query optimization, and simple configuration for all supported databases."
    },
    {
      question: "How does WebAssembly integration work?",
      answer: "Baraqex provides seamless Go WebAssembly integration. You can write performance-critical code in Go, compile it to WebAssembly, and call it directly from JavaScript with automatic type conversion and memory management."
    }
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Documentation Header */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-64 bg-primary/5 rounded-full blur-3xl transform -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-full h-64 bg-accent/5 rounded-full blur-3xl transform translate-y-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <RevealOnScroll>
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex justify-center mb-6">
                <Interactive3DIcon 
                  icon={<BookOpenIcon />} 
                  size={80} 
                  bgColor="var(--primary)" 
                  rounded="lg"
                />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <AnimatedGradientText 
                  text="Baraqex Documentation" 
                  fontSize="inherit" 
                  fontWeight="inherit"
                />
              </h1>
              
              <p className="text-xl text-foreground/80 mb-8">
                A comprehensive guide to building modern full-stack web applications with the Baraqex framework
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <GlowButton href="#features" size="lg">
                  Explore Features
                </GlowButton>
                <GlowButton href="#interactive-demo" variant="subtle" size="lg">
                  Try Interactive Demo
                </GlowButton>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Framework stats */}
      <section className="py-12 border-b border-primary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <RevealOnScroll>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter end={5} suffix="KB" />
                </div>
                <p className="text-foreground/60">Minified + gzipped</p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={100}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter end={99} suffix="%" />
                </div>
                <p className="text-foreground/60">Lighthouse score</p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter end={100} suffix="+" />
                </div>
                <p className="text-foreground/60">Components & hooks</p>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={300}>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter end={20} suffix="+" />
                </div>
                <p className="text-foreground/60">Starter templates</p>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold mb-12 text-center">
              Complete Framework Features
            </h2>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            {[
              {
                icon: <CpuChipIcon />,
                title: "Lightweight Core",
                description: "Less than 5KB gzipped with all the essential runtime features for building modern applications."
              },
              {
                icon: <CubeTransparentIcon />,
                title: "Virtual DOM",
                description: "Efficient diffing algorithm with batched updates for optimal rendering performance."
              },
              {
                icon: <PuzzlePieceIcon />,
                title: "Hooks API",
                description: "Complete hooks system including useState, useEffect, useMemo, useContext, useReducer, and more."
              },
              {
                icon: <ServerIcon />,
                title: "Server Features",
                description: "Built-in server with API routes, database connectors, and server-side rendering capabilities."
              },
              {
                icon: <ArrowPathIcon />,
                title: "State Management",
                description: "Context API, stores, and signals for simple and powerful state management across components."
              },
              {
                icon: <CloudArrowDownIcon />,
                title: "Data Fetching",
                description: "Simple data fetching with built-in caching, revalidation, and optimistic updates."
              },
              {
                icon: <CodeBracketIcon />,
                title: "Developer Tools",
                description: "Powerful CLI, component debugger, and DevTools integration for productive development."
              },
              {
                icon: <ShieldCheckIcon />,
                title: "Security",
                description: "Built-in authentication, CSRF protection, and automatic input sanitization."
              },
              {
                icon: <BookOpenIcon />,
                title: "Comprehensive Docs",
                description: "Extensive documentation with guides, API references, and interactive examples."
              },
            ].map((feature, index) => (
              <RevealOnScroll key={feature.title} delay={index * 100}>
                <HoverCard 
                  className="p-6 h-full bg-background/50" 
                  border 
                  intensity={10}
                >
                  <div className="mb-4">
                    <Interactive3DIcon 
                      icon={feature.icon} 
                      size={50}
                      bgColor="var(--primary)"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </HoverCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section id="interactive-demo" className="py-16 bg-gradient-to-t from-background/50 to-secondary/30">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold mb-4 text-center">
              Interactive Examples
            </h2>
            <p className="text-xl text-center text-foreground/70 mb-12 max-w-3xl mx-auto">
              Explore Frontend Hamroun&apos;s features through interactive code examples that demonstrate its capabilities
            </p>
          </RevealOnScroll>

          <RevealOnScroll>
            <InteractiveDemo className="mb-16" />
          </RevealOnScroll>
        </div>
      </section>

      {/* Installation Section */}
      <section id="installation" className="py-16">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold mb-8 text-center">Getting Started</h2>
          </RevealOnScroll>

          <div className="max-w-3xl mx-auto">
            <RevealOnScroll>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Installation</h3>
                <div className="code-block overflow-hidden rounded-lg shadow-lg">
                  <div className="bg-black/80 text-white p-2 flex items-center">
                    <span>Terminal</span>
                  </div>
                  <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 overflow-x-auto font-mono text-sm">
                    <code>npm install frontend-hamroun</code>
                  </pre>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Create a New Project</h3>
                <div className="code-block overflow-hidden rounded-lg shadow-lg">
                  <div className="bg-black/80 text-white p-2 flex items-center">
                    <span>Terminal</span>
                  </div>
                  <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 overflow-x-auto font-mono text-sm">
                    <code>npx create-frontend-app my-app</code>
                  </pre>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll>
              <div>
                <h3 className="text-2xl font-bold mb-4">Project Structure</h3>
                <div className="code-block overflow-hidden rounded-lg shadow-lg">
                  <div className="bg-black/80 text-white p-2 flex items-center">
                    <span>Project Structure</span>
                  </div>
                  <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 overflow-x-auto font-mono text-sm">
                    <code>{`my-app/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   └── App.jsx
│   ├── pages/
│   │   └── index.jsx
│   ├── api/
│   │   └── hello.js
│   ├── styles/
│   │   └── global.css
│   └── main.js
├── package.json
├── frontend.config.js
└── README.md`}</code>
                  </pre>
                </div>
              </div>
            </RevealOnScroll>

            <div className="mt-8 text-center">
              <RevealOnScroll>
                <GlowButton href="/docs/tutorials" size="lg">
                  View Step-by-Step Tutorials
                </GlowButton>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold mb-8 text-center">
              Frequently Asked Questions
            </h2>
          </RevealOnScroll>

          <div className="max-w-3xl mx-auto">
            <RevealOnScroll>
              <FAQAccordion items={faqItems} />
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-16">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold mb-8 text-center">
              Join the Community
            </h2>
          </RevealOnScroll>

          <div className="max-w-4xl mx-auto text-center">
            <RevealOnScroll>
              <p className="text-xl mb-8 text-foreground/80">
                Connect with other developers using Frontend Hamroun. Get help, share your projects, and contribute to the framework.
              </p>
            </RevealOnScroll>

            <div className="flex flex-wrap justify-center gap-6">
              <RevealOnScroll delay={100}>
                <a 
                  href="https://github.com/hamroun/frontend-hamroun" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-6 bg-background/50 rounded-xl border border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg"
                >
                  <svg className="w-12 h-12 mb-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg font-semibold">GitHub</span>
                  <span className="text-sm text-foreground/70">Star, fork, contribute</span>
                </a>
              </RevealOnScroll>

              <RevealOnScroll delay={200}>
                <a 
                  href="https://discord.gg/frontend-hamroun" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-6 bg-background/50 rounded-xl border border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg"
                >
                  <svg className="w-12 h-12 mb-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.874-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                  </svg>
                  <span className="text-lg font-semibold">Discord</span>
                  <span className="text-sm text-foreground/70">Join the conversation</span>
                </a>
              </RevealOnScroll>

              <RevealOnScroll delay={300}>
                <a 
                  href="https://twitter.com/frontendhamroun" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center p-6 bg-background/50 rounded-xl border border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg"
                >
                  <svg className="w-12 h-12 mb-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                  <span className="text-lg font-semibold">Twitter</span>
                  <span className="text-sm text-foreground/70">Latest updates</span>
                </a>
              </RevealOnScroll>
            </div>

            <RevealOnScroll>
              <div className="mt-16 p-6 bg-primary/5 rounded-xl border border-primary/10">
                <h3 className="text-xl font-bold mb-4">Contribute to Frontend Hamroun</h3>
                <p className="mb-6">We welcome contributions of all sizes. Whether it&apos;s a bug fix, feature addition, or documentation improvement, your help is appreciated!</p>
                <GlowButton href="https://github.com/hamroun/frontend-hamroun/blob/main/CONTRIBUTING.md">
                  Contribution Guidelines
                </GlowButton>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </div>
  );
}
