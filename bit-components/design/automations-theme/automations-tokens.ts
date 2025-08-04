/**
 * Automations tokens theme.
 * Include all tokens in this object.
 */
export function automationsTokens() {
  const tokens = {
    /**
     * Color Palette
     */
    colors: {
      primary: {
        default: '#4A90E2', // Main brand color (core identity) 
        hover: '#5A9CEC', // Brand color for hover states.
        active: '#3A7BC4', // Brand color for active states.
      },
      secondary: {
        default: '#D8E6F8', // Brand accent color (subtle contrast)
        hover: '#C8DAED', // Brand accent hover color
        active: '#B8CEE2', // Brand accent active color
      },
      surface: {
        background: '#F8F9FA', // Default background color (light, airy)
        primary: '#FFFFFF', // Primary content surface (clean, crisp)
        secondary: '#F0F2F5', // Secondary surface (subtle differentiation)
      },
      text: {
        primary: '#1C2025', // Main text color (high contrast)
        secondary: '#5A6978', // Secondary text (subtle emphasis)
        inverse: '#FFFFFF', // Text on dark backgrounds (clear readability)
      },
      status: {
        positive: { default: '#28A745', subtle: '#D4EDDA' },
        negative: { default: '#DC3545', subtle: '#F8D7DA' },
        warning: { default: '#FFC107', subtle: '#FFF3CD' },
        info: { default: '#17A2B8', subtle: '#D1ECF1' },
      },
      overlay: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay (modals, etc.)
    },

    borders: {
      default: {
        color: '#DEE2E6', // Subtle border color (clean separation)
        width: '1px', // Default border width
        style: 'solid', // Default border style
      },
      focus: {
        color: '#4A90E2',
        width: '2px',
        style: 'solid',
        offset: '2px', 
      },
      radius: {
        small: '4px', // For small elements (e.g., input fields)
        medium: '8px', // For standard elements (e.g., buttons, cards)
        large: '16px', // For larger elements (e.g., modals)
        circle: '50%', // For circular elements (e.g., avatars)
      },
    },


    /**
     * Typography System
     */
    typography: {
      fontFamily: "'Roboto', sans-serif, Arial", // Modern, clean typeface
      sizes: {
        display: { large: '64px', medium: '52px', small: '44px' },
        heading: {
          h1: '48px',
          h2: '40px',
          h3: '32px',
          h4: '24px',
          h5: '20px',
          h6: '16px',
        },
        body: { large: '18px', medium: '16px', default: '16px', small: '14px' },
        caption: { default: '12px', medium: '14px' },
      },
      lineHeight: {
        base: '1.5', // Comfortable reading experience
        heading: '1.2', // Tighter leading for headings
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semiBold: '600',
        bold: '700',
      },
      letterSpacing: {
        tight: '-0.02em', // For headings
        normal: '0',
        wide: '0.03em', // For specific elements
      },
    },

    /**
     * Spacing & Layout
     */
    spacing: {
      default: '8px',
      small: '4px',
      large: '16px',
      xl: '24px',
      x4: '32px',
    },

    layout: {
      /**
       * Maximum width size for pages
       */
      maxPageWidth: '1280px',

      /**
       * Spacing between columns or elements
       */
      gutter: '24px',
    },

    /**
     * Visual Effects
     */
    effects: {
      shadows: {
        xs: '0px 1px 2px rgba(0, 0, 0, 0.08)', // Extra small shadow
        small: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        medium: '0px 4px 8px rgba(0, 0, 0, 0.15)',
        large: '0px 8px 16px rgba(0, 0, 0, 0.2)',
        xLarge: '0px 12px 24px rgba(0, 0, 0, 0.25)', // Extra large shadow
        inset: 'inset 0px 1px 2px rgba(0, 0, 0, 0.1)', // Inset shadow for depth
        raised: '0px 4px 12px rgba(0, 0, 0, 0.15), 0px 2px 4px rgba(0, 0, 0, 0.1)', // Raised effect
      },
      opacity: { disabled: '0.5', hover: '0.8', faint: '0.2', semiOpaque: '0.7' },
      gradients: {
        primary: 'linear-gradient(to right, #4A90E2, #7BB9F6)',
        secondary: 'linear-gradient(to bottom, #D8E6F8, #EBF2FA)',
        radial: 'radial-gradient(circle, #4A90E2, #3A7BC4)', // Radial gradient example
      },
      blur: {
        small: 'blur(4px)',
        medium: 'blur(8px)',
        large: 'blur(16px)',
      },
    },    

    /**
     * Interaction & Motion
     */
    interactions: {
      cursor: { pointer: 'pointer', disabled: 'not-allowed', text: 'text', grab: 'grab', grabbing: 'grabbing' },
      zIndex: { base: '1', modal: '100', tooltip: '200', overlay: '300', sticky: '50' },
      transitions: {
        duration: { fast: '0.15s', medium: '0.3s', slow: '0.5s', verySlow: '1s' },
        easing: {
          easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
          easeOut: 'ease-out',
          easeIn: 'ease-in',
          spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' // Spring-like easing
        },
        property: {
          all: 'all',
          transform: 'transform',
          opacity: 'opacity',
          color: 'color',
          shadow: 'box-shadow',
        },
      },
      hoverEffect: {
        scale: 'scale(1.05)', // Slight scale on hover
        translateY: 'translateY(-2px)', // Slight vertical lift on hover
        shadow: '0px 6px 12px rgba(0, 0, 0, 0.18)', // Enhanced shadow on hover
      },
    },
  };

  return tokens;
}

// create a theme type schema to allow new theme to override
// or implement a different theme variation like dark theme.
// in case tokens are dynamically loaded from a json file, please declare this variable an an interface.
/**
 * Use tokens from this schema as css variables in your components.
 * For example, use `surfaceColor` as css variable `--surface-color`
 */
export type AutomationsThemeSchema = ReturnType<typeof automationsTokens>;