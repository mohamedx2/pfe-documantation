'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CodeBracketIcon,
  RocketLaunchIcon,
  PuzzlePieceIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  ServerIcon,
  GlobeAltIcon,
  ArrowTopRightOnSquareIcon,
  CommandLineIcon,
  MagnifyingGlassIcon,
  BookmarkIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import RevealOnScroll from '@/components/RevealOnScroll';
import FloatingCard from '@/components/FloatingCard';

export default function ExamplesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [bookmarkedExamples, setBookmarkedExamples] = useState<string[]>([]);
  const [showOnlyBookmarked, setShowOnlyBookmarked] = useState(false);
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  
  // Example data
  const examples = [
    {
      id: 'todo-app',
      title: 'Todo App',
      description: 'A simple todo application with state management and local storage',
      category: 'beginner',
      image: '/images/examples/todo-app.jpg',
      demoUrl: 'https://examples.hamroun.dev/todo',
      sourceUrl: 'https://github.com/hamroun/examples/todo',
      tags: ['state', 'localStorage', 'hooks'],
      complexity: 'beginner',
      createdAt: '2023-08-10'
    },
    {
      id: 'weather-app',
      title: 'Weather Dashboard',
      description: 'Weather application that fetches data from an API with error handling',
      category: 'intermediate',
      image: '/images/examples/weather-app.jpg',
      demoUrl: 'https://examples.hamroun.dev/weather',
      sourceUrl: 'https://github.com/hamroun/examples/weather',
      tags: ['api', 'fetch', 'async', 'error-handling'],
      complexity: 'intermediate',
      createdAt: '2023-09-15'
    },
    {
      id: 'blog-cms',
      title: 'Blog CMS',
      description: 'Content management system with server components and authentication',
      category: 'advanced',
      image: '/images/examples/blog-cms.jpg',
      demoUrl: 'https://examples.hamroun.dev/blog-cms',
      sourceUrl: 'https://github.com/hamroun/examples/blog-cms',
      tags: ['server-components', 'auth', 'database'],
      complexity: 'advanced',
      createdAt: '2023-10-20'
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Store',
      description: 'Online store with shopping cart, product catalog, and checkout',
      category: 'advanced',
      image: '/images/examples/ecommerce.jpg',
      demoUrl: 'https://examples.hamroun.dev/ecommerce',
      sourceUrl: 'https://github.com/hamroun/examples/ecommerce',
      tags: ['state', 'forms', 'payment', 'api'],
      complexity: 'advanced',
      createdAt: '2023-11-05'
    },
    {
      id: 'dashboard',
      title: 'Admin Dashboard',
      description: 'Administrative interface with charts, tables, and data visualization',
      category: 'intermediate',
      image: '/images/examples/dashboard.jpg',
      demoUrl: 'https://examples.hamroun.dev/dashboard',
      sourceUrl: 'https://github.com/hamroun/examples/dashboard',
      tags: ['charts', 'tables', 'rtl-support'],
      complexity: 'intermediate',
      createdAt: '2023-11-28'
    },
    {
      id: 'chat-app',
      title: 'Real-time Chat',
      description: 'Messaging application with real-time updates using WebSockets',
      category: 'advanced',
      image: '/images/examples/chat-app.jpg',
      demoUrl: 'https://examples.hamroun.dev/chat',
      sourceUrl: 'https://github.com/hamroun/examples/chat',
      tags: ['websockets', 'real-time', 'messages'],
      complexity: 'advanced',
      createdAt: '2023-12-12'
    }
  ];
  
  // Filter categories
  const categories = [
    { id: 'all', label: 'All Examples', icon: <CodeBracketIcon className="w-5 h-5" /> },
    { id: 'beginner', label: 'Beginner', icon: <RocketLaunchIcon className="w-5 h-5" /> },
    { id: 'intermediate', label: 'Intermediate', icon: <PuzzlePieceIcon className="w-5 h-5" /> },
    { id: 'advanced', label: 'Advanced', icon: <ServerIcon className="w-5 h-5" /> },
  ];
  
  // Filter examples based on search, category, and bookmarks
  const filteredExamples = examples.filter(example => {
    // Filter by search term
    const matchesSearch = 
      example.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      example.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      example.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Filter by category
    const matchesCategory = activeCategory === 'all' || example.category === activeCategory;
    
    // Filter by bookmarks if showOnlyBookmarked is true
    const matchesBookmarked = showOnlyBookmarked ? bookmarkedExamples.includes(example.id) : true;
    
    return matchesSearch && matchesCategory && matchesBookmarked;
  });
  
  // Toggle bookmark status for an example
  const toggleBookmark = (id: string) => {
    setBookmarkedExamples(prev => 
      prev.includes(id) 
        ? prev.filter(exampleId => exampleId !== id)
        : [...prev, id]
    );
  };
  
  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-primary/10 px-4 py-2 rounded-full text-primary text-sm font-medium mb-6">
            <CodeBracketIcon className="w-5 h-5 mr-2" />
            Browse working examples of Frontend Hamroun
          </div>
          
          <h1 className="text-4xl font-bold mb-6">Example Projects</h1>
          
          <p className="text-xl max-w-3xl mx-auto mb-10">
            Explore real-world examples built with Frontend Hamroun to learn patterns, 
            best practices, and implementation techniques for your own projects.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/examples/create" className="btn-primary px-8 py-3 rounded-full">
              Create New Example
            </Link>
            <Link href="/docs/examples" className="btn-secondary px-8 py-3 rounded-full">
              Example Documentation
            </Link>
          </div>
        </div>
      </section>
      
      {/* Filter and search section */}
      <section className="py-6 bg-secondary/20 backdrop-blur-sm sticky top-16 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search examples by name, description, or tags..."
                className="input-modern pl-10 py-2 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-background/70 rounded-lg p-1 shadow-sm">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 text-sm ${
                      activeCategory === category.id
                        ? 'bg-primary text-white'
                        : 'hover:bg-secondary/50'
                    }`}
                    onClick={() => setActiveCategory(category.id)}
                  >
                    {category.icon}
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  className={`p-2 rounded-lg ${viewType === 'grid' ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/50'}`}
                  onClick={() => setViewType('grid')}
                  title="Grid View"
                >
                  <ComputerDesktopIcon className="w-5 h-5" />
                </button>
                <button
                  className={`p-2 rounded-lg ${viewType === 'list' ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/50'}`}
                  onClick={() => setViewType('list')}
                  title="List View"
                >
                  <DevicePhoneMobileIcon className="w-5 h-5" />
                </button>
              </div>
              
              <button
                className={`p-2 rounded-lg flex items-center gap-1.5 ${
                  showOnlyBookmarked ? 'bg-primary/10 text-primary' : 'hover:bg-secondary/50'
                }`}
                onClick={() => setShowOnlyBookmarked(!showOnlyBookmarked)}
              >
                {showOnlyBookmarked ? (
                  <BookmarkSolidIcon className="w-5 h-5" />
                ) : (
                  <BookmarkIcon className="w-5 h-5" />
                )}
                <span className="text-sm">Bookmarks</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Examples grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredExamples.length > 0 ? (
            <div className={
              viewType === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'flex flex-col gap-4'
            }>
              {filteredExamples.map((example, index) => (
                <RevealOnScroll key={example.id} delay={index * 100}>
                  <div 
                    className={`bg-white dark:bg-secondary/30 rounded-lg overflow-hidden shadow-md border border-primary/10 hover:border-primary/20 transition-all ${
                      viewType === 'list' ? 'flex' : ''
                    }`}
                  >
                    {/* Example preview image or placeholder */}
                    <div 
                      className={`bg-secondary/20 flex items-center justify-center ${
                        viewType === 'list' ? 'w-48 h-auto' : 'h-48'
                      }`}
                    >
                      <CodeBracketIcon className="w-12 h-12 text-primary/30" />
                    </div>
                    
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-semibold">{example.title}</h3>
                        <button 
                          className="p-1.5 rounded-full hover:bg-secondary/50"
                          onClick={() => toggleBookmark(example.id)}
                        >
                          {bookmarkedExamples.includes(example.id) ? (
                            <BookmarkSolidIcon className="w-5 h-5 text-primary" />
                          ) : (
                            <BookmarkIcon className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      
                      <p className="text-foreground/70 mb-4">{example.description}</p>
                      
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {example.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 bg-secondary/40 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs flex items-center text-foreground/50">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {new Date(example.createdAt).toLocaleDateString()}
                        </span>
                        
                        <div className="flex gap-2">
                          <a 
                            href={example.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 text-sm bg-primary text-white rounded-md flex items-center"
                          >
                            Demo <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-1" />
                          </a>
                          <a 
                            href={example.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 text-sm bg-secondary hover:bg-secondary/80 rounded-md flex items-center"
                          >
                            Code <CodeBracketIcon className="w-4 h-4 ml-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <CodeBracketIcon className="w-16 h-16 mx-auto text-foreground/30 mb-4" />
              <h3 className="text-2xl font-bold mb-2">No examples found</h3>
              <p className="text-foreground/60 mb-6">
                Try changing your search term or filters
              </p>
              <button 
                className="px-4 py-2 bg-primary text-white rounded-md"
                onClick={() => {
                  setSearchTerm('');
                  setActiveCategory('all');
                  setShowOnlyBookmarked(false);
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Featured example section */}
      <section className="py-16 bg-secondary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Example</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <RevealOnScroll>
              <div className="bg-white dark:bg-black/20 rounded-lg overflow-hidden shadow-lg border border-primary/10">
                <div className="bg-gradient-to-r from-primary/20 to-accent/20 h-64 flex items-center justify-center">
                  <div className="text-lg italic text-foreground/60">App Preview</div>
                </div>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={200}>
              <div>
                <h3 className="text-2xl font-bold mb-4">Real-time Chat Application</h3>
                <p className="text-foreground/70 mb-6">
                  This featured example demonstrates how to build a complete real-time chat application 
                  using Frontend Hamroun with WebSocket integration. It includes authentication, message 
                  persistence, typing indicators, and emoji support.
                </p>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      Real-time messaging with WebSockets
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      User authentication and profiles
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      Message persistence with database integration
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      Responsive design for mobile and desktop
                    </li>
                  </ul>
                </div>
                
                <div className="flex gap-4">
                  <a 
                    href="https://examples.hamroun.dev/chat" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-primary text-white rounded-md flex items-center"
                  >
                    View Demo <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2" />
                  </a>
                  <a 
                    href="https://github.com/hamroun/examples/chat" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 bg-background border border-primary/20 rounded-md flex items-center"
                  >
                    Source Code <CodeBracketIcon className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
      
      {/* Template starter section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold text-center mb-4">Start Your Own Project</h2>
            <p className="text-xl text-center max-w-3xl mx-auto mb-12">
              Use one of our official starter templates to quickly bootstrap your next Frontend Hamroun project
            </p>
          </RevealOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Minimal Starter',
                description: 'Lightweight template with just the essentials',
                command: 'npx create-hamroun-app my-app --template minimal'
              },
              {
                name: 'Full-Stack App',
                description: 'Complete setup with API routes and database',
                command: 'npx create-hamroun-app my-app --template fullstack'
              },
              {
                name: 'E-commerce Starter',
                description: 'Pre-built store with cart and checkout',
                command: 'npx create-hamroun-app my-app --template ecommerce'
              }
            ].map((template, index) => (
              <RevealOnScroll key={index} delay={index * 150}>
                <FloatingCard className="p-6 h-full flex flex-col">
                  <h3 className="text-xl font-bold mb-3">{template.name}</h3>
                  <p className="text-foreground/70 mb-6 flex-grow">{template.description}</p>
                  
                  <div className="bg-black rounded-md overflow-hidden">
                    <div className="flex items-center bg-black/80 px-3 py-1.5 gap-2">
                      <CommandLineIcon className="w-4 h-4 text-white/70" />
                      <span className="text-white/70 text-xs">Terminal</span>
                    </div>
                    <div className="p-3 text-sm text-green-400 font-mono">
                      {template.command}
                    </div>
                  </div>
                </FloatingCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
      
      {/* Community examples section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <RevealOnScroll>
            <h2 className="text-3xl font-bold text-center mb-2">Community Examples</h2>
            <p className="text-lg text-center max-w-3xl mx-auto mb-12">
              Created by the Frontend Hamroun community around the world
            </p>
          </RevealOnScroll>
          
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x">
            {[1, 2, 3, 4, 5].map(i => (
              <div 
                key={i}
                className="min-w-[300px] bg-white dark:bg-secondary/30 rounded-lg overflow-hidden shadow-md snap-start border border-primary/10"
              >
                <div className="h-40 bg-gradient-to-br from-secondary to-primary/5 flex items-center justify-center">
                  <GlobeAltIcon className="w-10 h-10 text-primary/30" />
                </div>
                <div className="p-5">
                  <h3 className="font-medium mb-2">Community Example {i}</h3>
                  <p className="text-sm text-foreground/70 mb-4">Created by a Frontend Hamroun community member</p>
                  <div className="flex justify-end">
                    <a href="#" className="text-primary text-sm hover:underline">
                      View example →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
