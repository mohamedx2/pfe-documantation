"use client";

import * as React from "react";
import { createContext, useContext, useState, useEffect } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

// Initial state uses 'system' for consistent server-side rendering
const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme"
}: ThemeProviderProps) {
  // Initially use the default theme
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  
  // Track if component is mounted to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);

  // Once component is mounted, we can safely access localStorage and apply user preferences
  useEffect(() => {
    setMounted(true);
    
    // Read from localStorage after mount
    const savedTheme = localStorage.getItem(storageKey) as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [storageKey]);
  // Apply theme to document only after mounting
  useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    
    // Remove both classes first
    root.classList.remove("light", "dark");
    
    let effectiveTheme: "light" | "dark";
    
    // Apply theme class based on current theme
    if (theme === "system") {
      effectiveTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      effectiveTheme = theme as "light" | "dark";
    }
    
    root.classList.add(effectiveTheme);
    
    // Also set data attributes for better styling
    root.setAttribute("data-theme", effectiveTheme);
    root.style.colorScheme = effectiveTheme;
    
    // Listen for system theme changes
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        root.classList.remove("light", "dark");
        const newTheme = e.matches ? "dark" : "light";
        root.classList.add(newTheme);
        root.setAttribute("data-theme", newTheme);
        root.style.colorScheme = newTheme;
      }
    };
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [theme, mounted]);

  // Create a safe version of setTheme
  const value = React.useMemo(
    () => ({
      theme,
      setTheme: (newTheme: Theme) => {
        if (mounted) {
          localStorage.setItem(storageKey, newTheme);
          setTheme(newTheme);
        }
      },
    }),
    [theme, mounted, storageKey]
  );

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = (): ThemeProviderState => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
