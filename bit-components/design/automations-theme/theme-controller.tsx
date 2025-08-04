import { createContext, useContext } from 'react';

export type ThemeMode = 'light' | 'dark';

export interface ThemeContextValue {
  /**
   * Current theme mode (light or dark)
   */
  themeMode: ThemeMode;
  
  /**
   * Function to toggle between light and dark modes
   */
  toggleTheme: () => void;
  
  /**
   * Function to set a specific theme mode
   */
  setThemeMode: (mode: ThemeMode) => void;
}

// Create theme context
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Hook for accessing and controlling the current theme state.
 * Provides functions to toggle between light/dark modes and RTL/LTR directions.
 */
export function useThemeController(): ThemeContextValue {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useThemeController must be used within an AutomationsTheme component');
  }
  
  return context;
}