/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          light: 'var(--accent-light)',
          dark: 'var(--accent-dark)',
        },
        tertiary: 'var(--tertiary)',
        gold: 'var(--gold)',
        turquoise: 'var(--turquoise)',
        ruby: 'var(--ruby)',
        purple: 'var(--purple)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        info: 'var(--info)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
        arabic: ['Noto Sans Arabic', 'sans-serif'],
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)', 
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
        'full': 'var(--radius-full)',
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'inner': 'var(--shadow-inner)',
        'primary': 'var(--shadow-primary)',
        'accent': 'var(--shadow-accent)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-3d': 'float-3d 8s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s infinite',
        'orbit': 'orbit 15s linear infinite',
        'bounce': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'ripple': 'ripple 1.5s infinite',
        'gradient-move': 'gradient-move 4s ease infinite',
        'loading-dots': 'loading-dots 1.4s infinite ease-in-out both',
        'wave': 'wave 25s linear infinite',
        'spotlight': 'spotlight 3s ease-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'pulse-border': 'pulse-border 2s infinite',
        'confetti-fall': 'confetti-fall 5s ease-in-out forwards',
        'spin-once': 'spin-once 0.7s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
        'dynamic-pulse': 'dynamic-pulse 2s infinite',
        'staggered-fade-in': 'staggered-fade-in 0.5s ease forwards',
        'tab-slide-in': 'tab-slide-in 0.3s ease forwards',
        'enhanced-ripple': 'enhanced-ripple 0.8s linear forwards',
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px) translateX(0px)' },
          '25%': { transform: 'translateY(-10px) translateX(5px)' },
          '50%': { transform: 'translateY(-15px) translateX(0px)' },
          '75%': { transform: 'translateY(-10px) translateX(-5px)' },
          '100%': { transform: 'translateY(0px) translateX(0px)' },
        },
        'float-3d': {
          '0%, 100%': { 
            transform: 'translateY(0) rotateX(0) rotateY(0)',
            filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.1))'
          },
          '25%': { 
            transform: 'translateY(-6px) rotateX(5deg) rotateY(-5deg)',
            filter: 'drop-shadow(0 15px 15px rgba(0,0,0,0.2))'
          },
          '50%': { 
            transform: 'translateY(-10px) rotateX(10deg) rotateY(5deg)',
            filter: 'drop-shadow(0 20px 20px rgba(0,0,0,0.3))'
          },
          '75%': { 
            transform: 'translateY(-6px) rotateX(15deg) rotateY(-5deg)',
            filter: 'drop-shadow(0 15px 15px rgba(0,0,0,0.2))'
          },
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 5px 0 rgba(31, 122, 140, 0.3)' },
          '50%': { boxShadow: '0 0 20px 5px rgba(31, 122, 140, 0.5)' },
          '100%': { boxShadow: '0 0 5px 0 rgba(31, 122, 140, 0.3)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(70px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(70px) rotate(-360deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-7deg)' },
          '75%': { transform: 'rotate(7deg)' },
        },
        ripple: {
          '0%': { boxShadow: '0 0 0 0 rgba(31, 122, 140, 0.4)' },
          '100%': { boxShadow: '0 0 0 20px rgba(31, 122, 140, 0)' },
        },
        'gradient-move': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'loading-dots': {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
        },
        wave: {
          '0%': { backgroundPositionX: '0' },
          '100%': { backgroundPositionX: '960px' },
        },
        spotlight: {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-100% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-border': {
          '0%': { boxShadow: '0 0 0 0 rgba(14, 124, 134, 0.4)' },
          '70%': { boxShadow: '0 0 0 10px rgba(14, 124, 134, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(14, 124, 134, 0)' },
        },
        'confetti-fall': {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)' },
          '100%': { transform: 'translateY(100vh) rotate(720deg)' },
        },
        'spin-once': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'dynamic-pulse': {
          '0%': {
            transform: 'scale(0.95)',
            boxShadow: '0 0 0 0 rgba(14, 124, 134, 0.4)'
          },
          '70%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 15px rgba(14, 124, 134, 0)'
          },
          '100%': {
            transform: 'scale(0.95)',
            boxShadow: '0 0 0 0 rgba(14, 124, 134, 0)'
          },
        },
        'staggered-fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'tab-slide-in': {
          'from': { 
            opacity: '0',
            transform: 'translateY(10px)'
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'enhanced-ripple': {
          '0%': {
            transform: 'scale(0)',
            opacity: '0.7'
          },
          '100%': {
            transform: 'scale(4)',
            opacity: '0'
          },
        },
      },
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-accent': 'var(--gradient-accent)',
        'gradient-vibrant': 'var(--gradient-vibrant)',
        'gradient-cool': 'var(--gradient-cool)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
    },
  },
  plugins: [],
}
