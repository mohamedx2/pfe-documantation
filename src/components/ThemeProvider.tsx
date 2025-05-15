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

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "theme",
  ...props
}: ThemeProviderProps) {
  // Use a mounting state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  // Only access localStorage after component has mounted
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem(storageKey) as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [storageKey]);

  // Apply theme to document element only after mounting
  useEffect(() => {
    if (!mounted) return;
    
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    
    let resolvedTheme: "light" | "dark" = "light";
    
    if (theme === "system") {
      resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark" 
        : "light";
    } else {
      resolvedTheme = theme as "light" | "dark";
    }
    
    // Apply theme consistently
    root.classList.add(resolvedTheme);
    // Use dataset instead of setAttribute for better React compatibility
    root.dataset.theme = resolvedTheme;
    root.style.colorScheme = resolvedTheme;
    
  }, [theme, mounted]);

  const value = {
    theme,
    setTheme: React.useCallback((theme: Theme) => {
      if (mounted) {
        localStorage.setItem(storageKey, theme);
        setTheme(theme);
      }
    }, [mounted, storageKey]),
  };

  // Return a simplified provider during server render to avoid hydration issues
  return (
    <ThemeProviderContext.Provider {...props} value={value}>
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
