'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { 
  PlayIcon,
  PauseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  RocketLaunchIcon,
  CpuChipIcon,
  GlobeAltIcon,
  CodeBracketIcon,
  BoltIcon,
  CubeTransparentIcon,
  ServerIcon,
  ShieldCheckIcon,
  TrophyIcon,
  ClockIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  ArrowsPointingOutIcon,
  ArrowsPointingInIcon,
  EyeIcon,
  EyeSlashIcon,

} from "@heroicons/react/24/outline";
import {
  StarIcon
} from "@heroicons/react/24/solid";
import HydrationSafeImage from "@/components/HydrationSafeImage";
import RevealOnScroll from "@/components/RevealOnScroll";
import AnimatedCounter from "@/components/AnimatedCounter";
import GlowButton from "@/components/GlowButton";
import FloatingCard from "@/components/FloatingCard";
import BundleSizeChart from "@/components/BundleSizeChart";
import TypewriterEffect from "@/components/TypewriterEffect";
import SlidePreviewNavigation from "@/components/SlidePreviewNavigation";
import EnhancedProgress from "@/components/EnhancedProgress";
import InteractiveSlideContent from "@/components/InteractiveSlideContent";
import ParallaxBackground from "@/components/ParallaxBackground";
import ClientOnly from "@/components/ClientOnly";

