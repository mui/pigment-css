const BREAKPOINTS = {
  sm: '480px',
  md: '768px',
} as const;

const baseTokens = {
  typography: {
    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
    fontSizes: {
      logo: '2rem',
      nav: '1.1rem',
      title: {
        desktop: '4rem',
        tablet: '3rem',
        mobile: '2.5rem',
      },
      subtitle: {
        desktop: '1.5rem',
        tablet: '1.25rem',
        mobile: '1.1rem',
      },
      button: {
        desktop: '1.1rem',
        mobile: '1rem',
      },
      featureTitle: {
        desktop: '1.5rem',
        mobile: '1.25rem',
      },
      featureDescription: {
        desktop: '1.1rem',
        mobile: '1rem',
      },
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    lineHeights: {
      tight: 1.1,
      normal: 1.5,
      relaxed: 1.6,
    },
    letterSpacing: {
      tight: '-0.05em',
    },
  },
  spacing: {
    0: '0',
    1: '0.75rem',
    2: '1rem',
    3: '1.5rem',
    4: '2rem',
    5: '3rem',
    6: '4rem',
    8: '6rem',
  },
  sizes: {
    container: '1200px',
    content: '800px',
    featureCard: '250px',
    minWidth: '320px',
  },
  radii: {
    sm: '0.5rem',
    md: '1rem',
    button: '8px',
  },
  animations: {
    gradient: {
      duration: '15s',
      timing: 'ease',
      iteration: 'infinite',
    },
    transition: {
      duration: '0.2s',
      timing: 'ease',
    },
    button: {
      duration: '0.25s',
    },
  },
  breakpoints: {
    gt(key: keyof typeof BREAKPOINTS) {
      return `@media (min-width: ${BREAKPOINTS[key]})`;
    },
    lt(key: keyof typeof BREAKPOINTS) {
      return `@media (max-width: ${BREAKPOINTS[key]})`;
    },
  },
  utils: {
    reducedMotion(val: 'no-preference' | 'reduce') {
      return `@media (prefers-reduced-motion: ${val})`;
    },
    colorScheme(val: 'light' | 'dark') {
      return `@media (prefers-color-scheme: ${val})`;
    },
  },
} as const;

export const lightTheme = {
  ...baseTokens,
  colors: {
    primary: '#e73c7e',
    text: {
      primary: 'white',
      secondary: 'rgba(255, 255, 255, 0.9)',
      body: '#213547',
    },
    background: {
      gradient: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
      glass: 'rgba(255, 255, 255, 0.25)',
      body: '#ffffff',
      button: '#f9f9f9',
    },
    border: {
      glass: 'rgba(255, 255, 255, 0.3)',
      button: 'transparent',
    },
    shadow: {
      text: 'rgba(0, 0, 0, 0.2)',
      glass: 'rgba(0, 0, 0, 0.1)',
    },
    link: {
      default: '#646cff',
      hover: '#747bff',
    },
  },
  effects: {
    glass: {
      blur: '12px',
      background: 'rgba(255, 255, 255, 0.25)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      shadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    },
    hover: {
      lift: 'translateY(-2px)',
      liftLarge: 'translateY(-5px)',
      opacity: 0.9,
    },
  },
} as const;

export const darkTheme = {
  colors: {
    primary: '#e73c7e',
    text: {
      primary: 'white',
      secondary: 'rgba(255, 255, 255, 0.9)',
      body: 'rgba(255, 255, 255, 0.87)',
    },
    background: {
      gradient: 'linear-gradient(-45deg, #2d1b4e, #1e0f3c, #0a0521, #02010a)',
      glass: 'rgba(0, 0, 0, 0.3)',
      body: '#242424',
      button: '#1a1a1a',
    },
    border: {
      glass: 'rgba(255, 255, 255, 0.1)',
      button: 'transparent',
    },
    shadow: {
      text: 'rgba(0, 0, 0, 0.4)',
      glass: 'rgba(0, 0, 0, 0.2)',
    },
    link: {
      default: '#646cff',
      hover: '#535bf2',
    },
  },
  effects: {
    glass: {
      blur: '12px',
      background: 'rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      shadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
    },
    hover: {
      lift: 'translateY(-2px)',
      liftLarge: 'translateY(-5px)',
      opacity: 0.9,
    },
  },
} as const;

export type Theme = typeof lightTheme;
