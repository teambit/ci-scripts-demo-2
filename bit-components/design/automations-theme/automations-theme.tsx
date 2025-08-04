import { ReactNode, useCallback, useState } from 'react';
import classNames from 'classnames';
import { AutomationsThemeProvider } from './automations-theme-provider.js';
import { AutomationsThemeSchema } from './automations-tokens.js';
import { ThemeContext, ThemeContextValue, ThemeMode } from './theme-controller.js';
import { themeOptions } from './theme-options.js';
import styles from './automations-theme.module.scss';

export type AutomationsThemeProps = {
  /**
   * a root ReactNode for the component tree 
   * applied with the theme.
   */
  children?: ReactNode;

  /**
   * inject a class name to override to the theme.
   * this allows people to affect your theme. remove to avoid.
   */
  className?: string;

  /**
   * override tokens in the schema
   */
  overrides?: Partial<AutomationsThemeSchema>;

  /**
   * preset of the theme.
   */
  initialTheme?: ThemeMode;

  /**
   * style tags to include.
   */
  style?: React.CSSProperties;
};

/**
 * a theme for the Automations organization.
 * it provides tokens, fonts and general styling for all components.
 */
export function AutomationsTheme({ children, initialTheme = 'light', className, style, ...rest }: AutomationsThemeProps) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(initialTheme);
  const themePreset = themeOptions[themeMode];

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeModeState(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  }, []);

  const themeContextValue: ThemeContextValue = {
    themeMode,
    toggleTheme,
    setThemeMode,
  };
  
  return (
    <ThemeContext.Provider value={themeContextValue}>
      <AutomationsThemeProvider.ThemeProvider
        className={classNames(styles.automationsTheme, className)}
        style={style}
        overrides={themePreset}
        {...rest}
      >
        {children}
      </AutomationsThemeProvider.ThemeProvider>
    </ThemeContext.Provider>
  );
}