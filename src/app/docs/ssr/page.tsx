'use client';

import React from 'react';
import { 
  ServerIcon, 
  DocumentTextIcon,
  GlobeAltIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  BoltIcon,
  CogIcon
} from '@heroicons/react/24/outline';
import GlowButton from '@/components/GlowButton';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function ServerRenderingPage() {
  const serverExample = `import { createServer } from 'baraqex';

const server = createServer({
  port: 3000,
  apiDir: './src/api',
  pagesDir: './src/pages',
  staticDir: './public',
  enableCors: true,
  
  // Database configuration
  db: {
    url: process.env.DATABASE_URL,
    type: 'mongodb' // or 'mysql', 'postgres'
  },
  
  // Authentication configuration
  auth: {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d'
  }
});

// Enable SSR with hydration
server.enableSSR({ 
  hydratable: true,
  staticGeneration: true 
});

// Add custom middleware
server.use((req, res, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  next();
});

// Start the server
server.start().then(() => {
  console.log('🚀 Server running on http://localhost:3000');
});`;

  const pageExample = `// pages/about.js - Automatic route: /about
import { jsx } from 'baraqex';

export default function AboutPage(props) {
  return jsx('div', { className: 'container' },
    jsx('h1', null, 'About Us'),
    jsx('p', null, 'Welcome to our amazing website!'),
    jsx('div', null,
      jsx('h2', null, 'Server Data:'),
      jsx('pre', null, JSON.stringify(props.serverData, null, 2))
    )
  );
}

// Optional: Server-side data fetching
AboutPage.getServerProps = async (req, res) => {
  // This runs on the server
  const data = await fetch('https://api.example.com/about');
  const aboutData = await data.json();
  
  return {
    serverData: aboutData,
    timestamp: new Date().toISOString()
  };
};

// Optional: Page metadata
AboutPage.title = 'About - My App';
AboutPage.description = 'Learn more about our company';`;

  const apiExample = `// api/users.js - Automatic route: /api/users
export async function get(req, res) {
  try {
    // This runs on the server
    const users = await User.find({});
    res.json({ 
      success: true, 
      data: users 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}

export async function post(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ 
      success: true, 
      data: newUser 
    });
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
}

// api/users/[id].js - Dynamic route: /api/users/:id
export async function get(req, res) {
  const { id } = req.params;
  const user = await User.findById(id);
  
  if (!user) {
    return res.status(404).json({ 
      success: false, 
      error: 'User not found' 
    });
  }
  
  res.json({ success: true, data: user });
}`;

  return (
    <div className="docs-section">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <RevealOnScroll>
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <ServerIcon className="w-10 h-10 text-primary mr-4" />
              <h1 className="text-4xl font-bold">Server-Side Rendering</h1>
            </div>
            <p className="text-xl text-foreground/70">
              Build fast, SEO-friendly applications with Baraqex&apos;s powerful server-side rendering capabilities and file-based routing system.
            </p>
          </div>
        </RevealOnScroll>

        {/* Benefits Section */}
        <RevealOnScroll>
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Why Server-Side Rendering?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-background rounded-lg border border-primary/10">
                <GlobeAltIcon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">SEO Optimization</h3>
                <p className="text-foreground/70">Search engines can crawl and index your content, improving discoverability and rankings.</p>
              </div>
              <div className="p-6 bg-background rounded-lg border border-primary/10">
                <BoltIcon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Faster Initial Load</h3>
                <p className="text-foreground/70">Users see content immediately without waiting for JavaScript to download and execute.</p>
              </div>
              <div className="p-6 bg-background rounded-lg border border-primary/10">
                <CheckCircleIcon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Better Performance</h3>
                <p className="text-foreground/70">Reduced time to first contentful paint and improved Core Web Vitals scores.</p>
              </div>
              <div className="p-6 bg-background rounded-lg border border-primary/10">
                <RocketLaunchIcon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Client Hydration</h3>
                <p className="text-foreground/70">Seamlessly transition from server-rendered HTML to interactive client-side application.</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Server Setup */}
        <RevealOnScroll>
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Setting Up Your Server</h2>
            <div className="code-block overflow-hidden rounded-lg">
              <div className="bg-black/80 text-white p-2 flex items-center">
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                <span>server.js</span>
                <button 
                  className="ml-auto px-2 py-1 text-xs bg-primary/20 hover:bg-primary/30 rounded text-primary"
                  onClick={() => navigator.clipboard.writeText(serverExample)}
                >
                  Copy
                </button>
              </div>
              <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 overflow-x-auto font-mono text-sm">
                <code>{serverExample}</code>
              </pre>
            </div>
          </div>
        </RevealOnScroll>

        {/* File-Based Routing */}
        <RevealOnScroll>
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">File-Based Routing</h2>
            <p className="text-foreground/70 mb-6">
              Baraqex automatically generates routes based on your file structure. No manual route configuration needed!
            </p>
            
            <div className="bg-background rounded-lg border border-primary/10 p-6 mb-6">
              <h3 className="font-semibold mb-4">File Structure → Routes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-sm">
                <div>
                  <div className="text-foreground/60 mb-2">File Structure:</div>
                  <div className="space-y-1">
                    <div>pages/index.js</div>
                    <div>pages/about.js</div>
                    <div>pages/blog/index.js</div>
                    <div>pages/blog/[slug].js</div>
                    <div>pages/user/[id]/profile.js</div>
                  </div>
                </div>
                <div>
                  <div className="text-foreground/60 mb-2">Generated Routes:</div>
                  <div className="space-y-1">
                    <div>/ (homepage)</div>
                    <div>/about</div>
                    <div>/blog</div>
                    <div>/blog/:slug</div>
                    <div>/user/:id/profile</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="code-block overflow-hidden rounded-lg">
              <div className="bg-black/80 text-white p-2 flex items-center">
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                <span>pages/about.js</span>
                <button 
                  className="ml-auto px-2 py-1 text-xs bg-primary/20 hover:bg-primary/30 rounded text-primary"
                  onClick={() => navigator.clipboard.writeText(pageExample)}
                >
                  Copy
                </button>
              </div>
              <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 overflow-x-auto font-mono text-sm">
                <code>{pageExample}</code>
              </pre>
            </div>
          </div>
        </RevealOnScroll>

        {/* API Routes */}
        <RevealOnScroll>
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">API Routes</h2>
            <p className="text-foreground/70 mb-6">
              Create powerful REST APIs using the same file-based routing system. Each file in the api/ directory becomes an endpoint.
            </p>
            
            <div className="code-block overflow-hidden rounded-lg">
              <div className="bg-black/80 text-white p-2 flex items-center">
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                <span>api/users.js</span>
                <button 
                  className="ml-auto px-2 py-1 text-xs bg-primary/20 hover:bg-primary/30 rounded text-primary"
                  onClick={() => navigator.clipboard.writeText(apiExample)}
                >
                  Copy
                </button>
              </div>
              <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 overflow-x-auto font-mono text-sm">
                <code>{apiExample}</code>
              </pre>
            </div>
          </div>
        </RevealOnScroll>

        {/* Features */}
        <RevealOnScroll>
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Advanced Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-background rounded-lg border border-primary/10">
                <CogIcon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Middleware Support</h3>
                <p className="text-foreground/70">Add custom middleware for authentication, logging, CORS, and more.</p>
              </div>
              <div className="p-6 bg-background rounded-lg border border-primary/10">
                <DocumentTextIcon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Static Generation</h3>
                <p className="text-foreground/70">Pre-generate static pages for maximum performance and SEO benefits.</p>
              </div>
              <div className="p-6 bg-background rounded-lg border border-primary/10">
                <BoltIcon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Hot Reload</h3>
                <p className="text-foreground/70">Development server with instant updates when you change your code.</p>
              </div>
              <div className="p-6 bg-background rounded-lg border border-primary/10">
                <CheckCircleIcon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Error Handling</h3>
                <p className="text-foreground/70">Built-in error boundaries and graceful error handling for production apps.</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Next Steps */}
        <RevealOnScroll>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Ready to Build Server-Rendered Apps?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <GlowButton href="/docs/getting-started" size="lg">
                <RocketLaunchIcon className="w-5 h-5 mr-2" />
                Get Started
              </GlowButton>
              <GlowButton href="/examples" variant="subtle" size="lg">
                <DocumentTextIcon className="w-5 h-5 mr-2" />
                View Examples
              </GlowButton>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </div>
  );
}
