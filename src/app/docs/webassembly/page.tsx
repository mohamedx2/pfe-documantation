'use client';

import React from 'react';
import { 
  CpuChipIcon, 
  CommandLineIcon,
  DocumentTextIcon,
  BoltIcon,
  RocketLaunchIcon,
  CheckCircleIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import GlowButton from '@/components/GlowButton';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function WebAssemblyPage() {
  const goExample = `package main

import (
    "syscall/js"
    "strconv"
)

func fastCalculation(this js.Value, args []js.Value) interface{} {
    if len(args) != 2 {
        return "Error: requires exactly 2 arguments"
    }
    
    a := args[0].Int()
    b := args[1].Int()
    
    // Perform intensive calculation
    result := 0
    for i := 0; i < a; i++ {
        for j := 0; j < b; j++ {
            result += i * j
        }
    }
    
    return result
}

func main() {
    c := make(chan struct{}, 0)
    
    js.Global().Set("fastCalculation", js.FuncOf(fastCalculation))
    
    <-c
}`;

  const jsExample = `import { loadGoWasm, callWasmFunction } from 'baraqex';

async function runPerformanceTest() {
  // Load the Go WebAssembly module
  const wasmInstance = await loadGoWasm('./math.wasm');
  
  console.log('WebAssembly module loaded successfully!');
  
  // Call the Go function from JavaScript
  const startTime = performance.now();
  const result = callWasmFunction('fastCalculation', [1000, 2000]);
  const endTime = performance.now();
  
  console.log(\`Result: \${result}\`);
  console.log(\`Execution time: \${endTime - startTime} milliseconds\`);
  
  return result;
}

// Use in React component
function Calculator() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleCalculation = async () => {
    setLoading(true);
    try {
      const wasmResult = await runPerformanceTest();
      setResult(wasmResult);
    } catch (error) {
      console.error('WASM Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <button onClick={handleCalculation} disabled={loading}>
        {loading ? 'Calculating...' : 'Run WASM Calculation'}
      </button>
      {result && <p>Result: {result}</p>}
    </div>
  );
}`;

  return (
    <div className="docs-section">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <RevealOnScroll>
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <CpuChipIcon className="w-10 h-10 text-primary mr-4" />
              <h1 className="text-4xl font-bold">WebAssembly Integration</h1>
            </div>
            <p className="text-xl text-foreground/70">
              Supercharge your applications with Go WebAssembly integration. Run high-performance code at near-native speed in both browser and Node.js environments.
            </p>
          </div>
        </RevealOnScroll>

        {/* Benefits Section */}
        <RevealOnScroll>
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Why WebAssembly with Baraqex?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-background rounded-lg border border-primary/10">
                <BoltIcon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Performance Boost</h3>
                <p className="text-foreground/70">Get 10-100x performance improvement for computational tasks compared to pure JavaScript.</p>
              </div>
              <div className="p-6 bg-background rounded-lg border border-primary/10">
                <RocketLaunchIcon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Universal Execution</h3>
                <p className="text-foreground/70">Same WebAssembly code runs in browsers, Node.js, and server environments.</p>
              </div>
              <div className="p-6 bg-background rounded-lg border border-primary/10">
                <CheckCircleIcon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Easy Integration</h3>
                <p className="text-foreground/70">Simple API for loading and calling Go functions from JavaScript.</p>
              </div>
              <div className="p-6 bg-background rounded-lg border border-primary/10">
                <DocumentTextIcon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold mb-2">Type Safety</h3>
                <p className="text-foreground/70">Full TypeScript support with automatic type conversion between Go and JavaScript.</p>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Getting Started */}
        <RevealOnScroll>
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Getting Started</h2>
            
            <div className="steps-container space-y-6">
              <div className="step p-6 bg-background rounded-lg border border-primary/10">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-4">1</div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-3">Create your Go WebAssembly module</h3>
                    <div className="code-block overflow-hidden rounded-lg">
                      <div className="bg-black/80 text-white p-2 flex items-center">
                        <DocumentTextIcon className="w-5 h-5 mr-2" />
                        <span>main.go</span>
                        <button 
                          className="ml-auto px-2 py-1 text-xs bg-primary/20 hover:bg-primary/30 rounded text-primary"
                          onClick={() => navigator.clipboard.writeText(goExample)}
                        >
                          Copy
                        </button>
                      </div>
                      <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 overflow-x-auto font-mono text-sm">
                        <code>{goExample}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              <div className="step p-6 bg-background rounded-lg border border-primary/10">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-4">2</div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-3">Compile to WebAssembly</h3>
                    <div className="code-block overflow-hidden rounded-lg mb-3">
                      <div className="bg-black/80 text-white p-2 flex items-center">
                        <CommandLineIcon className="w-5 h-5 mr-2" />
                        <span>Terminal</span>
                        <button 
                          className="ml-auto px-2 py-1 text-xs bg-primary/20 hover:bg-primary/30 rounded text-primary"
                          onClick={() => navigator.clipboard.writeText("GOOS=js GOARCH=wasm go build -o math.wasm main.go")}
                        >
                          Copy
                        </button>
                      </div>
                      <pre className="bg-black text-green-400 p-3 overflow-x-auto font-mono text-sm">
                        <code>GOOS=js GOARCH=wasm go build -o math.wasm main.go</code>
                      </pre>
                    </div>
                    <p className="text-sm text-foreground/70">
                      This compiles your Go code into a WebAssembly module that can be loaded by Baraqex.
                    </p>
                  </div>
                </div>
              </div>

              <div className="step p-6 bg-background rounded-lg border border-primary/10">
                <div className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-4">3</div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-3">Use in your Baraqex application</h3>
                    <div className="code-block overflow-hidden rounded-lg">
                      <div className="bg-black/80 text-white p-2 flex items-center">
                        <DocumentTextIcon className="w-5 h-5 mr-2" />
                        <span>app.js</span>
                        <button 
                          className="ml-auto px-2 py-1 text-xs bg-primary/20 hover:bg-primary/30 rounded text-primary"
                          onClick={() => navigator.clipboard.writeText(jsExample)}
                        >
                          Copy
                        </button>
                      </div>
                      <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 overflow-x-auto font-mono text-sm">
                        <code>{jsExample}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Performance Comparison */}
        <RevealOnScroll>
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Performance Comparison</h2>
            <div className="bg-background rounded-lg border border-primary/10 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <h3 className="font-semibold mb-2">Pure JavaScript</h3>
                  <div className="text-3xl font-bold text-foreground/60 mb-2">~2000ms</div>
                  <p className="text-sm text-foreground/70">Complex calculations</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Go WebAssembly</h3>
                  <div className="text-3xl font-bold text-primary mb-2">~20ms</div>
                  <p className="text-sm text-foreground/70">Same calculations</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Performance Gain</h3>
                  <div className="text-3xl font-bold text-green-500 mb-2">100x</div>
                  <p className="text-sm text-foreground/70">Faster execution</p>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Use Cases */}
        <RevealOnScroll>
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Common Use Cases</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-background rounded-lg border border-primary/10">
                <h3 className="font-semibold mb-3">Image Processing</h3>
                <p className="text-foreground/70 mb-3">High-performance image manipulation, filtering, and computer vision tasks.</p>
                <ul className="text-sm text-foreground/60 space-y-1">
                  <li>• Real-time image filters</li>
                  <li>• Image compression</li>
                  <li>• Computer vision algorithms</li>
                </ul>
              </div>
              <div className="p-6 bg-background rounded-lg border border-primary/10">
                <h3 className="font-semibold mb-3">Mathematical Computations</h3>
                <p className="text-foreground/70 mb-3">Complex mathematical operations, scientific computing, and data analysis.</p>
                <ul className="text-sm text-foreground/60 space-y-1">
                  <li>• Statistical analysis</li>
                  <li>• Machine learning inference</li>
                  <li>• Cryptographic operations</li>
                </ul>
              </div>
              <div className="p-6 bg-background rounded-lg border border-primary/10">
                <h3 className="font-semibold mb-3">Game Development</h3>
                <p className="text-foreground/70 mb-3">Game engines, physics simulations, and real-time graphics processing.</p>
                <ul className="text-sm text-foreground/60 space-y-1">
                  <li>• Physics engines</li>
                  <li>• 3D graphics rendering</li>
                  <li>• Game logic optimization</li>
                </ul>
              </div>
              <div className="p-6 bg-background rounded-lg border border-primary/10">
                <h3 className="font-semibold mb-3">Data Processing</h3>
                <p className="text-foreground/70 mb-3">Large dataset processing, parsing, and transformation operations.</p>
                <ul className="text-sm text-foreground/60 space-y-1">
                  <li>• CSV/JSON parsing</li>
                  <li>• Data transformation</li>
                  <li>• Real-time analytics</li>
                </ul>
              </div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Next Steps */}
        <RevealOnScroll>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">Ready to Get Started?</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <GlowButton href="/docs/getting-started" size="lg">
                <PlayIcon className="w-5 h-5 mr-2" />
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
