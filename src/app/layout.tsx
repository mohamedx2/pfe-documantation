import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { 
  CodeBracketIcon, 
  BookOpenIcon, 
  Squares2X2Icon, 
  ArrowTopRightOnSquareIcon,
  GlobeAltIcon,
  LanguageIcon,
  ChatBubbleLeftRightIcon,
  Bars3Icon,
  PresentationChartLineIcon
} from "@heroicons/react/24/outline";
import HydrationSafeImage from "@/components/HydrationSafeImage";
import Link from "next/link";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ThemeProvider } from "@/components/theme-provider";
import MobileNavigation from "@/components/MobileNavigation";
import AnimatedGradientText from "@/components/AnimatedGradientText";
import ScrollProgressIndicator from "@/components/ScrollProgressIndicator";
import SectionNavigation from "@/components/SectionNavigation";
import { NavigationProvider } from "@/components/NavigationContext";
import ClientOnly from "@/components/ClientOnly";
import ClientComponents from "@/components/ClientComponents";
import CurrentTime from "@/components/CurrentTime";
import CopyrightYear from "@/components/CopyrightYear";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Fixed time for server rendering
const STATIC_TIME = "12:00 PM";

export const metadata: Metadata = {
  title: "Baraqex - Modern Full-Stack JavaScript Framework",
  description: "A powerful full-stack JavaScript/TypeScript framework with Virtual DOM, hooks, WebAssembly integration, and server-side rendering - Build universal web applications with ease",
  keywords: ["JavaScript", "TypeScript", "Framework", "Virtual DOM", "WebAssembly", "SSR", "Full-stack", "Baraqex"],
  authors: [{ name: "Mohamed Hamroun" }],
  creator: "Mohamed Hamroun",
  publisher: "Frontend Hamroun",
  robots: "index, follow",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/logo.png", sizes: "32x32", type: "image/png" },
      { url: "/images/logo.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/images/logo.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Baraqex - Modern Full-Stack JavaScript Framework",
    description: "A powerful full-stack JavaScript/TypeScript framework with Virtual DOM, hooks, WebAssembly integration, and server-side rendering",
    url: "https://baraqex.dev",
    siteName: "Baraqex Framework",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Baraqex Framework Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baraqex - Modern Full-Stack JavaScript Framework",
    description: "A powerful full-stack JavaScript/TypeScript framework with Virtual DOM, hooks, WebAssembly integration, and server-side rendering",
    images: ["/images/logo.png"],
    creator: "@mohamedx2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Navigation items for mobile menu
  const navItems = [
    { 
      label: "Features", 
      href: "#features", 
      icon: <Squares2X2Icon className="w-5 h-5" /> 
    },
    { 
      label: "Presentation", 
      href: "/presentation", 
      icon: <PresentationChartLineIcon className="w-5 h-5" /> 
    },
    { 
      label: "Docs", 
      href: "#docs", 
      icon: <BookOpenIcon className="w-5 h-5" /> 
    },
    { 
      label: "Examples", 
      href: "#examples", 
      icon: <CodeBracketIcon className="w-5 h-5" /> 
    },
    { 
      label: "One Culture", 
      href: "#community", 
      icon: <GlobeAltIcon className="w-5 h-5" /> 
    },
    { 
      label: "Arabic Community", 
      href: "#arabic-dev", 
      icon: <ChatBubbleLeftRightIcon className="w-5 h-5" /> 
    },
    { 
      label: "GitHub", 
      href: "https://github.com/mohamedx2/baraqex", 
      icon: <ArrowTopRightOnSquareIcon className="w-5 h-5" /> 
    }
  ];

  return (
    <>
      <html lang="en" className="scroll-smooth">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider defaultTheme="system"  >
            <NavigationProvider>
              {/* Client Components with random values */}
              <ClientOnly>
                <ClientComponents 
                  backgroundOpacity={0.8}
                  particleDensity={12}
                  mouseForce={120}
                />
              </ClientOnly>
              
              {/* Enhanced scroll progress indicator */}
              <ClientOnly>
                <ScrollProgressIndicator showLabels={true} />
              </ClientOnly>
              
              {/* Section navigation dots */}
              <ClientOnly>
                <SectionNavigation 
                  sections={[
                    { id: 'hero', label: 'Home' },
                    { id: 'demos', label: 'Demos' },
                    { id: 'getting-started', label: 'Get Started' },
                    { id: 'features', label: 'Features' }
                  ]}
                  className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3"
                />
              </ClientOnly>
              
              {/* Top banner for language selection and special features */}
              <div className="glass-morphism bg-primary/5 backdrop-blur-lg py-2 px-4 text-xs border-b border-primary/10 relative z-10">
                <div className="container mx-auto flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="prayer-time animate-pulse-border">
                      <span className="prayer-dot"></span>                      <span>
                        <ClientOnly 
                          fallback={STATIC_TIME}
                        >
                          <CurrentTime />
                        </ClientOnly>
                      </span>
                    </div>
                    <div className="hidden md:flex items-center">
                      <span className="text-foreground/70 mr-2">Frontend Hamroun v1.0</span>
                      <span className="bg-accent/20 text-accent-dark px-2 py-0.5 rounded-full text-[10px] font-medium animate-pulse">BETA</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <ThemeSwitcher />
                    <div className="h-4 w-px bg-foreground/10"></div>
                    <div className="relative group tooltip-animated">
                      <button className="flex items-center gap-1 hover:text-primary transition-colors">
                        <LanguageIcon className="w-4 h-4" />
                        <span>English</span>
                      </button>
                      <div className="tooltip-content">
                        Change language
                      </div>
                      <div className="absolute right-0 mt-1 w-40 glass-morphism rounded-md shadow-lg border border-primary/10 hidden group-hover:block z-50 transform transition-all duration-300 origin-top-right scale-90 group-hover:scale-100">
                        <div className="py-1">
                          <a href="#" className="block px-4 py-2 text-sm hover:text-primary transition-colors">English</a>
                          <a href="#" className="block px-4 py-2 text-sm hover:text-primary transition-colors arabic-text text-right">العربية</a>
                          <a href="#" className="block px-4 py-2 text-sm hover:text-primary transition-colors">Français</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced header with dynamic navigation links */}
              <header className="sticky top-0 z-40 w-full bg-background/60 border-b border-black/5 dark:border-white/5 backdrop-blur-xl">
                <div className="container mx-auto px-4 py-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Link href="/" className="cursor-magnet flex items-center gap-2 hover:opacity-90 transition-opacity group">
                        <div className="relative h-10 w-10 animate-float-3d">
                          <HydrationSafeImage 
                            src="/images/logo.png"
                            alt="Baraqex Logo"
                            width={40}
                            height={40}
                            className="object-contain"
                            priority
                          />
                        </div>
                        <AnimatedGradientText 
                          text="Frontend Hamroun" 
                          fontSize="1.125rem" 
                          fontWeight="600"
                          className="transition-all duration-300 group-hover:opacity-80"
                        />
                      </Link>
                      
                    </div>

                    {/* Desktop navigation with improved links */}
                    <div className="hidden md:flex items-center gap-8">
                      <ul className="flex space-x-6">
                        <li>
                          <Link href="/features" className="nav-pill flex items-center gap-1.5" data-section="features">
                            <Squares2X2Icon className="w-4 h-4" />
                            <span>Features</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/presentation" className="nav-pill flex items-center gap-1.5">
                            <PresentationChartLineIcon className="w-4 h-4" />
                            <span>Presentation</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/docs" className="nav-pill flex items-center gap-1.5">
                            <BookOpenIcon className="w-4 h-4" />
                            <span>Docs</span>
                          </Link>
                        </li>
                        <li>
                          <a href="/examples" className="nav-pill flex items-center gap-1.5">
                            <CodeBracketIcon className="w-4 h-4" />
                            <span>Examples</span>
                          </a>
                        </li>
                        <li>
                          <Link href="/community" className="nav-pill flex items-center gap-1.5">
                            <GlobeAltIcon className="w-4 h-4" />
                            <span>One Culture</span>
                          </Link>
                        </li>
                        <li>
                          <Link href="/arabic" className="nav-pill flex items-center gap-1.5">
                            <ChatBubbleLeftRightIcon className="w-4 h-4" />
                            <span>Arabic Community</span>
                          </Link>
                        </li>
                      </ul>
                      
                      <div className="flex items-center gap-3">
                        <Link href="/docs/getting-started" className="btn-interactive text-sm px-5 py-1.5 rounded-full">
                          Get Started
                        </Link>
                        <a 
                          href="https://github.com/mohamedx2/front-package" 
                          className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label="GitHub Repository"
                        >
                          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                        </a>
                      </div>
                    </div>

                    {/* Mobile menu button */}
                    <label 
                      htmlFor="mobile-menu-toggle"
                      className="block md:hidden p-2 rounded-md hover:bg-secondary/80 transition-colors btn-ripple cursor-pointer"
                      aria-label="Toggle mobile menu"
                    >
                      <Bars3Icon className="w-6 h-6" />
                    </label>
                  </div>
                </div>
              </header>
              
              {/* Hidden checkbox for mobile menu toggle state */}
              <input type="checkbox" id="mobile-menu-toggle" className="hidden" />
              
              {/* Mobile Navigation - controlled by checkbox state */}
              <MobileNavigation 
                items={navItems} 
              />
              
              <main className="flex-1 relative z-0">
                {children}
              </main>
              
              <footer className="border-t border-black/10 dark:border-white/10 py-12 mt-16 bg-secondary/30 arabic-pattern-1 relative z-0">
                <div className="container mx-auto px-4">
                  <div className="flex items-center justify-center mb-8">
                    <div className="relative">
                      <HydrationSafeImage 
                        src="/images/logo.png"
                        alt="Baraqex Logo"
                        width={80}
                        height={80}
                        className="object-contain"
                      />
                      <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-accent rounded-full border-2 border-secondary animate-pulse"></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
                    <div className="md:col-span-2">
                      <div className="font-bold text-xl mb-4 logo-text-gradient">Frontend Hamroun</div>
                      <p className="text-foreground/70 mb-4">A lightweight full-stack JavaScript framework with Virtual DOM and hooks implementation, bringing developers together with one unified culture.</p>
                      <div className="bilingual-text mb-6">
                        <p className="arabic-text text-sm font-medium">إطار عمل جافاسكريبت خفيف الوزن يجمع المطورين بثقافة موحدة</p>
                      </div>
                      <div className="flex space-x-4">
                        <a href="#" className="text-foreground/60 hover:text-primary">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                          </svg>
                        </a>
                        <a href="#" className="text-foreground/60 hover:text-primary">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                        <a href="#" className="text-foreground/60 hover:text-primary">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z" clipRule="evenodd" />
                          </svg>
                        </a>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">Resources</h3>
                      <ul className="space-y-2">
                        <li><a href="#" className="text-foreground/70 hover:text-primary">Documentation</a></li>
                        <li><a href="#" className="text-foreground/70 hover:text-primary">Tutorials</a></li>
                        <li><a href="#" className="text-foreground/70 hover:text-primary">API Reference</a></li>
                        <li><a href="#" className="text-foreground/70 hover:text-primary">GitHub</a></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4">Community</h3>
                      <ul className="space-y-2">
                        <li><a href="#" className="text-foreground/70 hover:text-primary">One Culture</a></li>
                        <li><a href="#" className="text-foreground/70 hover:text-primary">Discord</a></li>
                        <li><a href="#" className="text-foreground/70 hover:text-primary">Twitter</a></li>
                        <li><a href="#" className="text-foreground/70 hover:text-primary">Contributors</a></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-4 flex items-center gap-1">
                        <span>Arabic Resources</span>
                        <span className="arabic-text text-xs">(الموارد العربية)</span>
                      </h3>
                      <ul className="space-y-2">
                        <li>
                          <a href="#" className="text-foreground/70 hover:text-primary flex items-center justify-between">
                            <span>Arabic Documentation</span>
                            <span className="arabic-text text-xs">التوثيق</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-foreground/70 hover:text-primary flex items-center justify-between">
                            <span>Arabic Forum</span>
                            <span className="arabic-text text-xs">المنتدى</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-foreground/70 hover:text-primary flex items-center justify-between">
                            <span>Video Tutorials</span>
                            <span className="arabic-text text-xs">دروس فيديو</span>
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-foreground/70 hover:text-primary flex items-center justify-between">
                            <span>Events</span>
                            <span className="arabic-text text-xs">الفعاليات</span>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="border-t border-black/10 dark:border-white/10 mt-10 pt-6 text-center text-sm text-foreground/60">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                      <p>© <CopyrightYear /> Frontend Hamroun - Uniting Developers with One Culture, One Framework</p>
                      <p className="arabic-text">توحيد المطورين بثقافة واحدة، إطار عمل واحد</p>
                    </div>
                  </div>
                </div>
              </footer>
              
              {/* Client-side JS for section visibility tracking */}
              <script dangerouslySetInnerHTML={{
                __html: `
                  document.addEventListener('DOMContentLoaded', () => {
                    // Enhanced section visibility tracking
                    const sections = document.querySelectorAll('section[id]');
                    
                    // Create an intersection observer
                    const observer = new IntersectionObserver(
                      (entries) => {
                        entries.forEach((entry) => {
                          const id = entry.target.id;
                          
                          // Dispatch custom event for React components to handle
                          const visibilityEvent = new CustomEvent('sectionInView', {
                            detail: { id, visible: entry.isIntersecting }
                          });
                          
                          document.dispatchEvent(visibilityEvent);
                        });
                      },
                      { threshold: 0.2 }
                    );
                    
                    // Observe all sections
                    sections.forEach(section => {
                      observer.observe(section);
                    });
                    
                    // Mobile menu toggle
                    const menuToggle = document.getElementById('mobile-menu-toggle');
                    const mobileMenu = document.getElementById('mobile-menu');
                    
                    if (menuToggle && mobileMenu) {
                      menuToggle.addEventListener('change', function() {
                        if (this.checked) {
                          mobileMenu.classList.remove('translate-x-full');
                          document.body.style.overflow = 'hidden';
                        } else {
                          mobileMenu.classList.add('translate-x-full');
                          document.body.style.overflow = '';
                        }
                      });
                    }
                    
                    // Button ripple effect
                    document.addEventListener('click', function(e) {
                      const target = e.target;
                      if (target.classList.contains('btn-ripple') || target.closest('.btn-ripple')) {
                        const button = target.classList.contains('btn-ripple') ? target : target.closest('.btn-ripple');
                        const rect = button.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        
                        const ripple = document.createElement('span');
                        ripple.className = 'ripple';
                        ripple.style.left = x + 'px';
                        ripple.style.top = y + 'px';
                        
                        button.appendChild(ripple);
                        
                        setTimeout(() => {
                          ripple.remove();
                        }, 800);
                      }
                    });
                  });
                `
              }} />
            </NavigationProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
