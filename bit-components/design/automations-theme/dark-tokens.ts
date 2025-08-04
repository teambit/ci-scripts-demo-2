import { DeepPartial } from '@bitdesign/sparks.sparks-theme';
import { AutomationsThemeSchema } from "./automations-tokens.js";

/**
 * override tokens for the dark theme.
 * overrides the default light theme tokens.
 */
export const darkThemeSchema: DeepPartial<AutomationsThemeSchema> = {
  colors: {
    primary: {
      default: '#63B3ED',
      hover: '#7BC4F0',
      active: '#4A9EE5'
    },
    secondary: {
      default: '#2D3748',
      hover: '#3A465B',
      active: '#475569'
    },
    surface: {
      background: '#1A2027', // Dark background
      primary: '#2A3441', // Darker surface for content
      secondary: '#1D252E', // Even darker secondary surface
    },
    text: {
      primary: '#F7FAFC', // Light text for dark backgrounds
      secondary: '#A0AEC0', // Slightly darker secondary text
      inverse: '#1A2027', // Dark text on light backgrounds (if needed)
    },
    status: {
      positive: { default: '#38A169', subtle: '#2F855A' }, // Adjusted positive
      negative: { default: '#E53E3E', subtle: '#C53030' }, // Adjusted negative
      warning: { default: '#DD6B20', subtle: '#C05621' }, // Adjusted warning
      info: { default: '#3182CE', subtle: '#2B6CB0' }, // Adjusted info
    },
    overlay: 'rgba(0, 0, 0, 0.8)', // Darker overlay for better visibility
  },
  borders: {
    default: {
      color: '#4A5568', 
      width: '1px', 
      style: 'solid', 
    },
    focus: {
      color: '#63B3ED', // Focus indicator (clear, accessible)
      width: '2px',
      style: 'solid',
      offset: '2px', 
    },
    radius: {
      small: '4px',
      medium: '8px',
      large: '16px',
      circle: '50%',
    },
  }
};