# Frontend Hamroun Documentation Site

<p align="center">
  <code style="font-size: 24px; color: #4A90E2; background-color: transparent">{ Frontend Hamroun }</code>
</p>

This repository contains the documentation website for Frontend Hamroun, a lightweight full-stack JavaScript framework with Virtual DOM and hooks implementation.

## About Frontend Hamroun

Frontend Hamroun is a JavaScript framework that provides:

- **Lightweight Core**: <5KB gzipped for essential runtime
- **Full-Stack Solution**: Client and server capabilities in one package
- **Virtual DOM**: Efficient rendering and diffing algorithm
- **Hooks API**: Complete hooks system (useState, useEffect, useMemo, useRef)
- **Context API**: Simple state management across components
- **Server-Side Rendering**: Optimized SSR with hydration
- **Database Integration**: Support for MongoDB, MySQL, and PostgreSQL
- **Authentication**: Built-in JWT authentication system
- **API Routing**: Express-based file system routing
- **TypeScript Support**: Full type definitions included
- **Interactive CLI**: Powerful tools for project scaffolding and component creation

## 🚀 Features

- **Interactive Documentation** - Comprehensive guides and API references
- **Live Code Examples** - Interactive code playground with real-time preview
- **RTL Support** - First-class support for Arabic and other RTL languages
- **Responsive Design** - Works seamlessly across all devices
- **Dark/Light Mode** - Theme switching with system preference detection
- **Testing Suite** - Unit, integration, and E2E tests included
- **Performance Optimized** - Built with Next.js 15 and optimized for speed

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Jest, React Testing Library, Playwright
- **UI Icons**: Heroicons
- **Code Highlighting**: React Syntax Highlighter
- **Animations**: Framer Motion & Custom CSS

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn package manager

## 🏃‍♂️ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/hamroun/frontend-hamroun-docs.git
   cd frontend-hamroun-docs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

### Unit Tests
```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Integration Tests
```bash
npm run test:integration
```

### End-to-End Tests
```bash
# Run E2E tests
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui
```

### Run All Tests
```bash
npm run test:all
```

## 📁 Project Structure

```bash
frontend-hamroun-docs
├── public/                  # Static files
├── src/
│   ├── components/          # Reusable components
│   ├── docs/                # Documentation files
│   ├── hooks/               # Custom hooks
│   ├── layouts/             # Layout components
│   ├── pages/               # Page components
│   ├── styles/              # Global styles
│   └── utils/               # Utility functions
├── .env                     # Environment variables
├── .gitignore               # Git ignore file
├── next.config.js          # Next.js configuration
├── package.json             # Package configuration
└── tsconfig.json            # TypeScript configuration
```

## Contributing

Contributions to improve the documentation are welcome. Please feel free to submit a Pull Request.

## License

MIT © Hamroun
