 
'use client';
import React, { useState, useEffect, useMemo } from 'react';
import DocsCard from '@/components/DocsCard';
import AnimatedTabs from '@/components/AnimatedTabs';
import HoverCard from '@/components/HoverCard';
import CodePlayground from '@/components/CodePlayground';
import ResizablePanels from '@/components/ResizablePanels';
import GlowButton from '@/components/GlowButton';
import FAQAccordion from '@/components/FAQAccordion';
import Interactive3DIcon from '@/components/Interactive3DIcon';
import { 
  PuzzlePieceIcon,
  CubeTransparentIcon,
  ArrowPathIcon,
  CodeBracketIcon,
  WindowIcon, 
  ServerIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  TableCellsIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  ArrowsPointingOutIcon,
  SparklesIcon,
  RocketLaunchIcon,
  TagIcon,
  BookmarkIcon,
  ClockIcon,
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  SunIcon,
  MoonIcon,
  VideoCameraIcon,
  BookOpenIcon,
  LinkIcon,
  StarIcon,
  ViewColumnsIcon,
  Squares2X2Icon,
  RectangleGroupIcon
} from '@heroicons/react/24/outline';
import { 
  DocumentTextIcon,
  BookmarkIcon as BookmarkSolidIcon
} from '@heroicons/react/24/solid';