interface Slide {
  id: string;
  title: string;
  subtitle?: string;
  content: React.ReactNode;
  background?: string;
  textColor?: string;
}

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const presentationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const slides: Slide[] = [
    // Title Slide
    {
      id: "title",
      title: "Baraqex Framework",
      subtitle: "The Future of High-Performance Web Development",
      background: "bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500",
      textColor: "text-white",
      content: (
        <ParallaxBackground type="particles" intensity="medium" className="min-h-screen">
          <div className="text-center">
            <InteractiveSlideContent
              isActive={currentSlide === 0}
              animationType="zoom"
              delay={200}
              className="mb-8"
            >
              <HydrationSafeImage 
                src="/images/logo.png"
                alt="Baraqex Logo"
                width={150}
                height={150}
                className="mx-auto animate-float-3d pulse-glow"
              />
            </InteractiveSlideContent>
            
            <InteractiveSlideContent
              isActive={currentSlide === 0}
              animationType="slide"
              delay={400}
              className="animate-children"
            >
              <h1 className="text-6xl font-bold mb-4 text-white">
                <span className="bg-gradient-to-r from-white via-cyan-100 to-purple-100 bg-clip-text text-transparent">
                  Baraqex
                </span>
              </h1>
              <h2 className="text-2xl mb-8 text-white/80">The Future of High-Performance Web Development</h2>
              
              <div className="flex flex-wrap justify-center items-center gap-6 text-white/70">
                <div className="flex items-center gap-2 interactive-card p-3 rounded-full bg-white/10 backdrop-blur-sm">
                  <BoltIcon className="w-5 h-5 text-amber-400" />
                  <span>Lightning Fast</span>
                </div>
                <div className="flex items-center gap-2 interactive-card p-3 rounded-full bg-white/10 backdrop-blur-sm">
                  <CubeTransparentIcon className="w-5 h-5 text-cyan-400" />
                  <span>Zero Config</span>
                </div>
                <div className="flex items-center gap-2 interactive-card p-3 rounded-full bg-white/10 backdrop-blur-sm">
                  <RocketLaunchIcon className="w-5 h-5 text-emerald-400" />
                  <span>Production Ready</span>
                </div>
              </div>
            </InteractiveSlideContent>
          </div>
        </ParallaxBackground>
      )
    },

    // Problem Statement
    {
      id: "problem",
      title: "The Problem We're Solving",
      subtitle: "Web Development is Broken",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-red-600">Current State</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-600 text-sm">⚠</span>
                </div>
                <div>
                  <strong>Complex Setup:</strong> 20+ tools just to start a project
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-600 text-sm">⚠</span>
                </div>
                <div>
                  <strong>Performance Bottlenecks:</strong> JavaScript limitations cost businesses millions
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-600 text-sm">⚠</span>
                </div>
                <div>
                  <strong>Developer Frustration:</strong> 67% of developers report framework fatigue
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-red-600 text-sm">⚠</span>
                </div>
                <div>
                  <strong>Time to Market:</strong> 3-6 months average for MVPs
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6 text-red-600">Business Impact</h3>
            <div className="space-y-6">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  <AnimatedCounter end={2.8} prefix="$" suffix="B" duration={2000} animateOnView={false} />
                </div>
                <p className="text-sm text-red-700">Lost annually due to slow web applications</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  <AnimatedCounter end={58} suffix="%" duration={1500} animateOnView={false} />
                </div>
                <p className="text-sm text-red-700">Of users abandon slow websites</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  <AnimatedCounter end={40} suffix="%" duration={1800} animateOnView={false} />
                </div>
                <p className="text-sm text-red-700">Increase in development costs due to complexity</p>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Solution Overview
    {
      id: "solution",
      title: "Our Solution: Baraqex Framework",
      subtitle: "One Framework, Infinite Possibilities",
      content: (
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">What is Baraqex?</h3>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              A revolutionary web framework that combines the best of modern web development 
              with cutting-edge performance optimizations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <BoltIcon className="w-8 h-8" />,
                title: "Zero-config setup",
                subtitle: "Start in 30 seconds",
                color: "bg-amber-100 text-amber-600"
              },
              {
                icon: <RocketLaunchIcon className="w-8 h-8" />,
                title: "10-100x performance",
                subtitle: "With WebAssembly",
                color: "bg-indigo-100 text-indigo-600"
              },
              {
                icon: <CubeTransparentIcon className="w-8 h-8" />,
                title: "React-like simplicity",
                subtitle: "No React dependencies",
                color: "bg-emerald-100 text-emerald-600"
              },
              {
                icon: <ServerIcon className="w-8 h-8" />,
                title: "Built-in SSR",
                subtitle: "SEO and performance",
                color: "bg-purple-100 text-purple-600"
              }
            ].map((feature, index) => (
              <FloatingCard key={index} className="p-6 text-center">
                <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mx-auto mb-4`}>
                  {feature.icon}
                </div>
                <h4 className="font-bold mb-2">{feature.title}</h4>
                <p className="text-sm text-foreground/70">{feature.subtitle}</p>
              </FloatingCard>
            ))}
          </div>
        </div>
      )
    },

    // Performance Comparison
    {
      id: "performance",
      title: "Performance That Speaks for Itself",
      subtitle: "Benchmarks Don't Lie",
      content: (
        <ParallaxBackground type="geometric" intensity="low">
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <InteractiveSlideContent
                isActive={currentSlide === 3}
                animationType="slide"
                delay={200}
              >
                <h3 className="text-2xl font-bold mb-6">Bundle Size Comparison</h3>
                <BundleSizeChart />
              </InteractiveSlideContent>
              
              <InteractiveSlideContent
                isActive={currentSlide === 3}
                animationType="slide"
                delay={400}
              >
                <h3 className="text-2xl font-bold mb-6">Performance Metrics</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 metric-card rounded-lg interactive-card">
                    <div>
                      <div className="font-semibold">First Contentful Paint</div>
                      <div className="text-sm text-foreground/70">Time to first meaningful content</div>
                    </div>
                    <div className="text-2xl font-bold text-emerald-600">
                      <AnimatedCounter end={120} suffix="ms" duration={1500} animateOnView={false} />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 metric-card rounded-lg interactive-card">
                    <div>
                      <div className="font-semibold">Time to Interactive</div>
                      <div className="text-sm text-foreground/70">When page becomes fully interactive</div>
                    </div>
                    <div className="text-2xl font-bold text-cyan-600">
                      <AnimatedCounter end={340} suffix="ms" duration={1800} animateOnView={false} />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 metric-card rounded-lg interactive-card">
                    <div>
                      <div className="font-semibold">Lighthouse Score</div>
                      <div className="text-sm text-foreground/70">Overall performance rating</div>
                    </div>
                    <div className="text-2xl font-bold text-indigo-600">
                      <AnimatedCounter end={98} suffix="/100" duration={2000} animateOnView={false} />
                    </div>
                  </div>
                </div>
              </InteractiveSlideContent>
            </div>
            
            <InteractiveSlideContent
              isActive={currentSlide === 3}
              animationType="fade"
              delay={600}
              className="mt-12 text-center"
            >
              <div className="p-6 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl border border-emerald-200">
                <p className="text-lg text-foreground/80">
                  <strong className="text-emerald-600">Result:</strong> 10x faster load times, 90% smaller bundles, 100% developer satisfaction
                </p>
              </div>
            </InteractiveSlideContent>
          </div>
        </ParallaxBackground>
      )
    },

    // Key Features
    {
      id: "features",
      title: "Revolutionary Features",
      subtitle: "Everything you need, nothing you don't",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <CpuChipIcon className="w-6 h-6" />,
              title: "WebAssembly Integration",
              description: "Run Go code at near-native speed in the browser",
              highlight: true
            },
            {
              icon: <CubeTransparentIcon className="w-6 h-6" />,
              title: "Virtual DOM & Hooks",
              description: "React-like development experience with better performance"
            },
            {
              icon: <ServerIcon className="w-6 h-6" />,
              title: "Server-Side Rendering",
              description: "Built-in SSR with automatic hydration"
            },
            {
              icon: <ShieldCheckIcon className="w-6 h-6" />,
              title: "Built-in Authentication",
              description: "JWT-based auth system out of the box"
            },
            {
              icon: <CodeBracketIcon className="w-6 h-6" />,
              title: "File-Based Routing",
              description: "Zero-config routing based on file structure"
            },
            {
              icon: <GlobeAltIcon className="w-6 h-6" />,
              title: "Full TypeScript Support",
              description: "Type-safe development with excellent DX"
            }
          ].map((feature, index) => (
            <FloatingCard 
              key={index} 
              className={`p-6 ${feature.highlight ? 'border-2 border-primary bg-primary/5' : ''}`}
            >
              <div className={`w-12 h-12 rounded-lg ${
                feature.highlight ? 'bg-primary text-white' : 'bg-secondary'
              } flex items-center justify-center mb-4`}>
                {feature.icon}
              </div>
              <h4 className="font-bold mb-2 flex items-center gap-2">
                {feature.title}
                {feature.highlight && <StarIcon className="w-4 h-4 text-amber-500" />}
              </h4>
              <p className="text-sm text-foreground/70">{feature.description}</p>
            </FloatingCard>
          ))}
        </div>
      )
    },

    // Live Demo
    {
      id: "demo",
      title: "See It In Action",
      subtitle: "5-Minute Demo",
      content: (
        <div className="text-center">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-lg p-1 shadow-2xl">
              <div className="bg-gray-800 rounded-t-lg px-4 py-2 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-4">Terminal</span>
              </div>
              <div className="bg-black text-emerald-400 p-6 rounded-b-lg font-mono text-left">
                <TypewriterEffect
                  text={`$ npx create-baraqex-app demo-app
✨ Creating a new Baraqex app...
📦 Installing dependencies...
🚀 Setting up TypeScript...
🔧 Configuring WebAssembly...
✅ Done! Your app is ready.

$ cd demo-app
$ npm run dev

🌐 Server running on http://localhost:3000
⚡ Ready in 847ms (99% faster than Create React App)`}
                  typingSpeed={50}
                />
              </div>
            </div>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <ClockIcon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="font-semibold">Setup Time</div>
                <div className="text-2xl font-bold text-primary">30s</div>
              </div>
              <div className="text-center">
                <BoltIcon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="font-semibold">Build Time</div>
                <div className="text-2xl font-bold text-primary">847ms</div>
              </div>
              <div className="text-center">
                <TrophyIcon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <div className="font-semibold">Performance Score</div>
                <div className="text-2xl font-bold text-primary">98/100</div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // Market Opportunity
    {
      id: "market",
      title: "Market Opportunity",
      subtitle: "A $50B+ Market Ready for Disruption",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Market Size</h3>
            <div className="space-y-6">
              <div className="text-center p-6 bg-primary/10 rounded-lg">
                <div className="text-4xl font-bold text-primary mb-2">$50B+</div>
                <p className="text-sm">Web Development Tools Market</p>
              </div>
              <div className="text-center p-6 bg-cyan-100 rounded-lg">
                <div className="text-4xl font-bold text-cyan-600 mb-2">23M+</div>
                <p className="text-sm">JavaScript Developers Worldwide</p>
              </div>
              <div className="text-center p-6 bg-emerald-100 rounded-lg">
                <div className="text-4xl font-bold text-emerald-600 mb-2">40%</div>
                <p className="text-sm">Annual Growth Rate</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6">Our Advantage</h3>
            <div className="space-y-4">
              {[
                "First framework with native WebAssembly integration",
                "Zero-config setup reduces onboarding friction",
                "10x performance improvement over existing solutions",
                "Built-in features eliminate need for multiple tools",
                "Arabic-first development community"
              ].map((advantage, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircleIcon className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{advantage}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },

    // Roadmap
    {
      id: "roadmap",
      title: "Development Roadmap",
      subtitle: "Building the Future, Step by Step",
      content: (
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {[
              {
                quarter: "Q1 2025",
                title: "Core Framework Release",
                status: "completed",
                items: ["Virtual DOM implementation", "Hooks system", "Basic WebAssembly integration"]
              },
              {
                quarter: "Q2 2025",
                title: "Server-Side Features",
                status: "current",
                items: ["SSR optimization", "File-based routing", "Database integrations"]
              },
              {
                quarter: "Q3 2025",
                title: "Developer Experience",
                status: "planned",
                items: ["Advanced CLI tools", "VS Code extension", "Live reloading"]
              },
              {
                quarter: "Q4 2025",
                title: "Enterprise Features",
                status: "planned",
                items: ["Monitoring dashboard", "Performance analytics", "Cloud deployment"]
              }
            ].map((phase, index) => (
              <div key={index} className="flex items-start gap-6">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-bold ${
                  phase.status === 'completed' ? 'bg-green-500' : 
                  phase.status === 'current' ? 'bg-primary' : 'bg-gray-400'
                }`}>
                  {phase.quarter}
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-2">{phase.title}</h4>
                  <ul className="space-y-1">
                    {phase.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-foreground/80">
                        <div className={`w-2 h-2 rounded-full ${
                          phase.status === 'completed' ? 'bg-green-500' : 
                          phase.status === 'current' ? 'bg-primary' : 'bg-gray-400'
                        }`}></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },

    // Call to Action
    {
      id: "cta",
      title: "Join the Revolution",
      subtitle: "Be Part of the Future of Web Development",
      background: "bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500",
      textColor: "text-white",
      content: (
        <div className="text-center">
          <div className="mb-12">
            <h3 className="text-3xl font-bold mb-4 text-white">Ready to Get Started?</h3>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Join thousands of developers who are already building the next generation of web applications with Baraqex.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: <DocumentTextIcon className="w-8 h-8" />,
                title: "Documentation",
                description: "Comprehensive guides and tutorials",
                action: "Read Docs",
                href: "/docs"
              },
              {
                icon: <CodeBracketIcon className="w-8 h-8" />,
                title: "GitHub",
                description: "Source code and community",
                action: "View Source",
                href: "https://github.com/mohamedx2/baraqex"
              },
              {
                icon: <ChatBubbleLeftRightIcon className="w-8 h-8" />,
                title: "Community",
                description: "Connect with other developers",
                action: "Join Discord",
                href: "/community"
              }
            ].map((item, index) => (
              <FloatingCard key={index} className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="text-white mb-4">{item.icon}</div>
                <h4 className="font-bold mb-2 text-white">{item.title}</h4>
                <p className="text-white/80 text-sm mb-4">{item.description}</p>
                <GlowButton 
                  href={item.href}
                  variant="accent"
                  className="text-sm px-4 py-2"
                >
                  {item.action}
                </GlowButton>
              </FloatingCard>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <GlowButton
              href="/docs/getting-started"
              className="px-8 py-4 text-lg font-semibold"
            >
              <RocketLaunchIcon className="w-5 h-5 mr-2" />
              Get Started Now
            </GlowButton>
            
            <a
              href="https://github.com/mohamedx2/baraqex/stargazers"
              className="flex items-center gap-2 px-8 py-4 bg-white/20 text-white rounded-full hover:bg-white/30 transition-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              <StarIcon className="w-5 h-5" />
              Star on GitHub
            </a>
          </div>
        </div>
      )
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 10000); // 10 seconds per slide
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, slides.length]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const currentSlideData = slides[currentSlide];

  // Fullscreen functionality
  const toggleFullscreen = useCallback(async () => {
    if (!mounted || typeof document === 'undefined') return;
    
    try {
      if (!document.fullscreenElement) {
        await presentationRef.current?.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (error) {
      console.warn('Fullscreen not supported or failed:', error);
    }
  }, [mounted]);

  // Mouse inactivity for auto-hiding controls
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    
    let timeout: NodeJS.Timeout;
    
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isFullscreen) {
          setShowControls(false);
        }
      }, 3000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, [isFullscreen, mounted]);

  // Enhanced keyboard navigation
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        if (typeof document !== 'undefined' && document.fullscreenElement) {
          document.exitFullscreen();
          setIsFullscreen(false);
        }
        setIsPlaying(false);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        setIsPlaying(!isPlaying);
      } else if (e.key >= '1' && e.key <= '9') {
        e.preventDefault();
        const slideNumber = parseInt(e.key) - 1;
        if (slideNumber < slides.length) {
          setCurrentSlide(slideNumber);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide, isPlaying, toggleFullscreen, slides.length, mounted]);

  // SSR Guard: Show loading state until client-side hydration is complete
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-accent flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading Presentation...</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={presentationRef} className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500">
      {/* Enhanced Presentation Header */}
      <div className={`fixed top-0 left-0 right-0 control-panel z-50 auto-hide ${
        isFullscreen && !showControls ? 'hidden' : ''
      }`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <HydrationSafeImage 
                src="/images/logo.png"
                alt="Baraqex Logo"
                width={32}
                height={32}
                className="object-contain pulse-glow"
              />
              <h1 className="text-lg font-semibold">Baraqex Presentation</h1>
              <div className="hidden md:flex items-center gap-2 text-sm text-foreground/70">
                <span>Press F for fullscreen</span>
                <span>•</span>
                <span>P to play/pause</span>
                <span>•</span>
                <span>1-9 for quick navigation</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-foreground/70">
                Slide {currentSlide + 1} of {slides.length}
              </div>
              
              {/* Slide Preview Navigation */}
              <ClientOnly>
                <SlidePreviewNavigation
                  slides={slides}
                  currentSlide={currentSlide}
                  onSlideChange={setCurrentSlide}
                />
              </ClientOnly>
              
              <div className="flex items-center gap-2">
                {/* Quick slide jump - Enhanced with better UX */}
                <div className="hidden md:flex items-center gap-1">
                  {slides.slice(0, Math.min(5, slides.length)).map((slide, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`group relative w-10 h-8 rounded transition-all enhanced-button ${
                        index === currentSlide 
                          ? 'bg-primary text-white shadow-lg' 
                          : 'bg-secondary hover:bg-primary/20'
                      }`}
                      title={slide.title}
                    >
                      <span className="text-xs font-medium relative z-10">{index + 1}</span>
                      
                      {/* Tooltip */}
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
                        {slide.title}
                      </div>
                    </button>
                  ))}
                  {slides.length > 5 && (
                    <span className="text-foreground/50 mx-1">...</span>
                  )}
                </div>
                
                <button
                  onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  disabled={currentSlide === 0}
                  title="Previous slide (←)"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  title={isPlaying ? "Pause (P)" : "Play (P)"}
                >
                  {isPlaying ? (
                    <PauseIcon className="w-4 h-4" />
                  ) : (
                    <PlayIcon className="w-4 h-4" />
                  )}
                </button>
                
                <button
                  onClick={() => setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1))}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  disabled={currentSlide === slides.length - 1}
                  title="Next slide (→)"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
                
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  title="Toggle fullscreen (F)"
                >
                  {isFullscreen ? (
                    <ArrowsPointingInIcon className="w-4 h-4" />
                  ) : (
                    <ArrowsPointingOutIcon className="w-4 h-4" />
                  )}
                </button>
                
                <button
                  onClick={() => setShowControls(!showControls)}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  title="Toggle controls visibility"
                >
                  {showControls ? (
                    <EyeIcon className="w-4 h-4" />
                  ) : (
                    <EyeSlashIcon className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="mt-2">
            <EnhancedProgress
              currentSlide={currentSlide}
              totalSlides={slides.length}
              isPlaying={isPlaying}
              autoPlayDuration={10000}
              onProgressComplete={nextSlide}
            />
          </div>
        </div>
      </div>

      {/* Slide Content with improved transitions */}
      <div className={`pt-20 min-h-screen flex items-center justify-center p-8 slide-transition-fade ${
        currentSlideData.background || 'bg-background'
      } ${isFullscreen ? 'fullscreen-content' : ''}`}>
        <div className="container mx-auto max-w-6xl slide-content">
          <RevealOnScroll>
            <div className={`text-center mb-12 ${currentSlideData.textColor || ''}`}>
              <h2 className="text-5xl font-bold mb-4 animate-fade-in">{currentSlideData.title}</h2>
              {currentSlideData.subtitle && (
                <p className="text-xl opacity-80 animate-fade-in-delay">{currentSlideData.subtitle}</p>
              )}
            </div>
            
            <div className={`${currentSlideData.textColor || ''} animate-slide-up`}>
              {currentSlideData.content}
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* Enhanced Slide Navigation */}
      <div className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 transition-transform duration-300 ${
        isFullscreen && !showControls ? 'translate-y-full' : ''
      }`}>
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-xl border flex items-center gap-3">
          {/* Slide thumbnails */}
          <div className="flex items-center gap-2">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`group relative w-12 h-8 rounded slide-thumbnail transition-all duration-200 ${
                  index === currentSlide 
                    ? 'bg-primary active shadow-lg' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
                title={slide.title}
              >
                <div className={`absolute inset-1 rounded-sm ${
                  index === currentSlide ? 'bg-white/20' : 'bg-white/60'
                }`}>
                  <div className="text-xs font-medium text-center leading-6">
                    {index + 1}
                  </div>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {slide.title}
                </div>
              </button>
            ))}
          </div>
          
          {/* Timer display */}
          {isPlaying && (
            <div className="ml-4 flex items-center gap-2 text-sm text-foreground/70">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Auto-play active</span>
            </div>
          )}
        </div>
      </div>

      {/* Keyboard Navigation Hint */}
      <div className={`fixed bottom-6 right-6 transition-transform duration-300 ${
        isFullscreen && !showControls ? 'translate-y-full' : ''
      }`}>
        <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 shadow-lg border">
          <div className="text-xs text-foreground/70 space-y-1">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">←→</kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">F</kbd>
              <span>Fullscreen</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">P</kbd>
              <span>Play/Pause</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">1-9</kbd>
              <span>Quick jump</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
