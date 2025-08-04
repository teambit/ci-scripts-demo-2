import { createTheme } from '@bitdesign/sparks.sparks-theme';
import { AutomationsThemeSchema, automationsTokens } from './automations-tokens.js';

/**
 * creating and declaring the automations theme.
 * define the theme schema as a type variable for proper type completions.
 */
export const AutomationsThemeProvider = createTheme<AutomationsThemeSchema>({
  tokens: automationsTokens,
});

/**
 * a react hook for contextual access to design token
 * from components.
 */
export const { useTheme } = AutomationsThemeProvider;