export default function ComponentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'mobile'>('desktop');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [bookmarkedComponents, setBookmarkedComponents] = useState<string[]>([]);
  const [layoutMode, setLayoutMode] = useState<'grid' | 'compact' | 'showcase'>('grid');
  const [cardSize, setCardSize] = useState<'sm' | 'md' | 'lg'>('md');
  
  // Load bookmarks and search history from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem('bookmarkedComponents');
    if (savedBookmarks) {
      setBookmarkedComponents(JSON.parse(savedBookmarks));
    }
    
    const savedHistory = localStorage.getItem('componentSearchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
    
    // Detect system theme preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
    }
  }, []);
  
  // Save bookmarks when changed
  useEffect(() => {
    localStorage.setItem('bookmarkedComponents', JSON.stringify(bookmarkedComponents));
  }, [bookmarkedComponents]);
  
  // Save search history when changed
  useEffect(() => {
    localStorage.setItem('componentSearchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);
  
  // Handle search submission
  const handleSearch = () => {
    if (searchTerm && !searchHistory.includes(searchTerm)) {
      setSearchHistory(prev => [searchTerm, ...prev.slice(0, 4)]);
    }
  };
  
  // Toggle bookmark for a component
  const toggleBookmark = (title: string) => {
    setBookmarkedComponents(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };
  
  // Component data with categories
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const components = [
    // Core Components
    {
      title: "Virtual DOM",
      icon: <CubeTransparentIcon className="w-5 h-5" />,
      description: "Efficient diffing and rendering algorithm for minimal DOM operations",
      link: "/docs/components/virtual-dom",
      tags: ["Core", "Performance"],
      category: "core",
      isNew: true,
      usageCount: 42,
      rating: 4.9,
      contributors: 7,
      lastUpdated: "2 days ago",
      previewImage: "/images/components/virtualdom-preview.png",
      codePreview: `import { createVirtualElement } from 'frontend-hamroun';

const vdom = createVirtualElement('div', { className: 'container' }, 
  createVirtualElement('h1', null, 'Hello World'),
  createVirtualElement('p', null, 'Virtual DOM example')
);`
    },
    {
      title: "Component Architecture",
      icon: <PuzzlePieceIcon className="w-5 h-5" />,
      description: "Create reusable UI components with declarative syntax",
      link: "/docs/components/architecture",
      tags: ["Core"],
      category: "core",
      usageCount: 38,
      rating: 4.7,
      contributors: 12,
      lastUpdated: "1 week ago",
      previewImage: "/images/components/architecture-preview.png",
      codePreview: `function Greeting({ name }) {
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <p>Welcome to Frontend Hamroun.</p>
    </div>
  );
}`
    },
    {
      title: "Context API",
      icon: <ArrowPathIcon className="w-5 h-5" />,
      description: "Pass data through the component tree without prop drilling",
      link: "/docs/components/context",
      tags: ["State Management"],
      category: "core",
      isUpdated: true,
      usageCount: 27,
      rating: 4.6,
      contributors: 5,
      lastUpdated: "3 days ago",
      previewImage: "/images/components/context-preview.png",
      codePreview: `import { createContext, useContext } from 'frontend-hamroun';

const ThemeContext = createContext('light');

function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value="dark">
      {children}
    </ThemeContext.Provider>
  );
}`
    },
    {
      title: "Suspense",
      icon: <CodeBracketIcon className="w-5 h-5" />,
      description: "Handle asynchronous operations with components that wait for data",
      link: "/docs/components/suspense",
      tags: ["Loading", "Advanced"],
      category: "core",
      usageCount: 18,
      rating: 4.5,
      contributors: 4,
      lastUpdated: "2 weeks ago",
      previewImage: "/images/components/suspense-preview.png",
      codePreview: `import { Suspense } from 'frontend-hamroun';

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <UserProfile />
    </Suspense>
  );
}`
    },
    
    // Special Features - enhanced with more metadata
    {
      title: "Client Components",
      icon: <WindowIcon className="w-5 h-5" />,
      description: "Interactive client-side components with hooks and state",
      link: "/docs/components/client",
      tags: ["Client-side"],
      category: "special",
      variant: "primary",
      usageCount: 31,
      rating: 4.8,
      contributors: 9,
      lastUpdated: "5 days ago",
      previewImage: "/images/components/client-preview.png",
      codePreview: `'use client';

import { useState } from 'frontend-hamroun';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`
    },
    {
      title: "Server Components",
      icon: <ServerIcon className="w-5 h-5" />,
      description: "Server-rendered components that improve performance",
      link: "/docs/components/server",
      tags: ["Server-side"],
      category: "special",
      variant: "primary",
      isNew: true,
      usageCount: 23,
      rating: 4.9,
      contributors: 6,
      lastUpdated: "1 day ago",
      previewImage: "/images/components/server-preview.png",
      codePreview: `async function DashboardPage() {
  // This runs on the server
  const data = await fetchDashboardData();
  
  return (
    <main>
      <h1>{data.title}</h1>
      <DashboardMetrics metrics={data.metrics} />
    </main>
  );
}`
    },
    
    // UI Components - enhanced with more metadata
    {
      title: "Button",
      icon: <RocketLaunchIcon className="w-5 h-5" />,
      description: "Interactive buttons with various styles and animations",
      link: "/docs/components/button",
      tags: ["UI", "Interactive"],
      category: "ui",
      usageCount: 45,
      rating: 4.9,
      contributors: 15,
      lastUpdated: "3 days ago",
      isPopular: true,
      previewImage: "/images/components/button-preview.png",
      codePreview: `import { Button } from 'frontend-hamroun/ui';

function SaveButton() {
  return (
    <Button 
      variant="primary"
      icon={<SaveIcon />}
      onClick={() => saveData()}
    >
      Save Changes
    </Button>
  );
}`
    },
    {
      title: "Card",
      icon: <TableCellsIcon className="w-5 h-5" />,
      description: "Versatile content containers with hover effects",
      link: "/docs/components/card",
      tags: ["UI", "Layout"],
      category: "ui",
      isUpdated: true,
      usageCount: 39,
      rating: 4.7,
      contributors: 8,
      lastUpdated: "1 week ago",
      previewImage: "/images/components/card-preview.png",
      codePreview: `import { Card } from 'frontend-hamroun/ui';

function FeatureCard() {
  return (
    <Card
      title="Interactive UI"
      description="Build engaging interfaces"
      image="/images/feature.png"
      variant="hover"
    >
      <Button>Learn More</Button>
    </Card>
  );
}`
    },
    {
      title: "Modal",
      icon: <ArrowsPointingOutIcon className="w-5 h-5" />,
      description: "Popup dialogs and modal windows with accessibility features",
      link: "/docs/components/modal",
      tags: ["UI", "Overlay"],
      category: "ui",
      usageCount: 35,
      rating: 4.6,
      contributors: 7,
      lastUpdated: "2 weeks ago",
      previewImage: "/images/components/modal-preview.png",
      codePreview: `import { Modal } from 'frontend-hamroun/ui';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
      >
        <h2>Modal Content</h2>
        <p>This is a modal dialog</p>
      </Modal>
    </>
  );
}`
    },
    {
      title: "Calendar",
      icon: <CalendarDaysIcon className="w-5 h-5" />,
      description: "Date picker with various display options and localization",
      link: "/docs/components/calendar",
      tags: ["UI", "Date"],
      category: "ui",
      isNew: true,
      usageCount: 22,
      rating: 4.8,
      contributors: 5,
      lastUpdated: "4 days ago",
      previewImage: "/images/components/calendar-preview.png",
      codePreview: `import { Calendar } from 'frontend-hamroun/ui';

function DatePicker() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  return (
    <Calendar
      value={selectedDate}
      onChange={setSelectedDate}
      locale="en-US"
      weekStartsOn={0}
    />
  );
}`
    },
    
    // Data Display Components with metadata
    {
      title: "Table",
      icon: <TableCellsIcon className="w-5 h-5" />,
      description: "Responsive tables with sorting, filtering, and pagination",
      link: "/docs/components/table",
      tags: ["Data", "Display"],
      category: "data",
      usageCount: 33,
      rating: 4.7,
      contributors: 10,
      lastUpdated: "1 week ago",
      previewImage: "/images/components/table-preview.png",
      codePreview: `import { Table } from 'frontend-hamroun/ui';

function UserTable({ users }) {
  return (
    <Table
      data={users}
      columns={[
        { key: 'name', header: 'Name' },
        { key: 'email', header: 'Email' },
        { key: 'role', header: 'Role' }
      ]}
      sortable
      paginate
      rowsPerPage={10}
    />
  );
}`
    },
    {
      title: "Chart",
      icon: <ChartBarIcon className="w-5 h-5" />,
      description: "Data visualization with interactive charts and graphs",
      link: "/docs/components/chart",
      tags: ["Data", "Display"],
      category: "data",
      usageCount: 28,
      rating: 4.6,
      contributors: 8,
      lastUpdated: "10 days ago",
      previewImage: "/images/components/chart-preview.png",
      codePreview: `import { LineChart } from 'frontend-hamroun/charts';

function RevenueChart({ data }) {
  return (
    <LineChart
      data={data}
      xAxis={{ key: 'month', label: 'Month' }}
      yAxis={{ key: 'revenue', label: 'Revenue ($)' }}
      colors={['#0E7C86']}
      animate={true}
      tooltip
    />
  );
}`
    },
  ];

  // Filter and search components
  const filteredComponents = useMemo(() => {
    return components.filter(component => {
      const matchesSearch = searchTerm === '' || 
        component.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        
      const matchesCategory = activeCategory === 'all' || component.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [components, searchTerm, activeCategory]);
  
  // Component categories for filtering
  const categories = [
    { id: 'all', label: 'All Components', icon: <AdjustmentsHorizontalIcon className="w-5 h-5" /> },
    { id: 'core', label: 'Core Components', icon: <CubeTransparentIcon className="w-5 h-5" /> },
    { id: 'special', label: 'Special Features', icon: <SparklesIcon className="w-5 h-5" /> },
    { id: 'ui', label: 'UI Components', icon: <WindowIcon className="w-5 h-5" /> },
    { id: 'data', label: 'Data Display', icon: <ChartBarIcon className="w-5 h-5" /> },
  ];
  
  // Example code snippets
  const buttonCodeExample = `import { Button } from 'frontend-hamroun/ui';

function SaveButton() {
  return (
    <Button 
      variant="primary"
      icon={<SaveIcon />}
      onClick={() => saveData()}
    >
      Save Changes
    </Button>
  );
}`;

  const cardCodeExample = `import { Card } from 'frontend-hamroun/ui';

function FeatureCard() {
  return (
    <Card
      title="Interactive UI"
      description="Build engaging user interfaces with our components"
      image="/images/feature.png"
      variant="hover"
    >
      <Button>Learn More</Button>
    </Card>
  );
}`;

  // Common component questions for FAQ section
  const componentFAQs = [
    {
      question: "How do I create custom components?",
      answer: "Create custom components by defining a function or class that returns JSX. You can extend existing components using composition or inheritance patterns."
    },
    {
      question: "Can I use Hamroun components with TypeScript?",
      answer: "Yes, all components are fully typed with TypeScript definitions included in the package. This provides excellent IDE support and type safety."
    },
    {
      question: "How do I style components?",
      answer: "Components accept className props for styling with CSS or Tailwind. You can also use the theme system, CSS modules, or styled-components."
    },
    {
      question: "Are these components accessible?",
      answer: "Yes, all components follow WCAG guidelines with proper ARIA attributes, keyboard navigation support, and focus management."
    }
  ];

  // API Reference data
  const buttonApiReference = [
    { prop: 'variant', type: '"primary" | "accent" | "subtle"', default: '"primary"', description: 'The visual style variant of the button' },
    { prop: 'size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Controls the size of the button' },
    { prop: 'disabled', type: 'boolean', default: 'false', description: 'When true, disables the button' },
    { prop: 'icon', type: 'ReactNode', default: 'undefined', description: 'Optional icon to display inside the button' },
    { prop: 'href', type: 'string', default: 'undefined', description: 'If provided, renders as an anchor tag' },
    { prop: 'onClick', type: '() => void', default: 'undefined', description: 'Function called when button is clicked' },
    { prop: 'className', type: 'string', default: '""', description: 'Additional CSS class names' }
  ];
  
  const cardApiReference = [
    { prop: 'title', type: 'string', default: 'undefined', description: 'Card title displayed at the top' },
    { prop: 'description', type: 'string', default: 'undefined', description: 'Optional description text' },
    { prop: 'image', type: 'string', default: 'undefined', description: 'Optional image URL to display' },
    { prop: 'variant', type: '"default" | "hover" | "interactive"', default: '"default"', description: 'The visual style and behavior of the card' },
    { prop: 'className', type: 'string', default: '""', description: 'Additional CSS class names' },
    { prop: 'children', type: 'ReactNode', default: 'undefined', description: 'Content to display inside the card' }
  ];
  
  // Related resources data
  const relatedResources = [
    {
      title: "Component Best Practices",
      type: "Documentation",
      icon: <BookOpenIcon className="w-5 h-5" />,
      url: "/docs/guides/component-best-practices"
    },
    {
      title: "Building a Dashboard with Hamroun",
      type: "Tutorial",
      icon: <DocumentTextIcon className="w-5 h-5" />,
      url: "/tutorials/dashboard"
    },
    {
      title: "Component Architecture Deep Dive",
      type: "Video",
      icon: <VideoCameraIcon className="w-5 h-5" />,
      url: "https://youtube.com/hamroun-components"
    },
    {
      title: "Component Showcase Gallery",
      type: "Examples",
      icon: <RocketLaunchIcon className="w-5 h-5" />,
      url: "/examples/component-showcase"
    }
  ];

  // Define allowed DocsCard variant types
  type DocsCardVariant = 'showcase' | 'primary' | 'minimal' | 'default' | 'accent' | 'interactive' | undefined;
  
  // Get card variant and size based on layout mode
  const getCardVariant = (component: { title: string; icon: React.JSX.Element; description: string; link: string; tags: string[]; category: string; isNew: boolean; usageCount: number; rating: number; contributors: number; lastUpdated: string; previewImage: string; codePreview: string; isUpdated?: undefined; variant?: undefined; isPopular?: undefined; } | { title: string; icon: React.JSX.Element; description: string; link: string; tags: string[]; category: string; usageCount: number; rating: number; contributors: number; lastUpdated: string; previewImage: string; codePreview: string; isNew?: undefined; isUpdated?: undefined; variant?: undefined; isPopular?: undefined; } | { title: string; icon: React.JSX.Element; description: string; link: string; tags: string[]; category: string; isUpdated: boolean; usageCount: number; rating: number; contributors: number; lastUpdated: string; previewImage: string; codePreview: string; isNew?: undefined; variant?: undefined; isPopular?: undefined; } | { title: string; icon: React.JSX.Element; description: string; link: string; tags: string[]; category: string; variant: string; usageCount: number; rating: number; contributors: number; lastUpdated: string; previewImage: string; codePreview: string; isNew?: undefined; isUpdated?: undefined; isPopular?: undefined; } | { title: string; icon: React.JSX.Element; description: string; link: string; tags: string[]; category: string; variant: string; isNew: boolean; usageCount: number; rating: number; contributors: number; lastUpdated: string; previewImage: string; codePreview: string; isUpdated?: undefined; isPopular?: undefined; } | { title: string; icon: React.JSX.Element; description: string; link: string; tags: string[]; category: string; usageCount: number; rating: number; contributors: number; lastUpdated: string; isPopular: boolean; previewImage: string; codePreview: string; isNew?: undefined; isUpdated?: undefined; variant?: undefined; }): DocsCardVariant => {
    if (layoutMode === 'showcase') {
      return 'showcase';
    }
    if (layoutMode === 'compact') {
      // Ensure variant is one of the allowed types or default to 'minimal'
      const variant = component.variant as DocsCardVariant;
      return (variant === 'primary' || variant === 'minimal' || variant === 'default' || 
              variant === 'accent' || variant === 'interactive') ? variant : 'minimal';
    }
    // Ensure variant is one of the allowed types or default to 'default'
    const variant = component.variant as DocsCardVariant;
    return (variant === 'primary' || variant === 'minimal' || variant === 'default' || 
            variant === 'accent' || variant === 'interactive') ? variant : 'default';
  };
  
  const getCardSize = () => {
    if (layoutMode === 'showcase') return 'lg';
    if (layoutMode === 'compact') return 'sm';
    return cardSize;
  };

  return (
    <div className="docs-section">
      <h1 className="text-3xl font-bold mb-6">Components</h1>
      
      <p className="text-lg mb-8">
        Frontend Hamroun provides a rich set of components to help you build interactive and responsive user interfaces.
      </p>
      
      {/* Enhanced Search and filter with history */}
      <div className="bg-background/60 backdrop-blur-sm p-4 rounded-lg border border-primary/10 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search components..."
              className="input-modern pl-10 py-2 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              list="search-history"
            />
            {searchHistory.length > 0 && (
              <datalist id="search-history">
                {searchHistory.map((term, i) => (
                  <option key={`history-${i}`} value={term} />
                ))}
              </datalist>
            )}
            {searchHistory.length > 0 && (
              <div className="absolute top-full left-0 mt-1 w-full bg-background rounded-md shadow-md border border-primary/10 z-10 overflow-hidden">
                <div className="p-2 border-b border-primary/10 flex items-center text-xs text-foreground/60">
                  <ClockIcon className="w-3 h-3 mr-1" />
                  <span>Recent searches</span>
                </div>
                <div className="max-h-32 overflow-y-auto">
                  {searchHistory.map((term, index) => (
                    <button
                      key={`search-${index}`}
                      className="w-full text-left p-2 hover:bg-primary/5 text-sm flex items-center"
                      onClick={() => setSearchTerm(term)}
                    >
                      <ClockIcon className="w-4 h-4 mr-2 text-foreground/40" />
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <TagIcon className="w-5 h-5 text-primary" />
            <span className="text-sm">Filter:</span>
            <select 
              className="input-modern py-2"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        {/* View Options */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-primary/10">
          <div className="flex items-center gap-4">
            {/* Layout Mode Toggle */}
            <div className="flex items-center bg-secondary/50 rounded-full p-1">
              <button
                className={`p-1.5 rounded-full ${layoutMode === 'grid' ? 'bg-primary text-white' : 'text-foreground/70'}`}
                onClick={() => setLayoutMode('grid')}
                title="Grid View"
              >
                <Squares2X2Icon className="w-4 h-4" />
              </button>
              <button
                className={`p-1.5 rounded-full ${layoutMode === 'showcase' ? 'bg-primary text-white' : 'text-foreground/70'}`}
                onClick={() => setLayoutMode('showcase')}
                title="Showcase View"
              >
                <RectangleGroupIcon className="w-4 h-4" />
              </button>
              <button
                className={`p-1.5 rounded-full ${layoutMode === 'compact' ? 'bg-primary text-white' : 'text-foreground/70'}`}
                onClick={() => setLayoutMode('compact')}
                title="Compact View"
              >
                <ViewColumnsIcon className="w-4 h-4" />
              </button>
            </div>
            
            {/* Grid Layout - Card Size */}
            {layoutMode === 'grid' && (
            <div className="flex items-center bg-secondary/50 rounded-full p-1">
              <button
                className={`p-1.5 rounded-full ${cardSize === 'sm' ? 'bg-primary text-white' : 'text-foreground/70'}`}
                onClick={() => setCardSize('sm')}
                title="Small Cards"
              >
                <span className="text-xs">S</span>
              </button>
              <button
                className={`p-1.5 rounded-full ${cardSize === 'md' ? 'bg-primary text-white' : 'text-foreground/70'}`}
                onClick={() => setCardSize('md')}
                title="Medium Cards"
              >
                <span className="text-xs">M</span>
              </button>
              <button
                className={`p-1.5 rounded-full ${cardSize === 'lg' ? 'bg-primary text-white' : 'text-foreground/70'}`}
                onClick={() => setCardSize('lg')}
                title="Large Cards"
              >
                <span className="text-xs">L</span>
              </button>
            </div>
            )}
            
            {/* Theme Toggle */}
            <div className="flex items-center bg-secondary/50 rounded-full p-1">
              <button
                className={`p-1.5 rounded-full ${theme === 'light' ? 'bg-primary text-white' : 'text-foreground/70'}`}
                onClick={() => setTheme('light')}
                title="Light Theme"
              >
                <SunIcon className="w-4 h-4" />
              </button>
              <button
                className={`p-1.5 rounded-full ${theme === 'dark' ? 'bg-primary text-white' : 'text-foreground/70'}`}
                onClick={() => setTheme('dark')}
                title="Dark Theme"
              >
                <MoonIcon className="w-4 h-4" />
              </button>
            </div>
            
            {/* Device Preview Toggle */}
            <div className="flex items-center bg-secondary/50 rounded-full p-1">
              <button
                className={`p-1.5 rounded-full ${devicePreview === 'desktop' ? 'bg-primary text-white' : 'text-foreground/70'}`}
                onClick={() => setDevicePreview('desktop')}
                title="Desktop Preview"
              >
                <ComputerDesktopIcon className="w-4 h-4" />
              </button>
              <button
                className={`p-1.5 rounded-full ${devicePreview === 'mobile' ? 'bg-primary text-white' : 'text-foreground/70'}`}
                onClick={() => setDevicePreview('mobile')}
                title="Mobile Preview"
              >
                <DevicePhoneMobileIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {/* Bookmarks Filter */}
          <button 
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${
              bookmarkedComponents.length > 0 
                ? 'bg-primary/10 text-primary hover:bg-primary/20' 
                : 'bg-secondary/50 text-foreground/70'
            } transition-colors`}
            disabled={bookmarkedComponents.length === 0}
          >
            {bookmarkedComponents.length > 0 ? (
              <BookmarkSolidIcon className="w-4 h-4" />
            ) : (
              <BookmarkIcon className="w-4 h-4" />
            )}
            <span className="text-sm">{bookmarkedComponents.length} Bookmarked</span>
          </button>
        </div>
      </div>
      
      {/* Tab navigation for categories */}
      <AnimatedTabs
        tabs={categories.map(category => ({
          id: category.id,
          label: category.label,
          icon: category.icon,
          content: (
            <div className="py-6">
              {category.id === 'all' && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Component Overview</h2>
                  <p className="mb-4">
                    Explore all available components in the Frontend Hamroun library. Use the search and filter options above 
                    to find specific components by name, description, or tags.
                  </p>
                </div>
              )}
              
              {/* Layout based on selected layout mode */}
              <div className={`
                ${layoutMode === 'grid' ? 'docs-grid' : ''}
                ${layoutMode === 'showcase' ? 'flex flex-col gap-6' : ''}
                ${layoutMode === 'compact' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3' : ''}
              `}>
                {filteredComponents
                  .filter(comp => category.id === 'all' || comp.category === category.id)
                  .map((component) => (
                    <DocsCard
                      key={component.title}
                      title={component.title}
                      icon={component.icon}
                      description={component.description}
                      link={component.link}
                      tags={component.tags}
                      isNew={component.isNew}
                      isUpdated={component.isUpdated}
                      isPopular={component.isPopular}
                      variant={getCardVariant(component)}
                      size={getCardSize()}
                      isBookmarked={bookmarkedComponents.includes(component.title)}
                      onBookmarkToggle={() => toggleBookmark(component.title)}
                      previewImage={component.previewImage}
                      codePreview={component.codePreview}
                      usageCount={component.usageCount}
                      rating={component.rating}
                      contributors={component.contributors}
                      lastUpdated={component.lastUpdated}
                    />
                  ))}
              </div>
              
              {filteredComponents.filter(comp => category.id === 'all' || comp.category === category.id).length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-foreground/60">No components match your search criteria</p>
                  <button 
                    className="mt-4 py-2 px-4 text-primary hover:underline"
                    onClick={() => {
                      setSearchTerm('');
                      setActiveCategory('all');
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          )
        }))}
      />
      
      {/* Component Comparison Table - NEW */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Component Comparison</h2>
        <p className="mb-8">
          Compare different components to find the right one for your use case.
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-primary text-white">
                <th className="p-3 text-left">Feature</th>
                <th className="p-3 text-center">Button</th>
                <th className="p-3 text-center">IconButton</th>
                <th className="p-3 text-center">LinkButton</th>
                <th className="p-3 text-center">GlowButton</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-background/80">
                <td className="p-3 font-medium">Keyboard Navigation</td>
                <td className="p-3 text-center">✅</td>
                <td className="p-3 text-center">✅</td>
                <td className="p-3 text-center">✅</td>
                <td className="p-3 text-center">✅</td>
              </tr>
              <tr className="bg-secondary/30">
                <td className="p-3 font-medium">Icon Support</td>
                <td className="p-3 text-center">✅</td>
                <td className="p-3 text-center">✅</td>
                <td className="p-3 text-center">✅</td>
                <td className="p-3 text-center">✅</td>
              </tr>
              <tr className="bg-background/80">
                <td className="p-3 font-medium">Loading State</td>
                <td className="p-3 text-center">✅</td>
                <td className="p-3 text-center">✅</td>
                <td className="p-3 text-center">❌</td>
                <td className="p-3 text-center">✅</td>
              </tr>
              <tr className="bg-secondary/30">
                <td className="p-3 font-medium">Hover Effects</td>
                <td className="p-3 text-center">Basic</td>
                <td className="p-3 text-center">Basic</td>
                <td className="p-3 text-center">Underline</td>
                <td className="p-3 text-center">Advanced</td>
              </tr>
              <tr className="bg-background/80">
                <td className="p-3 font-medium">Form Submit</td>
                <td className="p-3 text-center">✅</td>
                <td className="p-3 text-center">❌</td>
                <td className="p-3 text-center">❌</td>
                <td className="p-3 text-center">✅</td>
              </tr>
              <tr className="bg-secondary/30">
                <td className="p-3 font-medium">Bundle Size Impact</td>
                <td className="p-3 text-center">Small</td>
                <td className="p-3 text-center">Small</td>
                <td className="p-3 text-center">Small</td>
                <td className="p-3 text-center">Medium</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      
      {/* Interactive examples section with theme/device preview */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Interactive Examples</h2>
        <p className="mb-8">
          Try out some of our most popular components with these interactive examples.
          Toggle between light/dark themes and desktop/mobile views to see how they adapt.
        </p>
        
        <div className="space-y-12">
          {/* Button Example */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Button Component</h3>
            <ResizablePanels
              direction="horizontal"
              initialSizes={[50, 50]}
              minSizes={[30, 30]}
              className="border border-primary/10 rounded-lg overflow-hidden bg-background/50"
            >
              <div className="p-4">
                <h4 className="text-lg font-medium mb-4 flex items-center">
                  <DocumentTextIcon className="w-5 h-5 mr-2 text-primary" />
                  Code Example
                </h4>
                <CodePlayground
                  initialCode={buttonCodeExample}
                  readOnly={true}
                />
              </div>
              <div className={`p-8 flex items-center justify-center ${theme === 'dark' ? 'bg-[#0D1117]' : 'bg-secondary/30'}`}>
                <div className={devicePreview === 'mobile' ? 'w-[320px] border-2 border-foreground/10 rounded-xl p-4' : 'w-full'}>
                  <div className="text-center space-y-4">
                    <h4 className="text-lg mb-4">Button Variants</h4>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <GlowButton>Primary Button</GlowButton>
                      <GlowButton variant="accent">Accent Button</GlowButton>
                      <GlowButton variant="subtle">Subtle Button</GlowButton>
                    </div>
                  </div>
                </div>
              </div>
            </ResizablePanels>
          </div>
          
          {/* Card Example */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Card Component</h3>
            <ResizablePanels
              direction="horizontal"
              initialSizes={[50, 50]}
              minSizes={[30, 30]}
              className="border border-primary/10 rounded-lg overflow-hidden bg-background/50"
            >
              <div className="p-4">
                <h4 className="text-lg font-medium mb-4 flex items-center">
                  <DocumentTextIcon className="w-5 h-5 mr-2 text-primary" />
                  Code Example
                </h4>
                <CodePlayground
                  initialCode={cardCodeExample}
                  readOnly={true}
                />
              </div>
              <div className={`p-8 flex items-center justify-center ${theme === 'dark' ? 'bg-[#0D1117]' : 'bg-secondary/30'}`}>
                <div className={devicePreview === 'mobile' ? 'w-[320px] border-2 border-foreground/10 rounded-xl p-4' : 'w-full'}>
                  <HoverCard 
                    className="p-6 max-w-sm bg-background border border-primary/10"
                    intensity={10}
                    shine={true}
                  >
                    <h4 className="text-xl font-semibold mb-2">Interactive Card</h4>
                    <p className="text-foreground/70 mb-4">
                      This card demonstrates the interactive 3D hover effect available in our card components.
                    </p>
                    <GlowButton variant="primary">Learn More</GlowButton>
                  </HoverCard>
                </div>
              </div>
            </ResizablePanels>
          </div>
          
          {/* Other interactive examples remain the same */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Interactive Icons</h3>
            <div className="p-8 bg-secondary/30 rounded-lg border border-primary/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
                <Interactive3DIcon 
                  icon={<CubeTransparentIcon className="w-6 h-6" />}
                  bgColor="var(--primary)"
                  tooltip="Virtual DOM"
                  size={60}
                />
                <Interactive3DIcon 
                  icon={<ServerIcon className="w-6 h-6" />}
                  bgColor="var(--accent)"
                  pulseEffect={true}
                  tooltip="Server Components"
                  size={60}
                />
                <Interactive3DIcon 
                  icon={<WindowIcon className="w-6 h-6" />}
                  bgColor="var(--purple)"
                  floatEffect={true}
                  tooltip="Client Components"
                  size={60}
                />
                <Interactive3DIcon 
                  icon={<CodeBracketIcon className="w-6 h-6" />}
                  bgColor="var(--turquoise)"
                  glowEffect={true}
                  tooltip="API Reference"
                  size={60}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* API References Section - NEW */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">API Reference</h2>
        <p className="mb-8">
          Detailed documentation for component props and configuration options.
        </p>
        
        <div className="space-y-12">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <RocketLaunchIcon className="w-5 h-5 mr-2 text-primary" />
              Button Props
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Default</th>
                    <th className="p-3 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {buttonApiReference.map((prop, index) => (
                    <tr key={prop.prop} className={index % 2 === 0 ? 'bg-background' : 'bg-secondary/20'}>
                      <td className="p-3 font-mono text-sm font-medium">{prop.prop}</td>
                      <td className="p-3 font-mono text-xs">{prop.type}</td>
                      <td className="p-3 font-mono text-xs">{prop.default}</td>
                      <td className="p-3 text-sm">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <TableCellsIcon className="w-5 h-5 mr-2 text-primary" />
              Card Props
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-primary/10">
                    <th className="p-3 text-left">Prop</th>
                    <th className="p-3 text-left">Type</th>
                    <th className="p-3 text-left">Default</th>
                    <th className="p-3 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {cardApiReference.map((prop, index) => (
                    <tr key={prop.prop} className={index % 2 === 0 ? 'bg-background' : 'bg-secondary/20'}>
                      <td className="p-3 font-mono text-sm font-medium">{prop.prop}</td>
                      <td className="p-3 font-mono text-xs">{prop.type}</td>
                      <td className="p-3 font-mono text-xs">{prop.default}</td>
                      <td className="p-3 text-sm">{prop.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      
      {/* Component FAQ section remains the same */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Component FAQs</h2>
        <FAQAccordion items={componentFAQs} />
      </section>
      
      {/* Related Resources Section - NEW */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
        <p className="mb-8">
          Explore tutorials, videos, and additional documentation to master Frontend Hamroun components.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {relatedResources.map((resource, index) => (
            <a 
              key={index} 
              href={resource.url}
              className="flex items-center gap-4 p-4 bg-background/60 rounded-lg border border-primary/10 hover:bg-primary/5 hover:border-primary/30 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {resource.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{resource.title}</h3>
                  <span className="text-xs px-2 py-0.5 bg-secondary rounded-full">{resource.type}</span>
                </div>
                <div className="flex items-center mt-2 text-sm text-foreground/60">
                  <LinkIcon className="w-3.5 h-3.5 mr-1" />
                  {resource.url.replace(/^https?:\/\//, '').split('/')[0]}
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
      
      {/* Usage Analytics - NEW */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Component Popularity</h2>
        <p className="mb-8">
          See which components are most widely used in the community.
        </p>
        
        <div className="bg-background/60 backdrop-blur-sm rounded-lg border border-primary/10 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-4 bg-background rounded-lg border border-primary/10 shadow-sm">
              <div className="flex justify-between">
                <h3 className="font-medium">Button</h3>
                <div className="flex items-center gap-1 text-accent">
                  <StarIcon className="w-4 h-4" />
                  <span>4.9</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '95%' }}></div>
                </div>
                <div className="mt-1 text-xs text-foreground/60 flex justify-between">
                  <span>95% usage</span>
                  <span>34k downloads</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-background rounded-lg border border-primary/10 shadow-sm">
              <div className="flex justify-between">
                <h3 className="font-medium">Card</h3>
                <div className="flex items-center gap-1 text-accent">
                  <StarIcon className="w-4 h-4" />
                  <span>4.8</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '88%' }}></div>
                </div>
                <div className="mt-1 text-xs text-foreground/60 flex justify-between">
                  <span>88% usage</span>
                  <span>31k downloads</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-background rounded-lg border border-primary/10 shadow-sm">
              <div className="flex justify-between">
                <h3 className="font-medium">TextField</h3>
                <div className="flex items-center gap-1 text-accent">
                  <StarIcon className="w-4 h-4" />
                  <span>4.7</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '82%' }}></div>
                </div>
                <div className="mt-1 text-xs text-foreground/60 flex justify-between">
                  <span>82% usage</span>
                  <span>29k downloads</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-background rounded-lg border border-primary/10 shadow-sm">
              <div className="flex justify-between">
                <h3 className="font-medium">Modal</h3>
                <div className="flex items-center gap-1 text-accent">
                  <StarIcon className="w-4 h-4" />
                  <span>4.6</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="mt-1 text-xs text-foreground/60 flex justify-between">
                  <span>75% usage</span>
                  <span>26k downloads</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Getting Started with Components */}
      <section className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Getting Started with Components</h2>
        <div className="bg-background/60 backdrop-blur-sm p-6 rounded-lg border border-primary/10">
          <h3 className="text-xl font-semibold mb-4">Basic Component Usage</h3>
          <div className="mb-6">
            <CodePlayground
              initialCode={`import { useState } from 'frontend-hamroun';
import { Button, Card, TextField } from 'frontend-hamroun/ui';

function MyFirstComponent() {
  const [name, setName] = useState('');
  
  return (
    <Card title="Welcome to Frontend Hamroun">
      <p>Enter your name to get started:</p>
      <TextField 
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
      />
      <Button onClick={() => alert(\`Hello, \${name}!\`)}>
        Say Hello
      </Button>
    </Card>
  );
}`}
              readOnly={true}
            />
          </div>
          
          <div className="flex justify-center mt-8">
            <GlowButton href="/docs/components/getting-started" size="lg">
              Read the Full Guide
            </GlowButton>
          </div>
        </div>
      </section>
    </div>
  );
}
